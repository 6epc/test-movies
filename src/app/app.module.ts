import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MovieComponent } from './components/movie/movie.component';
import { DialogComponent } from './components/dialog/dialog.component';

import { MaterialModule } from './shared/modules/material/material.module';
import { FilterPipe } from './shared/filter.pipe';

@NgModule({
  declarations: [AppComponent, MovieComponent, DialogComponent, FilterPipe],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
