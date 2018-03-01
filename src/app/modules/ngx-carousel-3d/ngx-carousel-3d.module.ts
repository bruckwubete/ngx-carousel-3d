import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCarousel3dComponent } from './ngx-carousel-3d.component';
import { NgxCarousel3dSlideComponent } from './ngx-carousel-3d-slide/ngx-carousel-3d-slide.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgxCarousel3dComponent,
    NgxCarousel3dSlideComponent
  ],
  exports: [
    NgxCarousel3dComponent,
    NgxCarousel3dSlideComponent
  ]
})
export class NgxCarousel3dModule {
}
