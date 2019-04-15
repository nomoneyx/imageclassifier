import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ImageTransferService} from '../image-transfer.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  showImage = false;
  imageUploads: Observable<string[]>;

  constructor(private imageTransfer: ImageTransferService) { }

  ngOnInit() {
  }
  showImages(enable: boolean) {
    this.showImage = enable;
    if (enable) {
      this.imageUploads = this.imageTransfer.getAllImages();
    }
  }

}
