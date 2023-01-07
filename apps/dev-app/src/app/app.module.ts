import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import {IncrementerComponent} from "./incrementer";
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [AppComponent, NxWelcomeComponent, IncrementerComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
