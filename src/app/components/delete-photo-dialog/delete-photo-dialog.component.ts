import {Component, Inject, OnInit,ElementRef,  ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MainPageComponent} from '../main-page/main-page.component';

@Component({
  selector: 'app-delete-photo-dialog',
  templateUrl: './delete-photo-dialog.component.html',
  styleUrls: ['./delete-photo-dialog.component.css']
})
export class DeletePhotoDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MainPageComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  upload():void{
    
  }
}
