import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ScreenSharingComponent } from './screen-sharing/screen-sharing.component';
import { StreamComponentComponent } from './stream-component/stream-component.component';
const routes: Routes = [
  { path: '', component: ScreenSharingComponent },
  { path: 'streem', component: StreamComponentComponent }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
