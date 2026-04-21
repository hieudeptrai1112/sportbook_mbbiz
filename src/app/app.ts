import { CommonModule } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';
import { DsButtonComponent } from './components/ds-button/ds-button.component';
import { DsInputBasicComponent } from './components/ds-input-basic/ds-input-basic.component';
import { DsInputAffixComponent } from './components/ds-input-affix/ds-input-affix.component';
import { DsInputAffixLabelComponent } from './components/ds-input-affix-label/ds-input-affix-label.component';
import { DsInputSearchComponent } from './components/ds-input-search/ds-input-search.component';
import {
  DsInputPasswordComponent,
  type DsInputPasswordState,
} from './components/ds-input-password/ds-input-password.component';
import { DsInputFloatingLabelComponent } from './components/ds-input-floating-label/ds-input-floating-label.component';
import { DsTextAreaComponent } from './components/ds-text-area/ds-text-area.component';
import {
  Sportbook6vnAffixInputComponent,
  Sportbook6vnAffixLabelInputComponent,
  Sportbook6vnButtonComponent,
  Sportbook6vnDropdownComponent,
  Sportbook6vnFloatingLabelInputComponent,
  Sportbook6vnInputComponent,
  Sportbook6vnInputTagComponent,
  type Sportbook6vnInputTagValue,
  type Sportbook6vnAffixDropdownSide,
  type Sportbook6vnAffixDropdownItem,
  Sportbook6vnPasswordInputComponent,
  Sportbook6vnSearchInputComponent,
  Sportbook6vnTextareaComponent,
} from 'sportbook6vn';
import {
  SEMANTIC_BACKGROUND_FIGMA_ORDER,
  SEMANTIC_BORDER_FIGMA_ORDER,
  SEMANTIC_COLOR_TOKEN_MAPPINGS,
  SEMANTIC_ICON_FIGMA_ORDER,
  SEMANTIC_TEXT_FIGMA_ORDER,
  type SemanticColorTokenMapping,
} from './semantic-tokens.data';
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
import {
  INPUT_API_ROWS,
  type InputDemoComponent,
  INPUT_DEMO_SECTIONS,
  INPUT_STATE_CONTRACT_ROWS,
  INPUT_STATE_CONTRACT_SNIPPET,
  INPUT_STATE_PRIORITY_RULES,
  INPUT_SEMANTIC_BINDING_GROUPS,
  INPUT_SPACING_RULES,
  INPUT_VARIABLE_GROUPS,
  INPUT_VARIABLE_NOTES,
  type InputApiRow,
  type InputCodeType,
  type InputDemoSection,
  type InputDemoState,
  type InputStateContractRow,
  type InputSemanticBindingGroup,
  type InputVariableGroup,
} from './input-field-demos.data';
import {
  DEFAULT_THEME_BRAND,
  DEFAULT_THEME_ID,
  DEFAULT_THEME_MODE,
  SEMANTIC_THEME_ALIAS_PRIMITIVE_OVERRIDES,
  SEMANTIC_THEME_ALIAS_OVERRIDES,
  buildSemanticThemeAliasPrimitiveMaps,
  buildSemanticThemeAliasValueMaps,
  getThemeBrandFromId,
  getThemeId,
  getThemeModeFromId,
  isThemeMode,
  parseThemeId,
  type ThemeBrand,
  type ThemeId,
  type ThemeMode,
} from './semantic-theme-modes.data';

interface SemanticTokenGroup {
  category: string;
  label: string;
  items: SemanticColorTokenMapping[];
}

interface ResolvedButtonSemanticBindingRow {
  componentToken: string;
  semanticAlias: string;
  semanticValue: string;
  description: string;
}

interface ResolvedButtonSemanticBindingGroup {
  title: string;
  description: string;
  rows: ResolvedButtonSemanticBindingRow[];
}

interface ResolvedInputSemanticBindingRow {
  componentToken: string;
  semanticAlias: string;
  semanticValue: string;
  description: string;
}

interface ResolvedInputSemanticBindingGroup {
  title: string;
  description: string;
  rows: ResolvedInputSemanticBindingRow[];
}

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    DsButtonComponent,
    DsInputBasicComponent,
    DsInputAffixComponent,
    DsInputAffixLabelComponent,
    DsInputSearchComponent,
    DsInputPasswordComponent,
    DsInputFloatingLabelComponent,
    DsTextAreaComponent,
    Sportbook6vnAffixInputComponent,
    Sportbook6vnAffixLabelInputComponent,
    Sportbook6vnButtonComponent,
    Sportbook6vnFloatingLabelInputComponent,
    Sportbook6vnInputComponent,
    Sportbook6vnInputTagComponent,
    Sportbook6vnPasswordInputComponent,
    Sportbook6vnSearchInputComponent,
    Sportbook6vnTextareaComponent,
    Sportbook6vnDropdownComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('sportbook_mbbiz');
  protected readonly activeLang = signal<'VIE' | 'ENG'>('VIE');
  protected readonly isLangOpen = signal(false);
  protected readonly activeThemeBrand = signal<ThemeBrand>(DEFAULT_THEME_BRAND);
  protected readonly activeTheme = signal<ThemeMode>(DEFAULT_THEME_MODE);
  protected readonly isThemeOpen = signal(false);
  protected readonly isGettingStartedOpen = signal(false);
  protected readonly isDesignTokensOpen = signal(false);
  protected readonly isComponentsOpen = signal(true);
  protected readonly activePage = signal<
    'buttons' | 'inputField' | 'core3Mapping' | 'color' | 'tokens' | 'spacing' | 'typography'
  >('buttons');
  protected readonly semanticTokenMappings = SEMANTIC_COLOR_TOKEN_MAPPINGS;
  protected readonly semanticTokenGroups = this.buildSemanticTokenGroups();
  protected readonly activeTokenSection = signal(
    this.semanticTokenGroups.length > 0 ? this.getTokenSectionId(this.semanticTokenGroups[0].category) : '',
  );
  protected readonly colorTokenMode = signal<ThemeMode>(DEFAULT_THEME_MODE);
  protected readonly copiedSemanticAlias = signal<string | null>(null);
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
  protected readonly inputDemoSections: InputDemoSection[] = INPUT_DEMO_SECTIONS;
  protected readonly inputApiRows: InputApiRow[] = INPUT_API_ROWS;
  protected readonly inputStateContractRows: InputStateContractRow[] = INPUT_STATE_CONTRACT_ROWS;
  protected readonly inputStatePriorityRules: string[] = INPUT_STATE_PRIORITY_RULES;
  protected readonly inputStateContractSnippet = INPUT_STATE_CONTRACT_SNIPPET;
  protected readonly inputSemanticBindingGroups: ResolvedInputSemanticBindingGroup[] =
    this.buildInputSemanticBindingGroups(INPUT_SEMANTIC_BINDING_GROUPS);
  protected readonly inputVariableGroups: InputVariableGroup[] = INPUT_VARIABLE_GROUPS;
  protected readonly inputVariableNotes = INPUT_VARIABLE_NOTES;
  protected readonly inputSpacingRules = INPUT_SPACING_RULES;
  protected readonly activeInputSection = signal(this.getInputSectionId(this.inputDemoSections[0].id));
  protected readonly inputCodeType = signal<InputCodeType>('js');
  protected readonly expandedInputDemoIds = signal<string[]>([]);
  protected readonly copiedInputDemoId = signal<string | null>(null);
  protected readonly core3MapInputValue = signal('');
  protected readonly core3MapAffixInputValue = signal('Input text');
  protected readonly core3MapSearchValue = signal('');
  protected readonly core3MapPasswordValue = signal('');
  protected readonly core3MapPasswordVisible = signal(false);
  protected readonly core3MapTextareaValue = signal('Input text');
  protected readonly core3MapFloatingLabelValue = signal('');
  protected readonly core3MapAffixLabelValue = signal('');
  protected readonly core3MapAffixLabelPrefixValue = signal<string | null>(null);
  protected readonly core3MapAffixLabelOpen = signal<Sportbook6vnAffixDropdownSide | null>('prefix');
  protected readonly core3MapInputTagValue = signal('');
  protected readonly core3MapInputTagTags = signal<Sportbook6vnInputTagValue[]>([]);
  protected readonly core3MapInputTagValidatedValue = signal('');
  protected readonly core3MapInputTagValidatedTags = signal<Sportbook6vnInputTagValue[]>([]);
  protected readonly core3MapDropdownValue = signal<string | null>(null);
  protected readonly core3MapDropdownOpen = signal(false);
  protected readonly core3MapDropdownItems = [
    { id: 'option-1', label: 'Option 1' },
    { id: 'option-2', label: 'Option 2' },
    { id: 'option-3', label: 'Option 3' },
    { id: 'option-4', label: 'Option 4' },
    { id: 'option-5', label: 'Option 5' },
    { id: 'option-6', label: 'Option 6' },
  ] as const;
  protected readonly core3MapAffixLabelItems: readonly Sportbook6vnAffixDropdownItem[] = [
    { id: 'vnd', label: 'VND', flagCode: 'vnd' },
    { id: 'usd', label: 'USD', flagCode: 'usd' },
    { id: 'krw', label: 'KRW', flagCode: 'krw' },
    { id: 'gbp', label: 'GBP', flagCode: 'gbp' },
    { id: 'cad', label: 'CAD', flagCode: 'cad' },
    { id: 'thb', label: 'THB', flagCode: 'thb' },
  ] as const;
  protected readonly core3MapInputTagResponsiveTags = signal<Sportbook6vnInputTagValue[]>([
    'label 1',
    'label 2',
    'label 3',
    'label 4',
    'label 5',
  ]);
  private readonly themeStorageKey = 'sportbook.theme-id';
  private readonly semanticThemeAliasValueMaps = buildSemanticThemeAliasValueMaps(
    this.semanticTokenMappings,
  );
  private readonly semanticThemeAliasPrimitiveMaps = buildSemanticThemeAliasPrimitiveMaps(
    this.semanticTokenMappings,
  );

  constructor() {
    const initialThemeId = this.resolveInitialThemeId();
    const initialBrand = getThemeBrandFromId(initialThemeId);
    const initialMode = getThemeModeFromId(initialThemeId);
    this.activeThemeBrand.set(initialBrand);
    this.activeTheme.set(initialMode);
    this.colorTokenMode.set(initialMode);
    this.applyThemeMode(initialMode);
  }

  protected get darkTokenOverrideCount(): number {
    const valueOverrides = Object.keys(SEMANTIC_THEME_ALIAS_OVERRIDES[this.activeThemeBrand()].dark);
    const primitiveOverrides = Object.keys(
      SEMANTIC_THEME_ALIAS_PRIMITIVE_OVERRIDES[this.activeThemeBrand()].dark,
    );
    return new Set([...valueOverrides, ...primitiveOverrides]).size;
  }

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

  protected setTheme(theme: ThemeMode) {
    this.activeTheme.set(theme);
    this.colorTokenMode.set(theme);
    this.applyThemeMode(theme);
    this.persistThemeMode(theme);
    this.isThemeOpen.set(false);
  }

  protected setPage(
    page: 'buttons' | 'inputField' | 'core3Mapping' | 'color' | 'tokens' | 'spacing' | 'typography',
  ) {
    this.activePage.set(page);
    if (page === 'tokens' || page === 'spacing' || page === 'typography') {
      setTimeout(() => this.updateActiveTokenSection(), 0);
    } else if (page === 'buttons') {
      setTimeout(() => this.updateActiveButtonSection(), 0);
    } else if (page === 'inputField') {
      setTimeout(() => this.updateActiveInputSection(), 0);
    }
  }

  protected setCore3MapInputValue(value: string) {
    this.core3MapInputValue.set(value);
  }

  protected setCore3MapAffixInputValue(value: string) {
    this.core3MapAffixInputValue.set(value);
  }

  protected setCore3MapSearchValue(value: string) {
    this.core3MapSearchValue.set(value);
  }

  protected setCore3MapPasswordValue(value: string) {
    this.core3MapPasswordValue.set(value);
  }

  protected setCore3MapPasswordVisible(value: boolean) {
    this.core3MapPasswordVisible.set(value);
  }

  protected setCore3MapTextareaValue(value: string) {
    this.core3MapTextareaValue.set(value);
  }

  protected setCore3MapFloatingLabelValue(value: string) {
    this.core3MapFloatingLabelValue.set(value);
  }

  protected setCore3MapAffixLabelValue(value: string) {
    this.core3MapAffixLabelValue.set(value);
  }

  protected setCore3MapAffixLabelPrefixValue(value: string | null) {
    this.core3MapAffixLabelPrefixValue.set(value);
  }

  protected setCore3MapAffixLabelOpen(value: Sportbook6vnAffixDropdownSide | null) {
    this.core3MapAffixLabelOpen.set(value);
  }

  protected setCore3MapInputTagValue(value: string) {
    this.core3MapInputTagValue.set(value);
  }

  protected setCore3MapInputTagTags(value: Sportbook6vnInputTagValue[]) {
    this.core3MapInputTagTags.set(value);
  }

  protected setCore3MapInputTagValidatedValue(value: string) {
    this.core3MapInputTagValidatedValue.set(value);
  }

  protected setCore3MapInputTagValidatedTags(value: Sportbook6vnInputTagValue[]) {
    this.core3MapInputTagValidatedTags.set(value);
  }

  protected setCore3MapDropdownValue(value: string | null) {
    this.core3MapDropdownValue.set(value);
  }

  protected setCore3MapDropdownOpen(open: boolean) {
    this.core3MapDropdownOpen.set(open);
  }

  protected readonly core3MapInputTagOverflowRender = (count: number) => `${count} More`;
  protected readonly core3MapInputTagResponsiveOverflowRender = (count: number) => `+${count} More`;

  protected readonly core3MapInputTagRenderTone = ({ value, label }: { value: string; label: string }) => {
    const toneMap: Record<string, 'brand' | 'warning' | 'success'> = {
      arcoblue: 'brand',
      orange: 'warning',
      lime: 'success',
    };

    return {
      label,
      tone: toneMap[value] ?? 'brand',
    };
  };

  protected readonly core3MapInputTagEmailValidate = (
    inputValue: string,
    tags: readonly Sportbook6vnInputTagValue[],
  ) => {
    const candidate = inputValue.trim().toLowerCase();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate);
    const duplicated = tags.some((tag) => {
      if (typeof tag === 'string') {
        return tag === candidate;
      }

      return tag.value === candidate;
    });

    if (!candidate || !isEmail || duplicated) {
      return false;
    }

    return {
      value: candidate,
      label: candidate,
    };
  };

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

  protected setActiveInputSection(sectionId: string) {
    this.activeInputSection.set(sectionId);
  }

  protected isInputInteractiveSection(section: InputDemoSection): boolean {
    return section.interactive === true;
  }

  protected isInputDemoComponent(
    section: InputDemoSection,
    component: InputDemoComponent,
  ): boolean {
    return section.component === component;
  }

  protected asPasswordState(state: InputDemoState): DsInputPasswordState {
    switch (state) {
      case 'default':
      case 'focus':
      case 'typing':
      case 'filled':
      case 'error':
      case 'disabled':
        return state;
      default:
        return 'default';
    }
  }

  protected toggleTocCollapsed() {
    this.isTocCollapsed.update((value) => !value);
  }

  protected setColorTokenMode(mode: ThemeMode) {
    this.activeTheme.set(mode);
    this.colorTokenMode.set(mode);
    this.applyThemeMode(mode);
    this.persistThemeMode(mode);
  }

  protected getTokenCssVar(token: SemanticColorTokenMapping): string {
    return this.getTokenCssVarFromAlias(token.alias);
  }

  protected getTokenDescription(token: SemanticColorTokenMapping): string {
    const parts = token.alias.split('/');
    const rolePath = parts.slice(3).join(' / ');
    const role = this.humanizeTokenPath(rolePath);
    return `${this.formatCategoryLabel(token.category)} role: ${role}`;
  }

  protected hasTokenDarkOverride(token: SemanticColorTokenMapping): boolean {
    const brand = this.activeThemeBrand();
    return Boolean(
      SEMANTIC_THEME_ALIAS_OVERRIDES[brand].dark[token.alias] ||
        SEMANTIC_THEME_ALIAS_PRIMITIVE_OVERRIDES[brand].dark[token.alias],
    );
  }

  protected getTokenPrimitiveRef(token: SemanticColorTokenMapping): string {
    const themeId = getThemeId(this.activeThemeBrand(), this.colorTokenMode());
    return this.semanticThemeAliasPrimitiveMaps[themeId][token.alias] ?? token.primitive;
  }

  protected getTokenFigmaAlias(token: SemanticColorTokenMapping): string {
    return token.alias.replace(/^color\/semantic\//, '');
  }

  protected getTokenFigmaPrimitiveRef(token: SemanticColorTokenMapping): string {
    return this.getTokenPrimitiveRef(token).replace(/^color\/primitive\//, '');
  }

  protected getTokenDisplayValue(token: SemanticColorTokenMapping): string {
    const themeId = getThemeId(this.activeThemeBrand(), this.colorTokenMode());
    return this.semanticThemeAliasValueMaps[themeId][token.alias] ?? token.value;
  }

  protected async copySemanticTokenRow(token: SemanticColorTokenMapping) {
    const payload = `${this.getTokenCssVar(token)}: ${this.getTokenDisplayValue(token)};`;
    await this.writeTextToClipboard(payload);
    this.copiedSemanticAlias.set(token.alias);
    setTimeout(() => {
      if (this.copiedSemanticAlias() === token.alias) {
        this.copiedSemanticAlias.set(null);
      }
    }, 1200);
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
      return section.snippetTs ?? this.buildTypeScriptSnippet(section);
    }
    return section.snippetHtml ?? this.buildHtmlSnippet(section);
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

  protected getInputSectionId(sectionId: string): string {
    return `input-${sectionId}`;
  }

  protected isInputDemoExpanded(sectionId: string): boolean {
    return this.expandedInputDemoIds().includes(sectionId);
  }

  protected toggleInputDemoCode(sectionId: string) {
    const next = new Set(this.expandedInputDemoIds());
    if (next.has(sectionId)) {
      next.delete(sectionId);
    } else {
      next.add(sectionId);
    }
    this.expandedInputDemoIds.set([...next]);
  }

  protected toggleAllInputDemoCode() {
    const expanded = this.expandedInputDemoIds();
    const allIds = this.inputDemoSections.map((section) => section.id);
    const shouldExpandAll = expanded.length !== allIds.length;
    this.expandedInputDemoIds.set(shouldExpandAll ? allIds : []);
  }

  protected areAllInputDemoCodeExpanded(): boolean {
    return this.expandedInputDemoIds().length === this.inputDemoSections.length;
  }

  protected setInputCodeType(type: InputCodeType) {
    this.inputCodeType.set(type);
  }

  protected getInputDemoCode(section: InputDemoSection): string {
    if (this.inputCodeType() === 'ts') {
      return section.snippetTs ?? this.buildInputTypeScriptSnippet(section);
    }
    return section.snippetHtml ?? this.buildInputHtmlSnippet(section);
  }

  protected getInputDemoHighlightedCode(section: InputDemoSection): string {
    const code = this.getInputDemoCode(section);
    if (this.inputCodeType() === 'ts') {
      return this.highlightTypeScriptSnippet(code);
    }
    return this.highlightHtmlSnippet(code);
  }

  protected getInputCodeLanguageLabel(section: InputDemoSection): string {
    if (this.inputCodeType() === 'js') {
      if (section.component === 'input-search') {
        return 'app-input-search-demo.component.html';
      }
      if (section.component === 'input-affix') {
        return 'app-input-affix-demo.component.html';
      }
      if (section.component === 'input-affix-label') {
        return 'app-input-affix-label-demo.component.html';
      }
      if (section.component === 'input-floating-label') {
        return 'app-input-floating-label-demo.component.html';
      }
      if (section.component === 'text-area') {
        return 'app-textarea-demo.component.html';
      }
      if (section.component === 'input-password') {
        return 'app-input-password-demo.component.html';
      }
      return 'app-input-basic-demo.component.html';
    }

    if (section.component === 'input-search') {
      return 'input-search-demo.component.ts';
    }
    if (section.component === 'input-affix') {
      return 'input-affix-demo.component.ts';
    }
    if (section.component === 'input-affix-label') {
      return 'input-affix-label-demo.component.ts';
    }
    if (section.component === 'input-floating-label') {
      return 'input-floating-label-demo.component.ts';
    }
    if (section.component === 'text-area') {
      return 'textarea-demo.component.ts';
    }
    if (section.component === 'input-password') {
      return 'input-password-demo.component.ts';
    }
    return 'input-basic-demo.component.ts';
  }

  protected async copyInputDemoCode(section: InputDemoSection) {
    const code = this.getInputDemoCode(section);
    await this.writeTextToClipboard(code);
    this.copiedInputDemoId.set(section.id);
    setTimeout(() => {
      if (this.copiedInputDemoId() === section.id) {
        this.copiedInputDemoId.set(null);
      }
    }, 1200);
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  protected onViewportChange() {
    this.updateActiveTokenSection();
    this.updateActiveButtonSection();
    this.updateActiveInputSection();
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

  private updateActiveInputSection() {
    if (this.activePage() !== 'inputField' || typeof document === 'undefined') {
      return;
    }

    const sectionIds = this.getInputSectionIds();
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

    this.activeInputSection.set(currentSection);
  }

  private buildSemanticTokenGroups(): SemanticTokenGroup[] {
    const normalizeAlias = (alias: string) => alias.replace(/^color\/semantic\//, '');
    const orderPairs: Array<[string, readonly string[]]> = [
      ['background', SEMANTIC_BACKGROUND_FIGMA_ORDER],
      ['text', SEMANTIC_TEXT_FIGMA_ORDER],
      ['border', SEMANTIC_BORDER_FIGMA_ORDER],
      ['icon', SEMANTIC_ICON_FIGMA_ORDER],
    ];
    const categoryOrders = new Map<string, Map<string, number>>(
      orderPairs.map(([category, order]) => [
        category,
        new Map(order.map((alias, index) => [normalizeAlias(alias), index] as const)),
      ]),
    );

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
        items: items.sort((left, right) => {
          const categoryOrder = categoryOrders.get(category);
          if (categoryOrder) {
            const leftIndex = categoryOrder.get(normalizeAlias(left.alias));
            const rightIndex = categoryOrder.get(normalizeAlias(right.alias));
            if (leftIndex !== undefined && rightIndex !== undefined) {
              return leftIndex - rightIndex;
            }
            if (leftIndex !== undefined) {
              return -1;
            }
            if (rightIndex !== undefined) {
              return 1;
            }
          }
          return left.alias.localeCompare(right.alias);
        }),
      }));
  }

  private buildButtonSemanticBindingGroups(
    groups: ButtonSemanticBindingGroup[],
  ): ResolvedButtonSemanticBindingGroup[] {
    const normalizeSemanticAlias = (alias: string): string =>
      alias.startsWith('color/semantic/') ? alias : `color/semantic/${alias}`;

    const semanticByAlias = new Map<string, SemanticColorTokenMapping>();
    for (const token of this.semanticTokenMappings) {
      semanticByAlias.set(token.alias, token);
      semanticByAlias.set(token.alias.replace(/^color\/semantic\//, ''), token);
    }

    return groups.map((group) => ({
      title: group.title,
      description: group.description,
      rows: group.rows.map((row) => {
        const mapped =
          semanticByAlias.get(row.semanticAlias) ??
          semanticByAlias.get(normalizeSemanticAlias(row.semanticAlias));
        return {
          componentToken: row.componentToken,
          semanticAlias: row.semanticAlias,
          semanticValue: mapped?.value ?? 'N/A',
          description: `${row.appliesTo} · ${row.notes}`,
        };
      }),
    }));
  }

  private buildInputSemanticBindingGroups(
    groups: InputSemanticBindingGroup[],
  ): ResolvedInputSemanticBindingGroup[] {
    const normalizeSemanticAlias = (alias: string): string =>
      alias.startsWith('color/semantic/') ? alias : `color/semantic/${alias}`;

    const semanticByAlias = new Map<string, SemanticColorTokenMapping>();
    for (const token of this.semanticTokenMappings) {
      semanticByAlias.set(token.alias, token);
      semanticByAlias.set(token.alias.replace(/^color\/semantic\//, ''), token);
    }

    return groups.map((group) => ({
      title: group.title,
      description: group.description,
      rows: group.rows.map((row) => {
        const mapped =
          semanticByAlias.get(row.semanticAlias) ??
          semanticByAlias.get(normalizeSemanticAlias(row.semanticAlias));
        return {
          componentToken: row.componentToken,
          semanticAlias: row.semanticAlias,
          semanticValue: mapped?.value ?? 'N/A',
          description: `${row.appliesTo} · ${row.notes}`,
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

    return this.semanticTokenGroups.map((group) => this.getTokenSectionId(group.category));
  }

  private getButtonSectionIds(): string[] {
    return [
      ...this.buttonDemoSections.map((section) => this.getButtonSectionId(section.id)),
      'button-api',
      'button-variables',
    ];
  }

  private getInputSectionIds(): string[] {
    return [
      ...this.inputDemoSections.map((section) => this.getInputSectionId(section.id)),
      'input-api',
      'input-state-contract',
      'input-spacing',
      'input-variables',
    ];
  }

  protected getHighlightedTypeScriptSnippet(code: string): string {
    return this.highlightTypeScriptSnippet(code);
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

  private resolveInitialThemeId(): ThemeId {
    if (typeof window === 'undefined') {
      return DEFAULT_THEME_ID;
    }

    const storedThemeId = parseThemeId(window.localStorage.getItem(this.themeStorageKey));
    if (storedThemeId) {
      return storedThemeId;
    }

    // Backward compatibility for previous storage format: sportbook.theme-id = "light" | "dark"
    const legacyMode = window.localStorage.getItem(this.themeStorageKey);
    if (isThemeMode(legacyMode)) {
      return getThemeId(DEFAULT_THEME_BRAND, legacyMode);
    }

    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      return getThemeId(DEFAULT_THEME_BRAND, 'dark');
    }

    return DEFAULT_THEME_ID;
  }

  private persistThemeMode(theme: ThemeMode): void {
    if (typeof window === 'undefined') {
      return;
    }

    const themeId = getThemeId(this.activeThemeBrand(), theme);
    window.localStorage.setItem(this.themeStorageKey, themeId);
  }

  private applyThemeMode(theme: ThemeMode): void {
    if (typeof document === 'undefined') {
      return;
    }

    const root = document.documentElement;
    const themeId = getThemeId(this.activeThemeBrand(), theme);
    const modeValues = this.semanticThemeAliasValueMaps[themeId];

    for (const [alias, value] of Object.entries(modeValues)) {
      root.style.setProperty(this.getTokenCssVarFromAlias(alias), value);
    }

    root.dataset['themeMode'] = theme;
    root.dataset['themeBrand'] = this.activeThemeBrand();
    root.dataset['themeId'] = themeId;
  }

  private getTokenCssVarFromAlias(alias: string): string {
    return `--${alias.replace(/\//g, '-')}`;
  }

  private formatCategoryLabel(category: string): string {
    return category
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }

  private humanizeTokenPath(value: string): string {
    return value
      .split('/')
      .map((segment) => segment.replace(/-/g, ' '))
      .join(' / ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
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

  private buildInputHtmlSnippet(section: InputDemoSection): string {
    const indentedRows = section.codeJs
      .split('\n')
      .map((line) => `  ${line}`)
      .join('\n');
    return `<section class="button-demo-preview">\n${indentedRows}\n</section>`;
  }

  private buildInputTypeScriptSnippet(section: InputDemoSection): string {
    const isAffix = section.component === 'input-affix';
    const isAffixLabel = section.component === 'input-affix-label';
    const isSearch = section.component === 'input-search';
    const isPassword = section.component === 'input-password';
    const isTextArea = section.component === 'text-area';
    const isFloatingLabel = section.component === 'input-floating-label';
    const componentClass = isTextArea
      ? 'DsTextAreaComponent'
      : isAffix
        ? 'DsInputAffixComponent'
        : isAffixLabel
          ? 'DsInputAffixLabelComponent'
        : isSearch
          ? 'DsInputSearchComponent'
      : isPassword
        ? 'DsInputPasswordComponent'
        : isFloatingLabel
          ? 'DsInputFloatingLabelComponent'
          : 'DsInputBasicComponent';
    const componentSelector = isTextArea
      ? 'app-ds-text-area'
      : isAffix
        ? 'app-ds-input-affix'
        : isAffixLabel
          ? 'app-ds-input-affix-label'
        : isSearch
          ? 'app-ds-input-search'
      : isPassword
        ? 'app-ds-input-password'
        : isFloatingLabel
          ? 'app-ds-input-floating-label'
          : 'app-ds-input-basic';
    const componentImportPath = isTextArea
      ? './components/ds-text-area/ds-text-area.component'
      : isAffix
        ? './components/ds-input-affix/ds-input-affix.component'
        : isAffixLabel
          ? './components/ds-input-affix-label/ds-input-affix-label.component'
        : isSearch
          ? './components/ds-input-search/ds-input-search.component'
      : isPassword
        ? './components/ds-input-password/ds-input-password.component'
        : isFloatingLabel
          ? './components/ds-input-floating-label/ds-input-floating-label.component'
          : './components/ds-input-basic/ds-input-basic.component';
    const componentDemoName = isTextArea
      ? 'TextareaDemoComponent'
      : isAffix
        ? 'InputAffixDemoComponent'
        : isAffixLabel
          ? 'InputAffixLabelDemoComponent'
        : isSearch
          ? 'InputSearchDemoComponent'
      : isPassword
        ? 'InputPasswordDemoComponent'
        : isFloatingLabel
          ? 'InputFloatingLabelDemoComponent'
          : 'InputBasicDemoComponent';
    const componentDemoSelector = isTextArea
      ? 'app-textarea-demo'
      : isAffix
        ? 'app-input-affix-demo'
        : isAffixLabel
          ? 'app-input-affix-label-demo'
        : isSearch
          ? 'app-input-search-demo'
      : isPassword
        ? 'app-input-password-demo'
        : isFloatingLabel
          ? 'app-input-floating-label-demo'
          : 'app-input-basic-demo';
    const defaultPlaceholder =
      isTextArea || isFloatingLabel || isSearch || isAffix || isAffixLabel
        ? 'Input text'
        : 'Enter something';
    const defaultWidth =
      isTextArea || isFloatingLabel || isSearch || isAffix
        ? 250
        : isAffixLabel || isPassword
          ? 307
          : 350;

    const actionRows = section.actions
      .map((action) => {
        const parts = [
          `value: '${this.escapeForSingleQuote(action.value)}'`,
          `state: '${action.state}'`,
        ];
        if ((isPassword || isFloatingLabel) && action.title) {
          parts.push(`title: '${this.escapeForSingleQuote(action.title)}'`);
        }
        if (isPassword && action.contentMode) {
          parts.push(`contentMode: '${action.contentMode}'`);
        }
        if (isAffix && action.affixMode) {
          parts.push(`affixMode: '${action.affixMode}'`);
        }
        if (isAffixLabel && action.labelMode) {
          parts.push(`labelMode: '${action.labelMode}'`);
        }
        if (action.placeholder) {
          parts.push(`placeholder: '${this.escapeForSingleQuote(action.placeholder)}'`);
        }
        if (action.width !== undefined) {
          parts.push(`width: ${action.width}`);
        }
        if (isTextArea && action.maxLength !== undefined) {
          parts.push(`maxLength: ${action.maxLength}`);
        }
        return `    { ${parts.join(', ')} },`;
      })
      .join('\n');

    return `import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ${componentClass} } from '${componentImportPath}';

@Component({
  selector: '${componentDemoSelector}',
  standalone: true,
  imports: [CommonModule, ${componentClass}],
  template: \`
    <section class="button-demo-preview">
      <${componentSelector}
        *ngFor="let action of actions"
        [value]="action.value"
        [state]="action.state"${
          isPassword || isFloatingLabel ? "\n        [title]=\"action.title ?? 'Title'\"" : ''
        }${
          isPassword ? "\n        [contentMode]=\"action.contentMode ?? 'hide'\"" : ''
        }${
          isAffix ? "\n        [affixMode]=\"action.affixMode ?? 'prefix'\"" : ''
        }${
          isAffixLabel ? "\n        [labelMode]=\"action.labelMode ?? 'front'\"" : ''
        }${
          !isPassword ? `\n        [placeholder]="action.placeholder ?? '${defaultPlaceholder}'"` : ''
        }
        [width]="action.width ?? ${defaultWidth}"${
          isTextArea ? '\n        [maxLength]="action.maxLength ?? 100"' : ''
        }
      />
    </section>
  \`,
})
export class ${componentDemoName} {
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
    const stash: string[] = [];
    let escaped = this.escapeHtml(code);

    escaped = this.captureToken(escaped, /(&lt;!--[\s\S]*?--&gt;)/g, 'comment', stash);
    escaped = this.captureToken(
      escaped,
      /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g,
      'string',
      stash,
    );

    escaped = escaped.replace(
      /(&lt;\/?)([A-Za-z][\w-]*)/g,
      '<span class="code-token punctuation">$1</span><span class="code-token tag">$2</span>',
    );
    escaped = escaped.replace(
      /([:@*.\[\]\(\)\w-]+)(\s*=\s*)/g,
      '<span class="code-token attr">$1</span><span class="code-token punctuation">$2</span>',
    );
    escaped = escaped.replace(/(\/?&gt;)/g, '<span class="code-token punctuation">$1</span>');
    escaped = escaped.replace(/(\{\{|\}\}|\?\?|=>)/g, '<span class="code-token keyword">$1</span>');
    escaped = escaped.replace(/\b([0-9]+)\b/g, '<span class="code-token number">$1</span>');

    return this.restoreCapturedTokens(escaped, stash);
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
    escaped = escaped.replace(
      /\b(Component|DsButtonComponent|DsInputBasicComponent|DsInputBasicState|DsInputAffixComponent|DsInputAffixState|DsInputAffixMode|DsInputAffixLabelComponent|DsInputAffixLabelState|DsInputAffixLabelMode|DsInputFloatingLabelComponent|DsInputFloatingLabelState|DsInputPasswordComponent|DsInputPasswordState|DsInputPasswordContentMode|DsInputSearchComponent|DsInputSearchState|DsTextAreaComponent|DsTextAreaState)\b/g,
      '<span class="code-token type">$1</span>',
    );
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

  private escapeForSingleQuote(value: string): string {
    return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  }
}
