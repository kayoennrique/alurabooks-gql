import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { http } from 'src/common/http';
import { Highlights } from '../models/highlights.mode';
import { Book } from '../models/book.model';
import { Tag } from '../models/tag.model';

@Injectable()
export class BooksService {
  async searchHighlights(): Promise<Highlights> {
    const releases = await http.get('/public/releases');
    const bestSellers = await http.get('/public/best-sellers');
    return {
      releases: releases.data,
      bestSellers: bestSellers.data,
    };
  }
  async searchAll(title?: string, categorieId?: number) {
    const config: AxiosRequestConfig = {};
    if (categorieId > 0) {
      config.params = {
        categorieId,
      };
    }
    const { data: books } = await http.get<Book[]>('/books', config);
    if (title) {
      return books.filter((book) =>
        book.title.toLowerCase().includes(title.toLowerCase()),
      );
    }
    return books;
  }
  async searchById(id: number) {
    const response = await http.get<Book>(`/books/${id}`);
    return response.data;
  }
  async searchBySlug(slug: string) {
    const response = await http.get<Book[]>(`/books`, {
      params: {
        slug,
      },
    });
    if (response.data.length) {
      return response.data[0];
    }
    return null;
  }
  async searchByTagsDo(book: Book): Promise<Tag[]> {
    const { data: todasAsTags } = await http.get<Tag[]>('tags');
    return todasAsTags.filter((tag) => book.tagIds.includes(tag.id));
  }
}
