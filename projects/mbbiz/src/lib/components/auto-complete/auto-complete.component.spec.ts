import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboldErrorIcon } from '@mbbiz/icon';
import { provideIcons } from '@mbbiz/icon/angular';

import { MbbizAutoCompleteComponent } from './auto-complete.component';

const ITEMS = [
  { id: 'ss', label: 'ss' },
  { id: 'ssss', label: 'ssss' },
  { id: 'ssssss', label: 'ssssss' },
  { id: 'burns', label: 'Burns Bay Road' },
  { id: 'disabled', label: 'Disabled', disabled: true },
];

describe('MbbizAutoCompleteComponent', () => {
  let fixture: ComponentFixture<MbbizAutoCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbbizAutoCompleteComponent],
      providers: [provideIcons([AboldErrorIcon])],
    }).compileComponents();

    fixture = TestBed.createComponent(MbbizAutoCompleteComponent);
    fixture.componentRef.setInput('items', ITEMS);
    fixture.detectChanges();
  });

  it('does not open on focus; closes when the query has no matches', () => {
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.dispatchEvent(new Event('focusin', { bubbles: true }));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.mbbiz-auto-complete__panel')).toBeNull();

    input.value = 'ss';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.mbbiz-auto-complete__option').length).toBe(3);

    input.value = 'ffff';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.mbbiz-auto-complete__panel')).toBeNull();
  });

  it('filters options without matching case', () => {
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = 'burns';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();

    const labels = Array.from(
      fixture.nativeElement.querySelectorAll('.mbbiz-auto-complete__option-label') as NodeListOf<HTMLElement>,
    ).map((node) => node.textContent?.trim());

    expect(labels).toEqual(['Burns Bay Road']);
  });

  it('fills the input with the option label on click', () => {
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = 'ss';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();

    fixture.nativeElement.querySelector('.mbbiz-auto-complete__option').click();
    fixture.detectChanges();

    expect((fixture.nativeElement.querySelector('input') as HTMLInputElement).value).toBe('ss');
    expect(fixture.nativeElement.querySelector('.mbbiz-auto-complete__panel')).toBeNull();
  });

  it('opens on ArrowDown and selects the next option on ArrowDown then Enter', () => {
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.mbbiz-auto-complete__option').length).toBe(5);

    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    fixture.detectChanges();

    expect((fixture.nativeElement.querySelector('input') as HTMLInputElement).value).toBe('ssss');
  });

  it('closes on Escape without changing the typed value', () => {
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = 'ss';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();

    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();

    expect(input.value).toBe('ss');
    expect(fixture.nativeElement.querySelector('.mbbiz-auto-complete__panel')).toBeNull();
  });

  it('renders the Price Range error row', () => {
    fixture.componentRef.setInput('status', 'error');
    fixture.componentRef.setInput('errorMessage', 'Error message');
    fixture.detectChanges();

    const error = fixture.nativeElement.querySelector('.mbbiz-auto-complete__error') as HTMLElement;
    expect(error.textContent).toContain('Error message');
    expect(error.querySelector('mbiz-icon')).toBeTruthy();
  });
});
