import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

export interface Deal {
  productImage: string;
  productName: string;
  location: string;
  dateTime: string;
  piece: number;
  amount: string;
  status:       'Delivered' | 'Pending' | 'Rejected' | 'Completed' | 'Processing' | 'On Hold' | 'In Transit';
}

@Component({
  selector: 'app-deals',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './deals.html',
  styleUrls: ['./deals.css']
})
export class Deals {
  @Input() dataSource: Deal[] = [];

  displayedColumns: string[] = [
    'product',
    'location',
    'dateTime',
    'piece',
    'amount',
    'status'
  ];

  statusClass(status: string): string {
    return status.toLowerCase().replace(/\s+/g, '-');
  }
}
