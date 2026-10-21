import { TestBed } from '@angular/core/testing';

import { MbbizTooltipComponent } from './tooltip.component';

describe('MbbizTooltipComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbbizTooltipComponent],
    }).compileComponents();
  });

  it('renders the default top-left tooltip', () => {
    const fixture = TestBed.createComponent(MbbizTooltipComponent);
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.mbbiz-tooltip') as HTMLElement;
    const body = fixture.nativeElement.querySelector('.mbbiz-tooltip__body') as HTMLElement;

    expect(root.classList).toContain('mbbiz-tooltip--top');
    expect(root.classList).toContain('mbbiz-tooltip--side-left');
    expect(body.textContent?.trim()).toBe('Text');
  });

  it('maps position and side variants', () => {
    const fixture = TestBed.createComponent(MbbizTooltipComponent);
    fixture.componentRef.setInput('position', 'right');
    fixture.componentRef.setInput('side', 'center');
    fixture.componentRef.setInput('text', 'Hint');
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.mbbiz-tooltip') as HTMLElement;
    const body = fixture.nativeElement.querySelector('.mbbiz-tooltip__body') as HTMLElement;

    expect(root.classList).toContain('mbbiz-tooltip--right');
    expect(root.classList).toContain('mbbiz-tooltip--side-center');
    expect(body.textContent?.trim()).toBe('Hint');
  });

  it('stays hidden until hover when used as a trigger', () => {
    const fixture = TestBed.createComponent(MbbizTooltipComponent);
    fixture.componentRef.setInput('trigger', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.mbbiz-tooltip')).toBeNull();

    fixture.nativeElement.querySelector('.mbbiz-tooltip-host').dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.mbbiz-tooltip')).not.toBeNull();
  });

  it('points the arrow at the trigger when anchored', () => {
    const fixture = TestBed.createComponent(MbbizTooltipComponent);
    fixture.componentRef.setInput('trigger', true);
    fixture.componentRef.setInput('position', 'bottom');
    fixture.componentRef.setInput('side', 'left');
    fixture.detectChanges();

    fixture.nativeElement.querySelector('.mbbiz-tooltip-host').dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.mbbiz-tooltip') as HTMLElement;
    expect(root.classList).toContain('mbbiz-tooltip--anchored');
    expect(root.classList).toContain('mbbiz-tooltip--bottom');
  });
});
