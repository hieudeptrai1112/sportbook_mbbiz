import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  getIcon,
  iconSizeToPx,
  resolveIconSize,
  toSvgElement,
  type IconSize,
} from '@hieudeptrai1112/icon';

/** Docs shell adapter for @hieudeptrai1112/icon (avoids dual Angular from library /angular). */
@Component({
  selector: 'lib-icon, mbbiz-icon',
  standalone: true,
  template: `<span
    class="lib-icon"
    [class.lib-icon--xs]="resolvedSize() === 'xs'"
    [class.lib-icon--s]="resolvedSize() === 's'"
    [class.lib-icon--m]="resolvedSize() === 'm'"
    [class.lib-icon--l]="resolvedSize() === 'l'"
    [class.lib-icon--xl]="resolvedSize() === 'xl'"
    [class.lib-icon--2xl]="resolvedSize() === '2xl'"
    [attr.role]="ariaLabel() ? 'img' : null"
    [attr.aria-label]="ariaLabel()"
    [attr.aria-hidden]="ariaLabel() ? null : 'true'"
    [style.color]="color()"
    [innerHTML]="safeSvg()"
  ></span>`,
  styles: [
    `
      .lib-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        line-height: 0;
        color: inherit;
      }
      .lib-icon svg {
        width: 100%;
        height: 100%;
        display: block;
      }
      .lib-icon--xs {
        width: 16px;
        height: 16px;
      }
      .lib-icon--s {
        width: 20px;
        height: 20px;
      }
      .lib-icon--m {
        width: 24px;
        height: 24px;
      }
      .lib-icon--l {
        width: 28px;
        height: 28px;
      }
      .lib-icon--xl {
        width: 32px;
        height: 32px;
      }
      .lib-icon--2xl {
        width: 40px;
        height: 40px;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibIconComponent {
  readonly name = input.required<string>();
  readonly size = input<IconSize>('m');
  readonly color = input<string>('currentColor');
  readonly ariaLabel = input<string | null>(null);

  private readonly sanitizer = inject(DomSanitizer);

  protected readonly resolvedSize = computed(() => resolveIconSize(this.size()));

  protected readonly safeSvg = computed(() => {
    const def = getIcon(this.name());
    if (!def) {
      console.warn(`[lib-icon] Unknown icon: "${this.name()}"`);
      return '';
    }

    const px = iconSizeToPx(this.size());
    const html = toSvgElement(def, {
      width: String(px),
      height: String(px),
    });
    return this.sanitizer.bypassSecurityTrustHtml(html);
  });
}
