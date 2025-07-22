import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TeamService} from '../../services/team-service';
import { Person } from '../member-card/member-card';


@Component({
  selector: 'app-add-member',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './add-member.html',
  styleUrls: ['./add-member.css']
})
export class AddMember  {
  form!: FormGroup;
  photoPreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private teamSvc: TeamService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName:  ['', Validators.required],
      email:     ['', [Validators.required, Validators.email]],
      phone:     [''],             // we won’t map phone into Person
      position:  [''],             // maps to role
      gender:    ['']              // ignored by Person
    });
  }

  onPhotoSelect(e: Event): void {
    const inp = e.target as HTMLInputElement;
    if (!inp.files?.length) return;
    const file = inp.files[0];
    const reader = new FileReader();
    reader.onload = () => (this.photoPreview = reader.result);
    reader.readAsDataURL(file);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const f = this.form.value;
    const newMember: Person = {
      avatarUrl: (this.photoPreview as string) || 'assets/default-avatar.png',
      name:      `${f.firstName} ${f.lastName}`,
      email:     f.email,
      role:      f.position || 'Member'
    };

    this.teamSvc.addMember(newMember);

    this.form.reset();
    this.photoPreview = null;
    this.router.navigate(['/team']);
  }
}
