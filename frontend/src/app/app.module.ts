import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SearchComponent } from './components/search/search.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DetailsComponent } from './components/details/details.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ResultTableComponent } from './components/result-table/result-table.component';
import { SearchService } from './services/search.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AutoCompleteComponent } from './components/auto-complete/auto-complete.component';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NoResultsComponent } from './components/no-results/no-results.component';
import { DetailsService } from './services/details.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { DetailsTextComponent } from './components/details-text/details-text.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ReviewsComponent } from './components/reviews/reviews.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    BookingsComponent,
    NavBarComponent,
    DetailsComponent,
    ReservationComponent,
    ResultTableComponent,
    AutoCompleteComponent,
    NoResultsComponent,
    DetailsTextComponent,
    CarouselComponent,
    ReviewsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,

    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,

    FormsModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    GoogleMapsModule,
  ],
  providers: [SearchService, DetailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
