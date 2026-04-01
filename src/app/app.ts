import { CommonModule } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';
import { DsButtonComponent } from './components/ds-button/ds-button.component';
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
  BUTTON_SEMANTIC_BINDING_GROUPS,
  BUTTON_VARIABLE_GROUPS,
  BUTTON_VARIABLE_NOTES,
  type ButtonDemoAction,
  type ButtonApiRow,
  type ButtonCodeType,
  type ButtonDemoSection,
  type ButtonSemanticBindingGroup,
  type ButtonVariableGroup,
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

interface ResolvedButtonSemanticBindingRow {
  componentToken: string;
  semanticAlias: string;
  semanticPrimitive: string;
  semanticValue: string;
  appliesTo: string;
  notes: string;
}

interface ResolvedButtonSemanticBindingGroup {
  title: string;
  description: string;
  rows: ResolvedButtonSemanticBindingRow[];
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, DsButtonComponent],
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
  protected readonly activePage = signal<'buttons' | 'color' | 'tokens' | 'spacing' | 'typography'>(
    'buttons',
  );
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
  protected readonly buttonSemanticBindingGroups: ResolvedButtonSemanticBindingGroup[] =
    this.buildButtonSemanticBindingGroups(BUTTON_SEMANTIC_BINDING_GROUPS);
  protected readonly buttonVariableGroups: ButtonVariableGroup[] = BUTTON_VARIABLE_GROUPS;
  protected readonly buttonVariableNotes = BUTTON_VARIABLE_NOTES;
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

  protected setPage(page: 'buttons' | 'color' | 'tokens' | 'spacing' | 'typography') {
    this.activePage.set(page);
    if (page === 'tokens' || page === 'spacing' || page === 'typography') {
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

  protected getTypographySectionId(title: string): string {
    return `typography-${title.toLowerCase().replace(/\s+/g, '-')}`;
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
    if (this.buttonCodeType() === 'ts') {
      return this.buildTypeScriptSnippet(section);
    }
    return this.buildHtmlSnippet(section);
  }

  protected getButtonDemoHighlightedCode(section: ButtonDemoSection): string {
    const code = this.getButtonDemoCode(section);
    if (this.buttonCodeType() === 'ts') {
      return this.highlightTypeScriptSnippet(code);
    }
    return this.highlightHtmlSnippet(code);
  }

  protected getButtonCodeLanguageLabel(): string {
    return this.buttonCodeType() === 'js'
      ? 'app-button-demo.component.html'
      : 'button-demo.component.ts';
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
    if (
      (this.activePage() !== 'tokens' &&
        this.activePage() !== 'spacing' &&
        this.activePage() !== 'typography') ||
      typeof document === 'undefined'
    ) {
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

  private buildButtonSemanticBindingGroups(
    groups: ButtonSemanticBindingGroup[],
  ): ResolvedButtonSemanticBindingGroup[] {
    const semanticByAlias = new Map(
      this.semanticTokenMappings.map((token) => [token.alias, token] as const),
    );

    return groups.map((group) => ({
      title: group.title,
      description: group.description,
      rows: group.rows.map((row) => {
        const mapped = semanticByAlias.get(row.semanticAlias);
        return {
          componentToken: row.componentToken,
          semanticAlias: row.semanticAlias,
          semanticPrimitive: mapped?.primitive ?? 'N/A',
          semanticValue: mapped?.value ?? 'N/A',
          appliesTo: row.appliesTo,
          notes: row.notes,
        };
      }),
    }));
  }

  private getTokenSectionIds(): string[] {
    if (this.activePage() === 'spacing') {
      return ['spacing-scale', 'radius-scale'];
    }

    if (this.activePage() === 'typography') {
      return this.typographyScaleGroups.map((group) => this.getTypographySectionId(group.title));
    }

    return [
      'token-architecture',
      'semantic-categories',
      ...this.semanticTokenGroups.map((group) => this.getTokenSectionId(group.category)),
    ];
  }

  private getButtonSectionIds(): string[] {
    return [
      ...this.buttonDemoSections.map((section) => this.getButtonSectionId(section.id)),
      'button-api',
      'button-variables',
    ];
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

  private buildHtmlSnippet(section: ButtonDemoSection): string {
    const indentedRows = section.codeJs
      .split('\n')
      .map((line) => `  ${line}`)
      .join('\n');
    return `<section class="button-demo-preview">\n${indentedRows}\n</section>`;
  }

  private buildTypeScriptSnippet(section: ButtonDemoSection): string {
    const actionRows = section.actions
      .map((action) => `    ${this.formatActionForSnippet(action)},`)
      .join('\n');

    return `import { Component } from '@angular/core';
import { DsButtonComponent } from './components/ds-button/ds-button.component';

@Component({
  selector: 'app-button-demo',
  standalone: true,
  imports: [DsButtonComponent],
  template: \`
    <div class="button-demo-preview">
      <app-ds-button
        *ngFor="let action of actions"
        [label]="action.label"
        [shape]="action.shape"
        [tone]="action.tone"
        [state]="action.state"
        [size]="action.size"
        [showLeftIcon]="action.showLeftIcon ?? false"
        [showRightIcon]="action.showRightIcon ?? false"
      />
    </div>
  \`,
})
export class ButtonDemoComponent {
  readonly actions = [
${actionRows}
  ];
}`;
  }

  private formatActionForSnippet(action: ButtonDemoAction): string {
    const parts = [
      `label: '${action.label}'`,
      `shape: '${action.shape ?? 'rectangle'}'`,
      `tone: '${action.tone ?? 'primary'}'`,
      `state: '${action.state ?? 'default'}'`,
      `size: '${action.size ?? 'large'}'`,
    ];

    if (action.showLeftIcon) {
      parts.push('showLeftIcon: true');
    }

    if (action.showRightIcon) {
      parts.push('showRightIcon: true');
    }

    return `{ ${parts.join(', ')} }`;
  }

  private highlightHtmlSnippet(code: string): string {
    return code
      .split('\n')
      .map((line) => {
        const escapedLine = this.escapeHtml(line);
        return escapedLine.replace(
          /(&lt;\/?)([A-Za-z][\w-]*)(.*?)(\/?&gt;)/g,
          (_match, open, tagName, attributes, close) => {
            const highlightedAttrs = attributes.replace(
              /([:@*.\[\]\(\)\w-]+)(=)("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g,
              '<span class="code-token attr">$1</span><span class="code-token punctuation">$2</span><span class="code-token string">$3</span>',
            );

            return `<span class="code-token punctuation">${open}</span><span class="code-token tag">${tagName}</span>${highlightedAttrs}<span class="code-token punctuation">${close}</span>`;
          },
        );
      })
      .join('\n')
      .replace(/(\{\{|\}\}|\?\?|=>)/g, '<span class="code-token keyword">$1</span>');
  }

  private highlightTypeScriptSnippet(code: string): string {
    const stash: string[] = [];
    let escaped = this.escapeHtml(code);

    escaped = this.captureToken(escaped, /(\/\*[\s\S]*?\*\/|\/\/.*$)/gm, 'comment', stash);
    escaped = this.captureToken(
      escaped,
      /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)/g,
      'string',
      stash,
    );

    escaped = escaped.replace(
      /\b(import|from|const|readonly|interface|type|export|class|return|true|false)\b/g,
      '<span class="code-token keyword">$1</span>',
    );
    escaped = escaped.replace(/\b(Component|DsButtonComponent)\b/g, '<span class="code-token type">$1</span>');
    escaped = escaped.replace(/\b([0-9]+)\b/g, '<span class="code-token number">$1</span>');
    escaped = escaped.replace(
      /(\{|\}|\(|\)|\[|\]|:|,|;|=>)/g,
      '<span class="code-token punctuation">$1</span>',
    );

    return this.restoreCapturedTokens(escaped, stash);
  }

  private captureToken(source: string, pattern: RegExp, className: string, stash: string[]): string {
    return source.replace(pattern, (match) => {
      const key = `__code_token_${stash.length}__`;
      stash.push(`<span class="code-token ${className}">${match}</span>`);
      return key;
    });
  }

  private restoreCapturedTokens(source: string, stash: string[]): string {
    return source.replace(/__code_token_(\d+)__/g, (_match, index) => stash[Number(index)] ?? '');
  }

  private escapeHtml(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}
