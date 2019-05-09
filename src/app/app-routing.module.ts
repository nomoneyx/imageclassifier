import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ImageListComponent} from './image-list/image-list.component';
import {ImageUploadComponent} from './image-upload/image-upload.component';

const routes: Routes = [
  {path: '', redirectTo: '/imageList', pathMatch: 'full'},
  {path: 'imageList', component: ImageListComponent},
  {path: 'imageUpload', component: ImageUploadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
