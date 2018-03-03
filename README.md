
### ngx-carousel-3d

## Consuming

## Dependencies

This library needs jquery

import jquery globally as per your type of your project.

## Consuming

#Option 1
clone this repo and run

```bash
$ ng serve
```

you should see something that looks like this at http://localhost:4200/

![alt text](docs/ngx-carousel-3d-output.jpg "ngx-carousel-3d in Action")
#Option 2

In you Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { NgxCarousel3dModule }  from 'ngx-carousel-3d';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxCarousel3dModule,  // Specify Ng2Carousel3dModule as an import
    LibraryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
</h1>
<ngx-carousel-3d [slides]="slides" [options]="options" class="col-12" #carousel>
    <ngx-carousel-3d-slide *ngFor="let slide of slides; let i = index" (click)="slideClicked(i)">
        <img class="slide-img" src="{{slide.src}}" alt=""/>
    </ngx-carousel-3d-slide>
</ngx-carousel-3d>
```

```typescript
 // app.component.ts
  @ViewChild('carousel') carousel:any;
  movies : Object[] = []
  slides : Array<Object> = []
  options : Object = {
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
}
  constructor(private $movie: MovieService) { //some service  in this case Movie

      $movie.getMovies(1).subscribe(res => {
        this.movies = this.movies.concat(res);
        let newSlides = new Array<object>()

        res.forEach((item) => {
          newSlides.push({src: item['poster_image']})
        })
        this.slides = newSlides.concat(this.slides)
      })

  }

  slideClicked (index) {
    this.carousel.slideClicked(index)
   }
```

```css
  .slide-img {
    width: 100%;
    height: 100%;
  }

```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Bruck Wubete](mailto:bruckwendwessenwubet@cmail.carleton.ca)
