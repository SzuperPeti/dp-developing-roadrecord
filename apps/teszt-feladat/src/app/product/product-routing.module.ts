import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { unSaveChangeGuard } from '../shared/guards/unsaved-changes.guard';
import { ProductListResolver } from '../shared/resolvers/products.resolver';
import { TaxListResolver } from '../shared/resolvers/taxs.resolver';
import { EditProductComponent } from './components/edit-or-add-product/edit-or-add-product.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  { path: '', redirectTo: '/products/products-list', pathMatch: 'full' },
  {
    path: 'products-list',
    component: ProductsComponent,
    resolve: {
      productData: ProductListResolver,
      taxData: TaxListResolver
    },
  },
  { path: 'edit-product/:id', component: EditProductComponent, canDeactivate: [unSaveChangeGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
