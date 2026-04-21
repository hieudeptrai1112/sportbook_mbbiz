import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sportbook6vnButtonComponent } from './button.component';

@Component({
  imports: [Sportbook6vnButtonComponent],
  template: `
    <sportbook6vn-button>
      <span sportbook6vnButtonStartIcon>+</span>
      Text
      <span sportbook6vnButtonEndIcon>+</span>
    </sportbook6vn-button>
  `,
})
class TestButtonHostComponent {
}

describe('Sportbook6vnButtonComponent', () => {
  let fixture: ComponentFixture<Sportbook6vnButtonComponent>;
  let component: Sportbook6vnButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sportbook6vnButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Sportbook6vnButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable native button while loading', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    expect(button.getAttribute('aria-busy')).toBe('true');
  });

  it('should render projected start and end icons', async () => {
    const hostFixture = TestBed.createComponent(TestButtonHostComponent);
    hostFixture.detectChanges();

    const icons = hostFixture.nativeElement.querySelectorAll('.sportbook6vn-button__icon');
    expect(icons.length).toBe(2);
    expect(icons[0].textContent).toContain('+');
    expect(icons[1].textContent).toContain('+');
  });
});
