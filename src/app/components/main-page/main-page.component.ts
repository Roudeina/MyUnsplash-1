import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AddPhotoDialogComponent } from '../add-photo-dialog/add-photo-dialog.component';
import { Subscription } from 'rxjs';
import { ShareDataService } from '../../services/share-data.service';
import { HttpClient } from '@angular/common/http';
import { DeletePhotoDialogComponent } from '../delete-photo-dialog/delete-photo-dialog.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  file: any;
  subscription?: Subscription;
  label: string = '';
  photos: any;
  searchText: string = '';
  hovred = false;
  show: { [key: number]: boolean } = {};
  labelTodelete: { [key: string]: string } = {};

  constructor(
    public http: HttpClient,
    public dialog: MatDialog,
    private shareDataService: ShareDataService
  ) {}

  ngOnInit(): void {
    this.subscription = this.shareDataService.currentFile.subscribe(
      (newFile) => (this.file = newFile)
    );

    this.getPhotos();
  }
  getPhotos(): void {
    this.http.get('https://myunsplash-back.herokuapp.com/getImg').subscribe(
      (data:[]) => {
        this.photos = data.reverse();
      },
      (error) => {
        console.log('error!:', error);
      }
    );
  }

  onHover(event: any, index: number) {
    this.hovred = true;
    this.show[index] = true;
  }

  onDisHover(event: any, index: number) {
    this.hovred = false;
    this.show[index] = false;
  }

  onClick(index: number) {
    this.labelTodelete['label'] = this.photos[index].label;
    this.openDialogDelete();
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(AddPhotoDialogComponent, {
      height: '400px',
      width: '290px',
      data: { label: this.label, file: this.file },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.label = result[0].label;
        this.shareDataService
          .sendImage(this.file, this.label)
          .subscribe((res: any) => {
            window.location.reload();
          });
      }
    });
  }

  openDialogDelete(): void {
    let dialogRef = this.dialog.open(DeletePhotoDialogComponent, {
      height: '350px',
      width: '250px',
      data: this.labelTodelete,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {


        if (result[0].label === this.labelTodelete.labelToDelete) {
          this.http
            .post('https://myunsplash-back.herokuapp.com/deleteImgs', this.labelTodelete, {
              responseType: 'text',
            })
            .subscribe(
              (response) => {
                window.location.reload();
              },
              (err) => console.log('error on sending the request ang!', err)
            );
        } else if (result[0].label !== result[0].labelTodelete) {
          alert('label dont match');
        }
      }
    });
  }
}
