import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { HostawayService } from './hostaway/hostaway.service';
import { PrismaModule } from '../prisma/prisma.module';
import { GoogleReviewsService } from './google-reviews/google-reviews.service';

@Module({
  imports: [PrismaModule],
  controllers: [ReviewsController],
  providers: [ReviewsService, HostawayService, GoogleReviewsService],
})
export class ReviewsModule {}
