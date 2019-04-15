import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageTransferService {

  constructor(private http: HttpClient) { }

  saveImage(file: File): Observable<HttpEvent<{}>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', 'http://localhost:8080/image/upload', formData, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }
  getAllImages(): Observable<any> {
    return this.http.get('http://localhost:8080/image/all');
  }
  getImageById(long, id): Observable<any> {
    return this.http.get('http://localhost:8080/image/' + id);
  }
}
