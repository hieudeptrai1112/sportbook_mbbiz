import { Component, ElementRef, HostListener, computed, effect, inject, input, output, signal, untracked } from '@angular/core';

import {
  Sportbook6vnDatepickerCell,
  Sportbook6vnDatepickerCellState,
  Sportbook6vnDatepickerContent,
  Sportbook6vnDatepickerField,
  Sportbook6vnDatepickerMode,
  Sportbook6vnDatepickerRangeActive,
  Sportbook6vnDatepickerRangeValue,
  Sportbook6vnDatepickerSize,
  Sportbook6vnDatepickerStatus,
} from './datepicker.types';

const DEFAULT_WEEKDAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'] as const;
const MONTH_LABELS = [
  'Tháng 1',
  'Tháng 2',
  'Tháng 3',
  'Tháng 4',
  'Tháng 5',
  'Tháng 6',
  'Tháng 7',
  'Tháng 8',
  'Tháng 9',
  'Tháng 10',
  'Tháng 11',
  'Tháng 12',
] as const;

const DEFAULT_DAY_CELLS: readonly Sportbook6vnDatepickerCell[] = [
  { label: '28', value: '2026-09-28', state: 'disabled', disabled: true },
  { label: '29', value: '2026-09-29', state: 'disabled', disabled: true },
  { label: '30', value: '2026-09-30', state: 'disabled', disabled: true },
  { label: '1', value: '2026-10-01' },
  { label: '2', value: '2026-10-02' },
  { label: '3', value: '2026-10-03' },
  { label: '4', value: '2026-10-04' },
  { label: '5', value: '2026-10-05' },
  { label: '6', value: '2026-10-06' },
  { label: '7', value: '2026-10-07' },
  { label: '8', value: '2026-10-08' },
  { label: '9', value: '2026-10-09' },
  { label: '10', value: '2026-10-10' },
  { label: '11', value: '2026-10-11' },
  { label: '12', value: '2026-10-12' },
  { label: '13', value: '2026-10-13' },
  { label: '14', value: '2026-10-14' },
  { label: '15', value: '2026-10-15', state: 'today' },
  { label: '16', value: '2026-10-16' },
  { label: '17', value: '2026-10-17' },
  { label: '18', value: '2026-10-18' },
  { label: '19', value: '2026-10-19' },
  { label: '20', value: '2026-10-20' },
  { label: '21', value: '2026-10-21' },
  { label: '22', value: '2026-10-22' },
  { label: '23', value: '2026-10-23' },
  { label: '24', value: '2026-10-24' },
  { label: '25', value: '2026-10-25' },
  { label: '26', value: '2026-10-26' },
  { label: '27', value: '2026-10-27' },
  { label: '28', value: '2026-10-28' },
  { label: '29', value: '2026-10-29' },
  { label: '30', value: '2026-10-30' },
  { label: '31', value: '2026-10-31' },
  { label: '1', value: '2026-11-01', state: 'disabled', disabled: true },
];

const DEFAULT_INTEREST_CELLS: readonly Sportbook6vnDatepickerCell[] = Array.from({ length: 31 }, (_, index) => {
  const day = index + 1;
  const hasInterest = [1, 2, 26, 27, 28].includes(day);

  return {
    label: `${day}`,
    value: `2025-05-${`${day}`.padStart(2, '0')}`,
    caption: hasInterest ? '2.3%' : undefined,
    state: day === 1 ? 'active' : hasInterest ? 'default' : 'disabled',
    disabled: !hasInterest,
  };
});

const DEFAULT_MONTH_CELLS: readonly Sportbook6vnDatepickerCell[] = MONTH_LABELS.map((label, index) => ({
  label,
  value: `2026-${`${index + 1}`.padStart(2, '0')}`,
  state: index === 4 ? 'present' : undefined,
}));

const DEFAULT_YEAR_CELLS: readonly Sportbook6vnDatepickerCell[] = [
  { label: '2020', value: '2020' },
  { label: '2021', value: '2021' },
  { label: '2022', value: '2022' },
  { label: '2023', value: '2023' },
  { label: '2024', value: '2024' },
  { label: '2025', value: '2025' },
  { label: '2026', value: '2026', state: 'present' },
  { label: '2027', value: '2027' },
  { label: '2028', value: '2028' },
  { label: '2029', value: '2029' },
  { label: '2030', value: '2030' },
  { label: '2031', value: '2031' },
];

const DEFAULT_TIME_CELLS: readonly Sportbook6vnDatepickerCell[] = [
  { label: '00:00', value: '00:00' },
  { label: '00:30', value: '00:30' },
  { label: '01:00', value: '01:00' },
  { label: '01:30', value: '01:30' },
  { label: '02:00', value: '02:00' },
  { label: '02:30', value: '02:30' },
  { label: '03:00', value: '03:00' },
  { label: '03:30', value: '03:30', state: 'disabled', disabled: true },
  { label: '04:00', value: '04:00' },
  { label: '04:30', value: '04:30' },
  { label: '05:00', value: '05:00', state: 'present' },
  { label: '05:30', value: '05:30' },
];

type Sportbook6vnDatepickerTimePart = 'hour' | 'minute';

const DEFAULT_HOUR_CELLS: readonly Sportbook6vnDatepickerCell[] = Array.from({ length: 24 }, (_, index) => {
  const value = `${index}`.padStart(2, '0');
  return { label: value, value };
});

const DEFAULT_MINUTE_CELLS: readonly Sportbook6vnDatepickerCell[] = Array.from({ length: 60 }, (_, index) => {
  const value = `${index}`.padStart(2, '0');
  return { label: value, value };
});

@Component({
  selector: 'sportbook6vn-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss',
})
export class Sportbook6vnDatepickerComponent {
  readonly mode = input<Sportbook6vnDatepickerMode>('single');
  readonly content = input<Sportbook6vnDatepickerContent>('day');
  readonly field = input<Sportbook6vnDatepickerField>('trigger');
  readonly placeholder = input('Lựa chọn');
  readonly startPlaceholder = input('Ngày bắt đầu');
  readonly endPlaceholder = input('Ngày kết thúc');
  readonly panelLabel = input('Tháng 10/2026');
  readonly rangeActive = input<Sportbook6vnDatepickerRangeActive>('start');
  readonly size = input<Sportbook6vnDatepickerSize>('large');
  readonly status = input<Sportbook6vnDatepickerStatus>('default');
  readonly value = input<string | null>(null);
  readonly startValue = input<string | null>(null);
  readonly endValue = input<string | null>(null);
  readonly open = input(false);
  readonly disabled = input(false);
  readonly showTime = input(false);
  readonly dayCells = input<readonly Sportbook6vnDatepickerCell[]>(DEFAULT_DAY_CELLS);
  readonly interestCells = input<readonly Sportbook6vnDatepickerCell[]>(DEFAULT_INTEREST_CELLS);
  readonly monthCells = input<readonly Sportbook6vnDatepickerCell[]>(DEFAULT_MONTH_CELLS);
  readonly yearCells = input<readonly Sportbook6vnDatepickerCell[]>(DEFAULT_YEAR_CELLS);
  readonly timeCells = input<readonly Sportbook6vnDatepickerCell[]>(DEFAULT_TIME_CELLS);

  readonly valueChange = output<string | null>();
  readonly rangeChange = output<Sportbook6vnDatepickerRangeValue>();
  readonly openChange = output<boolean>();
  readonly resetClick = output<void>();
  readonly applyClick = output<Sportbook6vnDatepickerRangeValue>();

  protected readonly weekdays = DEFAULT_WEEKDAYS;
  protected readonly localOpen = signal(false);
  protected readonly localValue = signal<string | null>(null);
  protected readonly localStartValue = signal<string | null>(null);
  protected readonly localEndValue = signal<string | null>(null);
  protected readonly localRangeActive = signal<Sportbook6vnDatepickerRangeActive>('start');
  protected readonly dayPanelMode = signal<'day' | 'month'>('day');
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly draftStartValue = signal<string | null>(null);
  private readonly draftEndValue = signal<string | null>(null);
  private readonly draftStartTime = signal<string | null>(null);
  private readonly draftEndTime = signal<string | null>(null);
  private readonly calendarViewDate = signal(new Date(2026, 9, 1));
  private readonly activeStartValue = computed(() => (this.localOpen() ? this.draftStartValue() : this.localStartValue()));
  private readonly activeEndValue = computed(() => (this.localOpen() ? this.draftEndValue() : this.localEndValue()));
  protected readonly panelContent = computed<Sportbook6vnDatepickerContent>(() =>
    this.content() === 'day' && this.dayPanelMode() === 'month' ? 'month' : this.content(),
  );
  protected readonly resolvedPanelLabel = computed(() => {
    if (this.content() !== 'day') {
      return this.panelLabel();
    }

    const viewDate = this.calendarViewDate();
    const year = viewDate.getFullYear();

    if (this.dayPanelMode() === 'month') {
      return `${year}`;
    }

    return `Tháng ${viewDate.getMonth() + 1}/${year}`;
  });
  protected readonly displayedDayCells = computed(() => {
    const cells = this.dayCells();
    return cells === DEFAULT_DAY_CELLS ? this.createCalendarDayCells(this.calendarViewDate()) : cells;
  });
  protected readonly showTimeParts = computed(
    () =>
      this.showTime() &&
      this.content() === 'day' &&
      this.panelContent() === 'day' &&
      this.timeCells() === DEFAULT_TIME_CELLS,
  );
  protected readonly hourCells = computed(() =>
    this.timeCells() === DEFAULT_TIME_CELLS ? DEFAULT_HOUR_CELLS : this.createTimePartCells('hour'),
  );
  protected readonly minuteCells = computed(() =>
    this.timeCells() === DEFAULT_TIME_CELLS ? DEFAULT_MINUTE_CELLS : this.createTimePartCells('minute'),
  );
  protected readonly activeTimeLabel = computed(() => this.getActiveTimeValue() ?? this.getFallbackTimeValue());
  private readonly calendarMonthCells = computed(() => this.createCalendarMonthCells(this.calendarViewDate().getFullYear()));

  constructor() {
    effect(() => {
      const isOpen = this.open();

      untracked(() => {
        const wasOpen = this.localOpen();

        if (isOpen && !wasOpen && this.mode() === 'range') {
          this.syncRangeDraftFromCommitted();
        }

        if (!isOpen && wasOpen && this.mode() === 'range') {
          this.commitRangeDraft();
        }

        this.localOpen.set(isOpen);
      });
    });

    effect(() => {
      this.localValue.set(this.value());
    });

    effect(() => {
      const content = this.content();
      const selectedValue = this.value();
      const startValue = this.startValue();
      const endValue = this.endValue();
      const label = this.panelLabel();

      untracked(() => {
        if (content === 'day' && !this.localOpen()) {
          this.calendarViewDate.set(this.resolveInitialCalendarDate(selectedValue ?? startValue ?? endValue, label));
          this.dayPanelMode.set('day');
        }
      });
    });

    effect(() => {
      const selectedValue = this.startValue();

      untracked(() => {
        this.localStartValue.set(selectedValue);

        if (!this.localOpen()) {
          this.draftStartValue.set(selectedValue);
          this.draftStartTime.set(this.extractTimePart(selectedValue));
        }
      });
    });

    effect(() => {
      const selectedValue = this.endValue();

      untracked(() => {
        this.localEndValue.set(selectedValue);

        if (!this.localOpen()) {
          this.draftEndValue.set(selectedValue);
          this.draftEndTime.set(this.extractTimePart(selectedValue));
        }
      });
    });

    effect(() => {
      const activePart = this.rangeActive();
      const hasInternalRangeValue = untracked(
        () => this.localStartValue() || this.localEndValue() || this.draftStartValue() || this.draftEndValue(),
      );

      if (!hasInternalRangeValue) {
        this.localRangeActive.set(activePart);
      }
    });
  }

  @HostListener('document:click', ['$event'])
  protected handleDocumentClick(event: MouseEvent) {
    if (!this.localOpen()) {
      return;
    }

    const target = event.target as Node | null;

    if (target && this.host.nativeElement.contains(target)) {
      return;
    }

    if (this.mode() === 'range') {
      this.commitRangeDraft();
    }

    this.setOpen(false, { commitRange: false });
  }

  protected readonly wrapperClass = computed(() =>
    [
      'sportbook6vn-datepicker',
      `sportbook6vn-datepicker--mode-${this.mode()}`,
      `sportbook6vn-datepicker--content-${this.content()}`,
      `sportbook6vn-datepicker--field-${this.field()}`,
      `sportbook6vn-datepicker--size-${this.size()}`,
      `sportbook6vn-datepicker--status-${this.status()}`,
      this.disabled() ? 'sportbook6vn-datepicker--disabled' : '',
      this.localOpen() ? 'sportbook6vn-datepicker--open' : '',
      this.showTime() ? 'sportbook6vn-datepicker--show-time' : '',
      this.showTimeParts() ? 'sportbook6vn-datepicker--split-time' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected readonly triggerLabel = computed(() => {
    const selectedValue = this.localValue();
    if (!selectedValue) {
      return this.placeholder();
    }

    return this.displayValue(selectedValue);
  });

  protected readonly inputValue = computed(() => {
    const selectedValue = this.localValue();
    return selectedValue ? this.displayValue(selectedValue) : '';
  });

  protected readonly startLabel = computed(() => {
    const selectedValue = this.activeStartValue();
    return selectedValue ? this.displayValue(selectedValue) : this.startPlaceholder();
  });

  protected readonly endLabel = computed(() => {
    const selectedValue = this.activeEndValue();
    return selectedValue ? this.displayValue(selectedValue) : this.endPlaceholder();
  });

  protected readonly startInputValue = computed(() => {
    const selectedValue = this.activeStartValue();
    return selectedValue ? this.displayValue(selectedValue) : '';
  });

  protected readonly endInputValue = computed(() => {
    const selectedValue = this.activeEndValue();
    return selectedValue ? this.displayValue(selectedValue) : '';
  });

  protected readonly hasValue = computed(() => this.localValue() !== null);
  protected readonly hasStartValue = computed(() => this.activeStartValue() !== null);
  protected readonly hasEndValue = computed(() => this.activeEndValue() !== null);

  protected rangeInputWidth(value: string, placeholder: string) {
    const text = value || placeholder;
    return Math.max(48, Math.min(84, text.length * 7 + 12));
  }

  protected getPanelCells() {
    if (this.content() === 'day' && this.dayPanelMode() === 'month') {
      return this.calendarMonthCells();
    }

    switch (this.content()) {
      case 'month':
        return this.monthCells();
      case 'year':
        return this.yearCells();
      case 'interest':
        return this.interestCells();
      case 'time':
        return this.timeCells();
      default:
        return this.dayCells();
    }
  }

  protected toggleOpen() {
    if (this.disabled()) {
      return;
    }

    this.setOpen(!this.localOpen());
  }

  protected toggleRangePanelFromIcon() {
    if (this.disabled()) {
      return;
    }

    if (!this.localOpen()) {
      this.localRangeActive.set(this.resolveNextRangePart());
    }

    this.setOpen(!this.localOpen());
  }

  protected openPanel() {
    if (this.disabled()) {
      return;
    }

    this.setOpen(true);
  }

  protected openMonthPanel() {
    if (this.disabled() || this.content() !== 'day') {
      return;
    }

    this.dayPanelMode.set('month');
  }

  protected goToPreviousPanel() {
    if (this.disabled()) {
      return;
    }

    this.shiftCalendarView(this.dayPanelMode() === 'month' ? -12 : -1);
  }

  protected goToPreviousYearPanel() {
    if (this.disabled()) {
      return;
    }

    this.shiftCalendarView(-12);
  }

  protected goToNextPanel() {
    if (this.disabled()) {
      return;
    }

    this.shiftCalendarView(this.dayPanelMode() === 'month' ? 12 : 1);
  }

  protected goToNextYearPanel() {
    if (this.disabled()) {
      return;
    }

    this.shiftCalendarView(12);
  }

  protected openRangePanel(part: Sportbook6vnDatepickerRangeActive) {
    if (this.disabled()) {
      return;
    }

    this.localRangeActive.set(part);
    this.setOpen(true);
  }

  protected openRangePanelFromShell() {
    if (this.disabled()) {
      return;
    }

    if (!this.localOpen()) {
      this.localRangeActive.set(this.resolveNextRangePart());
    }

    this.setOpen(true);
  }

  protected updateInputValue(event: Event) {
    const nextValue = (event.target as HTMLInputElement).value || null;
    this.localValue.set(nextValue);
    this.valueChange.emit(nextValue);
  }

  protected updateRangeInputValue(part: Sportbook6vnDatepickerRangeActive, event: Event) {
    const nextValue = (event.target as HTMLInputElement).value || null;
    this.localRangeActive.set(part);
    this.setDraftRangeValue(part, nextValue);
    this.setCommittedRangeValue(part, nextValue);

    this.rangeChange.emit({
      start: this.localStartValue(),
      end: this.localEndValue(),
    });
  }

  protected selectCell(cell: Sportbook6vnDatepickerCell) {
    if (this.disabled() || cell.disabled || cell.state === 'disabled') {
      return;
    }

    if (this.mode() === 'range') {
      this.selectRangeCell(cell.value);
      return;
    }

    const nextValue = this.resolveSelectedCellValue(cell.value);
    this.localValue.set(nextValue);
    this.valueChange.emit(nextValue);
  }

  protected selectPanelCell(cell: Sportbook6vnDatepickerCell) {
    if (this.content() === 'day' && this.dayPanelMode() === 'month') {
      this.selectCalendarMonth(cell);
      return;
    }

    this.selectCell(cell);
  }

  protected reset() {
    this.localValue.set(null);
    this.localStartValue.set(null);
    this.localEndValue.set(null);
    this.draftStartValue.set(null);
    this.draftEndValue.set(null);
    this.draftStartTime.set(null);
    this.draftEndTime.set(null);
    this.localRangeActive.set('start');
    this.valueChange.emit(null);
    this.rangeChange.emit({ start: null, end: null });
    this.resetClick.emit();
  }

  protected apply() {
    if (this.mode() === 'range') {
      this.commitRangeDraft();
    }

    this.applyClick.emit({
      start: this.localStartValue(),
      end: this.localEndValue(),
    });
    this.setOpen(false, { commitRange: false });
  }

  protected dayCellClass(cell: Sportbook6vnDatepickerCell) {
    return this.cellClass('sportbook6vn-datepicker__day', cell, this.resolveDayState(cell));
  }

  protected optionCellClass(cell: Sportbook6vnDatepickerCell) {
    return this.cellClass('sportbook6vn-datepicker__option', cell, this.resolveOptionState(cell));
  }

  protected interestCellClass(cell: Sportbook6vnDatepickerCell) {
    return this.cellClass('sportbook6vn-datepicker__interest-day', cell, this.resolveInterestState(cell));
  }

  protected timeCellClass(cell: Sportbook6vnDatepickerCell) {
    return this.cellClass('sportbook6vn-datepicker__time', cell, this.resolveTimeState(cell));
  }

  protected timePartCellClass(part: Sportbook6vnDatepickerTimePart, cell: Sportbook6vnDatepickerCell) {
    const state = this.resolveTimePartState(part, cell);

    return [
      'sportbook6vn-datepicker__time',
      `sportbook6vn-datepicker__time--${part}`,
      `sportbook6vn-datepicker__time--${state}`,
      cell.disabled ? 'sportbook6vn-datepicker__time--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  protected selectTimePart(part: Sportbook6vnDatepickerTimePart, cell: Sportbook6vnDatepickerCell) {
    if (this.disabled() || cell.disabled || cell.state === 'disabled') {
      return;
    }

    const nextTime = this.mergeTimePart(this.getActiveTimeValue(), part, cell.value);

    if (this.mode() === 'range') {
      this.selectRangeTime(nextTime);
      return;
    }

    const nextValue = this.mergeTimeIntoDate(this.localValue(), nextTime);
    this.localValue.set(nextValue);
    this.valueChange.emit(nextValue);
  }

  private setOpen(open: boolean, options: { commitRange?: boolean } = {}) {
    const wasOpen = this.localOpen();

    if (open && !wasOpen && this.mode() === 'range') {
      this.syncRangeDraftFromCommitted();
    }

    if (!open && wasOpen && this.mode() === 'range' && options.commitRange !== false) {
      this.commitRangeDraft();
    }

    if (open) {
      this.dayPanelMode.set('day');
    }

    this.localOpen.set(open);
    this.openChange.emit(open);
  }

  private shiftCalendarView(monthOffset: number) {
    if (this.content() !== 'day') {
      return;
    }

    const viewDate = this.calendarViewDate();
    this.calendarViewDate.set(new Date(viewDate.getFullYear(), viewDate.getMonth() + monthOffset, 1));
  }

  private selectCalendarMonth(cell: Sportbook6vnDatepickerCell) {
    if (this.disabled() || cell.disabled || cell.state === 'disabled') {
      return;
    }

    const monthMatch = /^(\d{4})-(\d{2})$/.exec(cell.value);
    if (!monthMatch) {
      return;
    }

    const [, year, month] = monthMatch;
    this.calendarViewDate.set(new Date(Number(year), Number(month) - 1, 1));
    this.dayPanelMode.set('day');
  }

  private resolveNextRangePart(): Sportbook6vnDatepickerRangeActive {
    if (!this.activeStartValue()) {
      return 'start';
    }

    if (!this.activeEndValue()) {
      return 'end';
    }

    return this.localRangeActive();
  }

  private findLabel(value: string) {
    return [...this.dayCells(), ...this.interestCells(), ...this.monthCells(), ...this.yearCells(), ...this.timeCells()].find(
      (cell) => cell.value === value,
    )?.label;
  }

  private displayValue(value: string) {
    const dateMatch = /^(\d{4})-(\d{2})-(\d{2})(?:\s+(.+))?$/.exec(value);
    if (dateMatch) {
      const [, year, month, day, time] = dateMatch;
      return `${day}/${month}/${year}${time ? ` ${time}` : ''}`;
    }

    return this.findLabel(value) ?? value;
  }

  private resolveSelectedCellValue(value: string) {
    if (!this.showTime() || this.content() !== 'day') {
      return value;
    }

    const activeValue = this.getActiveDateTimeValue();

    if (this.isDateValue(value)) {
      const activeTime = this.extractTimePart(activeValue) ?? (this.isTimeValue(activeValue ?? '') ? activeValue : null);
      return activeTime ? `${value} ${activeTime}` : value;
    }

    if (!this.isTimeValue(value)) {
      return value;
    }

    if (this.mode() === 'range') {
      return this.mergeTimeIntoDate(activeValue, value);
    }

    return this.mergeTimeIntoDate(activeValue, value);
  }

  private getActiveDateTimeValue() {
    if (this.mode() === 'range') {
      return this.localRangeActive() === 'end' ? this.activeEndValue() : this.activeStartValue();
    }

    return this.localValue();
  }

  private selectRangeCell(value: string) {
    const isTimeSelection = this.showTime() && this.content() === 'day' && this.isTimeValue(value);

    if (isTimeSelection) {
      this.selectRangeTime(value);
      return;
    }

    const activePart = this.localRangeActive();
    const nextValue = this.resolveRangeDateValue(value, activePart);

    this.setDraftRangeValue(activePart, nextValue);
    this.emitDraftRangeChange();
  }

  private selectRangeTime(value: string) {
    const activePart = this.localRangeActive();

    if (activePart === 'end') {
      this.draftEndTime.set(value);
    } else {
      this.draftStartTime.set(value);
    }

    const selectedValue = activePart === 'end' ? this.draftEndValue() : this.draftStartValue();
    const datePart = this.extractDatePart(selectedValue);

    if (!datePart) {
      return;
    }

    this.setDraftRangeValue(activePart, `${datePart} ${value}`);
    this.emitDraftRangeChange();
  }

  private createTimePartCells(part: Sportbook6vnDatepickerTimePart) {
    const partIndex = part === 'hour' ? 0 : 1;
    const seen = new Set<string>();
    const cells: Sportbook6vnDatepickerCell[] = [];

    for (const cell of this.timeCells()) {
      if (!this.isTimeValue(cell.value)) {
        continue;
      }

      const value = cell.value.split(':')[partIndex];

      if (!value || seen.has(value)) {
        continue;
      }

      seen.add(value);
      cells.push({
        label: value,
        value,
        disabled: cell.disabled,
        state: cell.state === 'disabled' ? 'disabled' : undefined,
      });
    }

    return cells.length > 0 ? cells : part === 'hour' ? DEFAULT_HOUR_CELLS : DEFAULT_MINUTE_CELLS;
  }

  private getActiveTimeValue() {
    if (!this.showTime() || this.content() !== 'day') {
      return null;
    }

    if (this.mode() === 'range') {
      const activePart = this.localRangeActive();
      const pendingTime = activePart === 'end' ? this.draftEndTime() : this.draftStartTime();
      const activeValue = activePart === 'end' ? this.activeEndValue() : this.activeStartValue();

      return pendingTime ?? this.extractTimePart(activeValue) ?? (this.isTimeValue(activeValue ?? '') ? activeValue : null);
    }

    const activeValue = this.localValue();
    return this.extractTimePart(activeValue) ?? (this.isTimeValue(activeValue ?? '') ? activeValue : null);
  }

  private getFallbackTimeValue(part?: Sportbook6vnDatepickerTimePart, value?: string) {
    const fallbackHour = part === 'hour' && value ? value : (this.hourCells()[0]?.value ?? '00');
    const fallbackMinute = part === 'minute' && value ? value : (this.minuteCells()[0]?.value ?? '00');

    return `${fallbackHour}:${fallbackMinute}`;
  }

  private mergeTimePart(currentTime: string | null, part: Sportbook6vnDatepickerTimePart, value: string) {
    const fallbackTime = this.getFallbackTimeValue(part, value);
    const [hour, minute] = (currentTime ?? fallbackTime).split(':');

    return part === 'hour' ? `${value}:${minute ?? '00'}` : `${hour ?? '00'}:${value}`;
  }

  private resolveRangeDateValue(value: string, part: Sportbook6vnDatepickerRangeActive) {
    if (!this.showTime() || this.content() !== 'day' || !this.isDateValue(value)) {
      return value;
    }

    const activeValue = part === 'end' ? this.draftEndValue() : this.draftStartValue();
    const pendingTime = part === 'end' ? this.draftEndTime() : this.draftStartTime();
    const activeTime = pendingTime ?? this.extractTimePart(activeValue);

    return activeTime ? `${value} ${activeTime}` : value;
  }

  private createCalendarDayCells(viewDate: Date): readonly Sportbook6vnDatepickerCell[] {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDate = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const mondayOffset = (firstDate.getDay() + 6) % 7;
    const visibleCellCount = mondayOffset + daysInMonth > 35 ? 42 : 35;
    const gridStartDate = new Date(year, month, 1 - mondayOffset);
    const today = this.formatDateValue(new Date());

    return Array.from({ length: visibleCellCount }, (_, index) => {
      const cellDate = new Date(gridStartDate.getFullYear(), gridStartDate.getMonth(), gridStartDate.getDate() + index);
      const value = this.formatDateValue(cellDate);
      const outsideCurrentMonth = cellDate.getMonth() !== month;

      return {
        label: `${cellDate.getDate()}`,
        value,
        state: outsideCurrentMonth ? 'disabled' : value === today ? 'today' : undefined,
        disabled: outsideCurrentMonth,
      };
    });
  }

  private createCalendarMonthCells(year: number): readonly Sportbook6vnDatepickerCell[] {
    const selectedValue = this.mode() === 'range' ? (this.activeStartValue() ?? this.activeEndValue()) : this.localValue();
    const selectedMonthValue = this.extractMonthPart(selectedValue);
    const currentMonthValue = this.formatMonthValue(new Date());

    return MONTH_LABELS.map((label, index) => {
      const value = `${year}-${`${index + 1}`.padStart(2, '0')}`;

      return {
        label,
        value,
        state: value === selectedMonthValue ? 'active' : value === currentMonthValue ? 'present' : undefined,
      };
    });
  }

  private resolveInitialCalendarDate(value: string | null, fallbackLabel: string) {
    const datePart = this.extractDatePart(value);
    if (datePart) {
      const [year, month] = datePart.split('-').map(Number);
      return new Date(year, month - 1, 1);
    }

    const monthPart = this.extractMonthPart(value);
    if (monthPart) {
      const [year, month] = monthPart.split('-').map(Number);
      return new Date(year, month - 1, 1);
    }

    const labelMatch = /^Tháng\s+(\d{1,2})\/(\d{4})$/.exec(fallbackLabel.trim());
    if (labelMatch) {
      const [, month, year] = labelMatch;
      return new Date(Number(year), Number(month) - 1, 1);
    }

    return new Date(2026, 9, 1);
  }

  private formatDateValue(date: Date) {
    return `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, '0')}-${`${date.getDate()}`.padStart(2, '0')}`;
  }

  private formatMonthValue(date: Date) {
    return `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, '0')}`;
  }

  private emitRangeChange() {
    this.rangeChange.emit({
      start: this.localStartValue(),
      end: this.localEndValue(),
    });
  }

  private emitDraftRangeChange() {
    this.rangeChange.emit({
      start: this.draftStartValue(),
      end: this.draftEndValue(),
    });
  }

  private syncRangeDraftFromCommitted() {
    const startValue = this.localStartValue() ?? this.startValue();
    const endValue = this.localEndValue() ?? this.endValue();

    this.draftStartValue.set(startValue);
    this.draftEndValue.set(endValue);
    this.draftStartTime.set(this.extractTimePart(startValue));
    this.draftEndTime.set(this.extractTimePart(endValue));
  }

  private commitRangeDraft() {
    this.localStartValue.set(this.draftStartValue());
    this.localEndValue.set(this.draftEndValue());
    this.emitRangeChange();
  }

  private setDraftRangeValue(part: Sportbook6vnDatepickerRangeActive, value: string | null) {
    if (part === 'end') {
      this.draftEndValue.set(value);
      this.draftEndTime.set(this.extractTimePart(value));
      return;
    }

    this.draftStartValue.set(value);
    this.draftStartTime.set(this.extractTimePart(value));
  }

  private setCommittedRangeValue(part: Sportbook6vnDatepickerRangeActive, value: string | null) {
    if (part === 'end') {
      this.localEndValue.set(value);
      return;
    }

    this.localStartValue.set(value);
  }

  private mergeTimeIntoDate(value: string | null, time: string) {
    const datePart = this.extractDatePart(value);
    return datePart ? `${datePart} ${time}` : time;
  }

  private extractDatePart(value: string | null) {
    return /^(\d{4}-\d{2}-\d{2})/.exec(value ?? '')?.[1] ?? null;
  }

  private extractMonthPart(value: string | null) {
    return /^(\d{4}-\d{2})(?:-\d{2})?/.exec(value ?? '')?.[1] ?? null;
  }

  private extractTimePart(value: string | null) {
    return /^\d{4}-\d{2}-\d{2}\s+(.+)$/.exec(value ?? '')?.[1] ?? null;
  }

  private isTimeValue(value: string) {
    return /^\d{2}:\d{2}$/.test(value);
  }

  private isDateValue(value: string) {
    return /^\d{4}-\d{2}-\d{2}$/.test(value);
  }

  private resolveDayState(cell: Sportbook6vnDatepickerCell): Sportbook6vnDatepickerCellState {
    if (cell.disabled || cell.state === 'disabled') {
      return 'disabled';
    }

    if (this.mode() === 'single' && this.localValue() === cell.value) {
      return 'active';
    }

    if (this.mode() === 'range') {
      const startValue = this.extractDatePart(this.activeStartValue()) ?? this.activeStartValue();
      const endValue = this.extractDatePart(this.activeEndValue()) ?? this.activeEndValue();

      if (startValue === cell.value && endValue === cell.value) {
        return 'active';
      }

      if (startValue === cell.value) {
        return 'range-start';
      }

      if (endValue === cell.value) {
        return 'range-end';
      }

      if (startValue && endValue && cell.value > startValue && cell.value < endValue) {
        return 'range-middle';
      }
    }

    return cell.state ?? 'default';
  }

  private resolveOptionState(cell: Sportbook6vnDatepickerCell): Sportbook6vnDatepickerCellState {
    if (cell.disabled || cell.state === 'disabled') {
      return 'disabled';
    }

    if (this.mode() === 'range') {
      const startValue = this.activeStartValue();
      const endValue = this.activeEndValue();

      if (startValue === cell.value && endValue === cell.value) {
        return 'active';
      }

      if (startValue === cell.value) {
        return 'range-start';
      }

      if (endValue === cell.value) {
        return 'range-end';
      }

      if (startValue && endValue && cell.value > startValue && cell.value < endValue) {
        return 'range-middle';
      }
    }

    if (this.localValue() === cell.value) {
      return 'active';
    }

    return cell.state ?? 'default';
  }

  private resolveInterestState(cell: Sportbook6vnDatepickerCell): Sportbook6vnDatepickerCellState {
    if (cell.disabled || cell.state === 'disabled') {
      return 'disabled';
    }

    const selectedValue = this.localValue();

    if (selectedValue) {
      return selectedValue === cell.value ? 'active' : 'default';
    }

    return cell.state ?? 'default';
  }

  private resolveTimeState(cell: Sportbook6vnDatepickerCell): Sportbook6vnDatepickerCellState {
    if (cell.disabled || cell.state === 'disabled') {
      return 'disabled';
    }

    if (this.showTime() && this.content() === 'day' && this.isTimeValue(cell.value)) {
      const selectedValue =
        this.mode() === 'range'
          ? this.localRangeActive() === 'end'
            ? this.activeEndValue()
            : this.activeStartValue()
          : this.localValue();
      const pendingTime =
        this.mode() === 'range'
          ? this.localRangeActive() === 'end'
            ? this.draftEndTime()
            : this.draftStartTime()
          : null;

      if (pendingTime === cell.value || this.extractTimePart(selectedValue) === cell.value || selectedValue === cell.value) {
        return 'active';
      }
    }

    return this.resolveOptionState(cell);
  }

  private resolveTimePartState(part: Sportbook6vnDatepickerTimePart, cell: Sportbook6vnDatepickerCell): Sportbook6vnDatepickerCellState {
    if (cell.disabled || cell.state === 'disabled') {
      return 'disabled';
    }

    const [hour, minute] = (this.getActiveTimeValue() ?? this.getFallbackTimeValue()).split(':');
    const selectedPart = part === 'hour' ? hour : minute;

    if (selectedPart === cell.value) {
      return 'active';
    }

    return cell.state ?? 'default';
  }

  private cellClass(baseClass: string, cell: Sportbook6vnDatepickerCell, state: Sportbook6vnDatepickerCellState) {
    return [
      baseClass,
      `${baseClass}--${state}`,
      cell.disabled ? `${baseClass}--disabled` : '',
    ]
      .filter(Boolean)
      .join(' ');
  }
}
