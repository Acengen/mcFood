import { Ingredient } from './shopping.model';

export class Product {
  public name: string;
  public description: string;
  public imgFile: string;
  public ingredient: Ingredient[];
  public price: number;

  constructor(
    name: string,
    desc: string,
    imgFile: string,
    ingredient: Ingredient[],
    price: number
  ) {
    this.name = name;
    this.description = desc;
    this.imgFile = imgFile;
    this.ingredient = ingredient;
    this.price = price;
  }
}
