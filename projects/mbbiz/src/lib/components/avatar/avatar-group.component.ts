import { Component, input } from '@angular/core';

@Component({
  selector: 'mbbiz-avatar-group',
  template: `<ng-content />`,
  styleUrl: './avatar-group.component.scss',
  host: {
    class: 'mbbiz-avatar-group',
    '[style.--mbbiz-avatar-group-overlap]': 'overlap() + "px"',
  },
})
export class MbbizAvatarGroupComponent {
  readonly overlap = input(8);
}
