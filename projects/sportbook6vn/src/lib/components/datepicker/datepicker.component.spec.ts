import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { Sportbook6vnDatepickerComponent } from './datepicker.component';
import { Sportbook6vnDatepickerCell, Sportbook6vnDatepickerRangeValue } from './datepicker.types';

@Component({
  imports: [Sportbook6vnDatepickerComponent],
  template: `
    <sportbook6vn-datepicker
      [open]="open"
      [value]="value"
      [dayCells]="dayCells"
      (openChange)="openChange = $event"
      (valueChange)="valueChange = $event"
    />
  `,
})
class Sportbook6vnDatepickerTestHostComponent {
  open = false;
  value: string | null = null;
  openChange = false;
  valueChange: string | null = null;
  dayCells: readonly Sportbook6vnDatepickerCell[] = [
    { label: '1', value: '2026-10-01' },
    { label: '2', value: '2026-10-02', disabled: true },
  ];
}

describe('Sportbook6vnDatepickerComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sportbook6vnDatepickerTestHostComponent],
    }).compileComponents();
  });

  it('emits open state when trigger is clicked', () => {
    const fixture = TestBed.createComponent(Sportbook6vnDatepickerTestHostComponent);
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('.sportbook6vn-datepicker__trigger') as HTMLButtonElement;
    trigger.click();

    expect(fixture.componentInstance.openChange).toBe(true);
  });

  it('emits selected day value', () => {
    const fixture = TestBed.createComponent(Sportbook6vnDatepickerTestHostComponent);
    fixture.componentInstance.open = true;
    fixture.detectChanges();

    const day = fixture.nativeElement.querySelector('.sportbook6vn-datepicker__day') as HTMLButtonElement;
    day.click();

    expect(fixture.componentInstance.valueChange).toBe('2026-10-01');
  });

  it('does not emit when disabled day is clicked', () => {
    const fixture = TestBed.createComponent(Sportbook6vnDatepickerTestHostComponent);
    fixture.componentInstance.open = true;
    fixture.detectChanges();

    const days = fixture.nativeElement.querySelectorAll('.sportbook6vn-datepicker__day') as NodeListOf<HTMLButtonElement>;
    days[1].click();

    expect(fixture.componentInstance.valueChange).toBeNull();
  });

  it('emits range value for range mode', () => {
    @Component({
      imports: [Sportbook6vnDatepickerComponent],
      template: `
        <sportbook6vn-datepicker
          mode="range"
          [open]="true"
          [dayCells]="dayCells"
          (rangeChange)="rangeChange = $event"
        />
      `,
    })
    class Sportbook6vnRangeDatepickerTestHostComponent {
      rangeChange: Sportbook6vnDatepickerRangeValue | null = null;
      dayCells: readonly Sportbook6vnDatepickerCell[] = [{ label: '1', value: '2026-10-01' }];
    }

    const fixture = TestBed.createComponent(Sportbook6vnRangeDatepickerTestHostComponent);
    fixture.detectChanges();

    const day = fixture.nativeElement.querySelector('.sportbook6vn-datepicker__day') as HTMLButtonElement;
    day.click();

    expect(fixture.componentInstance.rangeChange).toEqual({
      start: '2026-10-01',
      end: null,
    });
  });

  it('selects start and end dates after explicitly focusing each range input', () => {
    @Component({
      imports: [Sportbook6vnDatepickerComponent],
      template: `
        <sportbook6vn-datepicker
          mode="range"
          field="input"
          [open]="true"
          [dayCells]="dayCells"
          (rangeChange)="rangeChange = $event"
        />
      `,
    })
    class Sportbook6vnInteractiveRangeDatepickerTestHostComponent {
      rangeChange: Sportbook6vnDatepickerRangeValue | null = null;
      dayCells: readonly Sportbook6vnDatepickerCell[] = [
        { label: '15', value: '2026-10-15' },
        { label: '23', value: '2026-10-23' },
      ];
    }

    const fixture = TestBed.createComponent(Sportbook6vnInteractiveRangeDatepickerTestHostComponent);
    fixture.detectChanges();

    const days = fixture.nativeElement.querySelectorAll(
      '.sportbook6vn-datepicker__day',
    ) as NodeListOf<HTMLButtonElement>;
    const inputs = fixture.nativeElement.querySelectorAll(
      '.sportbook6vn-datepicker__range-control',
    ) as NodeListOf<HTMLInputElement>;

    inputs[0].focus();
    fixture.detectChanges();
    days[0].click();
    fixture.detectChanges();
    inputs[1].focus();
    fixture.detectChanges();
    days[1].click();

    expect(fixture.componentInstance.rangeChange).toEqual({
      start: '2026-10-15',
      end: '2026-10-23',
    });
  });

  it('keeps the end date selectable after choosing a start date in range date time mode', () => {
    @Component({
      imports: [Sportbook6vnDatepickerComponent],
      template: `
        <sportbook6vn-datepicker
          mode="range"
          field="input"
          [open]="true"
          [showTime]="true"
          [dayCells]="dayCells"
          (rangeChange)="rangeChange = $event"
        />
      `,
    })
    class Sportbook6vnInteractiveRangeDateTimeEndDateTestHostComponent {
      rangeChange: Sportbook6vnDatepickerRangeValue | null = null;
      dayCells: readonly Sportbook6vnDatepickerCell[] = [
        { label: '10', value: '2026-10-10' },
        { label: '15', value: '2026-10-15' },
      ];
    }

    const fixture = TestBed.createComponent(Sportbook6vnInteractiveRangeDateTimeEndDateTestHostComponent);
    fixture.detectChanges();

    const days = fixture.nativeElement.querySelectorAll(
      '.sportbook6vn-datepicker__day',
    ) as NodeListOf<HTMLButtonElement>;
    const values = fixture.nativeElement.querySelectorAll(
      '.sportbook6vn-datepicker__range-value',
    ) as NodeListOf<HTMLElement>;

    values[0].click();
    fixture.detectChanges();
    days[0].click();
    fixture.detectChanges();
    values[1].click();
    fixture.detectChanges();
    days[1].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.rangeChange).toEqual({
      start: '2026-10-10',
      end: '2026-10-15',
    });
    expect(values[0].textContent?.trim()).toBe('10/10/2026');
    expect(values[1].textContent?.trim()).toBe('15/10/2026');
  });

  it('keeps both date and time visible when completing a range date time selection', () => {
    @Component({
      imports: [Sportbook6vnDatepickerComponent],
      template: `
        <sportbook6vn-datepicker
          mode="range"
          field="input"
          [open]="true"
          [showTime]="true"
          [dayCells]="dayCells"
          [timeCells]="timeCells"
          (rangeChange)="rangeChange = $event"
        />
      `,
    })
    class Sportbook6vnInteractiveRangeDateTimeCompleteTestHostComponent {
      rangeChange: Sportbook6vnDatepickerRangeValue | null = null;
      dayCells: readonly Sportbook6vnDatepickerCell[] = [
        { label: '10', value: '2026-10-10' },
        { label: '15', value: '2026-10-15' },
      ];
      timeCells: readonly Sportbook6vnDatepickerCell[] = [
        { label: '01:00', value: '01:00' },
        { label: '01:30', value: '01:30' },
      ];
    }

    const fixture = TestBed.createComponent(Sportbook6vnInteractiveRangeDateTimeCompleteTestHostComponent);
    fixture.detectChanges();

    const days = fixture.nativeElement.querySelectorAll(
      '.sportbook6vn-datepicker__day',
    ) as NodeListOf<HTMLButtonElement>;
    const values = fixture.nativeElement.querySelectorAll(
      '.sportbook6vn-datepicker__range-value',
    ) as NodeListOf<HTMLElement>;

    values[0].click();
    fixture.detectChanges();
    days[0].click();
    fixture.detectChanges();

    const times = fixture.nativeElement.querySelectorAll(
      '.sportbook6vn-datepicker__time',
    ) as NodeListOf<HTMLButtonElement>;
    times[0].click();
    fixture.detectChanges();

    values[1].click();
    fixture.detectChanges();
    days[1].click();
    fixture.detectChanges();

    times[1].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.rangeChange).toEqual({
      start: '2026-10-10 01:00',
      end: '2026-10-15 01:30',
    });
    expect(values[0].textContent?.trim()).toBe('10/10/2026 01:00');
    expect(values[1].textContent?.trim()).toBe('15/10/2026 01:30');
  });

  it('allows selecting the end date after explicitly focusing the end range value', () => {
    @Component({
      imports: [Sportbook6vnDatepickerComponent],
      template: `
        <sportbook6vn-datepicker
          mode="range"
          field="input"
          [open]="true"
          [dayCells]="dayCells"
          (rangeChange)="rangeChange = $event"
        />
      `,
    })
    class Sportbook6vnRangeEndFocusTestHostComponent {
      rangeChange: Sportbook6vnDatepickerRangeValue | null = null;
      dayCells: readonly Sportbook6vnDatepickerCell[] = [
        { label: '10', value: '2026-10-10' },
        { label: '18', value: '2026-10-18' },
      ];
    }

    const fixture = TestBed.createComponent(Sportbook6vnRangeEndFocusTestHostComponent);
    fixture.detectChanges();

    const days = fixture.nativeElement.querySelectorAll(
      '.sportbook6vn-datepicker__day',
    ) as NodeListOf<HTMLButtonElement>;
    days[0].click();
    fixture.detectChanges();

    const inputs = fixture.nativeElement.querySelectorAll(
      '.sportbook6vn-datepicker__range-control',
    ) as NodeListOf<HTMLInputElement>;
    inputs[1].focus();
    fixture.detectChanges();

    days[1].click();

    expect(fixture.componentInstance.rangeChange).toEqual({
      start: '2026-10-10',
      end: '2026-10-18',
    });
  });

  it('emits typed value from input date field', () => {
    @Component({
      imports: [Sportbook6vnDatepickerComponent],
      template: `
        <sportbook6vn-datepicker
          field="input"
          (valueChange)="valueChange = $event"
        />
      `,
    })
    class Sportbook6vnInputDatepickerTestHostComponent {
      valueChange: string | null = null;
    }

    const fixture = TestBed.createComponent(Sportbook6vnInputDatepickerTestHostComponent);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('.sportbook6vn-datepicker__input-control') as HTMLInputElement;
    input.value = '08/05/2023';
    input.dispatchEvent(new Event('input'));

    expect(fixture.componentInstance.valueChange).toBe('08/05/2023');
  });

  it('formats ISO date values for input date fields', () => {
    @Component({
      imports: [Sportbook6vnDatepickerComponent],
      template: `
        <sportbook6vn-datepicker
          field="input"
          value="2026-10-15"
        />
      `,
    })
    class Sportbook6vnFormattedInputDatepickerTestHostComponent {}

    const fixture = TestBed.createComponent(Sportbook6vnFormattedInputDatepickerTestHostComponent);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('.sportbook6vn-datepicker__input-control') as HTMLInputElement;

    expect(input.value).toBe('15/10/2026');
  });

  it('formats range date time values for input date fields', () => {
    @Component({
      imports: [Sportbook6vnDatepickerComponent],
      template: `
        <sportbook6vn-datepicker
          mode="range"
          field="input"
          startValue="2026-10-10 00:00"
          endValue="2026-10-15 02:00"
          [showTime]="true"
        />
      `,
    })
    class Sportbook6vnFormattedRangeDateTimePickerTestHostComponent {}

    const fixture = TestBed.createComponent(Sportbook6vnFormattedRangeDateTimePickerTestHostComponent);
    fixture.detectChanges();

    const values = fixture.nativeElement.querySelectorAll(
      '.sportbook6vn-datepicker__range-value',
    ) as NodeListOf<HTMLElement>;

    expect(values[0].textContent?.trim()).toBe('10/10/2026 00:00');
    expect(values[1].textContent?.trim()).toBe('15/10/2026 02:00');
  });

  it('renders time column for single date time picker', () => {
    @Component({
      imports: [Sportbook6vnDatepickerComponent],
      template: `
        <sportbook6vn-datepicker
          [open]="true"
          [showTime]="true"
        />
      `,
    })
    class Sportbook6vnSingleDateTimePickerTestHostComponent {}

    const fixture = TestBed.createComponent(Sportbook6vnSingleDateTimePickerTestHostComponent);
    fixture.detectChanges();

    const timeColumn = fixture.nativeElement.querySelector('.sportbook6vn-datepicker__time-column');

    expect(timeColumn).not.toBeNull();
  });

  it('uses split hour and minute columns for the default single date time picker', () => {
    @Component({
      imports: [Sportbook6vnDatepickerComponent],
      template: `
        <sportbook6vn-datepicker
          value="2026-10-02"
          [open]="true"
          [showTime]="true"
          (valueChange)="valueChange = $event"
        />
      `,
    })
    class Sportbook6vnSplitSingleDateTimePickerTestHostComponent {
      valueChange: string | null = null;
    }

    const fixture = TestBed.createComponent(Sportbook6vnSplitSingleDateTimePickerTestHostComponent);
    fixture.detectChanges();

    const timeRange = fixture.nativeElement.querySelector('.sportbook6vn-datepicker__time-range');
    const hours = fixture.nativeElement.querySelectorAll(
      '.sportbook6vn-datepicker__time-column--hour .sportbook6vn-datepicker__time',
    ) as NodeListOf<HTMLButtonElement>;
    const minutes = fixture.nativeElement.querySelectorAll(
      '.sportbook6vn-datepicker__time-column--minute .sportbook6vn-datepicker__time',
    ) as NodeListOf<HTMLButtonElement>;

    expect(timeRange).not.toBeNull();
    expect(hours.length).toBe(24);
    expect(minutes.length).toBe(60);

    hours[2].click();
    minutes[30].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.valueChange).toBe('2026-10-02 02:30');
  });

  it('renders split hour and minute columns for the default range date time picker', () => {
    @Component({
      imports: [Sportbook6vnDatepickerComponent],
      template: `
        <sportbook6vn-datepicker
          mode="range"
          startValue="2026-10-10"
          rangeActive="start"
          [open]="true"
          [showTime]="true"
          (rangeChange)="rangeChange = $event"
        />
      `,
    })
    class Sportbook6vnSplitRangeDateTimePickerTestHostComponent {
      rangeChange: Sportbook6vnDatepickerRangeValue | null = null;
    }

    const fixture = TestBed.createComponent(Sportbook6vnSplitRangeDateTimePickerTestHostComponent);
    fixture.detectChanges();

    const timeRange = fixture.nativeElement.querySelector('.sportbook6vn-datepicker__time-range');
    const hours = fixture.nativeElement.querySelectorAll(
      '.sportbook6vn-datepicker__time-column--hour .sportbook6vn-datepicker__time',
    ) as NodeListOf<HTMLButtonElement>;
    const minutes = fixture.nativeElement.querySelectorAll(
      '.sportbook6vn-datepicker__time-column--minute .sportbook6vn-datepicker__time',
    ) as NodeListOf<HTMLButtonElement>;

    expect(timeRange).not.toBeNull();
    expect(hours.length).toBe(24);
    expect(minutes.length).toBe(60);

    hours[2].click();
    minutes[30].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.rangeChange).toEqual({
      start: '2026-10-10 02:30',
      end: null,
    });
  });

  it('opens month selection from the day panel header and renders the selected month days', () => {
    @Component({
      imports: [Sportbook6vnDatepickerComponent],
      template: `
        <sportbook6vn-datepicker
          [open]="true"
          (valueChange)="valueChange = $event"
        />
      `,
    })
    class Sportbook6vnDayPanelMonthSelectionTestHostComponent {
      valueChange: string | null = null;
    }

    const fixture = TestBed.createComponent(Sportbook6vnDayPanelMonthSelectionTestHostComponent);
    fixture.detectChanges();

    const headerLabel = fixture.nativeElement.querySelector('.sportbook6vn-datepicker__header-label') as HTMLButtonElement;

    expect(headerLabel.textContent?.trim()).toBe('Tháng 10/2026');

    headerLabel.click();
    fixture.detectChanges();

    const monthOptions = fixture.nativeElement.querySelectorAll(
      '.sportbook6vn-datepicker__option',
    ) as NodeListOf<HTMLButtonElement>;

    expect(headerLabel.textContent?.trim()).toBe('2026');
    expect(monthOptions.length).toBe(12);

    monthOptions[4].click();
    fixture.detectChanges();

    const selectableDays = Array.from(
      fixture.nativeElement.querySelectorAll('.sportbook6vn-datepicker__day') as NodeListOf<HTMLButtonElement>,
    ).filter((day) => !day.disabled);

    expect(headerLabel.textContent?.trim()).toBe('Tháng 5/2026');
    expect(selectableDays[0].textContent?.trim()).toBe('1');

    selectableDays[0].click();

    expect(fixture.componentInstance.valueChange).toBe('2026-05-01');
  });

  it('renders and emits selectable interest date cells', () => {
    @Component({
      imports: [Sportbook6vnDatepickerComponent],
      template: `
        <sportbook6vn-datepicker
          content="interest"
          panelLabel="Tháng 5 2025"
          [open]="true"
          (valueChange)="valueChange = $event"
        />
      `,
    })
    class Sportbook6vnInterestDatepickerTestHostComponent {
      valueChange: string | null = null;
    }

    const fixture = TestBed.createComponent(Sportbook6vnInterestDatepickerTestHostComponent);
    fixture.detectChanges();

    const days = fixture.nativeElement.querySelectorAll(
      '.sportbook6vn-datepicker__interest-day',
    ) as NodeListOf<HTMLButtonElement>;
    const captions = fixture.nativeElement.querySelectorAll(
      '.sportbook6vn-datepicker__interest-caption',
    ) as NodeListOf<HTMLElement>;

    expect(days.length).toBe(31);
    expect(captions[0].textContent?.trim()).toBe('2.3%');
    expect(days[0].classList).toContain('sportbook6vn-datepicker__interest-day--active');

    days[2].click();
    expect(fixture.componentInstance.valueChange).toBeNull();

    days[25].click();
    expect(fixture.componentInstance.valueChange).toBe('2025-05-26');
  });

  it('keeps only the selected interest date active', () => {
    @Component({
      imports: [Sportbook6vnDatepickerComponent],
      template: `
        <sportbook6vn-datepicker
          content="interest"
          panelLabel="Tháng 5 2025"
          [open]="true"
          (valueChange)="valueChange = $event"
        />
      `,
    })
    class Sportbook6vnSingleActiveInterestDatepickerTestHostComponent {
      valueChange: string | null = null;
    }

    const fixture = TestBed.createComponent(Sportbook6vnSingleActiveInterestDatepickerTestHostComponent);
    fixture.detectChanges();

    const days = fixture.nativeElement.querySelectorAll(
      '.sportbook6vn-datepicker__interest-day',
    ) as NodeListOf<HTMLButtonElement>;

    expect(days[0].classList).toContain('sportbook6vn-datepicker__interest-day--active');

    days[1].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.valueChange).toBe('2025-05-02');
    expect(days[0].classList).not.toContain('sportbook6vn-datepicker__interest-day--active');
    expect(days[1].classList).toContain('sportbook6vn-datepicker__interest-day--active');
  });

  it('emits typed range value from range input date field', () => {
    @Component({
      imports: [Sportbook6vnDatepickerComponent],
      template: `
        <sportbook6vn-datepicker
          mode="range"
          field="input"
          (rangeChange)="rangeChange = $event"
        />
      `,
    })
    class Sportbook6vnRangeInputDatepickerTestHostComponent {
      rangeChange: Sportbook6vnDatepickerRangeValue | null = null;
    }

    const fixture = TestBed.createComponent(Sportbook6vnRangeInputDatepickerTestHostComponent);
    fixture.detectChanges();

    const inputs = fixture.nativeElement.querySelectorAll(
      '.sportbook6vn-datepicker__range-control',
    ) as NodeListOf<HTMLInputElement>;
    inputs[0].value = '08/05/2023';
    inputs[0].dispatchEvent(new Event('input'));
    inputs[1].value = '17/05/2023';
    inputs[1].dispatchEvent(new Event('input'));

    expect(fixture.componentInstance.rangeChange).toEqual({
      start: '08/05/2023',
      end: '17/05/2023',
    });
  });

  it('keeps range date input controls compact inside fixed flex slots after only the start date is selected', () => {
    @Component({
      imports: [Sportbook6vnDatepickerComponent],
      template: `
        <sportbook6vn-datepicker
          mode="range"
          field="input"
          startPlaceholder="Từ ngày"
          endPlaceholder="Đến ngày"
          startValue="2026-10-10"
        />
      `,
    })
    class Sportbook6vnCompactRangeInputDatepickerTestHostComponent {}

    const fixture = TestBed.createComponent(Sportbook6vnCompactRangeInputDatepickerTestHostComponent);
    fixture.detectChanges();

    const inputs = fixture.nativeElement.querySelectorAll(
      '.sportbook6vn-datepicker__range-control',
    ) as NodeListOf<HTMLInputElement>;

    const frames = fixture.nativeElement.querySelectorAll(
      '.sportbook6vn-datepicker__range-control-frame',
    ) as NodeListOf<HTMLElement>;

    expect(frames.length).toBe(2);
    expect(Number.parseFloat(inputs[0].style.width)).toBeLessThanOrEqual(84);
    expect(Number.parseFloat(inputs[1].style.width)).toBeLessThanOrEqual(84);
  });

  it('marks the focused range input side as active', () => {
    @Component({
      imports: [Sportbook6vnDatepickerComponent],
      template: `
        <sportbook6vn-datepicker
          mode="range"
          field="input"
          startValue="2026-10-10"
          endValue="2026-10-15"
          [open]="true"
        />
      `,
    })
    class Sportbook6vnActiveRangeInputTestHostComponent {}

    const fixture = TestBed.createComponent(Sportbook6vnActiveRangeInputTestHostComponent);
    fixture.detectChanges();

    const inputs = fixture.nativeElement.querySelectorAll(
      '.sportbook6vn-datepicker__range-control',
    ) as NodeListOf<HTMLInputElement>;

    expect(inputs[0].classList).toContain('sportbook6vn-datepicker__range-control--active');
    expect(inputs[1].classList).not.toContain('sportbook6vn-datepicker__range-control--active');

    inputs[1].focus();
    fixture.detectChanges();

    expect(inputs[0].classList).not.toContain('sportbook6vn-datepicker__range-control--active');
    expect(inputs[1].classList).toContain('sportbook6vn-datepicker__range-control--active');
  });

  it('marks the clicked range date time side as active', () => {
    @Component({
      imports: [Sportbook6vnDatepickerComponent],
      template: `
        <sportbook6vn-datepicker
          mode="range"
          field="input"
          startValue="2026-10-10 01:30"
          endValue="2026-10-15 02:00"
          [open]="true"
          [showTime]="true"
        />
      `,
    })
    class Sportbook6vnActiveRangeDateTimeTestHostComponent {}

    const fixture = TestBed.createComponent(Sportbook6vnActiveRangeDateTimeTestHostComponent);
    fixture.detectChanges();

    const values = fixture.nativeElement.querySelectorAll(
      '.sportbook6vn-datepicker__range-value',
    ) as NodeListOf<HTMLElement>;

    expect(values[0].classList).toContain('sportbook6vn-datepicker__range-value--active');
    expect(values[1].classList).not.toContain('sportbook6vn-datepicker__range-value--active');

    values[1].click();
    fixture.detectChanges();

    expect(values[0].classList).not.toContain('sportbook6vn-datepicker__range-value--active');
    expect(values[1].classList).toContain('sportbook6vn-datepicker__range-value--active');
  });

  it('merges selected time into the active range date value', () => {
    @Component({
      imports: [Sportbook6vnDatepickerComponent],
      template: `
        <sportbook6vn-datepicker
          mode="range"
          startValue="2026-10-10"
          rangeActive="start"
          [open]="true"
          [showTime]="true"
          [timeCells]="timeCells"
          (rangeChange)="rangeChange = $event"
        />
      `,
    })
    class Sportbook6vnRangeDateTimePickerTestHostComponent {
      rangeChange: Sportbook6vnDatepickerRangeValue | null = null;
      timeCells: readonly Sportbook6vnDatepickerCell[] = [{ label: '00:00', value: '00:00' }];
    }

    const fixture = TestBed.createComponent(Sportbook6vnRangeDateTimePickerTestHostComponent);
    fixture.detectChanges();

    const time = fixture.nativeElement.querySelector('.sportbook6vn-datepicker__time') as HTMLButtonElement;
    time.click();

    expect(fixture.componentInstance.rangeChange).toEqual({
      start: '2026-10-10 00:00',
      end: null,
    });
  });

  it('keeps pending range time selection and merges it into the next selected date', () => {
    @Component({
      imports: [Sportbook6vnDatepickerComponent],
      template: `
        <sportbook6vn-datepicker
          mode="range"
          field="input"
          rangeActive="start"
          [open]="true"
          [showTime]="true"
          [dayCells]="dayCells"
          [timeCells]="timeCells"
          (rangeChange)="rangeChange = $event"
        />
      `,
    })
    class Sportbook6vnRangeDateAfterTimePickerTestHostComponent {
      rangeChange: Sportbook6vnDatepickerRangeValue | null = null;
      dayCells: readonly Sportbook6vnDatepickerCell[] = [{ label: '15', value: '2026-10-15' }];
      timeCells: readonly Sportbook6vnDatepickerCell[] = [{ label: '00:30', value: '00:30' }];
    }

    const fixture = TestBed.createComponent(Sportbook6vnRangeDateAfterTimePickerTestHostComponent);
    fixture.detectChanges();

    const time = fixture.nativeElement.querySelector('.sportbook6vn-datepicker__time') as HTMLButtonElement;
    const day = fixture.nativeElement.querySelector('.sportbook6vn-datepicker__day') as HTMLButtonElement;
    time.click();
    expect(fixture.componentInstance.rangeChange).toBeNull();

    day.click();
    fixture.detectChanges();

    const startValue = fixture.nativeElement.querySelector('.sportbook6vn-datepicker__range-value') as HTMLElement;

    expect(fixture.componentInstance.rangeChange).toEqual({
      start: '2026-10-15 00:30',
      end: null,
    });
    expect(startValue.textContent?.trim()).toBe('15/10/2026 00:30');
  });

  it('keeps the date visible when a time is selected for an existing range date', () => {
    @Component({
      imports: [Sportbook6vnDatepickerComponent],
      template: `
        <sportbook6vn-datepicker
          mode="range"
          field="input"
          startValue="2026-10-10"
          endValue="2026-10-15"
          rangeActive="start"
          [open]="true"
          [showTime]="true"
          [timeCells]="timeCells"
          (rangeChange)="rangeChange = $event"
        />
      `,
    })
    class Sportbook6vnRangeDateTimeDisplayTestHostComponent {
      rangeChange: Sportbook6vnDatepickerRangeValue | null = null;
      timeCells: readonly Sportbook6vnDatepickerCell[] = [{ label: '01:00', value: '01:00' }];
    }

    const fixture = TestBed.createComponent(Sportbook6vnRangeDateTimeDisplayTestHostComponent);
    fixture.detectChanges();

    const time = fixture.nativeElement.querySelector('.sportbook6vn-datepicker__time') as HTMLButtonElement;
    time.click();
    fixture.detectChanges();

    const values = fixture.nativeElement.querySelectorAll(
      '.sportbook6vn-datepicker__range-value',
    ) as NodeListOf<HTMLElement>;

    expect(fixture.componentInstance.rangeChange).toEqual({
      start: '2026-10-10 01:00',
      end: '2026-10-15',
    });
    expect(values[0].textContent?.trim()).toBe('10/10/2026 01:00');
    expect(values[1].textContent?.trim()).toBe('15/10/2026');
  });

  it('keeps date and time visible for both sides of an interactive range date time picker', () => {
    @Component({
      imports: [Sportbook6vnDatepickerComponent],
      template: `
        <sportbook6vn-datepicker
          mode="range"
          field="input"
          [open]="true"
          [showTime]="true"
          [dayCells]="dayCells"
          [timeCells]="timeCells"
          (rangeChange)="rangeChange = $event"
        />
      `,
    })
    class Sportbook6vnInteractiveRangeDateTimePickerTestHostComponent {
      rangeChange: Sportbook6vnDatepickerRangeValue | null = null;
      dayCells: readonly Sportbook6vnDatepickerCell[] = [
        { label: '15', value: '2026-10-15' },
        { label: '23', value: '2026-10-23' },
      ];
      timeCells: readonly Sportbook6vnDatepickerCell[] = [{ label: '01:00', value: '01:00' }];
    }

    const fixture = TestBed.createComponent(Sportbook6vnInteractiveRangeDateTimePickerTestHostComponent);
    fixture.detectChanges();

    const days = fixture.nativeElement.querySelectorAll(
      '.sportbook6vn-datepicker__day',
    ) as NodeListOf<HTMLButtonElement>;
    let values = fixture.nativeElement.querySelectorAll(
      '.sportbook6vn-datepicker__range-value',
    ) as NodeListOf<HTMLElement>;

    values[0].click();
    fixture.detectChanges();
    days[0].click();
    fixture.detectChanges();
    let time = fixture.nativeElement.querySelector('.sportbook6vn-datepicker__time') as HTMLButtonElement;
    time.click();
    fixture.detectChanges();

    values = fixture.nativeElement.querySelectorAll(
      '.sportbook6vn-datepicker__range-value',
    ) as NodeListOf<HTMLElement>;
    values[1].click();
    fixture.detectChanges();
    days[1].click();
    fixture.detectChanges();

    time = fixture.nativeElement.querySelector('.sportbook6vn-datepicker__time') as HTMLButtonElement;
    time.click();
    fixture.detectChanges();

    values = fixture.nativeElement.querySelectorAll(
      '.sportbook6vn-datepicker__range-value',
    ) as NodeListOf<HTMLElement>;

    expect(fixture.componentInstance.rangeChange).toEqual({
      start: '2026-10-15 01:00',
      end: '2026-10-23 01:00',
    });
    expect(values[0].textContent?.trim()).toBe('15/10/2026 01:00');
    expect(values[1].textContent?.trim()).toBe('23/10/2026 01:00');
  });

  it('keeps the clicked range value as the active target in range date time mode', () => {
    @Component({
      imports: [Sportbook6vnDatepickerComponent],
      template: `
        <sportbook6vn-datepicker
          mode="range"
          field="input"
          startValue="2026-10-10"
          endValue="2026-10-15"
          [open]="true"
          [showTime]="true"
          [dayCells]="dayCells"
          (rangeChange)="rangeChange = $event"
        />
      `,
    })
    class Sportbook6vnRangeDateTimePointerTargetTestHostComponent {
      rangeChange: Sportbook6vnDatepickerRangeValue | null = null;
      dayCells: readonly Sportbook6vnDatepickerCell[] = [
        { label: '12', value: '2026-10-12' },
        { label: '18', value: '2026-10-18' },
      ];
    }

    const fixture = TestBed.createComponent(Sportbook6vnRangeDateTimePointerTargetTestHostComponent);
    fixture.detectChanges();

    let values = fixture.nativeElement.querySelectorAll(
      '.sportbook6vn-datepicker__range-value',
    ) as NodeListOf<HTMLElement>;
    values[0].click();
    fixture.detectChanges();

    let days = fixture.nativeElement.querySelectorAll(
      '.sportbook6vn-datepicker__day',
    ) as NodeListOf<HTMLButtonElement>;
    days[0].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.rangeChange).toEqual({
      start: '2026-10-12',
      end: '2026-10-15',
    });

    values = fixture.nativeElement.querySelectorAll(
      '.sportbook6vn-datepicker__range-value',
    ) as NodeListOf<HTMLElement>;
    values[1].click();
    fixture.detectChanges();

    days = fixture.nativeElement.querySelectorAll('.sportbook6vn-datepicker__day') as NodeListOf<HTMLButtonElement>;
    days[1].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.rangeChange).toEqual({
      start: '2026-10-12',
      end: '2026-10-18',
    });
  });

  it('resolves range state for month options', () => {
    @Component({
      imports: [Sportbook6vnDatepickerComponent],
      template: `
        <sportbook6vn-datepicker
          mode="range"
          content="month"
          startValue="2026-05"
          endValue="2026-07"
          [open]="true"
        />
      `,
    })
    class Sportbook6vnRangeMonthPickerTestHostComponent {}

    const fixture = TestBed.createComponent(Sportbook6vnRangeMonthPickerTestHostComponent);
    fixture.detectChanges();

    const options = fixture.nativeElement.querySelectorAll(
      '.sportbook6vn-datepicker__option',
    ) as NodeListOf<HTMLButtonElement>;

    expect(options[4].classList).toContain('sportbook6vn-datepicker__option--range-start');
    expect(options[5].classList).toContain('sportbook6vn-datepicker__option--range-middle');
    expect(options[6].classList).toContain('sportbook6vn-datepicker__option--range-end');
  });
});
