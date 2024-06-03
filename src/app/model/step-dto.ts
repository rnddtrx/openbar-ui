export interface StepDto {
    id: string;
    description: string;
    firstStep: boolean;
    lastStep: boolean;
    nextStep: StepDto | null;
  }