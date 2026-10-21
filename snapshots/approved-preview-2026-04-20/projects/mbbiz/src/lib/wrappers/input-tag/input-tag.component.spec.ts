import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbbizInputTagComponent, MbbizInputTagValue } from './input-tag.component';

describe('MbbizInputTagComponent', () => {
  let fixture: ComponentFixture<MbbizInputTagComponent>;
  let component: MbbizInputTagComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbbizInputTagComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MbbizInputTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render tags when provided', () => {
    fixture.componentRef.setInput('tags', ['name@add']);
    fixture.detectChanges();

    const chip = fixture.nativeElement.querySelector('.mbbiz-input-tag__chip');
    expect(chip?.textContent).toContain('name@add');
  });

  it('should render trailing clear action when enabled', () => {
    fixture.componentRef.setInput('tags', ['name@add']);
    fixture.componentRef.setInput('showTrailingClear', true);
    fixture.detectChanges();

    const clearButton = fixture.nativeElement.querySelector('.mbbiz-input-tag__clear');
    expect(clearButton).not.toBeNull();
  });

  it('should create a tag when pressing Enter', async () => {
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const emittedValues: MbbizInputTagValue[][] = [];
    component.tagsChange.subscribe((value) => emittedValues.push(value));

    input.value = 'name@add';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const chip = fixture.nativeElement.querySelector('.mbbiz-input-tag__chip');
    expect(chip?.textContent).toContain('name@add');
    expect(emittedValues.at(-1)).toEqual(['name@add']);
    expect(input.value).toBe('');
  });

  it('should remove the last tag when Backspace is pressed on an empty input', () => {
    fixture.componentRef.setInput('tags', ['first-tag', 'second-tag']);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace' }));
    fixture.detectChanges();

    const chips = fixture.nativeElement.querySelectorAll('.mbbiz-input-tag__chip');
    expect(chips.length).toBe(1);
    expect(chips[0].textContent).toContain('first-tag');
  });

  it('should support labelInValue tags', async () => {
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const emittedValues: unknown[] = [];

    fixture.componentRef.setInput('labelInValue', true);
    fixture.detectChanges();
    component.tagsChange.subscribe((value) => emittedValues.push(value));

    input.value = 'USD';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await fixture.whenStable();
    fixture.detectChanges();

    const chip = fixture.nativeElement.querySelector('.mbbiz-input-tag__chip');
    expect(chip?.textContent).toContain('USD');
    expect(emittedValues.at(-1)).toEqual([{ value: 'USD', label: 'USD' }]);
  });

  it('should collapse overflow tags when maxTagCount is set', () => {
    fixture.componentRef.setInput('tags', ['one', 'two', 'three', 'four']);
    fixture.componentRef.setInput('maxTagCount', 2);
    fixture.detectChanges();

    const chips = fixture.nativeElement.querySelectorAll(
      '.mbbiz-input-tag__content > .mbbiz-input-tag__chip',
    );
    const overflow = fixture.nativeElement.querySelector(
      '.mbbiz-input-tag__content > .mbbiz-input-tag__overflow-anchor .mbbiz-input-tag__overflow',
    );
    expect(chips.length).toBe(2);
    expect(overflow?.textContent?.trim()).toBe('+2');
  });

  it('should apply renderTag output to the visible chip', () => {
    fixture.componentRef.setInput('tags', ['usd']);
    fixture.componentRef.setInput('renderTag', ({ label }: { label: string }) => ({
      label: label.toUpperCase(),
      tone: 'brand',
    }));
    fixture.detectChanges();

    const chip = fixture.nativeElement.querySelector('.mbbiz-input-tag__chip');
    expect(chip?.textContent).toContain('USD');
    expect(chip?.classList.contains('mbbiz-input-tag__chip--brand')).toBe(true);
  });

  it('should tokenize input using separators', async () => {
    fixture.componentRef.setInput('tokenSeparators', [',', '|']);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = 'alpha,beta|';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    fixture.detectChanges();

    const chips = fixture.nativeElement.querySelectorAll('.mbbiz-input-tag__chip');
    expect(chips.length).toBe(2);
    expect(chips[0].textContent).toContain('alpha');
    expect(chips[1].textContent).toContain('beta');
  });

  it('should use validate to format tokenized values', async () => {
    fixture.componentRef.setInput('labelInValue', true);
    fixture.componentRef.setInput('tokenSeparators', [',']);
    fixture.componentRef.setInput('validate', (inputValue: string) => ({
      value: inputValue.toLowerCase(),
      label: inputValue.toUpperCase(),
    }));
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = 'Usd,';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    fixture.detectChanges();

    const chip = fixture.nativeElement.querySelector('.mbbiz-input-tag__chip');
    expect(chip?.textContent).toContain('USD');
  });

  it('should collapse tags responsively based on available width', () => {
    fixture.componentRef.setInput('tags', ['label 1', 'label 2', 'label 3', 'label 4', 'label 5']);
    fixture.componentRef.setInput('maxTagCount', 'responsive');
    fixture.detectChanges();

    const content = fixture.nativeElement.querySelector('.mbbiz-input-tag__content') as HTMLElement;
    const chips = fixture.nativeElement.querySelectorAll('.mbbiz-input-tag__measure-row .mbbiz-input-tag__chip');
    const overflow = fixture.nativeElement.querySelector('.mbbiz-input-tag__measure .mbbiz-input-tag__overflow') as HTMLElement;

    Object.defineProperty(content, 'clientWidth', { configurable: true, value: 300 });
    chips.forEach((chip: Element) => {
      Object.defineProperty(chip, 'offsetWidth', { configurable: true, value: 72 });
    });
    Object.defineProperty(overflow, 'offsetWidth', { configurable: true, get: () => 44 });

    (component as any).measureResponsiveLayout();
    fixture.detectChanges();

    const visibleChips = fixture.nativeElement.querySelectorAll(
      '.mbbiz-input-tag__content > .mbbiz-input-tag__chip',
    );
    const overflowLabel = fixture.nativeElement.querySelector(
      '.mbbiz-input-tag__content > .mbbiz-input-tag__overflow-anchor .mbbiz-input-tag__overflow',
    );

    expect(visibleChips.length).toBe(2);
    expect(overflowLabel?.textContent?.trim()).toBe('+3');
  });

  it('should render hidden tags inside the overflow popover', () => {
    fixture.componentRef.setInput('tags', ['1', '2', '3', '4', '5']);
    fixture.componentRef.setInput('maxTagCount', 3);
    fixture.detectChanges();

    const popoverChips = fixture.nativeElement.querySelectorAll(
      '.mbbiz-input-tag__overflow-popover .mbbiz-input-tag__chip',
    );

    expect(popoverChips.length).toBe(2);
    expect(popoverChips[0].textContent).toContain('4');
    expect(popoverChips[1].textContent).toContain('5');
  });
});
