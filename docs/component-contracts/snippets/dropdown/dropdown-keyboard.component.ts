import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-dropdown-keyboard-example',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      aria-haspopup="menu"
      [attr.aria-expanded]="open()"
      (click)="toggle()"
      (keydown.enter)="openMenu()"
      (keydown.space)="openWithSpace($event)"
      (keydown.escape)="closeMenu()"
    >
      Actions
    </button>

    <ul *ngIf="open()" role="menu" (keydown)="onListKeydown($event)">
      <li role="menuitem" [class.active]="activeIndex() === 0">Rename</li>
      <li role="menuitem" [class.active]="activeIndex() === 1">Duplicate</li>
      <li role="menuitem" [class.active]="activeIndex() === 2">Archive</li>
    </ul>
  `,
})
export class DropdownKeyboardExampleComponent {
  protected readonly open = signal(false);
  protected readonly activeIndex = signal(0);

  protected toggle(): void {
    this.open.update((value) => !value);
  }

  protected openMenu(): void {
    this.open.set(true);
  }

  protected closeMenu(): void {
    this.open.set(false);
  }

  protected openWithSpace(event: KeyboardEvent): void {
    event.preventDefault();
    this.openMenu();
  }

  protected onListKeydown(event: KeyboardEvent): void {
    if (!this.open()) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.activeIndex.update((index) => (index + 1) % 3);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.activeIndex.update((index) => (index - 1 + 3) % 3);
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeMenu();
    }
  }
}
