import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { OrdersService , Order } from '../../services/orders-service';


@Component({
  selector: 'app-orders',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class Orders {
filterDate   = '';
  filterType   = '';
  filterStatus = '';

  displayedColumns = ['id','name','address','date','type','status'];
  dataSource: Order[]     = [];
  filteredData: Order[]   = [];
  allDates:    string[]   = [];
  allTypes:    string[]   = [];
  allStatuses: string[]   = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize  = 9;
  pageIndex = 0;

  constructor(private ordersSvc: OrdersService) {}

  ngOnInit() {
    this.ordersSvc.getOrders().subscribe(data => {
      this.dataSource = data;

      this.allDates    = Array.from(new Set(data.map(o => o.date))).sort();
      this.allTypes    = Array.from(new Set(data.map(o => o.type))).sort();
      this.allStatuses = Array.from(new Set(data.map(o => o.status))).sort();

      this.applyFilter();
    });
  }

  applyFilter() {
    this.filteredData = this.dataSource.filter(o =>
      (!this.filterDate   || o.date   === this.filterDate) &&
      (!this.filterType   || o.type   === this.filterType) &&
      (!this.filterStatus || o.status === this.filterStatus)
    );
    this.pageIndex = 0;
  }

  resetFilters() {
    this.filterDate = this.filterType = this.filterStatus = '';
    this.applyFilter();
  }

  pageChange(event: any) {
    this.pageSize  = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
}
