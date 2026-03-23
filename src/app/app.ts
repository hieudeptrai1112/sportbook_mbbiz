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
  protected readonly openGroups = signal<Record<string, boolean>>({
    development: true,
    components: false,
    language: false,
    usage: false,
    lab: false,
    pro: false
  });

  toggleTheme(): void {
    this.isDark.update((value) => !value);
  }

  toggleGroup(key: string): void {
    this.openGroups.update((state) => ({
      ...state,
      [key]: !state[key]
    }));
  }
}
