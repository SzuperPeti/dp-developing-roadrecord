import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

import { ProductRoutingModule } from './product-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { ProductService } from '../shared/services/product.service';
import { ProductListResolver } from '../shared/resolvers/products.resolver';
import { EditProductComponent } from './components/edit-or-add-product/edit-or-add-product.component';
import { TaxService } from '../shared/services/tax.service';
import { TaxListResolver } from '../shared/resolvers/taxs.resolver';
import { unSaveChangeGuard } from '../shared/guards/unsaved-changes.guard';
import { UnsavedChangeWarningModalComponent } from './components/unsaved-change-warning-modal/unsaved-change-warning-modal.component';

@NgModule({
  declarations: [
    ProductsComponent,
    EditProductComponent,
    UnsavedChangeWarningModalComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatDialogModule,
  ],
  providers: [
    ProductService,
    ProductListResolver,
    TaxService,
    TaxListResolver,
    unSaveChangeGuard,
  ],
})
export class ProductModule {}
