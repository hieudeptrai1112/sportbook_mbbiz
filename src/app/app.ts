import { CommonModule } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';
import { SEMANTIC_COLOR_TOKEN_MAPPINGS, type SemanticColorTokenMapping } from './semantic-tokens.data';
import {
  RADIUS_SCALE_ROWS,
  SPACING_SCALE_ROWS,
  TYPOGRAPHY_SCALE_GROUPS,
  type TypographyScaleGroup,
  type NumericScaleRow,
} from './scale-tokens.data';
import {
  BUTTON_API_ROWS,
  BUTTON_DEMO_SECTIONS,
  type ButtonApiRow,
  type ButtonCodeType,
  type ButtonDemoSection,
} from './button-demos.data';

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
  protected readonly activeTokenSection = signal('token-architecture');
  protected readonly isTocCollapsed = signal(false);
  protected readonly spacingScaleRows: NumericScaleRow[] = SPACING_SCALE_ROWS;
  protected readonly radiusScaleRows: NumericScaleRow[] = RADIUS_SCALE_ROWS;
  protected readonly typographyScaleGroups: TypographyScaleGroup[] = TYPOGRAPHY_SCALE_GROUPS;
  protected readonly buttonDemoSections: ButtonDemoSection[] = BUTTON_DEMO_SECTIONS;
  protected readonly buttonApiRows: ButtonApiRow[] = BUTTON_API_ROWS;
  protected readonly activeButtonSection = signal(this.getButtonSectionId(this.buttonDemoSections[0].id));
  protected readonly buttonCodeType = signal<ButtonCodeType>('js');
  protected readonly expandedButtonDemoIds = signal<string[]>([]);
  protected readonly copiedButtonDemoId = signal<string | null>(null);

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
    if (page === 'tokens') {
      setTimeout(() => this.updateActiveTokenSection(), 0);
    } else if (page === 'buttons') {
      setTimeout(() => this.updateActiveButtonSection(), 0);
    }
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

  protected getTokenSectionId(category: string): string {
    return `semantic-${category}`;
  }

  protected setActiveTokenSection(sectionId: string) {
    this.activeTokenSection.set(sectionId);
  }

  protected setActiveButtonSection(sectionId: string) {
    this.activeButtonSection.set(sectionId);
  }

  protected toggleTocCollapsed() {
    this.isTocCollapsed.update((value) => !value);
  }

  protected isButtonDemoExpanded(sectionId: string): boolean {
    return this.expandedButtonDemoIds().includes(sectionId);
  }

  protected toggleButtonDemoCode(sectionId: string) {
    const next = new Set(this.expandedButtonDemoIds());
    if (next.has(sectionId)) {
      next.delete(sectionId);
    } else {
      next.add(sectionId);
    }
    this.expandedButtonDemoIds.set([...next]);
  }

  protected toggleAllButtonDemoCode() {
    const expanded = this.expandedButtonDemoIds();
    const allIds = this.buttonDemoSections.map((section) => section.id);
    const shouldExpandAll = expanded.length !== allIds.length;
    this.expandedButtonDemoIds.set(shouldExpandAll ? allIds : []);
  }

  protected areAllButtonDemoCodeExpanded(): boolean {
    return this.expandedButtonDemoIds().length === this.buttonDemoSections.length;
  }

  protected setButtonCodeType(type: ButtonCodeType) {
    this.buttonCodeType.set(type);
  }

  protected getButtonDemoCode(section: ButtonDemoSection): string {
    if (this.buttonCodeType() === 'ts' && section.codeTs) {
      return section.codeTs;
    }
    return section.codeJs;
  }

  protected async copyButtonDemoCode(section: ButtonDemoSection) {
    const code = this.getButtonDemoCode(section);
    await this.writeTextToClipboard(code);
    this.copiedButtonDemoId.set(section.id);
    setTimeout(() => {
      if (this.copiedButtonDemoId() === section.id) {
        this.copiedButtonDemoId.set(null);
      }
    }, 1200);
  }

  protected getButtonSectionId(sectionId: string): string {
    return `button-${sectionId}`;
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  protected onViewportChange() {
    this.updateActiveTokenSection();
    this.updateActiveButtonSection();
  }

  private updateActiveTokenSection() {
    if (this.activePage() !== 'tokens' || typeof document === 'undefined') {
      return;
    }

    const sectionIds = this.getTokenSectionIds();
    let currentSection = sectionIds[0];
    const offset = 140;

    for (const sectionId of sectionIds) {
      const section = document.getElementById(sectionId);
      if (!section) {
        continue;
      }

      if (section.getBoundingClientRect().top <= offset) {
        currentSection = sectionId;
      } else {
        break;
      }
    }

    this.activeTokenSection.set(currentSection);
  }

  private updateActiveButtonSection() {
    if (this.activePage() !== 'buttons' || typeof document === 'undefined') {
      return;
    }

    const sectionIds = this.getButtonSectionIds();
    let currentSection = sectionIds[0];
    const offset = 140;

    for (const sectionId of sectionIds) {
      const section = document.getElementById(sectionId);
      if (!section) {
        continue;
      }

      if (section.getBoundingClientRect().top <= offset) {
        currentSection = sectionId;
      } else {
        break;
      }
    }

    this.activeButtonSection.set(currentSection);
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

  private getTokenSectionIds(): string[] {
    return [
      'token-architecture',
      'semantic-categories',
      ...this.semanticTokenGroups.map((group) => this.getTokenSectionId(group.category)),
      'scale-tables',
    ];
  }

  private getButtonSectionIds(): string[] {
    return [...this.buttonDemoSections.map((section) => this.getButtonSectionId(section.id)), 'button-api'];
  }

  private async writeTextToClipboard(text: string): Promise<void> {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }

    if (typeof document !== 'undefined') {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.setAttribute('readonly', '');
      textArea.style.position = 'absolute';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  }

  private formatCategoryLabel(category: string): string {
    return category
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }
}
