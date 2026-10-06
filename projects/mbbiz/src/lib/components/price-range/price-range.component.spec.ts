import { TestBed } from '@angular/core/testing';
import { AboldErrorIcon, AlinearRightIcon } from '@mbbiz/icon';
import { provideIcons } from '@mbbiz/icon/angular';

import { MbbizPriceRangeComponent } from './price-range.component';
import type { MbbizPriceRangeValue } from './price-range.types';

describe('MbbizPriceRangeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbbizPriceRangeComponent],
      providers: [provideIcons([AlinearRightIcon, AboldErrorIcon])],
    }).compileComponents();
  });

  it('renders the Large dual amount field with Figma labels', () => {
    const fixture = TestBed.createComponent(MbbizPriceRangeComponent);
    fixture.detectChanges();

    const inputs = fixture.nativeElement.querySelectorAll(
      '.mbbiz-price-range__input',
    ) as NodeListOf<HTMLInputElement>;

    expect(fixture.nativeElement.querySelector('.mbbiz-price-range__label').textContent.trim()).toBe(
      'Khoảng tiền (VNĐ)',
    );
    expect(inputs.length).toBe(2);
    expect(inputs[0].placeholder).toBe('Từ số tiền');
    expect(inputs[1].placeholder).toBe('Đến số tiền');
  });

  it('formats typed amounts with Vietnamese thousand dots', () => {
    const fixture = TestBed.createComponent(MbbizPriceRangeComponent);
    fixture.detectChanges();

    const from = fixture.nativeElement.querySelectorAll(
      '.mbbiz-price-range__input',
    )[0] as HTMLInputElement;
    from.value = '1000000';
    from.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(from.value).toBe('1.000.000');
  });

  it('emits formatted from/to values', () => {
    const fixture = TestBed.createComponent(MbbizPriceRangeComponent);
    const emitted: MbbizPriceRangeValue[] = [];
    fixture.componentInstance.valueChange.subscribe((value) => emitted.push(value));
    fixture.detectChanges();

    const to = fixture.nativeElement.querySelectorAll(
      '.mbbiz-price-range__input',
    )[1] as HTMLInputElement;
    to.value = '10000000';
    to.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(emitted).toEqual([{ from: '', to: '10.000.000' }]);
  });

  it('shows the error row with message', () => {
    const fixture = TestBed.createComponent(MbbizPriceRangeComponent);
    fixture.componentRef.setInput('status', 'error');
    fixture.componentRef.setInput('errorMessage', 'Error message');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.mbbiz-price-range__error p').textContent.trim()).toBe(
      'Error message',
    );
    expect(fixture.nativeElement.querySelector('.mbbiz-price-range__field--status-error')).toBeTruthy();
  });

  it('uses icon/neutral5 for the empty arrow and icon/neutral4 when filled', () => {
    const fixture = TestBed.createComponent(MbbizPriceRangeComponent);
    fixture.detectChanges();

    const component = fixture.componentInstance as MbbizPriceRangeComponent & {
      arrowColor: () => string;
    };

    expect(component.arrowColor()).toContain('icon-neutral5');

    fixture.componentRef.setInput('fromValue', '1000000');
    fixture.detectChanges();

    expect(component.arrowColor()).toContain('icon-neutral4');
  });

  it('blocks typing when disabled', () => {
    const fixture = TestBed.createComponent(MbbizPriceRangeComponent);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const from = fixture.nativeElement.querySelectorAll(
      '.mbbiz-price-range__input',
    )[0] as HTMLInputElement;

    expect(from.disabled).toBe(true);
    expect(fixture.nativeElement.querySelector('.mbbiz-price-range__field--disabled')).toBeTruthy();
  });
});
