import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private favoriteMovieId$ = new BehaviorSubject<number | null>(null);

  getMovieId(): Observable<any> {
    return this.favoriteMovieId$.asObservable();
  }

  setMovieId(id?: number) {
    if (id) {
      if (localStorage.getItem('movie.id')! === id + '') {
        localStorage.removeItem('movie.id');
      } else {
        localStorage.setItem('movie.id', `${id}`);
      }
    }

    this.favoriteMovieId$.next(+localStorage.getItem('movie.id')!);
  }

  constructor() {}
}
