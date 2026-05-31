import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sportbook6vnItemFileComponent } from './item-file.component';

describe('Sportbook6vnItemFileComponent', () => {
  let fixture: ComponentFixture<Sportbook6vnItemFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sportbook6vnItemFileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Sportbook6vnItemFileComponent);
    fixture.detectChanges();
  });

  it('renders a default xlsx file from Illustration assets', () => {
    const nativeElement = fixture.nativeElement as HTMLElement;
    const icon = nativeElement.querySelector('.sportbook6vn-item-file__icon') as HTMLImageElement;

    expect(nativeElement.textContent).toContain('Tên tệp tin');
    expect(nativeElement.textContent).toContain('.xlsx');
    expect(nativeElement.textContent).toContain('2 MB');
    expect(icon.src).toContain('/assets/illustrations/a-illustration/file-excel.png');
  });

  it('renders loading progress', () => {
    fixture.componentRef.setInput('status', 'uploading');
    fixture.componentRef.setInput('percent', 42);
    fixture.detectChanges();

    const progress = fixture.nativeElement.querySelector('.sportbook6vn-item-file__progress-bar') as HTMLElement;
    expect(progress.style.width).toBe('42%');
  });

  it('renders format error with the error-file illustration', () => {
    fixture.componentRef.setInput('status', 'error');
    fixture.componentRef.setInput('fileKind', 'xml');
    fixture.componentRef.setInput('errorType', 'format');
    fixture.detectChanges();

    const nativeElement = fixture.nativeElement as HTMLElement;
    const icon = nativeElement.querySelector('.sportbook6vn-item-file__icon') as HTMLImageElement;
    expect(nativeElement.textContent).toContain('File tải lên không đúng định dạng');
    expect(icon.src).toContain('/assets/illustrations/a-illustration/file-error.png');
  });

  it('emits remove and download actions', () => {
    const removeSpy = vi.fn();
    const downloadSpy = vi.fn();
    fixture.componentInstance.remove.subscribe(removeSpy);
    fixture.componentInstance.download.subscribe(downloadSpy);
    fixture.componentRef.setInput('showDownload', true);
    fixture.detectChanges();

    const removeButton = fixture.nativeElement.querySelector('.sportbook6vn-item-file__action--remove') as HTMLButtonElement;
    const downloadButton = fixture.nativeElement.querySelector('.sportbook6vn-item-file__action--download') as HTMLButtonElement;
    removeButton.click();
    downloadButton.click();

    expect(removeSpy).toHaveBeenCalledTimes(1);
    expect(downloadSpy).toHaveBeenCalledTimes(1);
  });
});
