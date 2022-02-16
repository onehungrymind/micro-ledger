import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SecondaryComponent } from './secondary/secondary.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@ohm/material';
import { UiToolbarModule } from '@ohm/ui-toolbar';

@NgModule({
  declarations: [AppComponent, SecondaryComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    UiToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
