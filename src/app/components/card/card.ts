import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card',
  standalone:true,
  imports: [CommonModule , MatIconModule],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {
  @Input() title!: string;
  @Input() value!: string | number;
  @Input() icon!: string;
  @Input() changePercent?: string;
  @Input() changeLabel?: string;
  @Input() changeDirection: 'up' | 'down' = 'up';
}
