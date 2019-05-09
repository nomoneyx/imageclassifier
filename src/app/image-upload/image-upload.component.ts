import {Component, OnInit} from '@angular/core';
import {ImageTransferService} from '../image-transfer.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  previewImage: File;

  constructor(private imageTransfer: ImageTransferService) {
    this.imageTransfer.previewImage$.subscribe(data => {this.previewImage = data; });
  }
  ngOnInit() {
  }
}
