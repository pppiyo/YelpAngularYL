import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http'; //

import { AppRoutingModule } from './app-routing.module';
import { SearchComponent } from './components/search/search.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DetailsComponent } from './components/details/details.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ResultTableComponent } from './components/result-table/result-table.component';
import { SearchService } from './services/search.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    BookingsComponent,
    NavBarComponent,
    DetailsComponent,
    ReservationComponent,
    ResultTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,

    HttpClientModule,
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
