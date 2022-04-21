import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, filter, Observable } from "rxjs";
import { environment } from '../../../environments/environment';
import { Product } from "../models/product/product.interface";

@Injectable()
export class ProductService {


  baseUrl = environment.apiUrl;

  readonly _products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public products$ = this._products.asObservable().pipe(filter((x) => x != null));

  constructor(private http: HttpClient) {}


  setProductDataSource(products: Product[]) {
    this._products.next(products);
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`)
  }

  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  putSaveProduct(productToSave: Product) {
    return this.http.put(`${this.baseUrl}/products/${productToSave.id}`, productToSave);
  }

  postSaveProduct(productToSave: Product) {
    return this.http.post(`${this.baseUrl}/products`, productToSave);
  }
}
