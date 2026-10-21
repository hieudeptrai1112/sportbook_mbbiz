import { TestBed } from '@angular/core/testing';

import { MbbizRatingComponent } from './rating.component';

describe('MbbizRatingComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbbizRatingComponent],
    }).compileComponents();
  });

  it('renders five stars with Star=1 selected by default', () => {
    const fixture = TestBed.createComponent(MbbizRatingComponent);
    fixture.detectChanges();

    const stars = fixture.nativeElement.querySelectorAll('.mbbiz-rating__star') as NodeListOf<HTMLElement>;

    expect(stars.length).toBe(5);
    expect(stars[0].classList).toContain('mbbiz-rating__star--selected');
    expect(stars[1].classList).toContain('mbbiz-rating__star--default');
  });

  it('keeps Default and Selected stars on the same glyph size', () => {
    const fixture = TestBed.createComponent(MbbizRatingComponent);
    fixture.detectChanges();

    const icons = fixture.nativeElement.querySelectorAll('.mbbiz-rating__icon') as NodeListOf<SVGElement>;
    const paths = fixture.nativeElement.querySelectorAll('.mbbiz-rating__icon path') as NodeListOf<SVGPathElement>;

    expect(icons[0].getAttribute('width')).toBe(icons[1].getAttribute('width'));
    expect(icons[0].getAttribute('height')).toBe(icons[1].getAttribute('height'));
    expect(paths[0].getAttribute('d')).toBe(paths[1].getAttribute('d'));
    expect(paths[0].getAttribute('stroke-width')).toBeNull();
    expect(paths[1].getAttribute('stroke-width')).toBeNull();
  });

  it('maps the Star=1–5 variants', () => {
    const fixture = TestBed.createComponent(MbbizRatingComponent);
    fixture.componentRef.setInput('value', 3);
    fixture.detectChanges();

    const stars = fixture.nativeElement.querySelectorAll('.mbbiz-rating__star') as NodeListOf<HTMLElement>;

    expect(stars[0].classList).toContain('mbbiz-rating__star--selected');
    expect(stars[1].classList).toContain('mbbiz-rating__star--selected');
    expect(stars[2].classList).toContain('mbbiz-rating__star--selected');
    expect(stars[3].classList).toContain('mbbiz-rating__star--default');
  });

  it('previews Hover on stars past the selected value', () => {
    const fixture = TestBed.createComponent(MbbizRatingComponent);
    fixture.componentRef.setInput('value', 1);
    fixture.detectChanges();

    const stars = fixture.nativeElement.querySelectorAll('.mbbiz-rating__star') as NodeListOf<HTMLElement>;
    stars[2].dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();

    expect(stars[0].classList).toContain('mbbiz-rating__star--selected');
    expect(stars[1].classList).toContain('mbbiz-rating__star--hover');
    expect(stars[2].classList).toContain('mbbiz-rating__star--hover');
    expect(stars[3].classList).toContain('mbbiz-rating__star--default');
  });

  it('emits the clicked star value', () => {
    const fixture = TestBed.createComponent(MbbizRatingComponent);
    const emitted: number[] = [];
    fixture.componentInstance.valueChange.subscribe((value) => emitted.push(value));
    fixture.detectChanges();

    fixture.nativeElement.querySelectorAll('.mbbiz-rating__star')[3].click();
    fixture.detectChanges();

    expect(emitted).toEqual([4]);
    expect(
      (fixture.nativeElement.querySelectorAll('.mbbiz-rating__star')[3] as HTMLElement).classList,
    ).toContain('mbbiz-rating__star--selected');
  });
});
