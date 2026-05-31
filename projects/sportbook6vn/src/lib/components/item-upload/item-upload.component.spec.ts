import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sportbook6vnItemUploadComponent } from './item-upload.component';

describe('Sportbook6vnItemUploadComponent', () => {
  let fixture: ComponentFixture<Sportbook6vnItemUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sportbook6vnItemUploadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Sportbook6vnItemUploadComponent);
    fixture.detectChanges();
  });

  it('renders the default upload entry from Illustration assets', () => {
    const nativeElement = fixture.nativeElement as HTMLElement;
    const illustration = nativeElement.querySelector('.sportbook6vn-item-upload__illustration') as HTMLImageElement;

    expect(nativeElement.textContent).toContain('Kéo và thả để tải lên tệp tin');
    expect(nativeElement.textContent).toContain('Chọn từ máy tính');
    expect(illustration.src).toContain('/assets/illustrations/a-illustration/upload.png');
  });

  it('renders the error state with message', () => {
    fixture.componentRef.setInput('state', 'error');
    fixture.componentRef.setInput('errorMessage', 'Error Message');
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.sportbook6vn-item-upload') as HTMLElement;
    const error = fixture.nativeElement.querySelector('.sportbook6vn-item-upload__error-message') as HTMLElement;

    expect(root.classList).toContain('sportbook6vn-item-upload--error');
    expect(error.textContent).toContain('Error Message');
  });

  it('disables the select action', () => {
    const selectSpy = vi.fn();
    fixture.componentInstance.select.subscribe(selectSpy);
    fixture.componentRef.setInput('state', 'disabled');
    fixture.detectChanges();

    const select = fixture.nativeElement.querySelector('.sportbook6vn-item-upload__link') as HTMLButtonElement;
    select.click();

    expect(select.disabled).toBe(true);
    expect(selectSpy).not.toHaveBeenCalled();
  });

  it('emits selected files from drop', () => {
    const dropSpy = vi.fn();
    const file = new File(['data'], 'report.pdf', { type: 'application/pdf' });
    const event = new Event('drop', { bubbles: true, cancelable: true });
    Object.defineProperty(event, 'dataTransfer', {
      value: {
        files: [file],
      },
    });
    fixture.componentInstance.fileDrop.subscribe(dropSpy);

    const root = fixture.nativeElement.querySelector('.sportbook6vn-item-upload') as HTMLElement;
    root.dispatchEvent(event);

    expect(dropSpy).toHaveBeenCalledWith([file]);
  });
});
