import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-button-a11y-example',
  standalone: true,
  template: `
    <button
      type="button"
      class="icon-action"
      aria-label="Refresh data"
      [attr.aria-busy]="busy()"
      [disabled]="busy()"
      (click)="refresh()"
      (keydown.enter)="refresh()"
      (keydown.space)="onSpace($event)"
    >
      {{ busy() ? 'Loading' : 'Refresh' }}
    </button>
  `,
})
export class ButtonA11yExampleComponent {
  protected readonly busy = signal(false);

  protected async refresh(): Promise<void> {
    if (this.busy()) {
      return;
    }

    this.busy.set(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      // trigger data refresh
    } finally {
      this.busy.set(false);
    }
  }

  protected onSpace(event: KeyboardEvent): void {
    event.preventDefault();
    void this.refresh();
  }
}
