import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class HostawayService {
  private readonly logger = new Logger(HostawayService.name);
  private readonly apiUrl = 'https://api/reviews/hostaway';

  async fetchReviews(): Promise<HostawayReview[]> {
    try {
      this.logger.log('Attempting to fetch reviews from Hostaway API...');
      const response = await axios.get<HostawayApiResponse>(this.apiUrl, {
        headers: {
          Authorization: `Bearer ${process.env.HOSTAWAY_API_KEY}`,
          'Account-Id': process.env.HOSTAWAY_ACCOUNT_ID,
        },
      });

      if (
        response.data &&
        response.data.result &&
        response.data.result.length > 0
      ) {
        this.logger.log(
          `Successfully fetched ${response.data.result.length} reviews from API.`,
        );
        return response.data.result;
      } else {
        this.logger.warn(
          'Hostaway API returned no reviews. Falling back to mock data.',
        );
        return this.getMockData();
      }
    } catch (error) {
      // safe access to error.message
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(
        `Failed to fetch from Hostaway API: ${errorMessage}. Falling back to mock data.`,
      );
      return this.getMockData();
    }
  }

  private getMockData(): HostawayReview[] {
    const mockPath = path.join(
      process.cwd(),
      'src',
      'mock',
      'hostaway-reviews.json',
    );
    try {
      const data = fs.readFileSync(mockPath, 'utf8');
      const json = JSON.parse(data) as HostawayApiResponse;
      this.logger.log(`Loaded ${json.result.length} reviews from mock file.`);
      return json.result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Failed to load mock data: ${errorMessage}`);
      return [];
    }
  }
}

export interface ReviewCategory {
  category: string;
  rating: number;
}

export interface HostawayReview {
  id: number;
  type: string;
  status: string;
  rating: number | null;
  publicReview: string;
  reviewCategory: ReviewCategory[];
  submittedAt: string;
  guestName: string;
  listingName: string;
}

export interface HostawayApiResponse {
  status: string;
  result: HostawayReview[];
}
