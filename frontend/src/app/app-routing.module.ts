import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ResultTableComponent } from './components/result-table/result-table.component';
import { DetailsComponent } from './components/details/details.component';
import { ReservationComponent } from './components/reservation/reservation.component';

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  { path: 'bookings', component: BookingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
