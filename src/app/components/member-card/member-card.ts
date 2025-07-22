import { Component, Input } from '@angular/core';
import { CommonModule }     from '@angular/common';
export interface Person {
  avatarUrl: string;
  name:      string;
  role:      string;
  email:     string;
}
@Component({
  selector: 'app-member-card',
  imports: [CommonModule],
  templateUrl: './member-card.html',
  styleUrl: './member-card.css'
})
export class MemberCard {
  @Input() member!: Person;
}
