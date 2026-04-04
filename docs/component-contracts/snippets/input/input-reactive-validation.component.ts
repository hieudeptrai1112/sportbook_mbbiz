import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-reactive-validation-example',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <label for="fullName">Full name</label>
    <input
      id="fullName"
      type="text"
      [formControl]="fullName"
      [attr.aria-invalid]="hasError()"
      [attr.aria-describedby]="hasError() ? 'fullNameError' : null"
      placeholder="Enter full name"
    />

    <p id="fullNameError" *ngIf="hasError()" role="alert">
      Name must be at least 3 characters.
    </p>
  `,
})
export class InputReactiveValidationExampleComponent {
  protected readonly fullName = new FormControl('', {
    nonNullable: true,
    validators: [Validators.minLength(3), Validators.required],
  });

  protected readonly hasError = computed(
    () => this.fullName.invalid && (this.fullName.touched || this.fullName.dirty),
  );
}
