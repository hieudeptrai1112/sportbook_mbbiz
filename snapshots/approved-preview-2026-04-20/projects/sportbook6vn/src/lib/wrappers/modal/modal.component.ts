import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';

import { Sportbook6vnButtonComponent } from '../button/button.component';
import { Sportbook6vnModalPaginationDot, Sportbook6vnModalType } from './modal.types';

interface Sportbook6vnModalVariantDefaults {
  title: string;
  description: string;
  primaryLabel: string;
  secondaryLabel: string | null;
  tertiaryLabel: string | null;
  textLinkLabel: string | null;
  showClose: boolean;
  showErrorCode: boolean;
}

const SPORTBOOK6VN_MODAL_DEFAULTS: Record<Sportbook6vnModalType, Sportbook6vnModalVariantDefaults> = {
  warning: {
    title: 'Title dialog',
    description: 'This is a description of the dialog.',
    primaryLabel: 'Primary button',
    secondaryLabel: 'Secondary button',
    tertiaryLabel: 'Đóng',
    textLinkLabel: null,
    showClose: true,
    showErrorCode: false,
  },
  success: {
    title: 'Title dialog',
    description: 'This is a description of the dialog.',
    primaryLabel: 'Primary button',
    secondaryLabel: 'Secondary button',
    tertiaryLabel: 'Secondary button',
    textLinkLabel: null,
    showClose: true,
    showErrorCode: false,
  },
  error: {
    title: 'Title dialog',
    description: 'This is a description of the dialog.',
    primaryLabel: 'Gửi yêu cầu hỗ trợ',
    secondaryLabel: 'Secondary button',
    tertiaryLabel: 'Đóng',
    textLinkLabel: null,
    showClose: true,
    showErrorCode: true,
  },
  confirm: {
    title: 'Title dialog',
    description: 'This is a description of the dialog.',
    primaryLabel: 'Xác nhận',
    secondaryLabel: 'Secondary button',
    tertiaryLabel: 'Đóng',
    textLinkLabel: null,
    showClose: true,
    showErrorCode: false,
  },
  destructive: {
    title: 'Title dialog',
    description: 'This is a description of the dialog.',
    primaryLabel: 'Xóa',
    secondaryLabel: 'Secondary button',
    tertiaryLabel: 'Đóng',
    textLinkLabel: null,
    showClose: true,
    showErrorCode: false,
  },
  notification: {
    title: 'Title dialog',
    description: 'This is a description of the dialog.',
    primaryLabel: 'Primary button',
    secondaryLabel: 'Secondary button',
    tertiaryLabel: 'Đóng',
    textLinkLabel: null,
    showClose: true,
    showErrorCode: false,
  },
};

@Component({
  selector: 'sportbook6vn-modal',
  imports: [CommonModule, Sportbook6vnButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class Sportbook6vnModalComponent {
  readonly type = input<Sportbook6vnModalType>('warning');
  readonly title = input<string | null>(null);
  readonly description = input<string | null>(null);
  readonly primaryLabel = input<string | null>(null);
  readonly secondaryLabel = input<string | null>(null);
  readonly tertiaryLabel = input<string | null>(null);
  readonly showSecondary = input<boolean | null>(null);
  readonly showTertiary = input<boolean | null>(null);
  readonly showClose = input<boolean | null>(null);
  readonly showTextLink = input<boolean | null>(null);
  readonly textLinkLabel = input<string | null>(null);
  readonly showErrorCode = input<boolean | null>(null);
  readonly errorCode = input<string>('GW1234');
  readonly showPagination = input(false);
  readonly paginationCount = input(4);
  readonly activePaginationIndex = input(0);
  readonly closeAriaLabel = input('Đóng modal');

  readonly primaryAction = output<void>();
  readonly secondaryAction = output<void>();
  readonly tertiaryAction = output<void>();
  readonly closeAction = output<void>();
  readonly textLinkAction = output<void>();
  readonly paginationAction = output<number>();

  protected readonly defaults = computed(() => SPORTBOOK6VN_MODAL_DEFAULTS[this.type()]);

  protected readonly modalClass = computed(
    () => `sportbook6vn-modal sportbook6vn-modal--${this.type()}`,
  );

  protected readonly resolvedTitle = computed(() => this.title() ?? this.defaults().title);
  protected readonly resolvedDescription = computed(
    () => this.description() ?? this.defaults().description,
  );
  protected readonly resolvedPrimaryLabel = computed(
    () => this.primaryLabel() ?? this.defaults().primaryLabel,
  );
  protected readonly resolvedSecondaryLabel = computed(() =>
    this.resolveOptionalLabel(this.secondaryLabel(), this.defaults().secondaryLabel, this.showSecondary()),
  );
  protected readonly resolvedTertiaryLabel = computed(() =>
    this.resolveOptionalLabel(this.tertiaryLabel(), this.defaults().tertiaryLabel, this.showTertiary()),
  );
  protected readonly resolvedTextLinkLabel = computed(() =>
    this.resolveOptionalLabel(this.textLinkLabel(), this.defaults().textLinkLabel, this.showTextLink()),
  );
  protected readonly resolvedShowClose = computed(
    () => this.showClose() ?? this.defaults().showClose,
  );
  protected readonly resolvedErrorCode = computed(() => {
    const shouldShow = this.showErrorCode() ?? this.defaults().showErrorCode;
    if (!shouldShow) {
      return null;
    }

    return this.errorCode();
  });

  protected readonly paginationDots = computed<readonly Sportbook6vnModalPaginationDot[]>(() =>
    Array.from({ length: this.paginationCount() }, (_value, index) => ({
      active: index === this.activePaginationIndex(),
    })),
  );

  protected emitPrimaryAction() {
    this.primaryAction.emit();
  }

  protected emitSecondaryAction() {
    this.secondaryAction.emit();
  }

  protected emitTertiaryAction() {
    this.tertiaryAction.emit();
  }

  protected emitCloseAction() {
    this.closeAction.emit();
  }

  protected emitTextLinkAction() {
    this.textLinkAction.emit();
  }

  protected emitPaginationAction(index: number) {
    this.paginationAction.emit(index);
  }

  private resolveOptionalLabel(
    explicitLabel: string | null,
    fallbackLabel: string | null,
    visibilityOverride: boolean | null,
  ) {
    if (visibilityOverride === false) {
      return null;
    }

    if (explicitLabel !== null) {
      return explicitLabel;
    }

    return fallbackLabel;
  }
}
