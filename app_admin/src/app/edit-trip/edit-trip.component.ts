import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css'
})
export class EditTripComponent implements OnInit {
  public editForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tripService: TripDataService
  ) {}

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    const tripCode = this.route.snapshot.paramMap.get('code');

    if (tripCode) {
      this.tripService.getTrip(tripCode).subscribe({
        next: (trip: Trip[]) => {
          const selectedTrip = trip[0];

          this.editForm.patchValue({
            _id: selectedTrip._id,
            code: selectedTrip.code,
            name: selectedTrip.name,
            length: selectedTrip.length,
            start: selectedTrip.start.substring(0, 10),
            resort: selectedTrip.resort,
            perPerson: selectedTrip.perPerson,
            image: selectedTrip.image,
            description: selectedTrip.description
          });
        },
        error: (error: any) => {
          console.log('Error loading trip:', error);
        }
      });
    }
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.editForm.valid) {
      this.tripService.updateTrip(this.editForm.value).subscribe({
        next: (data: any) => {
          console.log(data);
          this.router.navigate(['']);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
    }
  }

  get f() {
    return this.editForm.controls;
  }
}
