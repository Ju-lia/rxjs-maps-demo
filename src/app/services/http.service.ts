import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private readonly http: HttpClient) {}

  public search(value: any): Observable<any> {
    const delay = getRandomInt(1000, 2000);
    const url = `https://deelay.me/${delay}/https://jsonplaceholder.typicode.com/photos/${value}`;
    return this.http.get(url);
  }
}
