import { CommonModule } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';

interface DropdownItem {
  id: string;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-dropdown-controlled-example',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dropdown-shell" (click)="$event.stopPropagation()">
      <button
        type="button"
        aria-haspopup="menu"
        [attr.aria-expanded]="open()"
        (click)="toggle()"
      >
        {{ selectedLabel() }}
      </button>

      <ul *ngIf="open()" role="menu">
        <li
          *ngFor="let item of items"
          role="menuitem"
          [attr.aria-disabled]="item.disabled || null"
          [class.disabled]="item.disabled"
          (click)="select(item)"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
  `,
})
export class DropdownControlledExampleComponent {
  protected readonly items: DropdownItem[] = [
    { id: 'weekly', label: 'Weekly' },
    { id: 'monthly', label: 'Monthly' },
    { id: 'quarterly', label: 'Quarterly', disabled: true },
  ];

  protected readonly open = signal(false);
  protected readonly selected = signal('weekly');

  protected selectedLabel(): string {
    return this.items.find((item) => item.id === this.selected())?.label ?? 'Select period';
  }

  protected toggle(): void {
    this.open.update((value) => !value);
  }

  protected select(item: DropdownItem): void {
    if (item.disabled) {
      return;
    }

    this.selected.set(item.id);
    this.open.set(false);
  }

  @HostListener('document:click')
  protected closeOnOutsideClick(): void {
    this.open.set(false);
  }
}
