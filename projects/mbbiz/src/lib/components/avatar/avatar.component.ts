import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import {
  Component,
  ElementRef,
  afterEveryRender,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { IconComponent } from '@mbbiz/icon/angular';

import { MBBIZ_AVATAR_DEFAULT_SVG } from './avatar-default.markup';
import { MBBIZ_AVATAR_SIZE_PX, type MbbizAvatarShape, type MbbizAvatarSize } from './avatar.types';

const DESIGN_SIZE = MBBIZ_AVATAR_SIZE_PX.default;

@Component({
  selector: 'mbbiz-avatar',
  imports: [IconComponent],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  host: {
    '[class]': 'hostClass()',
    '[style.--mbbiz-avatar-size]': 'pixelSize() + "px"',
    '[attr.role]': '"img"',
    '[attr.aria-label]': 'resolvedLabel()',
  },
})
export class MbbizAvatarComponent {
  readonly src = input<string | null>(null);
  readonly srcSet = input<string | null>(null);
  readonly alt = input('');
  readonly text = input<string | null>(null);
  readonly icon = input<string | null>(null);
  readonly shape = input<MbbizAvatarShape>('circle');
  readonly size = input<MbbizAvatarSize>('default');
  readonly gap = input(4);

  readonly error = output<Event>();

  private readonly textNode = viewChild<ElementRef<HTMLElement>>('textNode');
  private readonly uid = `mbbiz-avatar-${Math.random().toString(36).slice(2)}`;
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly imageFailed = signal(false);
  protected readonly textScale = signal(1);

  protected readonly defaultMarkup: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(
    MBBIZ_AVATAR_DEFAULT_SVG
      .replaceAll('id="paint', `id="${this.uid}-paint`)
      .replaceAll('url(#paint', `url(#${this.uid}-paint`),
  );

  constructor() {
    effect(() => {
      this.src();
      this.imageFailed.set(false);
    });

    afterEveryRender(() => {
      const node = this.textNode()?.nativeElement;
      if (!node) {
        return;
      }

      const available = DESIGN_SIZE - this.scaledGap() * 2;
      const width = node.scrollWidth;
      const next = width > available && width > 0 ? available / width : 1;
      if (Math.abs(next - this.textScale()) > 0.01) {
        this.textScale.set(Number(next.toFixed(3)));
      }
    });
  }

  protected readonly pixelSize = computed(() => {
    const size = this.size();
    if (typeof size === 'number' && Number.isFinite(size)) {
      return Math.max(1, size);
    }

    if (size === 'large' || size === 'small') {
      return MBBIZ_AVATAR_SIZE_PX[size];
    }

    return DESIGN_SIZE;
  });

  protected readonly showImage = computed(() => !!this.src() && !this.imageFailed());

  protected readonly resolvedLabel = computed(
    () => this.alt() || this.text() || 'Avatar',
  );

  protected readonly hostClass = computed(() =>
    [
      'mbbiz-avatar',
      `mbbiz-avatar--${this.shape()}`,
      this.showImage() ? 'mbbiz-avatar--image' : '',
      !this.showImage() && this.icon() ? 'mbbiz-avatar--icon' : '',
      !this.showImage() && !this.icon() && this.text() ? 'mbbiz-avatar--text' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected readonly textTransform = computed(
    () => `translate(-50%, -50%) scale(${this.textScale()})`,
  );

  protected onImageError(event: Event): void {
    this.imageFailed.set(true);
    this.error.emit(event);
  }

  private scaledGap(): number {
    return this.gap() * (DESIGN_SIZE / this.pixelSize());
  }
}
