import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, Observable, throwError } from 'rxjs';

export interface Movie {
  id?: number;
  name: string;
  year: number;
  description: string;
  genre: Array<number | string>;
}

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>('/assets/data.json').pipe(delay(500));
  }
}
