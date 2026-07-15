import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';

import { MbbizButtonComponent } from '../button/button.component';
import { MbbizInputComponent } from '../input/input.component';
import { MbbizModalActionLayout } from './modal.types';

@Component({
  selector: 'mbbiz-modal',
  imports: [CommonModule, MbbizButtonComponent, MbbizInputComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class MbbizModalComponent {
  readonly title = input('Modal title');
  readonly actionLayout = input<MbbizModalActionLayout>('double');
  readonly showClose = input(true);
  readonly closeAriaLabel = input('Đóng modal');

  readonly primaryLabel = input('Text');
  readonly secondaryLabel = input('Text');
  readonly showSecondary = input(true);

  readonly firstFieldLabel = input('Title');
  readonly firstFieldPlaceholder = input('Input text');
  readonly firstFieldValue = input('');
  readonly secondFieldLabel = input('Title');
  readonly secondFieldPlaceholder = input('Input text');
  readonly secondFieldValue = input('');
  readonly showSecondField = input(true);

  readonly primaryAction = output<void>();
  readonly secondaryAction = output<void>();
  readonly closeAction = output<void>();
  readonly firstFieldValueChange = output<string>();
  readonly secondFieldValueChange = output<string>();

  protected readonly shouldShowSecondaryAction = computed(
    () => this.actionLayout() === 'double' && this.showSecondary(),
  );
  protected readonly secondaryButtonLabel = computed(() => {
    const value = this.secondaryLabel().trim();
    return value.length > 0 ? value : 'Text';
  });
  protected readonly primaryButtonLabel = computed(() => {
    const value = this.primaryLabel().trim();
    return value.length > 0 ? value : 'Text';
  });

  protected emitPrimaryAction() {
    this.primaryAction.emit();
  }

  protected emitSecondaryAction() {
    this.secondaryAction.emit();
  }

  protected emitCloseAction() {
    this.closeAction.emit();
  }

  protected onFirstFieldValueChange(value: string) {
    this.firstFieldValueChange.emit(value);
  }

  protected onSecondFieldValueChange(value: string) {
    this.secondFieldValueChange.emit(value);
  }
}
