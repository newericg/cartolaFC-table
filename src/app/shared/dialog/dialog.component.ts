import { Component } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  displayedColumns: string[] = ['Emblema', 'Nome', 'Add'];

  getTeam(index: any) {
    this.data.team = this.data.data[index]
    this.dialogRef.close(this.data); 
  }
}
