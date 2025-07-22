import { Component,ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sidebar',
  imports: [
  CommonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  RouterOutlet,
  MatButtonModule,
  MatBadgeModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  RouterLink,
  RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
@ViewChild('sidenav') sidenav!: MatSidenav;
  isMobile = false;

  constructor(private observer: BreakpointObserver) {}

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe(res => {
      this.isMobile = res.matches;
      if (this.sidenav) {
        this.sidenav.mode = this.isMobile ? 'over' : 'side';
        if (this.isMobile) {
          this.sidenav.close();
        } else {
          this.sidenav.open();
        }
      }
    });
  }

  toggleSidebar() {
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }
}
