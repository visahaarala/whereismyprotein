export type Food = {
  id: number;
  name: string;
  scientific?: string;
  // igclass: string;
  igclassp: string;
  // process: string;
  raw: boolean; // NEW = käsittelemätön tai tuore
  energy: number; // kj
  fat: number; // g
  sugar: number; // g
  protein: number; // g
  starch: number; // g
  fiber: number; // g
};
