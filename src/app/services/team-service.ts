import { Injectable }      from '@angular/core';
import { HttpClient }      from '@angular/common/http';
import { BehaviorSubject, Observable }      from 'rxjs';
import { map }             from 'rxjs/operators';
import { Person } from '../components/member-card/member-card';

interface RandomUser {
  name: { first: string; last: string };
  email: string;
  picture: { large: string };
}
interface RandomUserResponse { results: RandomUser[]; }

@Injectable({ providedIn: 'root' })
export class TeamService {
  private roles = ['Admin','CEO','CTO','Lead','Strategist','Digital Marketer','Social Media'];

  private members$$ = new BehaviorSubject<Person[]>([]);
  readonly members$ = this.members$$.asObservable();

  constructor(private http: HttpClient) {
    this.http
      .get<RandomUserResponse>('https://randomuser.me/api/?results=12&inc=name,email,picture')
      .pipe(
        map(res =>
          res.results.map(u => ({
            avatarUrl: u.picture.large,
            name:      `${u.name.first} ${u.name.last}`,
            email:     u.email,
            role:      this.roles[Math.floor(Math.random()*this.roles.length)]
          } as Person))
        )
      )
      .subscribe(initial => this.members$$.next(initial));
  }

  getMembers(): Observable<Person[]> {
    return this.members$;
  }

  addMember(newOne: Person) {
    const current = this.members$$.value;
    this.members$$.next([ newOne, ...current ]);
  }
}

