import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('mbbiz-ds');
  protected readonly isDark = signal(false);

  toggleTheme(): void {
    this.isDark.update((value) => !value);
  }
}
