import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageTransferService {
  private showFileList = new BehaviorSubject<boolean>(false);
  showFileList$ = this.showFileList.asObservable();
  private imageUploads = new BehaviorSubject<Array<any>>(null);
  imageUploads$  = this.imageUploads.asObservable();
  private previewImage = new BehaviorSubject<File>(null);
  previewImage$ = this.previewImage.asObservable();
  private classifierResult = new BehaviorSubject<string>(null);
  classifierResult$ = this.classifierResult.asObservable();
  constructor(private http: HttpClient) { }

  saveImage(file: File): Observable<HttpEvent<{}>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    // const req = new HttpRequest('POST', 'https://imageclassifierserver-funny-bandicoot.apps.pcf.pcfhost.com/image/upload', formData, {
    const req = new HttpRequest('POST', 'http://localhost:8080/image/upload', formData, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  // saveImage(file: File): Observable<HttpEvent<{}>> {
  //   const formData: FormData = new FormData();
  //   formData.append('file', file);
  //   // return this.http.post('https://imageclassifierserver-funny-bandicoot.apps.pcf.pcfhost.com/image/upload'
  //   //                        , formData) as Observable<any[]>;
  //   const req = this.http.post('http://localhost:8080/image/upload', formData) as Observable<HttpEvent<{}>>;
  //   return req;
  // }

  // saveImage(file: File): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('file', file);
  //   // const req = new HttpRequest('POST', 'http://localhost:8080/image/upload', formData, {
  //   //   reportProgress: true,
  //   //   responseType: 'text'
  //   // });
  //   // return this.http.request(req);
  //   return this.http.post('http://localhost:8080/image/upload', formData);
  // }

  getAllImages(): Observable<any> {
    return this.http.get('http://localhost:8080/image/all');
    // return this.http.get('https://imageclassifierserver-funny-bandicoot.apps.pcf.pcfhost.com/image/all');
  }
  getImageById(long, id): Observable<any> {
    return this.http.get('http://localhost:8080/image/' + id);
    // return this.http.get('https://imageclassifierserver-funny-bandicoot.apps.pcf.pcfhost.com/image/' + id);
  }

  setShowFileList(enable) {
    this.showFileList.next(enable);
    if (enable) {
      this.getAllImages().subscribe(data => this.setImageUploads(data));
    }
  }

  setClassifierResult(result) {
    this.classifierResult.next(result);
  }

  setImageUploads(imageData) {
    this.imageUploads.next(imageData);
  }

  setPreviewImage(file) {
    this.previewImage.next(file);
  }

}
