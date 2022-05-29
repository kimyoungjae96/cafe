export interface IPurposeOfVisit extends Option {}

export interface IEatingMenu extends Option {}

interface Option {
  key: string;
  description: string;
  question: string;
  score: number;
  defaultImage: string;
  selectedImage: string;
}

export interface Keyword {
  keyword: string;
  emoji: string;
}
