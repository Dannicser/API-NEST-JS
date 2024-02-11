export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

export class TopPageModel {
  firstCategory: TopLevelCategory;
  secondCategory: string;
  title: string;
  category: string; // по category будет подтягиваться сам Product
  hh?: {
    count: number;
    juniorSalary: number;
    middleSalary: number;
    seniorSalary: number;
  };
  advatages: {
    title: string;
    description: string;
  }[]; // массив объектов
  seoText: string;
  tagsTitle: string;
  tags: string[];
}
