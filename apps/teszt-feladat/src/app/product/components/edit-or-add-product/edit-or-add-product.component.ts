import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable, of, switchMap } from 'rxjs';
import { ComponentCanDeactivate } from '../../../shared/guards/unsaved-changes.guard';
import { Product } from '../../../shared/models/product/product.interface';
import { Tax } from '../../../shared/models/product/tax.interface';
import { ProductService } from '../../../shared/services/product.service';
import { TaxService } from '../../../shared/services/tax.service';
import { UnsavedChangeWarningModalComponent } from '../unsaved-change-warning-modal/unsaved-change-warning-modal.component';

@Component({
  selector: 'dp-developing-edit-product',
  templateUrl: './edit-or-add-product.component.html',
  styleUrls: ['./edit-or-add-product.component.scss'],
})
export class EditProductComponent implements OnInit, ComponentCanDeactivate {
  product: Product | null;
  productId: number;
  tax: Tax[];
  productForm: FormGroup;
  hasUnsavedData = false;
  isSubmitting = false;

  constructor(
    private productService: ProductService,
    private taxService: TaxService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = +this.route.snapshot.params.id;
    this.initForm();

    //Szerkesztés
    if (this.productId !== 0) {
      forkJoin([
        this.productService.getProductById(this.productId),
        this.taxService.getAllTax(),
      ]).subscribe((response) => {
        this.tax = response[1];
        this.product = response[0];
        this.productForm.patchValue(this.product);
        const percent = this.tax.find((tax) => tax.id === this.product?.taxId)?.percent;
        const grossPrice = this.product.net_price + this.product.net_price * (percent ?? 0) / 100;
        this.productForm.get('gross_price')?.patchValue(grossPrice);
        this.subscribeFormValueChanges();
      });
      //új hozzáadása
    } else {
      this.subscribeFormValueChanges();
      this.taxService.getAllTax().subscribe((response) => {
        this.tax = response;
      });

      this.productForm.get('taxId')?.valueChanges.subscribe((tax) => {
        if (!tax) {
          return;
        }
        this.productForm.get('net_price')?.enable();
        this.productForm.get('gross_price')?.enable();
      });
    }
  }

  initForm() {
    this.productForm = new FormGroup({
      id: new FormControl(this.productId, Validators.required),
      name: new FormControl('', Validators.required),
      net_price: new FormControl(
        { value: null, disabled: this.productId === 0 },
        Validators.required
      ),
      gross_price: new FormControl(
        { value: null, disabled: this.productId === 0 },
        Validators.required
      ),
      taxId: new FormControl(null, Validators.required),
    });
  }

  submit() {
    this.isSubmitting = true;
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const productToSave: Product = {
      id: this.productId,
      name: this.productForm.get('name')?.value,
      net_price: this.productForm.get('net_price')?.value,
      taxId: this.productForm.get('taxId')?.value,
    };

    if (this.productId === 0) {
      this.productService.postSaveProduct(productToSave).subscribe(
        () => {
          this.router.navigate(['/products', 'products-list']);
        },
        () => {
          this.isSubmitting = false;
        }
      );
    } else {
      this.productService.putSaveProduct(productToSave).subscribe(
        () => {
          this.router.navigate(['/products', 'products-list']);
        },
        () => {
          this.isSubmitting = false;
        }
      );
    }
  }

  backToProductTablePage() {
    this.router.navigate(['/products', 'products-list']);
  }

  subscribeFormValueChanges() {
    const form = this.productForm;
    const initialValue = form.value;
    form.valueChanges.subscribe(() => {
      this.hasUnsavedData = Object.keys(initialValue).some(
        (key) => form.value[key] != initialValue[key]
      );
    });


    this.productForm.get('net_price')?.valueChanges.subscribe((value) => {
      const percent = this.tax.find((tax) => tax.id === this.productForm.get('taxId')?.value)?.percent;
      if (percent) {
        const netPrice = value * (1 + percent / 100);
        this.productForm.get('gross_price')?.setValue(netPrice, { emitEvent: false });
      }
    });


    this.productForm.get('gross_price')?.valueChanges.subscribe((value) => {
      const percent = this.tax.find((tax) => tax.id === this.productForm.get('taxId')?.value)?.percent;
      if (percent) {
        const netPrice = value / (1 + percent / 100);
        this.productForm.get('net_price')?.setValue(netPrice, { emitEvent: false });
      }
    });
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.hasUnsavedData && !this.isSubmitting) {
      const dialogRef = this.dialog.open(UnsavedChangeWarningModalComponent);
      return dialogRef.afterClosed();
    } else {
      return of(true);
    }
  }
}
