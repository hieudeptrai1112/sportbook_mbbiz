import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-input-debounce-example',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <label for="search">Search</label>
    <input id="search" type="search" [formControl]="query" placeholder="Type keyword" />
    <p>Last queried keyword: {{ lastQuery() || '(none)' }}</p>
  `,
})
export class InputDebounceExampleComponent {
  protected readonly query = new FormControl('', { nonNullable: true });
  protected readonly lastQuery = signal('');

  constructor() {
    this.query.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.lastQuery.set(value.trim());
        // place API call here
      });
  }
}
