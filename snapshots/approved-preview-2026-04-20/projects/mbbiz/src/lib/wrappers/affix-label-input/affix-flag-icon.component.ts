import { Component, input } from '@angular/core';

export type MbbizAffixFlagCode = 'vnd' | 'usd' | 'krw' | 'gbp' | 'cad' | 'thb';

@Component({
  selector: 'mbbiz-affix-flag-icon',
  standalone: true,
  template: `
    @switch (code()) {
      @case ('vnd') {
        <svg class="mbbiz-affix-flag" viewBox="0 0 20 20" aria-hidden="true">
          <circle cx="10" cy="10" r="10" fill="#DD2033" />
          <path
            d="M10 4.45L11.36 7.39L14.58 7.77L12.2 10.02L12.84 13.16L10 11.58L7.16 13.16L7.8 10.02L5.42 7.77L8.64 7.39L10 4.45Z"
            fill="#FBD381"
          />
        </svg>
      }
      @case ('usd') {
        <svg class="mbbiz-affix-flag" viewBox="0 0 20 20" aria-hidden="true">
          <defs>
            <clipPath id="sb-affix-flag-usd-circle">
              <circle cx="10" cy="10" r="10" />
            </clipPath>
          </defs>
          <g clip-path="url(#sb-affix-flag-usd-circle)">
            <rect width="20" height="20" fill="#F5F7F8" />
            <rect y="0" width="20" height="2" fill="#DD2033" />
            <rect y="4" width="20" height="2" fill="#DD2033" />
            <rect y="8" width="20" height="2" fill="#DD2033" />
            <rect y="12" width="20" height="2" fill="#DD2033" />
            <rect y="16" width="20" height="2" fill="#DD2033" />
            <rect width="9" height="9" fill="#004692" />
            <g fill="#F5F7F8">
              <circle cx="2.2" cy="2.2" r="0.7" />
              <circle cx="4.5" cy="2.2" r="0.7" />
              <circle cx="6.8" cy="2.2" r="0.7" />
              <circle cx="3.3" cy="4.4" r="0.7" />
              <circle cx="5.6" cy="4.4" r="0.7" />
              <circle cx="2.2" cy="6.5" r="0.7" />
              <circle cx="4.5" cy="6.5" r="0.7" />
              <circle cx="6.8" cy="6.5" r="0.7" />
            </g>
          </g>
        </svg>
      }
      @case ('krw') {
        <svg class="mbbiz-affix-flag" viewBox="0 0 20 20" aria-hidden="true">
          <defs>
            <clipPath id="sb-affix-flag-krw-circle">
              <circle cx="10" cy="10" r="10" />
            </clipPath>
          </defs>
          <g clip-path="url(#sb-affix-flag-krw-circle)">
            <rect width="20" height="20" fill="#F5F7F8" />
            <path d="M10 6.1A3.9 3.9 0 0 1 13.9 10H10V6.1Z" fill="#DD2033" />
            <path d="M10 13.9A3.9 3.9 0 0 1 6.1 10H10V13.9Z" fill="#004692" />
            <path d="M10 6.1A3.9 3.9 0 0 0 6.1 10C6.1 11 6.5 11.8 7.15 12.45A2.1 2.1 0 0 0 10 9.6V6.1Z" fill="#DD2033" />
            <path d="M10 13.9A3.9 3.9 0 0 0 13.9 10C13.9 9 13.5 8.2 12.85 7.55A2.1 2.1 0 0 0 10 10.4V13.9Z" fill="#004692" />
            <g stroke="#31373D" stroke-width="0.9" stroke-linecap="round">
              <path d="M4 5L5.6 4.2" />
              <path d="M4.5 6L6.1 5.2" />
              <path d="M5 7L6.6 6.2" />
              <path d="M13.4 13.8L15 13" />
              <path d="M13.9 14.8L15.5 14" />
              <path d="M14.4 15.8L16 15" />
              <path d="M13.8 5.1L15.3 6" />
              <path d="M13.2 6.1L14.7 7" />
              <path d="M12.6 7.1L14.1 8" />
              <path d="M5.7 12.2L4.2 13.1" />
              <path d="M6.3 13.2L4.8 14.1" />
              <path d="M6.9 14.2L5.4 15.1" />
            </g>
          </g>
        </svg>
      }
      @case ('gbp') {
        <svg class="mbbiz-affix-flag" viewBox="0 0 20 20" aria-hidden="true">
          <defs>
            <clipPath id="sb-affix-flag-gbp-circle">
              <circle cx="10" cy="10" r="10" />
            </clipPath>
          </defs>
          <g clip-path="url(#sb-affix-flag-gbp-circle)">
            <rect width="20" height="20" fill="#004692" />
            <path d="M0 2.2L2.2 0L20 17.8L17.8 20L0 2.2Z" fill="#F5F7F8" />
            <path d="M17.8 0L20 2.2L2.2 20L0 17.8L17.8 0Z" fill="#F5F7F8" />
            <path d="M0 3.6L3.6 0L20 16.4L16.4 20L0 3.6Z" fill="#DD2033" />
            <path d="M16.4 0L20 3.6L3.6 20L0 16.4L16.4 0Z" fill="#DD2033" />
            <rect x="7.2" width="5.6" height="20" fill="#F5F7F8" />
            <rect y="7.2" width="20" height="5.6" fill="#F5F7F8" />
            <rect x="8.3" width="3.4" height="20" fill="#DD2033" />
            <rect y="8.3" width="20" height="3.4" fill="#DD2033" />
          </g>
        </svg>
      }
      @case ('cad') {
        <svg class="mbbiz-affix-flag" viewBox="0 0 20 20" aria-hidden="true">
          <defs>
            <clipPath id="sb-affix-flag-cad-circle">
              <circle cx="10" cy="10" r="10" />
            </clipPath>
          </defs>
          <g clip-path="url(#sb-affix-flag-cad-circle)">
            <rect width="20" height="20" fill="#DD2033" />
            <rect x="5.2" width="9.6" height="20" fill="#F5F7F8" />
            <path
              d="M10 4.7L10.95 6.7L12.6 5.95L11.95 7.9L13.65 8.55L11.75 9.25L12.55 11.35L10.8 10.7L10 13.5L9.2 10.7L7.45 11.35L8.25 9.25L6.35 8.55L8.05 7.9L7.4 5.95L9.05 6.7L10 4.7Z"
              fill="#DD2033"
            />
          </g>
        </svg>
      }
      @case ('thb') {
        <svg class="mbbiz-affix-flag" viewBox="0 0 20 20" aria-hidden="true">
          <defs>
            <clipPath id="sb-affix-flag-thb-circle">
              <circle cx="10" cy="10" r="10" />
            </clipPath>
          </defs>
          <g clip-path="url(#sb-affix-flag-thb-circle)">
            <rect width="20" height="20" fill="#A00009" />
            <rect y="3.2" width="20" height="3" fill="#F5F7F8" />
            <rect y="7" width="20" height="6" fill="#004692" />
            <rect y="13.8" width="20" height="3" fill="#F5F7F8" />
          </g>
        </svg>
      }
    }
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        flex: 0 0 auto;
      }

      .mbbiz-affix-flag {
        display: block;
        height: 20px;
        width: 20px;
      }
    `,
  ],
})
export class MbbizAffixFlagIconComponent {
  readonly code = input.required<MbbizAffixFlagCode>();
}
