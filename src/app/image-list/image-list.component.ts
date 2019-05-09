import { Component, OnInit } from '@angular/core';
import {ImageTransferService} from '../image-transfer.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  showImage = false;
  imageUpload: Array<any>;
  imageIndex: number;

  constructor(private imageTransfer: ImageTransferService) {
    this.imageTransfer.showFileList$.subscribe(data => {this.showImage = data; });
    this.imageTransfer.imageUploads$.subscribe(data => {this.imageUpload = data; });
  }

  ngOnInit() {
  }

}
