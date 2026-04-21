import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sportbook6vnAffixLabelInputComponent } from './affix-label-input.component';

describe('Sportbook6vnAffixLabelInputComponent', () => {
  let fixture: ComponentFixture<Sportbook6vnAffixLabelInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sportbook6vnAffixLabelInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Sportbook6vnAffixLabelInputComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render configured affix labels', () => {
    fixture.componentRef.setInput('prefixLabel', 'Loại tiền');
    fixture.componentRef.setInput('suffixLabel', 'Loại tiền');
    fixture.detectChanges();

    const affixes = fixture.nativeElement.querySelectorAll('.sportbook6vn-affix-label-input__affix');
    expect(affixes.length).toBe(2);
  });

  it('should render dropdown affix trigger when dropdown items are provided', () => {
    fixture.componentRef.setInput('prefixLabel', 'Loại tiền');
    fixture.componentRef.setInput('prefixDropdownItems', [{ id: 'vnd', label: 'VND' }]);
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('.sportbook6vn-affix-label-input__affix--dropdown');
    expect(trigger?.textContent).toContain('Loại tiền');
  });

  it('should render dropdown panel when prefix affix is open', () => {
    fixture.componentRef.setInput('prefixLabel', 'Loại tiền');
    fixture.componentRef.setInput('prefixDropdownItems', [{ id: 'vnd', label: 'VND' }]);
    fixture.componentRef.setInput('openAffix', 'prefix');
    fixture.detectChanges();

    const panel = fixture.nativeElement.querySelector('.sportbook6vn-affix-label-input__panel');
    expect(panel).not.toBeNull();
  });

  it('should render selected affix image when dropdown item has imageUrl', () => {
    fixture.componentRef.setInput('prefixLabel', 'Loại tiền');
    fixture.componentRef.setInput('prefixDropdownItems', [
      { id: 'vnd', label: 'VND', imageUrl: 'https://example.com/vnd.png' },
    ]);
    fixture.componentRef.setInput('prefixDropdownValue', 'vnd');
    fixture.detectChanges();

    const image = fixture.nativeElement.querySelector('.sportbook6vn-affix-label-input__affix-image');
    expect(image?.getAttribute('src')).toContain('vnd.png');
  });
});
