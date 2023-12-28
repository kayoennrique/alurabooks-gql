import { Injectable } from '@nestjs/common';
import { http } from 'src/common/http';
import { Author } from '../models/author.model';

@Injectable()
export class AuthorsService {
  async searchAll() {
    const response = await http.get<Author[]>('/authors');
    return response.data;
  }
  async searchById(id: number) {
    const response = await http.get<Author>(`/authors/${id}`);
    return response.data;
  }
}
