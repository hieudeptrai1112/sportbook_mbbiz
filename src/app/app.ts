import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('sportbook_mbbiz');
  protected readonly language = signal<'VIE' | 'ENG'>('VIE');

  protected toggleLanguage() {
    this.language.set(this.language() === 'VIE' ? 'ENG' : 'VIE');
  }
}
