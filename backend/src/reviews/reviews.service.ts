import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HostawayService, ReviewCategory } from './hostaway/hostaway.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReviewsService implements OnModuleInit {
  private readonly logger = new Logger(ReviewsService.name);

  constructor(
    private prisma: PrismaService,
    private hostawayService: HostawayService,
  ) {}

  async onModuleInit() {
    await this.seedReviews();
  }

  async seedReviews() {
    this.logger.log('Checking for existing reviews...');
    const count = await this.prisma.review.count();
    if (count === 0) {
      this.logger.log('No reviews found in DB. Fetching from Hostaway...');
      const reviews = await this.hostawayService.fetchReviews();

      await Promise.all(
        reviews.map(async (review) => {
          // Average rating calculation if rating is null
          let rating = review.rating;
          if (!rating && review.reviewCategory) {
            const categories = review.reviewCategory;
            const sum = categories.reduce(
              (acc: number, curr: ReviewCategory) => acc + (curr.rating || 0),
              0,
            );
            rating = categories.length
              ? parseFloat((sum / categories.length).toFixed(1))
              : 0;
          }

          await this.prisma.review.upsert({
            where: { id: review.id },
            create: {
              id: review.id,
              listingName: review.listingName,
              guestName: review.guestName,
              content: review.publicReview,
              rating: rating,
              categories: (review.reviewCategory ||
                []) as unknown as Prisma.InputJsonArray,
              submittedAt: new Date(review.submittedAt),
              type: review.type,
              isPublic: false,
            },
            update: {},
          });
        }),
      );
      this.logger.log(`Seeded ${reviews.length} reviews into database.`);
    } else {
      this.logger.log(`Database already has ${count} reviews. Skipping seed.`);
    }
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ReviewWhereUniqueInput;
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.review.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async update(params: {
    where: Prisma.ReviewWhereUniqueInput;
    data: Prisma.ReviewUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.review.update({
      data,
      where,
    });
  }

  async count(where: Prisma.ReviewWhereInput) {
    return this.prisma.review.count({ where });
  }
}
