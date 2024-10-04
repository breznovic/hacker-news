export type NewsItemType = {
  id: number;
  title: string;
  by: string;
  score: number;
  url: string;
  time: number;
  kids: string[];
};

export type Comment = {
  id: number;
  text: string;
  by: string;
  time: number;
  kids?: string[];
  nested?: Comment[];
};
