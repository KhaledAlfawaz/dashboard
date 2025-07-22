import { Component, OnInit }           from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { MemberCard , Person } from '../member-card/member-card';
import { MatButtonModule }              from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { TeamService } from '../../services/team-service';
@Component({
  selector: 'app-team',
  imports: [CommonModule, MemberCard, MatButtonModule, RouterLink],
  templateUrl: './team.html',
  styleUrl: './team.css'
})
export class Team {
  people: Person[] = [];

  constructor(private teamSvc: TeamService) {}

  ngOnInit() {
    this.teamSvc.getMembers().subscribe(list => this.people = list);
  }
}
