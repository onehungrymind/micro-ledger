import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoutingModule } from './routing.module';
import { CellsComponent } from './cells/cells.component';
import { CellsListComponent } from './cells/cells-list/cells-list.component';
import { CellDetailsComponent } from './cells/cell-details/cell-details.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreDataModule } from '@ohm/core-data';
import { CoreStateModule } from '@ohm/core-state';
import { MaterialModule } from '@ohm/material';
import { UiToolbarModule } from '@ohm/ui-toolbar';

@NgModule({
  declarations: [
    AppComponent,
    CellDetailsComponent,
    CellsComponent,
    CellsListComponent,
    HomeComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CoreDataModule,
    CoreStateModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    RoutingModule,
    UiToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
