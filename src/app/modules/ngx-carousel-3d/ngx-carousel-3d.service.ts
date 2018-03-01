import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
class Deferred<T> {

    promise: Promise<T>;
    resolve: (value?: T | PromiseLike<T>) => void;
    reject:  (reason?: any) => void;
    notify: (body?: any) => void;

    constructor() {
      this.promise = new Promise<T>((resolve, reject) => {
        this.resolve = resolve;
        this.reject  = reject;
      });
    }
}

export class NgxCarousel3dService {

  private state: any;
  private slides: any;

  private leftSlides: any;
  private rightSlides: any;
  private leftOutSlide: any;
  private rightOutSlide: any;
  private loadCount: any;
  private errorCount: any;
  private states: any;
  private total: any;
  private currentIndex: any;
  private lock: any;
  private loop: any;
  private clicking: any;
  private sourceProp: any;
  private visible: any;
  private perspective: any;
  private animationSpeed: any;
  private dir: any;
  private width: any;
  private height: any;
  private border: any;
  private space: any;
  private topSpace: any;
  private controls: any;
  private startSlide: any;
  private inverseScaling: any;
  private autoRotationSpeed: any;
  private deferred: any;
  private promise: any;
  private percent: BehaviorSubject<Object>;
  private imageLocation: BehaviorSubject<Object>;


  constructor(slides, params) {
    this.slides = slides || [];
    this.leftSlides = [];
    this.rightSlides = [];
    this.leftOutSlide = '';
    this.rightOutSlide = '';
    this.loadCount = 0;
    this.errorCount = 0;
    this.states = {
        PENDING: 1,
        LOADING: 2,
        RESOLVED: 3,
        REJECTED: 4
    };
    this.total = slides.length;
    this.currentIndex = 0;
    this.lock = false;

    this.loop = params.loop || false;
    this.clicking = params.clicking || false;
    this.sourceProp = params.sourceProp || '';
    this.visible = params.visible || 5;
    this.perspective = params.perspective || 35;
    this.animationSpeed = params.animationSpeed || 500;
    this.dir = params.dir || 'ltr';
    this.width = params.width || 360;
    this.height = params.height || 270;
    this.border = params.border || 0;
    this.space = params.space || 'auto';
    this.topSpace = params.topSpace || 'auto';
    this.controls = params.controls || false;
    this.startSlide = params.startSlide || 0;
    this.inverseScaling = params.inverseScaling || 300;
    this.autoRotationSpeed = params.autoRotationSpeed || 0;

    this.state = this.states.PENDING;
    this.deferred = new Deferred<boolean>();
    this.promise = this.deferred.promise;
    this.percent = new BehaviorSubject(new Object());
    this.imageLocation = new BehaviorSubject(new Object());
  }

// == Public  methods
// ========================================

build (model, params) {
    const carousel = this;

    return carousel.load().promise.then(function () {
        carousel.visible = (carousel.visible > carousel.total) ? carousel.total : carousel.visible;

        carousel.currentIndex = carousel.startSlide > carousel.total - 1 ? carousel.total - 1 : params.startSlide;

        try {
            if (carousel.visible !== 2) {
                carousel.visible = (carousel.visible % 2) ? carousel.visible : carousel.visible - 1;
            }

        } catch (error) {
            console.log(error);
        }

        return carousel;
    }, function(err) { return carousel; });

}

// == Private  methods
// ========================================

isInitiated() {
    return ( this.state !== this.states.PENDING );
}

isRejected() {
    return ( this.state === this.states.REJECTED );
}

isResolved() {
    return ( this.state === this.states.RESOLVED );
}

load() {

    if (this.isInitiated()) {
        return this;
    }
    this.state = this.states.LOADING;

    if (!this.sourceProp) {
        this.deferred.resolve(this);

    } else {
        for (let i = 0; i < this.total; i++) {
            this.loadImageLocation(this.slides[i]);
        }
    }
    return this;
}

handleImageError() {
    this.errorCount++;

    if (this.isRejected()) {
        return;
    }
    this.state = this.states.REJECTED;
    this.deferred.reject(this);
}

handleImageLoad(imageLocation) {
    this.loadCount++;

    if (this.isRejected()) {
        return;
    }

    this.percent.next(new Object( {percent: Math.ceil(this.loadCount / this.total * 100)}));
    this.imageLocation.next(imageLocation);

    if (this.loadCount === this.total) {
        this.state = this.states.RESOLVED;
        this.deferred.resolve(this);
    }
}

loadImageLocation(imageLocation) {
    const carousel = this;
    let image = new Image();

    image.onload = function (event) {
      carousel.handleImageLoad(event.target);
      image = event = null;
    };

    image.onerror = function (event) {
      carousel.handleImageError();
      image = event = null;

    };

    image.src = imageLocation[this.sourceProp];
}

getTotalNumber() {
    return this.total;
}

setStartSlide(index) {
    this.startSlide = (index < 0 || index > this.total) ? 0 : index;
}

setCurrentIndex(index) {
    return this.currentIndex = index;
}

getOuterWidth() {
    return parseInt(this.width + this.border, 10);
}

getOuterHeight() {
    return parseInt(this.height + this.border, 10);
}

setLock(value) {
    return this.lock = value;
}

getLock() {
    return this.lock;
}

getSlides() {
    return this.slides;
}

setSlides() {
    const num = Number(Math.floor(this.visible / 2) + 1);
    const dir = 'ltr';

    this.leftSlides = [];
    this.rightSlides = [];

    for (let m = 1; m < num; m++) {
        const eq1 = (this.dir === dir) ? (this.currentIndex + m) % (this.total) : (this.currentIndex - m) % (this.total),
            eq2 = (this.dir === dir) ? (this.currentIndex - m) % (this.total) : (this.currentIndex + m) % (this.total);

        this.leftSlides.push(eq1);
        this.rightSlides.push(eq2);
    }

    const rightOut = this.leftOutSlide = (this.currentIndex - num),
        leftOut = this.rightOutSlide = ((this.total - this.currentIndex - num) <= 0) ?
            (-(this.total - this.currentIndex - num)) : (this.currentIndex + num);

    if (this.dir === dir) {
        this.leftOutSlide = rightOut;
        this.rightOutSlide = leftOut;
    }

    return this.slides;
}

getVisibleSlidesIndex() {
    // Build an object containing each slide number in their apparition order (even the hidden ones)
    const visibleSlidesObj = {};
    let value = this.currentIndex;
    let key = Math.floor(this.total / 2);
    let count = 0;

    while (count !== this.total) {
        visibleSlidesObj[key % this.total] = value;
        key = ++key % this.total;
        value = ++value % this.total;
        count++;
    }

    // The object looks like an array so the values are sorted
    let visibleSlidesArr = Object.keys(visibleSlidesObj).map(k => visibleSlidesObj[k]);

    // Takes care of the direction
    if (this.dir === 'ltr') {
        visibleSlidesArr = visibleSlidesArr.reverse();
    }

    // Extracts only the visible slides
    const indexInTab = visibleSlidesArr.findIndex(val => val === this.currentIndex);
    return visibleSlidesArr.splice(indexInTab - Math.floor(this.visible / 2), this.visible);
}

isLastSlide() {
    return this.currentIndex === this.total - 1;
}

isFirstSlide() {
    return this.currentIndex === 0;
}

getSourceProp() {
    return this.sourceProp;
}

getPercent(): Observable<Object>  {
    return this.percent.asObservable();
}

getImageLocation() {
    return this.imageLocation.asObservable();
}

}
