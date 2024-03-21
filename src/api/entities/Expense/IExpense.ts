export interface IExpense {
  id: string;
  name: string;
  description?: string;
  total: number;
  tags: string[];
}
