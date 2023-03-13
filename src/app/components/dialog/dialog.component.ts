import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { Movie } from 'src/app/services/movies.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$: Subject<void> = new Subject();
  favoriteId!: number;

  constructor(
    private storageService: StorageService,
    @Inject(MAT_DIALOG_DATA) public data: Movie
  ) {}

  ngOnInit(): void {
    this.storageService.getMovieId().pipe(takeUntil(this.unsubscribe$))
    .subscribe((id: number) => {
      this.favoriteId = id;
    });
  }

  handleFavorite() {
    this.storageService.setMovieId(this.data.id);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
