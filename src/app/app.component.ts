import { StorageService } from './services/storage.service';
import { Component, OnInit } from '@angular/core';
import { Subject, switchMap, takeUntil } from 'rxjs';

import { Movie, MoviesService } from './services/movies.service';
import { Categories } from './shared/categories.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly unsubscribe$: Subject<void> = new Subject();

  movies!: Movie[];
  copyMovies!: Movie[];
  bestMovie!: Movie | null;
  selectedValue = 'Все';
  search = '';
  categories: string[] = [
    'Все',
    'Драма',
    'Биография',
    'История',
    'Фэнтези',
    'Приключения',
    'Боевик',
    'Мультфильм',
    'Комедия',
    'Триллер',
    'Детектив',
    'Фантастика',
  ];
  error = '';

  constructor(
    private moviesService: MoviesService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.storageService.setMovieId();

    this.moviesService
      .getMovies()
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap((movies) => {
          this.movies = movies;
          this.transformCategories();
          return this.storageService.getMovieId();
        })
      )
      .subscribe({
          next: id => {
            this.bestMovie = this.movies[id - 1];
          },
          error: e => {
            if(e.status = 404) {
              this.error = 'Не удалось загрузить даные с сервера. Ошибка 404'
            } else {
              this.error = 'Не удалось загрузить даные'
            }
          }
      });
  }

  transformCategories() {
    return this.movies.forEach((el: Movie) => {
      el.genre = el.genre.map((cat) => {
        switch (cat) {
          case Categories.DRAMA:
            return 'драма';
          case Categories.BIO:
            return 'биография';
          case Categories.HISTORY:
            return 'история';
          case Categories.FANTASY:
            return 'фэнтези';
          case Categories.ADVENTURE:
            return 'приключения';
          case Categories.ACTION:
            return 'боевик';
          case Categories.CARTOON:
            return 'мультфильм';
          case Categories.COMEDY:
            return 'комедия';
          case Categories.THRILLER:
            return 'триллер';
          case Categories.DETECTIVE:
            return 'детектив';
          case Categories.FANTASTIC:
            return 'фантастика';
        }
        return '';
      });
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
