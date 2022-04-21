import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { catchError, EMPTY, Observable } from "rxjs";
import { Product } from "../models/product/product.interface";
import { ProductService } from "../services/product.service";

@Injectable()
export class ProductListResolver implements Resolve<Product[]> {
  constructor(private productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]>{
    return this.productService.getAllProduct().pipe(
      catchError(() => {
        return EMPTY;
      })
    );
  }
}
