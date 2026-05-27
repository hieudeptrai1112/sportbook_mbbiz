import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { Sportbook6vnBreadcrumbComponent } from './breadcrumb.component';
import { Sportbook6vnBreadcrumbItem } from './breadcrumb.types';

describe('Sportbook6vnBreadcrumbComponent', () => {
  it('renders generated breadcrumb items from amount', () => {
    @Component({
      imports: [Sportbook6vnBreadcrumbComponent],
      template: `<sportbook6vn-breadcrumb [amount]="5" />`,
    })
    class Sportbook6vnBreadcrumbAmountTestHostComponent {}

    const fixture = TestBed.createComponent(Sportbook6vnBreadcrumbAmountTestHostComponent);
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('nz-breadcrumb-item');
    const labels = fixture.nativeElement.querySelectorAll('.sportbook6vn-breadcrumb__label');

    expect(items.length).toBe(5);
    expect(labels[4].getAttribute('aria-current')).toBe('page');
  });

  it('renders custom item labels and emits item clicks', () => {
    @Component({
      imports: [Sportbook6vnBreadcrumbComponent],
      template: `
        <sportbook6vn-breadcrumb
          [items]="items"
          (itemClick)="clickedItem = $event"
        />
      `,
    })
    class Sportbook6vnBreadcrumbItemsTestHostComponent {
      readonly items: readonly Sportbook6vnBreadcrumbItem[] = [
        { label: 'Home', href: '#' },
        { label: 'Sports', href: '#' },
        { label: 'Detail' },
      ];
      clickedItem: Sportbook6vnBreadcrumbItem | null = null;
    }

    const fixture = TestBed.createComponent(Sportbook6vnBreadcrumbItemsTestHostComponent);
    fixture.detectChanges();

    const links = fixture.nativeElement.querySelectorAll('a.sportbook6vn-breadcrumb__label') as NodeListOf<HTMLAnchorElement>;
    links[1].click();

    expect(fixture.componentInstance.clickedItem).toEqual({ label: 'Sports', href: '#' });
  });

  it('applies the forced visual state class for preview states', () => {
    @Component({
      imports: [Sportbook6vnBreadcrumbComponent],
      template: `<sportbook6vn-breadcrumb state="focus" />`,
    })
    class Sportbook6vnBreadcrumbStateTestHostComponent {}

    const fixture = TestBed.createComponent(Sportbook6vnBreadcrumbStateTestHostComponent);
    fixture.detectChanges();

    const breadcrumb = fixture.nativeElement.querySelector('.sportbook6vn-breadcrumb');
    expect(breadcrumb.classList).toContain('sportbook6vn-breadcrumb--state-focus');
  });
});
