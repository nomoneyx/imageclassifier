import {Component, OnInit} from '@angular/core';
import {ImageTransferService} from '../image-transfer.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  selectedImages: FileList;
  previewImage: File;
  currentImageUpload: File;
  fileName = '';
  progress: { percentage: number } = { percentage: 0 };

  constructor(private imageTransfer: ImageTransferService) { }

  ngOnInit() {
  }

  resetDisplay() {
    this.fileName = '';
    this.previewImage = undefined;
    this.progress.percentage = 0;
  }

  public imagePreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.previewImage = event.target.result;
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
    this.progress.percentage = 0;
    this.currentImageUpload = this.selectedImages.item(0);
    this.imageTransfer.saveImage(this.currentImageUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File upload complete');
      }
    });
    this.selectedImages = undefined;
    this.currentImageUpload = undefined;
  }

}
