import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent implements OnInit {
  @Input() imageUpload: string;

  constructor() { }

  ngOnInit() {
  }

}
