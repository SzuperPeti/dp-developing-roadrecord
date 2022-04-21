import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { catchError, EMPTY, Observable } from "rxjs";
import { Tax } from "../models/product/tax.interface";
import { TaxService } from "../services/tax.service";

@Injectable()
export class TaxListResolver implements Resolve<Tax[]> {
  constructor(private taxService: TaxService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Tax[]>{
    return this.taxService.getAllTax().pipe(
      catchError(() => {
        return EMPTY;
      })
    );
  }
}
