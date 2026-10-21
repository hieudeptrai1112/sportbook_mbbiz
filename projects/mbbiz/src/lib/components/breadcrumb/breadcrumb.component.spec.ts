import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { MbbizBreadcrumbComponent } from './breadcrumb.component';
import { MbbizBreadcrumbItem } from './breadcrumb.types';

describe('MbbizBreadcrumbComponent', () => {
  it('renders generated breadcrumb items from amount', () => {
    @Component({
      imports: [MbbizBreadcrumbComponent],
      template: `<mbbiz-breadcrumb [amount]="5" />`,
    })
    class MbbizBreadcrumbAmountTestHostComponent {}

    const fixture = TestBed.createComponent(MbbizBreadcrumbAmountTestHostComponent);
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('nz-breadcrumb-item');
    const labels = fixture.nativeElement.querySelectorAll('.mbbiz-breadcrumb__label');

    expect(items.length).toBe(5);
    expect(labels[4].getAttribute('aria-current')).toBe('page');
  });

  it('renders custom item labels and emits item clicks', () => {
    @Component({
      imports: [MbbizBreadcrumbComponent],
      template: `
        <mbbiz-breadcrumb
          [items]="items"
          (itemClick)="clickedItem = $event"
        />
      `,
    })
    class MbbizBreadcrumbItemsTestHostComponent {
      readonly items: readonly MbbizBreadcrumbItem[] = [
        { label: 'Home', href: '#' },
        { label: 'Sports', href: '#' },
        { label: 'Detail' },
      ];
      clickedItem: MbbizBreadcrumbItem | null = null;
    }

    const fixture = TestBed.createComponent(MbbizBreadcrumbItemsTestHostComponent);
    fixture.detectChanges();

    const links = fixture.nativeElement.querySelectorAll('a.mbbiz-breadcrumb__label') as NodeListOf<HTMLAnchorElement>;
    links[1].click();

    expect(fixture.componentInstance.clickedItem).toEqual({ label: 'Sports', href: '#' });
  });

  it('applies the forced visual state class for preview states', () => {
    @Component({
      imports: [MbbizBreadcrumbComponent],
      template: `<mbbiz-breadcrumb state="focus" />`,
    })
    class MbbizBreadcrumbStateTestHostComponent {}

    const fixture = TestBed.createComponent(MbbizBreadcrumbStateTestHostComponent);
    fixture.detectChanges();

    const breadcrumb = fixture.nativeElement.querySelector('.mbbiz-breadcrumb');
    expect(breadcrumb.classList).toContain('mbbiz-breadcrumb--state-focus');
  });
});
