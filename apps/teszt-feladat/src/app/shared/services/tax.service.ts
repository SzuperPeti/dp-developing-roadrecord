import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "../../../environments/environment";
import { Tax } from "../models/product/tax.interface";

@Injectable()
export class TaxService {


  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllTax(): Observable<Tax[]> {
    return this.http.get<Tax[]>(`${this.baseUrl}/taxs`)
  }
}
