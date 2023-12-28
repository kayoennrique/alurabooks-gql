import { Injectable } from '@nestjs/common';
import { http } from 'src/common/http';
import { BooksService } from '../../books/services/books.service';
import { Cart } from '../models/cart.model';
import { ItemCartInput } from '../resolvers/cart.resolver';

@Injectable()
export class CartService {
  constructor(private BooksService: BooksService) {}

  async getCart() {
    const { data: cart } = await http.get<Cart>('/carts/1');
    if (!cart.itens) {
      cart.itens = [];
    }
    return cart;
  }

  async search() {
    const cart = await this.getCart();
    await Promise.all(
      cart.itens.map(async (item) => {
        item.book = await this.BooksService.searchById(item.bookId);
        const option = item.book.optionPurchase.find(
          (op) => op.id == item.optionPurchaseId,
        );
        item.optionPurchase = option;
      }),
    );
    cart.total = 0;
    if (cart.itens) {
      cart.total = cart.itens.reduce((accumulated, item) => {
        return accumulated + item.amount * item.optionPurchase.price;
      }, 0);
    }
    return cart;
  }
  async add(item: ItemCartInput) {
    const cart = await this.getCart();

    if (!Number.isInteger(item.amount)) {
      item.amount = 1;
    }

    const itemInCart = cart.itens.find(
      (it) =>
        it.bookId == item.bookId && it.optionPurchaseId == item.optionPurchaseId,
    );
    if (itemInCart) {
      itemInCart.amount = item.amount;
    } else {
      cart.itens.push({
        ...item,
        amount: item.amount,
      });
    }
    await http.put('carts/1', cart);
  }
  async toRemove(item: ItemCartInput) {
    const cart = await this.search();
    const idx = cart.itens.findIndex(
      (it) =>
        it.bookId == item.bookId && it.optionPurchaseId == item.optionPurchaseId,
    );
    if (idx >= 0) {
      cart.itens.splice(idx, 1);
      await http.put('carts/1', cart);
    }
  }
}
