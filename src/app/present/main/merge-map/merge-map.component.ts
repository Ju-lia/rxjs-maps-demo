import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { fromEvent, interval, Observable } from 'rxjs';
import { filter, map, mergeMap, take, tap } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-merge-map',
  templateUrl: './merge-map.component.html',
})
export class MergeMapComponent {
  mapDocs =
    'http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeMap';

  image = '/assets/images/mergeMap.png';

  example1 = `// 1 - 3 - (5|)
const httpReq = (i: number) => interval(1000).pipe(
    map(() => 10 * i),
    tap(x => console.log(\`($\{i}, $\{x})\`)),
    take(3),
  );
interval(800).pipe(
    map(x => x + 1),
    filter(x => x % 2 === 1),
    take(3),
    mergeMap(httpReq),
  )
  .subscribe(output => console.log('=>', output), () => console.error('error'), () => console.log('completed'));`;

  run1(): void {
    const httpReq = (i: number) =>
      interval(1000).pipe(
        map(() => 10 * i),
        tap(x => console.log(`(${i}, ${x})`)),
        take(3),
      );
    interval(800)
      .pipe(
        map(x => x + 1),
        filter(x => x % 2 === 1),
        take(3),
        mergeMap(httpReq),
      )
      .subscribe(
        output => console.log('=>', output),
        () => console.error('error'),
        () => console.log('completed'),
      );
  }

  example2 = `const click$ = fromEvent(button, 'click');
click$.pipe(
    map((e: MouseEvent) => Math.floor(e.timeStamp) % 5000),
    tap(console.log),
    mergeMap(value => this.http.search(value)),
  )
  .subscribe(response => {
    this.imageUrl1 = response.thumbnailUrl;
  });`;

  example3 = `this.searchControl.valueChanges.pipe(
  map(x => x + 1),
  mergeMap(value => this.http.search(value)),
)
.subscribe(response => {
  this.imageUrl = response.thumbnailUrl;
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
          mergeMap(value => this.http.search(value)),
        )
        .subscribe(response => {
          this.imageUrl1 = response.thumbnailUrl;
        });
    }
  }

  constructor(private readonly http: HttpService) {
    this.searchControl.valueChanges
      .pipe(
        map(x => x + 1),
        mergeMap(value => this.http.search(value)),
      )
      .subscribe(response => {
        this.imageUrl2 = response.thumbnailUrl;
      });
    this.examples.set(this.example1, this.run1);
  }
}
