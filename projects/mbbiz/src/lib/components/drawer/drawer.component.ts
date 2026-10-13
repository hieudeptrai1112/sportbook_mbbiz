import { Component, ViewEncapsulation, input, output } from '@angular/core';
import { IconComponent } from '@mbbiz/icon/angular';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'mbbiz-drawer',
  imports: [IconComponent, NzDrawerModule],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class MbbizDrawerComponent {
  readonly visible = input(false);
  readonly title = input('Title');
  readonly closable = input(true);
  readonly closeAriaLabel = input('Đóng');

  readonly visibleChange = output<boolean>();
  readonly close = output<MouseEvent>();

  protected readonly maskStyle = {
    background: 'var(--color-semantic-overlay-primary, #00000080)',
  };

  protected onVisibleChange(open: boolean): void {
    this.visibleChange.emit(open);
  }

  protected onNzClose(event: MouseEvent): void {
    this.visibleChange.emit(false);
    this.close.emit(event);
  }

  protected onCloseClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.visibleChange.emit(false);
    this.close.emit(event);
  }
}
