import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RedirectPageComponent } from './components/redirect-page/redirect-page.component';


const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: '**', component: RedirectPageComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
