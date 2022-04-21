import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dp-developing-unsaved-change-warning-modal',
  templateUrl: './unsaved-change-warning-modal.component.html',
  styleUrls: ['./unsaved-change-warning-modal.component.scss'],
})
export class UnsavedChangeWarningModalComponent {
  constructor(private dialogRef: MatDialogRef<UnsavedChangeWarningModalComponent>) {}

  yes() {
    this.dialogRef.close(true);
  }

  no() {
    this.dialogRef.close(false);
  }
}
