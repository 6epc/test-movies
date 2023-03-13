import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { Movie } from 'src/app/services/movies.service';
import { StorageService } from 'src/app/services/storage.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit, OnDestroy {
  @Input() movie!: Movie;

  private readonly unsubscribe$: Subject<void> = new Subject();
  favoriteId!: null | number;

  constructor(
    private storageService: StorageService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.storageService.getMovieId().pipe(takeUntil(this.unsubscribe$))
    .subscribe((id: number) => {
      this.favoriteId = id;
    });
  }

  addFavorite(event: Event) {
    event.stopPropagation();
    this.storageService.setMovieId(this.movie.id);
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      panelClass: 'dialogMovie',
      data: this.movie,
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
