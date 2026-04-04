import { Component, computed, signal } from '@angular/core';
import { DsButtonComponent } from '../../../../src/app/components/ds-button/ds-button.component';

@Component({
  selector: 'app-button-controlled-action-example',
  standalone: true,
  imports: [DsButtonComponent],
  template: `
    <app-ds-button
      [label]="isSaving() ? 'Saving...' : 'Save changes'"
      shape="rectangle"
      tone="primary"
      size="large"
      [state]="buttonState()"
      (click)="save()"
    />
  `,
})
export class ButtonControlledActionExampleComponent {
  private readonly pending = signal(false);

  protected readonly isSaving = computed(() => this.pending());
  protected readonly buttonState = computed(() => (this.pending() ? 'disabled' : 'default'));

  protected async save(): Promise<void> {
    if (this.pending()) {
      return;
    }

    this.pending.set(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      // call your save API here
    } finally {
      this.pending.set(false);
    }
  }
}
