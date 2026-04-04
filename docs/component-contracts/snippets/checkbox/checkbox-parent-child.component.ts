import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-checkbox-parent-child-example',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label>
      <input
        type="checkbox"
        [checked]="allChecked()"
        [indeterminate]="isIndeterminate()"
        (change)="toggleAll($event)"
      />
      Select all
    </label>

    <label *ngFor="let item of items(); let i = index">
      <input type="checkbox" [checked]="item" (change)="toggleOne(i, $event)" />
      Item {{ i + 1 }}
    </label>
  `,
})
export class CheckboxParentChildExampleComponent {
  protected readonly items = signal<boolean[]>([true, false, false]);

  protected readonly allChecked = computed(() => this.items().every(Boolean));

  protected readonly isIndeterminate = computed(() => {
    const values = this.items();
    return values.some(Boolean) && !values.every(Boolean);
  });

  protected toggleAll(event: Event): void {
    const next = (event.target as HTMLInputElement).checked;
    this.items.set(this.items().map(() => next));
  }

  protected toggleOne(index: number, event: Event): void {
    const next = [...this.items()];
    next[index] = (event.target as HTMLInputElement).checked;
    this.items.set(next);
  }
}
