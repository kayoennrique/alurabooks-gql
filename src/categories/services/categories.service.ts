import { Injectable } from '@nestjs/common';
import { http } from 'src/common/http';

@Injectable()
export class CategoriesService {
  async searchAll() {
    const response = await http.get('/categories');
    return response.data;
  }
  async searchById(id: number) {
    const response = await http.get(`/categories/${id}`);
    return response.data;
  }
}
