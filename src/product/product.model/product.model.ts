export class ProductModel {
  _id: string;
  image: string;
  title: string;
  price: number;
  oldPrice: number;
  credit: number;
  calculatedRating: number;
  description: string;
  advantages: string;
  disAdvantages: string;
  categoties: string[];
  tags: string[];
  characteristics: {
    [key: string]: string;
  };
}

//6.04
