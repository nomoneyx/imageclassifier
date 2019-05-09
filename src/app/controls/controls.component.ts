import { Component, OnInit } from '@angular/core';
import {ImageTransferService} from '../image-transfer.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
  animations: [
    trigger('enterTrigger', [
      state('fadeIn', style({
        opacity: '1'
      })),
      transition('void => *', [style({opacity: '0'}), animate('500ms')])
    ])
  ]
})
export class ControlsComponent implements OnInit {
  selectedImages: FileList;
  previewImage: File;
  currentImageUpload: File;
  fileName = '';
  progress: { percentage: number } = { percentage: 0 };
  showFileList = false;
  classifierResult = '';
  showProgress = false;
  switchDiv = 'result';
  constructor(private imageTransfer: ImageTransferService, private router: Router) { }

  ngOnInit() {
  }

  fileList( enable: boolean) {
    this.classifierResult = '';
    this.showFileList = enable;
    this.imageTransfer.setShowFileList(enable);
    this.progress.percentage = 0;
    if (enable) {
      this.router.navigate(['/', 'imageList']);
    } else {
      this.router.navigate(['/', 'imageUpload']);
    }
  }

  resetDisplay() {
    this.router.navigate(['/', 'imageUpload']);
    this.fileName = '';
    this.classifierResult = '';
    this.showFileList = false;
    this.imageTransfer.setPreviewImage(null);
    // this.previewImage = undefined;
    this.progress.percentage = 0;
  }

  public imagePreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader: FileReader = new FileReader();
      reader.onload = (event: any) => {
        this.previewImage = event.target.result;
        this.imageTransfer.setPreviewImage(event.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  selectImage(event) {
    this.selectedImages = event.target.files;
    this.fileName = event.target.files[0].name;
    this.imagePreview(event);
  }
  upload() {
    // this.showProgress = true;
    this.switchDiv = 'progress';
    this.progress.percentage = 0;
    this.currentImageUpload = this.selectedImages.item(0);
    this.imageTransfer.saveImage(this.currentImageUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File upload complete');
        // this.showProgress = false;
        this.switchDiv = 'result';
        this.classifierResult = event.body.toString();
      }
    });
    this.selectedImages = undefined;
    this.currentImageUpload = undefined;
  }

}
