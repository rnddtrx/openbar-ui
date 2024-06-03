import { QuantityDto } from "./quantity-dto";
import { StepDto } from "./step-dto";


export interface RecipeDto {
  id: string; // UUID is represented as a string in TypeScript
  name: string;
  description: string;
  image: string;
  quantities: QuantityDto[];
  steps: StepDto[];
}