import { HttpClient } from './HttpClient';
import { Keyword } from '@/models';
import axios from 'axios';
import { SERVER_BASE_URL } from '@/infra';

class ReviewApi extends HttpClient {
  async write(params: {
    cafeId: number;
    visitPurpose: string;
    visitPurposeScore: number;
    foodInfos: {
      food: string;
      score: number;
    }[];
    keywords: number[];
    reviewImageIds: number[];
    description: string;
    finalScore: number;
  }) {
    const {
      cafeId,
      visitPurpose,
      visitPurposeScore,
      foodInfos,
      keywords,
      reviewImageIds,
      description,
      finalScore,
    } = params;
    const { data } = await this.http.post('/review', {
      cafeId,
      visitPurpose,
      visitPurposeScore,
      foodInfos,
      keywords,
      reviewImageIds,
      description,
      finalScore,
    });
  }

  async getKeywords(): Promise<Keyword[]> {
    const { data } = await this.http.get('/keywords');
    const keywords = data.body as Keyword[];

    return [...keywords];
  }

  async uploadImage(images: any) {
    const http = axios.create({
      baseURL: `${SERVER_BASE_URL}`,
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-access-token':
          'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0IiwiaWF0IjoxNjUzODA2MjMzLCJleHAiOjE2ODUzNDIyMzN9.nABjUXzSwU00J0MYaa6fgcXkwNW5r45Gb12izhBvL9Xs9jEsbz41xaYDW65Aok0WIfYR9exHd9vcOZVHjFW2lQ',
      },
      timeout: 60 * 1000,
    });
    const { data } = await http.post('/review/images', images);

    return data;
  }
}

export const reviewApi = new ReviewApi({});
