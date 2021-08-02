import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AppRoutingModule } from './app-routing.module';
import { RedirectPageComponent } from './components/redirect-page/redirect-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    RedirectPageComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ClipboardModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
