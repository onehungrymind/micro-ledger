import { Component, OnInit } from '@angular/core';
import { Cell } from '@ohm/api-interfaces';
import { CellsSocketService } from '@ohm/core-data';
import { CellsFacade } from '@ohm/core-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'ohm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allPublishedCells$: Observable<Cell[]> = this.cellsFacade.allPublishedCells$;

  constructor(
    private cellsFacade: CellsFacade,
    private cellsSocketService: CellsSocketService
  ) {}

  ngOnInit(): void {
    this.cellsFacade.loadCells();
    this.cellsFacade.initHealthChecks();
    this.cellsSocketService.cellMutations$.subscribe(() => this.cellsFacade.loadCells());
  }
}
