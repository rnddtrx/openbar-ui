import { IngredientDto } from "./ingredient-dto";

export interface QuantityDto {
  id: string; // UUID is represented as a string in TypeScript
  quantity: number;
  unit: string;
  ingredient: IngredientDto;
}