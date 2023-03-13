import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../services/movies.service';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(
    movies: Movie[],
    search: string,
    searchKeyArray: string[]
  ): Movie[] {
    let tempArr = [];

    tempArr = movies.filter((movie: Movie) => {
      let movieFound = false;
      movie.genre.forEach((category: any) => {
        searchKeyArray.forEach((key) => {
          if (key.toLowerCase().includes(category.toLowerCase())) {
            movieFound = true;
          }
        });
      });
      return movieFound;
    });

    return tempArr.filter((item: Movie) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
  }
}
