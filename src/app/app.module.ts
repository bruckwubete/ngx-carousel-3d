import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NgxCarousel3dModule } from './modules/ngx-carousel-3d/ngx-carousel-3d.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxCarousel3dModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
