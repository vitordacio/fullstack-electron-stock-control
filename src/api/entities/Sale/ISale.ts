export interface ISale {
  id: string;
  company_id: string;
  author_id: string;
  cash?: number;
  pix?: number;
  debit?: number;
  credit?: number;
  discount: number;
  change: number;
  received: number;
  subtotal: number;
  total: number;
}
