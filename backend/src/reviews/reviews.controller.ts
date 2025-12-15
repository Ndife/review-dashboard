import {
  Controller,
  Get,
  Query,
  Patch,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Prisma } from '@prisma/client';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  async findAll(
    @Query('page') page?: string,
    @Query('rating') rating?: string,
    @Query('sort')
    sort?: 'date_asc' | 'date_desc' | 'rating_asc' | 'rating_desc',
    @Query('publicOnly') publicOnly?: string,
  ) {
    const take = 20;
    const skip = page ? (parseInt(page) - 1) * take : 0;

    const where: Prisma.ReviewWhereInput = {};
    if (rating) {
      where.rating = { gte: parseFloat(rating) };
    }
    if (publicOnly === 'true') {
      where.isPublic = true;
    }

    let orderBy: Prisma.ReviewOrderByWithRelationInput = {
      submittedAt: 'desc',
    };
    if (sort) {
      switch (sort) {
        case 'date_asc':
          orderBy = { submittedAt: 'asc' };
          break;
        case 'date_desc':
          orderBy = { submittedAt: 'desc' };
          break;
        case 'rating_asc':
          orderBy = { rating: 'asc' };
          break;
        case 'rating_desc':
          orderBy = { rating: 'desc' };
          break;
      }
    }

    const [data, total] = await Promise.all([
      this.reviewsService.findAll({ skip, take, where, orderBy }),
      this.reviewsService.count(where),
    ]);

    return {
      data,
      meta: {
        total,
        page: page ? parseInt(page) : 1,
        lastPage: Math.ceil(total / take),
      },
    };
  }

  @Patch(':id')
  async updateVisibility(
    @Param('id', ParseIntPipe) id: number,
    @Body('isPublic') isPublic: boolean,
  ) {
    return this.reviewsService.update({
      where: { id },
      data: { isPublic },
    });
  }
}
