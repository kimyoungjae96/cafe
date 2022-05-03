export interface IPurposeOfVisit extends Option {}

export interface IEatingMenu extends Option {}

interface Option {
  key: string;
  description: string;
  question: string;
  score: number;
}
