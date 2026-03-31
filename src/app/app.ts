import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { SEMANTIC_COLOR_TOKEN_MAPPINGS, type SemanticColorTokenMapping } from './semantic-tokens.data';

interface SemanticTokenGroup {
  category: string;
  label: string;
  items: SemanticColorTokenMapping[];
}

interface SemanticCategorySummary {
  category: string;
  label: string;
  count: number;
}

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
  protected readonly activePage = signal<'buttons' | 'color' | 'tokens'>('buttons');
  protected readonly semanticTokenMappings = SEMANTIC_COLOR_TOKEN_MAPPINGS;
  protected readonly semanticTokenGroups = this.buildSemanticTokenGroups();
  protected readonly semanticCategorySummary = this.buildSemanticCategorySummary();
  protected readonly semanticTokenCount = this.semanticTokenMappings.length;
  protected readonly primitiveTokenCount = this.getUniquePrimitiveCount();

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

  protected setPage(page: 'buttons' | 'color' | 'tokens') {
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

  private buildSemanticTokenGroups(): SemanticTokenGroup[] {
    const grouped = new Map<string, SemanticColorTokenMapping[]>();
    for (const token of this.semanticTokenMappings) {
      const bucket = grouped.get(token.category) ?? [];
      bucket.push(token);
      grouped.set(token.category, bucket);
    }

    return [...grouped.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([category, items]) => ({
        category,
        label: this.formatCategoryLabel(category),
        items: items.sort((left, right) => left.alias.localeCompare(right.alias)),
      }));
  }

  private buildSemanticCategorySummary(): SemanticCategorySummary[] {
    return this.semanticTokenGroups.map((group) => ({
      category: group.category,
      label: group.label,
      count: group.items.length,
    }));
  }

  private getUniquePrimitiveCount(): number {
    return new Set(this.semanticTokenMappings.map((token) => token.primitive)).size;
  }

  private formatCategoryLabel(category: string): string {
    return category
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }
}
