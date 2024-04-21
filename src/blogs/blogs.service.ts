import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { FileSystemStoredFile } from 'nestjs-form-data';
import { put } from "@vercel/blob";
import getImageUrl from 'src/utils/getImageUrl';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog) private readonly blogRepo: Repository<Blog>
  ) { }

  async create(createBlogDto: CreateBlogDto) {
    const { content, title, coverImage } = createBlogDto;

    const url = await getImageUrl(coverImage);

    return await this.blogRepo.save({
      content,
      title,
      coverImage: url,
    });
  }

  async findAll() {
    return await this.blogRepo.find({
      order: {
        createdAt: 'ASC',
      }
    });
  }

  async findOne(id: string) {
    const existingBlog = await this.blogRepo.findOneBy({ id });
    if (!existingBlog) throw new BadRequestException('Blog not found');
    return existingBlog;
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    const existingBlog = await this.findOne(id);

    const coverImage = await getImageUrl(updateBlogDto.coverImage);

    Object.assign(existingBlog, {
      ...updateBlogDto,
      coverImage,
    });
    return await this.blogRepo.save(existingBlog);
  }

  async remove(id: string) {
    const existingBlog = await this.findOne(id);
    const deleted = await this.blogRepo.softRemove(existingBlog);
    if (!deleted) throw new BadRequestException('Failed to remove blog');
    return deleted;
  }

  async restore(id: string) {
    const blog = await this.blogRepo.restore({ id });

    if (!blog) throw new BadRequestException('Failed to restore blog');
    return blog;
  }

  // public getFileName(file: FileSystemStoredFile | string) {
  //   if (typeof file !== 'string') {
  //     const pathSegments = file?.path.split('\\');
  //     const fileName = pathSegments[pathSegments.length - 1];
  //     return fileName;
  //   } else return file;
  // }
}
