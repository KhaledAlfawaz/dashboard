import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule }    from '@angular/common';
import { MatCardModule }   from '@angular/material/card';
import { MatIconModule }   from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Product }         from '../../services/product-service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css']
})
export class ProductCard {
  @Input() product!: Product;

  @Output() favoriteToggled = new EventEmitter<Product>();

  stars = [1, 2, 3, 4, 5];

  onToggleFavorite() {
    this.favoriteToggled.emit(this.product);
  }
}
