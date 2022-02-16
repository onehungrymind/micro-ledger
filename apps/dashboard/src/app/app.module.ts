import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from '@ohm/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UiToolbarModule } from '@ohm/ui-toolbar';
import { RoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CoreDataModule } from '@ohm/core-data';
import { CoreStateModule } from '@ohm/core-state';
import { HttpClientModule } from '@angular/common/http';
import { ModuleOutletModule } from '@ohm/module-outlet';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    UiToolbarModule,
    MaterialModule,
    CoreDataModule,
    CoreStateModule,
    ModuleOutletModule,
    HttpClientModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
