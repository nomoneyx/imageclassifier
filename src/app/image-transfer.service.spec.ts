import { TestBed } from '@angular/core/testing';

import { ImageTransferService } from './image-transfer.service';

describe('ImageTransferService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageTransferService = TestBed.get(ImageTransferService);
    expect(service).toBeTruthy();
  });
});
