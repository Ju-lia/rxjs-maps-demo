import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { from, fromEvent, interval, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
})
export class MapComponent {
  mapDocs =
    'http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-map';

  image = '/assets/images/map.png';

  example1 = `// (0 1 2 |)
from([0, 1, 2])
  .pipe(
    tap(console.log),
    map(x => 10 + x)
  )
  .subscribe(output => console.log('=>', output), () => console.error('error'), () => console.log('completed'));`;

  run1(): void {
    from([0, 1, 2])
      .pipe(
        tap(console.log),
        map(x => 10 + x),
      )
      .subscribe(
        output => console.log('=>', output),
        () => console.error('error'),
        () => console.log('completed'),
      );
  }

  example2 = `// 0 - 1 - (2|)
interval(1000)
  .pipe(
    take(3),
    tap(console.log),
    map(x => 10 + x)
  )
  .subscribe(output => console.log('=>', output), () => console.error('error'), () => console.log('completed'));`;

  run2(): void {
    interval(1000)
      .pipe(
        take(3),
        tap(console.log),
        map(x => 10 + x),
      )
      .subscribe(
        output => console.log('=>', output),
        () => console.error('error'),
        () => console.log('completed'),
      );
  }

  example3 = `const click$ = fromEvent(button, 'click');
click$.pipe(
    map((e: MouseEvent) => Math.floor(e.timeStamp) % 5000),
    tap(console.log),
  )
  .subscribe(value => {
    this.http.search(value).subscribe(response => {
      this.imageUrl1 = response.thumbnailUrl;
    });
  );`;

  example4 = `this.searchControl.valueChanges.pipe(map(x => x + 1)).subscribe(value => {
  this.http.search(value).subscribe(response => {
    this.imageUrl2 = response.thumbnailUrl;
  });
});`;

  examples = new Map<string, () => void>();
  searchControl = new FormControl();
  imageUrl1 = '';
  imageUrl2 = '';

  @ViewChild('mapButton') refreshBtn: MatButton | undefined;

  ngAfterViewInit() {
    if (this.refreshBtn !== undefined) {
      const click$: Observable<MouseEvent> = fromEvent(
        this.refreshBtn._elementRef.nativeElement,
        'click',
      );
      click$
        .pipe(
          map((e: MouseEvent) => Math.floor(e.timeStamp) % 5000),
          tap(console.log),
        )
        .subscribe(value => {
          this.http.search(value).subscribe(response => {
            this.imageUrl1 = response.thumbnailUrl;
          });
        });
    }
  }

  constructor(private readonly http: HttpService) {
    this.searchControl.valueChanges.pipe(map(x => x + 1)).subscribe(value => {
      this.http.search(value).subscribe(response => {
        this.imageUrl2 = response.thumbnailUrl;
      });
    });
    this.examples.set(this.example1, this.run1);
    this.examples.set(this.example2, this.run2);
  }
}
