import {Component, Inject, OnInit,ElementRef,  ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MainPageComponent} from '../main-page/main-page.component';
import { ShareDataService } from '../../services/share-data.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-add-photo-dialog',
  templateUrl: './add-photo-dialog.component.html',
  styleUrls: ['./add-photo-dialog.component.css']
})
export class AddPhotoDialogComponent implements OnInit {
  @ViewChild("fileInput")
  fileInput!: ElementRef;
  file:any;
  subscription?: Subscription;

  
  Image?: File;
  valid: boolean = false;

  constructor(public dialogRef: MatDialogRef<MainPageComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private dataService: ShareDataService)
    { };
    labelPhoto:{[key:string]:any}={}
    onNoClick(): void {
      this.dialogRef.close();
    }
    onFileChange(event:any) {
      if (event.target.files){
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0])
        reader.onload = (event : any) => {
          this.Image = event.target.result
        }
      }
    };

  //   refresh(): void {
  //     window.location.reload();
  // }

    newMessage() {
      this.dataService.changeFile(this.Image)
      console.log("this file on click ",this.file)
    }

  ngOnInit(): void {
    this.subscription = this.dataService.currentFile.subscribe(newFile => this.file = newFile)
  }

}
