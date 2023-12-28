import { Module } from '@nestjs/common';
import { AuthorsService } from './services/author.service';

@Module({
  providers: [AuthorsService],
  exports: [AuthorsService],
})
export class AuthorsModule {}
