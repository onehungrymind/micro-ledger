import { Cell } from '@ohm/api-interfaces';
import {
  InjectInMemoryDBService,
  InMemoryDBService
} from '@nestjs-addons/in-memory-db';
import { HttpService, Injectable, NotFoundException } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable, timer } from 'rxjs';
import { environment } from '../environments/environment';
import { CreateCellDto } from './dto/create-cell.dto';
import { UpdateCellDto } from './dto/update-cell.dto';

const socket = require('socket.io-client')('http://localhost:80');

const cells: Cell[] = [
  {
    id: '1',
    title: 'Primary',
    description: '',
    componentName: 'PrimaryComponent',
    remoteName: 'primary',
    uri: 'http://localhost:4202/remoteEntry.js',
    module: './Primary',
    published: true,
    healthy: true,
    version: '1.0.0',
    visible: true,
  },
  {
    id: '2',
    title: 'Secondary',
    description: '',
    componentName: 'SecondaryComponent',
    remoteName: 'secondary',
    uri: 'http://localhost:4203/remoteEntry.js',
    module: './Secondary',
    published: true,
    healthy: true,
    version: '1.0.0',
    visible: true,
  },
];

@Injectable()
export class CellsService {
  constructor(
    @InjectInMemoryDBService('cells')
    private readonly cellService: InMemoryDBService<Cell>,
    private httpService: HttpService
  ) {
    this.cellService.createMany(cells);
  }

  findAll() {
    return this.cellService.getAll();
  }

  findOne(id: string) {
    return this.cellService.get(id);
  }

  create(createCellDto: CreateCellDto) {
    const newCell: Cell = createCellDto.version
      ? createCellDto
      : { ...createCellDto, version: '1.0.0' };
    return this.cellService.create(newCell);
  }

  update(id: string, updateCellDto: UpdateCellDto) {
    this.cellService.update({ ...updateCellDto, id: id });
    return updateCellDto;
  }

  remove(id: string) {
    const deletedCell = this.cellService.get(id);
    if (deletedCell) {
      this.cellService.delete(id);
      return deletedCell;
    }
    return new NotFoundException();
  }

  initHealthCheck() {
    timer(0, environment.healthCheckDelay).subscribe(() => {
      this.setupHealthChecks()
    });
  }

  setupHealthChecks() {
    this.getPublishedCells().subscribe((cells: Cell[]) =>
      cells.forEach((cell: Cell) => this.checkCellHealth(cell))
    );
  }

  checkCellHealth(cell: Cell) {
    const url = new URL(cell.uri)['origin']; // For performance reasons
    const config: AxiosRequestConfig = { responseType: 'text' };

    this.httpService.get(url, config).subscribe(
      (res: AxiosResponse) => this.handleHealthCheckSuccess(res, cell),
      (err) => this.handleHealthCheckError(cell)
    );
  }

  private getPublishedCells(): Observable<Cell[]> {
    return this.cellService.queryAsync((cell) => cell.published === true);
  }

  private handleHealthCheckSuccess(res: AxiosResponse, cell: Cell) {
    const healthy = (res.status === 200); // This obviously could be more robust
    this.setCellHealth(cell, healthy);
  }

  private handleHealthCheckError(cell: Cell) {
    this.setCellHealth(cell, false);
  }

  private setCellHealth(cell: Cell, healthy: boolean) {
    if (cell.healthy === healthy) return;
    socket.emit('update', { ...cell, healthy });
    this.cellService.update({ ...cell, healthy });
  }
}
