import { HttpClient } from './HttpClient';
import { Keyword } from '@/models';

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
}

export const reviewApi = new ReviewApi({});
