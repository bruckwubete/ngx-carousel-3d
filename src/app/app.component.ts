import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  @ViewChild('carousel') carousel: any;

  slides: Array<Object> = [
    {'src': './assets/img/dog_1.jpg'},
    {'src': './assets/img/dog_2.jpeg'},
    {'src': './assets/img/dog_3.jpg'},
    {'src': './assets/img/dog_4.jpg'},
    {'src': './assets/img/dog_5.jpg'},
    {'src': './assets/img/dog_6.jpg'},
    {'src': './assets/img/dog_7.jpg'}
  ];

  options: Object = {
    clicking: true,
    sourceProp: 'src',
    visible: 7,
    perspective: 1,
    startSlide: 0,
    border: 3,
    dir: 'ltr',
    width: 360,
    height: 270,
    space: 220,
    autoRotationSpeed: 5000,
    loop: true
 };

 slideClicked (index) {
  this.carousel.slideClicked(index);
 }
}
