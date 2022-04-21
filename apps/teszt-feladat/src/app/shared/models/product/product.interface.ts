import { Tax } from "./tax.interface";

export interface Product {
  id: number;
  name: string;
  net_price: number;
  taxId: number;
  tax?: Tax | undefined;
}
