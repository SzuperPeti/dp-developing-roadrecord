import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from '../../../shared/models/product/product.interface';
import { Tax } from '../../../shared/models/product/tax.interface';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'dp-developing-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'net_price', 'VAT', 'edit'];
  dataSource = new MatTableDataSource<Product>();
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productService.products$
      .pipe(takeUntil(this.destroy$))
      .subscribe((list) => {
        this.dataSource.data = list;
      });

    this.activatedRoute.data
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        result.productData.map((product: Product) => {
          product.tax = result.taxData.find((tax: Tax) => tax.id === product.taxId)
        })
        this.productService.setProductDataSource(result.productData);
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
