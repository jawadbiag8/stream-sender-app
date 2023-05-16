import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ScreenSharingComponent } from './screen-sharing/screen-sharing.component';
import { StreamComponentComponent } from './stream-component/stream-component.component';

@NgModule({
  declarations: [
    AppComponent,
    ScreenSharingComponent,
    StreamComponentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
