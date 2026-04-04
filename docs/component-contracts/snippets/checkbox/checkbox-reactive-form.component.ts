import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkbox-reactive-form-example',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <label>
        <input type="checkbox" formControlName="acceptTerms" />
        I accept the terms and conditions
      </label>

      <p *ngIf="showError()" role="alert">
        You must accept the terms before continuing.
      </p>

      <button type="submit">Continue</button>
    </form>
  `,
})
export class CheckboxReactiveFormExampleComponent {
  protected readonly form = new FormGroup({
    acceptTerms: new FormControl(false, {
      nonNullable: true,
      validators: [Validators.requiredTrue],
    }),
  });

  protected readonly showError = computed(() => {
    const control = this.form.controls.acceptTerms;
    return control.invalid && (control.dirty || control.touched);
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // submit payload
  }
}
