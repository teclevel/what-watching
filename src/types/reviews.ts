export type Review = {
  comment: string
  date: string
  id: number
  rating: number
  user: {
    id: number
    name: string
  }
};

export type Reviews = Review[];

export type Comment = {
  id?: string;
  comment: string;
  rating: number;
};
