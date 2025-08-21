export class GetReviewDto {
    id: string;
    rating: number;
    comment?: string;
    createdAt: Date;
  
    // Simplified user information
    user: {
      id: string;
      username: string;
      email: string;
    };
  
    // Simplified game information
    game: {
      id: string;
      productName: string;
    };
  }
  