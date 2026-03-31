import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('sportbook_mbbiz');
  protected readonly activeLang = signal<'VIE' | 'ENG'>('VIE');
  protected readonly isLangOpen = signal(false);
  protected readonly activeTheme = signal<'light' | 'dark'>('light');
  protected readonly isThemeOpen = signal(false);
  protected readonly isGettingStartedOpen = signal(false);
  protected readonly isDesignTokensOpen = signal(false);
  protected readonly isComponentsOpen = signal(true);
  protected readonly activePage = signal<'buttons' | 'color'>('buttons');

  protected toggleLangMenu() {
    this.isLangOpen.update((v) => !v);
  }

  protected setLang(lang: 'VIE' | 'ENG') {
    this.activeLang.set(lang);
    this.isLangOpen.set(false);
  }

  protected toggleThemeMenu() {
    this.isThemeOpen.update((v) => !v);
  }

  protected setTheme(theme: 'light' | 'dark') {
    this.activeTheme.set(theme);
    this.isThemeOpen.set(false);
  }

  protected setPage(page: 'buttons' | 'color') {
    this.activePage.set(page);
  }

  protected toggleSection(section: 'gettingStarted' | 'designTokens' | 'components') {
    if (section === 'gettingStarted') {
      this.isGettingStartedOpen.update((v) => !v);
    } else if (section === 'designTokens') {
      this.isDesignTokensOpen.update((v) => !v);
    } else {
      this.isComponentsOpen.update((v) => !v);
    }
  }
}
