import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ShareDataService {


  private fileSource = new BehaviorSubject(null);
  currentFile = this.fileSource.asObservable();

 

  constructor(private httpClient: HttpClient) { }

  changeFile(file: any) {
    this.fileSource.next(file)
  }

  sendImage(image: string, label:string) {
    return this.httpClient.post('https://myunsplash-back.herokuapp.com/uploadImgs', {image:image,label:label});
  }
}
