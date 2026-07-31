import { CommonModule } from '@angular/common';
import { Component, HostListener, computed, inject, signal, type WritableSignal } from '@angular/core';
import type { IconSizeToken } from '@mbbiz/icon';
import { IconComponent } from '@mbbiz/icon/angular';
import type { DsInputPasswordState } from './components/ds-input-password/ds-input-password.component';
import {
  MbbizAffixInputComponent,
  MbbizAffixLabelInputComponent,
  MbbizBadgeComponent,
  type MbbizBadgeStatus,
  type MbbizAffixDropdownItem,
  MbbizButtonComponent,
  MbbizBreadcrumbComponent,
  MbbizButtonLinkComponent,
  MbbizCheckboxComponent,
  MbbizCheckboxGroupComponent,
  type MbbizCheckboxGroupOption,
  MbbizDatepickerComponent,
  MbbizDropdownComponent,
  type MbbizDropdownItem,
  MbbizDropdownTagComponent,
  MbbizFloatingLabelInputComponent,
  MbbizInputComponent,
  MbbizInputTagComponent,
  MbbizItemFileComponent,
  type MbbizItemFileErrorType,
  type MbbizItemFileKind,
  MbbizItemUploadComponent,
  type MbbizInputTagValue,
  MbbizModalComponent,
  MbbizPasswordInputComponent,
  MbbizPaginationComponent,
  MbbizMessageComponent,
  MbbizMessageService,
  type MbbizMessageType,
  type MbbizPaginationRangeFormatter,
  type MbbizPaginationSummaryFormatter,
  MbbizRadioComponent,
  MbbizRadioGroupComponent,
  type MbbizRadioGroupOption,
  MbbizSearchInputComponent,
  MbbizStepsComponent,
  type MbbizStepItem,
  MbbizStatusComponent,
  type MbbizStatusColor,
  MbbizSwitchComponent,
  MbbizTabComponent,
  type MbbizTabItem,
  MbbizTableComponent,
  type MbbizTableCellValueChange,
  type MbbizTableRow,
  MbbizTextareaComponent,
  MbbizUploadFileComponent,
  type MbbizUploadFileItem,
  type MbbizButtonSize,
  type MbbizButtonVariant,
} from 'mbbiz';
import {
  TABLE_PREVIEW_ALL_COLUMNS,
  TABLE_PREVIEW_DEFAULT_COLUMNS,
  TABLE_PREVIEW_DEFAULT_ROWS,
  TABLE_PREVIEW_FIXED_RIGHT_COLUMNS,
  TABLE_PREVIEW_PRIMITIVE_COLUMNS,
  TABLE_PREVIEW_PRIMITIVE_ROWS,
  TABLE_PREVIEW_SELECTION_COLUMNS,
  createTablePreviewAllColumnRows,
  createTablePreviewFixedRightRows,
  createTablePreviewSelectionRows,
} from '../../projects/mbbiz/src/lib/components/table/table.preview-fixtures';
import {
  SEMANTIC_BACKGROUND_FIGMA_ORDER,
  SEMANTIC_BACKGROUND_GRADIENT_FIGMA_ORDER,
  SEMANTIC_BORDER_FIGMA_ORDER,
  SEMANTIC_COLOR_TOKEN_MAPPINGS,
  SEMANTIC_ICON_FIGMA_ORDER,
  SEMANTIC_TEXT_FIGMA_ORDER,
  type SemanticColorTokenMapping,
} from './semantic-tokens.data';
import {
  RADIUS_SCALE_ROWS,
  ICON_SIZE_SCALE_ROWS,
  SPACING_SCALE_ROWS,
  TYPOGRAPHY_SCALE_GROUPS,
  type TypographyScaleGroup,
  type NumericScaleRow,
} from './scale-tokens.data';
import {
  TYPOGRAPHY_STYLE_GROUPS,
  type TypographyStyleGroup,
} from './typography-styles.data';
import {
  LAYOUT_TOKEN_GROUPS,
  type LayoutTokenGroup,
} from './layout-tokens.data';
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
  BADGE_DEMO_SECTIONS,
  BADGE_VARIABLE_GROUPS,
  BADGE_VARIABLE_NOTES,
  type BadgeDemoSection,
} from './badge-demos.data';
import {
  BUTTON_LINK_DEMO_SECTIONS,
  BUTTON_LINK_VARIABLE_GROUPS,
  BUTTON_LINK_VARIABLE_NOTES,
  type ButtonLinkDemoSection,
} from './button-link-demos.data';
import {
  CHECKBOX_VARIABLE_GROUPS,
  CHECKBOX_VARIABLE_NOTES,
} from './checkbox-demos.data';
import {
  FORM_VARIABLE_GROUPS,
  FORM_VARIABLE_NOTES,
} from './form-demos.data';
import {
  MODAL_DEMO_SECTIONS,
  MODAL_VARIABLE_GROUPS,
  MODAL_VARIABLE_NOTES,
  type ModalDemoSection,
} from './modal-demos.data';
import {
  SWITCH_DEMO_SECTIONS,
  SWITCH_VARIABLE_GROUPS,
  SWITCH_VARIABLE_NOTES,
  type SwitchDemoSection,
} from './switch-demos.data';
import {
  BUTTON_MAPPING_API_ROWS,
  BUTTON_MAPPING_DEMO_SECTIONS,
  type ButtonMappingApiRow,
  type ButtonMappingDemoSection,
} from './button-mapping.demos.data';
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
  INPUT_TAG_API_ROWS,
  INPUT_TAG_DEMO_SECTIONS,
  INPUT_TAG_VARIABLE_GROUPS,
  INPUT_TAG_VARIABLE_NOTES,
  type InputTagApiRow,
  type InputTagDemoSection,
} from './input-tag-demos.data';
import {
  DROPDOWN_API_ROWS,
  DROPDOWN_DEMO_SECTIONS,
  DROPDOWN_TAG_API_ROWS,
  DROPDOWN_VARIABLE_GROUPS,
  DROPDOWN_VARIABLE_NOTES,
  type DropdownApiRow,
  type DropdownDemoSection,
} from './dropdown-demos.data';
import {
  RADIO_API_ROWS,
  RADIO_DEMO_SECTIONS,
  RADIO_GROUP_API_ROWS,
  RADIO_VARIABLE_GROUPS,
  RADIO_VARIABLE_NOTES,
  type RadioApiRow,
  type RadioDemoSection,
} from './radio-demos.data';
import {
  DATEPICKER_API_ROWS,
  DATEPICKER_DEMO_SECTIONS,
  DATEPICKER_OUTPUT_ROWS,
  DATEPICKER_VARIABLE_GROUPS,
  DATEPICKER_VARIABLE_NOTES,
  type DatepickerApiRow,
  type DatepickerDemoSection,
} from './datepicker-demos.data';
import {
  BREADCRUMB_API_ROWS,
  BREADCRUMB_DEMO_SECTIONS,
  BREADCRUMB_VARIABLE_GROUPS,
  BREADCRUMB_VARIABLE_NOTES,
  type BreadcrumbApiRow,
  type BreadcrumbDemoSection,
} from './breadcrumb-demos.data';
import {
  MESSAGE_CASES,
  MESSAGE_DEMO_SECTIONS,
  MESSAGE_VARIABLE_GROUPS,
  MESSAGE_VARIABLE_NOTES,
  type MessageCase,
  type MessageDemoSection,
} from './message-demos.data';
import {
  STEPS_API_ROWS,
  STEPS_DEMO_SECTIONS,
  STEPS_VARIABLE_GROUPS,
  STEPS_VARIABLE_NOTES,
  type StepsApiRow,
  type StepsDemoSection,
} from './steps-demos.data';
import {
  STATUS_DEMO_SECTIONS,
  STATUS_VARIABLE_GROUPS,
  STATUS_VARIABLE_NOTES,
  type StatusDemoSection,
} from './status-demos.data';
import {
  TAB_DEMO_SECTIONS,
  TAB_VARIABLE_GROUPS,
  TAB_VARIABLE_NOTES,
  type TabDemoSection,
} from './tab-demos.data';
import {
  TABLE_API_ROWS,
  TABLE_DEMO_SECTIONS,
  TABLE_OUTPUT_ROWS,
  TABLE_TYPE_ROWS,
  TABLE_VARIABLE_GROUPS,
  TABLE_VARIABLE_NOTES,
  type TableApiRow,
  type TableDemoSection,
} from './table-demos.data';
import {
  PAGINATION_API_ROWS,
  PAGINATION_DEMO_SECTIONS,
  PAGINATION_OUTPUT_ROWS,
  PAGINATION_TYPE_ROWS,
  PAGINATION_VARIABLE_GROUPS,
  PAGINATION_VARIABLE_NOTES,
  type PaginationApiRow,
  type PaginationDemoSection,
} from './pagination-demos.data';
import { ILLUSTRATION_ASSETS, type IllustrationAsset } from './illustration-assets.data';
import {
  ICON_LIBRARY_GROUPS,
  ICON_LIBRARY_SIZE_PREVIEWS,
  type IconLibraryEntry,
  type IconLibraryGroup,
  type IconSizePreviewRow,
} from './icon-library-demos.data';
import {
  UPLOAD_FILE_API_ROWS,
  UPLOAD_FILE_DEMO_SECTIONS,
  UPLOAD_FILE_ITEM_FILE_API_ROWS,
  UPLOAD_FILE_ITEM_UPLOAD_API_ROWS,
  UPLOAD_FILE_TYPE_ROWS,
  UPLOAD_FILE_VARIABLE_GROUPS,
  UPLOAD_FILE_VARIABLE_NOTES,
  type UploadFileApiRow,
  type UploadFileDemoSection,
} from './upload-file-demos.data';
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
import {
  FOOTER_PATTERN_VARIANTS,
  FORM_PATTERN_CASES,
  PAGE_HEADER_PATTERN_CASES,
  STEP_PROCESS_PATTERN_CASES,
  type FooterPatternVariant,
  type FormPatternCase,
  type PageHeaderPatternCase,
  type StepProcessPatternCase,
} from './pattern-demos.data';

interface SemanticTokenGroup {
  category: string;
  label: string;
  items: SemanticColorTokenMapping[];
}

interface ResolvedButtonSemanticBindingRow {
  alias: string;
  globalColor: string;
  hexValue: string;
  description: string;
}

interface ResolvedButtonSemanticBindingGroup {
  title: string;
  description: string;
  rows: ResolvedButtonSemanticBindingRow[];
}

interface ResolvedInputSemanticBindingRow {
  alias: string;
  globalColor: string;
  hexValue: string;
  description: string;
}

interface ResolvedInputSemanticBindingGroup {
  title: string;
  description: string;
  rows: ResolvedInputSemanticBindingRow[];
}

interface ResolvedAliasColorRow {
  alias: string;
  globalColor: string;
  hexValue: string;
  description: string;
}

interface ResolvedVariableSpecRow {
  token: string;
  value: string;
  appliesTo: string;
  notes: string;
}

interface ResolvedVariableTokenGroup {
  title: string;
  kind: 'alias-color' | 'spec';
  aliasRows: ResolvedAliasColorRow[];
  specRows: ResolvedVariableSpecRow[];
}

type InputDocsSectionId =
  | 'input-basic-text'
  | 'input-affix-prefix'
  | 'input-affix-both'
  | 'input-search'
  | 'input-password'
  | 'input-textarea'
  | 'input-floating-label'
  | 'input-affix-label'
  | 'input-status'
  | 'input-disabled';

const INPUT_DOC_SECTION_IDS: readonly InputDocsSectionId[] = [
  'input-basic-text',
  'input-affix-prefix',
  'input-affix-both',
  'input-search',
  'input-password',
  'input-textarea',
  'input-floating-label',
  'input-affix-label',
  'input-status',
  'input-disabled',
];

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    MbbizAffixInputComponent,
    MbbizAffixLabelInputComponent,
    MbbizBadgeComponent,
    MbbizButtonComponent,
    MbbizBreadcrumbComponent,
    MbbizButtonLinkComponent,
    MbbizCheckboxComponent,
    MbbizCheckboxGroupComponent,
    MbbizDatepickerComponent,
    MbbizDropdownComponent,
    MbbizDropdownTagComponent,
    MbbizFloatingLabelInputComponent,
    MbbizInputComponent,
    MbbizInputTagComponent,
    MbbizItemFileComponent,
    MbbizItemUploadComponent,
    MbbizMessageComponent,
    MbbizModalComponent,
    MbbizPasswordInputComponent,
    MbbizPaginationComponent,
    MbbizRadioComponent,
    MbbizRadioGroupComponent,
    MbbizSearchInputComponent,
    MbbizStepsComponent,
    MbbizStatusComponent,
    MbbizSwitchComponent,
    MbbizTabComponent,
    MbbizTableComponent,
    MbbizTextareaComponent,
    MbbizUploadFileComponent,
    IconComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly messageService = inject(MbbizMessageService);
  protected readonly title = signal('sportbook_mbbiz');
  protected readonly activeLang = signal<'VIE' | 'ENG'>('VIE');
  protected readonly isLangOpen = signal(false);
  protected readonly activeThemeBrand = signal<ThemeBrand>(DEFAULT_THEME_BRAND);
  protected readonly activeTheme = signal<ThemeMode>(DEFAULT_THEME_MODE);
  protected readonly isThemeOpen = signal(false);
  protected readonly isGettingStartedOpen = signal(true);
  protected readonly isDesignTokensOpen = signal(false);
  protected readonly isComponentsOpen = signal(false);
  protected readonly isPatternOpen = signal(false);
  protected readonly activePage = signal<
    | 'buttons'
    | 'buttonMapping'
    | 'buttonLink'
    | 'inputField'
    | 'form'
    | 'inputTag'
    | 'breadcrumb'
    | 'steps'
    | 'tab'
    | 'dropdown'
    | 'radio'
    | 'checkbox'
    | 'switch'
    | 'badge'
    | 'status'
    | 'message'
    | 'modal'
    | 'table'
    | 'pagination'
    | 'datepicker'
    | 'uploadFile'
    | 'iconography'
    | 'illustration'
    | 'pageHeaderPattern'
    | 'footerPattern'
    | 'stepProcessPattern'
    | 'formPattern'
    | 'introduction'
    | 'installation'
    | 'color'
    | 'tokens'
    | 'spacing'
    | 'layout'
    | 'typography'
  >('introduction');
  protected readonly semanticTokenMappings = SEMANTIC_COLOR_TOKEN_MAPPINGS;
  protected readonly semanticTokenGroups = this.buildSemanticTokenGroups();
  protected readonly activeTokenSection = signal(
    this.semanticTokenGroups.length > 0
      ? this.getTokenSectionId(this.semanticTokenGroups[0].category)
      : '',
  );
  protected readonly colorTokenMode = signal<ThemeMode>(DEFAULT_THEME_MODE);
  protected readonly copiedSemanticAlias = signal<string | null>(null);
  protected readonly isTocCollapsed = signal(false);
  protected readonly footerPatternVariants = FOOTER_PATTERN_VARIANTS;
  protected readonly activeFooterPatternSection = signal(
    this.getFooterPatternSectionId(this.footerPatternVariants[0]?.id ?? 'type1'),
  );
  protected readonly formPatternCases = FORM_PATTERN_CASES;
  protected readonly activeFormPatternSection = signal(
    this.getFormPatternSectionId(this.formPatternCases[0]?.id ?? 'basic'),
  );
  protected readonly pageHeaderPatternCases = PAGE_HEADER_PATTERN_CASES;
  protected readonly activePageHeaderPatternSection = signal(
    this.getPageHeaderPatternSectionId(this.pageHeaderPatternCases[0]?.id ?? 'default'),
  );
  protected readonly stepProcessPatternCases = STEP_PROCESS_PATTERN_CASES;
  protected readonly activeStepProcessPatternSection = signal(
    this.getStepProcessPatternSectionId(this.stepProcessPatternCases[0]?.id ?? 'default'),
  );
  protected readonly openFooterPatternOverflowId = signal<FooterPatternVariant['id'] | null>(null);
  protected readonly spacingScaleRows: NumericScaleRow[] = SPACING_SCALE_ROWS;
  protected readonly radiusScaleRows: NumericScaleRow[] = RADIUS_SCALE_ROWS;
  protected readonly iconSizeScaleRows: NumericScaleRow[] = ICON_SIZE_SCALE_ROWS;
  protected readonly layoutTokenGroups: LayoutTokenGroup[] = LAYOUT_TOKEN_GROUPS;
  protected readonly typographyScaleGroups: TypographyScaleGroup[] = TYPOGRAPHY_SCALE_GROUPS;
  protected readonly typographyStyleGroups: TypographyStyleGroup[] = TYPOGRAPHY_STYLE_GROUPS;
  protected readonly buttonDemoSections: ButtonDemoSection[] = BUTTON_DEMO_SECTIONS;
  protected readonly buttonMappingDemoSections: ButtonMappingDemoSection[] =
    BUTTON_MAPPING_DEMO_SECTIONS;
  protected readonly buttonMappingApiRows: ButtonMappingApiRow[] = BUTTON_MAPPING_API_ROWS;
  protected readonly buttonApiRows: ButtonApiRow[] = BUTTON_API_ROWS;
  protected readonly buttonSemanticBindingGroups: ResolvedButtonSemanticBindingGroup[] =
    this.buildButtonSemanticBindingGroups(BUTTON_SEMANTIC_BINDING_GROUPS);
  protected readonly buttonVariableGroups: ButtonVariableGroup[] = BUTTON_VARIABLE_GROUPS;
  protected readonly buttonVariableNotes = BUTTON_VARIABLE_NOTES;
  protected readonly activeButtonSection = signal(
    this.getButtonSectionId(this.buttonMappingDemoSections[0]?.id ?? 'basic'),
  );
  protected readonly buttonCodeType = signal<ButtonCodeType>('js');
  protected readonly expandedButtonDemoIds = signal<string[]>([]);
  protected readonly copiedButtonDemoId = signal<string | null>(null);
  protected readonly activeButtonMappingSection = signal(
    this.getButtonMappingSectionId(this.buttonMappingDemoSections[0]?.id ?? 'basic'),
  );
  protected readonly expandedButtonMappingDemoIds = signal<string[]>([]);
  protected readonly copiedButtonMappingDemoId = signal<string | null>(null);
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
  protected readonly activeInputSection = signal('input-basic-text');
  protected readonly inputCodeType = signal<InputCodeType>('js');
  protected readonly expandedInputDemoIds = signal<string[]>([]);
  protected readonly copiedInputDemoId = signal<string | null>(null);
  protected readonly expandedInputDocsDemoIds = signal<string[]>([]);
  protected readonly copiedInputDocsDemoId = signal<string | null>(null);
  protected readonly inputTagDemoSections: InputTagDemoSection[] = INPUT_TAG_DEMO_SECTIONS;
  protected readonly inputTagApiRows: InputTagApiRow[] = INPUT_TAG_API_ROWS;
  protected readonly inputTagVariableGroups: ResolvedVariableTokenGroup[] =
    this.buildResolvedVariableTokenGroups(INPUT_TAG_VARIABLE_GROUPS);
  protected readonly inputTagVariableNotes = INPUT_TAG_VARIABLE_NOTES;
  protected readonly activeInputTagSection = signal(
    this.getInputTagSectionId(this.inputTagDemoSections[0]?.id ?? 'interactive'),
  );
  protected readonly expandedInputTagDemoIds = signal<string[]>([]);
  protected readonly copiedInputTagDemoId = signal<string | null>(null);
  protected readonly breadcrumbDemoSections: BreadcrumbDemoSection[] = BREADCRUMB_DEMO_SECTIONS;
  protected readonly breadcrumbApiRows: BreadcrumbApiRow[] = BREADCRUMB_API_ROWS;
  protected readonly breadcrumbVariableGroups: ResolvedVariableTokenGroup[] =
    this.buildResolvedVariableTokenGroups(BREADCRUMB_VARIABLE_GROUPS);
  protected readonly breadcrumbVariableNotes = BREADCRUMB_VARIABLE_NOTES;
  protected readonly activeBreadcrumbSection = signal(
    this.getBreadcrumbSectionId(this.breadcrumbDemoSections[0]?.id ?? 'amount'),
  );
  protected readonly expandedBreadcrumbDemoIds = signal<string[]>([]);
  protected readonly copiedBreadcrumbDemoId = signal<string | null>(null);
  protected readonly stepsDemoSections: StepsDemoSection[] = STEPS_DEMO_SECTIONS;
  protected readonly stepsApiRows: StepsApiRow[] = STEPS_API_ROWS;
  protected readonly stepsVariableGroups: ResolvedVariableTokenGroup[] =
    this.buildResolvedVariableTokenGroups(STEPS_VARIABLE_GROUPS);
  protected readonly stepsVariableNotes = STEPS_VARIABLE_NOTES;
  protected readonly activeStepsSection = signal(
    this.getStepsSectionId(this.stepsDemoSections[0]?.id ?? 'horizontal-steps'),
  );
  protected readonly stepProgressStates = [0, 1, 2, 3, 4];
  protected readonly verticalStepPreviewItems: readonly MbbizStepItem[] = [
    { title: 'Text', status: 'process' },
    { title: 'Text', status: 'wait' },
    { title: 'Text', status: 'wait' },
  ];
  protected readonly verticalStepStateCases: {
    title: string;
    ariaLabel: string;
    items: readonly MbbizStepItem[];
  }[] = [
    {
      title: 'Active=No',
      ariaLabel: 'Vertical step inactive state',
      items: [{ title: 'Text', status: 'wait' }],
    },
    {
      title: 'Active=Yes',
      ariaLabel: 'Vertical step active state',
      items: [{ title: 'Text', status: 'process' }],
    },
  ];
  protected readonly horizontalStepStateCases: {
    title: string;
    ariaLabel: string;
    items: readonly MbbizStepItem[];
  }[] = [
    {
      title: 'Next',
      ariaLabel: 'Horizontal step next state',
      items: [{ title: 'Text', status: 'wait' }],
    },
    {
      title: 'In Progress',
      ariaLabel: 'Horizontal step in progress state',
      items: [{ title: 'Text', status: 'process' }],
    },
    {
      title: 'Done',
      ariaLabel: 'Horizontal step done state',
      items: [{ title: 'Text', status: 'finish' }],
    },
    {
      title: 'Error',
      ariaLabel: 'Horizontal step error state',
      items: [{ title: 'Text', status: 'error' }],
    },
  ];
  protected readonly expandedStepsDemoIds = signal<string[]>([]);
  protected readonly copiedStepsDemoId = signal<string | null>(null);
  protected readonly tabDemoSections: TabDemoSection[] = TAB_DEMO_SECTIONS;
  protected readonly tabVariableGroups: ResolvedVariableTokenGroup[] =
    this.buildResolvedVariableTokenGroups(TAB_VARIABLE_GROUPS);
  protected readonly tabVariableNotes = TAB_VARIABLE_NOTES;
  protected readonly activeTabSection = signal(
    this.getTabSectionId(this.tabDemoSections[0]?.id ?? 'default'),
  );
  protected readonly tabPillActiveIndex = signal(0);
  protected readonly tabUnderlinedActiveIndex = signal(0);
  protected readonly tabSmallActiveIndex = signal(0);
  protected readonly tabDefaultItems: MbbizTabItem[] = [
    { label: 'Text' },
    { label: 'Text' },
    { label: 'Text' },
  ];
  protected readonly tabCountItems: MbbizTabItem[] = [
    { label: 'Text', count: 12 },
    { label: 'Text' },
    { label: 'Text', count: 12 },
  ];
  protected readonly tabDisabledItems: MbbizTabItem[] = [
    { label: 'Text' },
    { label: 'Text' },
    { label: 'Text', disabled: true },
  ];
  protected readonly badgeDemoSections: BadgeDemoSection[] = BADGE_DEMO_SECTIONS;
  protected readonly badgeVariableGroups: ResolvedVariableTokenGroup[] =
    this.buildResolvedVariableTokenGroups(BADGE_VARIABLE_GROUPS);
  protected readonly badgeVariableNotes = BADGE_VARIABLE_NOTES;
  protected readonly activeBadgeSection = signal(
    this.getBadgeSectionId(this.badgeDemoSections[0]?.id ?? 'default'),
  );
  protected readonly badgeStatusCases: { status: MbbizBadgeStatus; label: string }[] = [
    { status: 'invalid', label: 'Text' },
    { status: 'overdue', label: 'Text' },
    { status: 'unfinished', label: 'Text' },
    { status: 'renew-loan', label: 'Text' },
    { status: 'pending', label: 'Text' },
    { status: 'completed', label: 'Text' },
    { status: 'failed', label: 'Text' },
  ];
  protected readonly statusDemoSections: StatusDemoSection[] = STATUS_DEMO_SECTIONS;
  protected readonly statusVariableGroups: ResolvedVariableTokenGroup[] =
    this.buildResolvedVariableTokenGroups(STATUS_VARIABLE_GROUPS);
  protected readonly statusVariableNotes = STATUS_VARIABLE_NOTES;
  protected readonly activeStatusSection = signal(
    this.getStatusSectionId(this.statusDemoSections[0]?.id ?? 'default'),
  );
  protected readonly messageDemoSections: MessageDemoSection[] = MESSAGE_DEMO_SECTIONS;
  protected readonly messageVariableGroups: ResolvedVariableTokenGroup[] =
    this.buildResolvedVariableTokenGroups(MESSAGE_VARIABLE_GROUPS);
  protected readonly messageVariableNotes = MESSAGE_VARIABLE_NOTES;
  protected readonly checkboxVariableGroups: ResolvedVariableTokenGroup[] =
    this.buildResolvedVariableTokenGroups(CHECKBOX_VARIABLE_GROUPS);
  protected readonly checkboxVariableNotes = CHECKBOX_VARIABLE_NOTES;
  protected readonly formVariableGroups: ResolvedVariableTokenGroup[] =
    this.buildResolvedVariableTokenGroups(FORM_VARIABLE_GROUPS);
  protected readonly formVariableNotes = FORM_VARIABLE_NOTES;
  protected readonly switchDemoSections: SwitchDemoSection[] = SWITCH_DEMO_SECTIONS;
  protected readonly switchVariableGroups: ResolvedVariableTokenGroup[] =
    this.buildResolvedVariableTokenGroups(SWITCH_VARIABLE_GROUPS);
  protected readonly switchVariableNotes = SWITCH_VARIABLE_NOTES;
  protected readonly activeSwitchSection = signal(
    this.getSwitchSectionId(this.switchDemoSections[0]?.id ?? 'default'),
  );
  protected readonly switchDemoChecked = signal(true);
  protected readonly modalDemoSections: ModalDemoSection[] = MODAL_DEMO_SECTIONS;
  protected readonly modalVariableGroups: ResolvedVariableTokenGroup[] =
    this.buildResolvedVariableTokenGroups(MODAL_VARIABLE_GROUPS);
  protected readonly modalVariableNotes = MODAL_VARIABLE_NOTES;
  protected readonly activeModalSection = signal(
    this.getModalSectionId(this.modalDemoSections[0]?.id ?? 'default'),
  );
  protected readonly buttonLinkDemoSections: ButtonLinkDemoSection[] = BUTTON_LINK_DEMO_SECTIONS;
  protected readonly buttonLinkVariableGroups: ResolvedVariableTokenGroup[] =
    this.buildResolvedVariableTokenGroups(BUTTON_LINK_VARIABLE_GROUPS);
  protected readonly buttonLinkVariableNotes = BUTTON_LINK_VARIABLE_NOTES;
  protected readonly activeButtonLinkSection = signal(
    this.getButtonLinkSectionId(this.buttonLinkDemoSections[0]?.id ?? 'default'),
  );
  protected readonly messageCases: MessageCase[] = MESSAGE_CASES;
  protected readonly activeMessageSection = signal(
    this.getMessageSectionId(this.messageDemoSections[0]?.id ?? 'default'),
  );
  protected readonly statusColorCases: { color: MbbizStatusColor; label: string }[] = [
    { color: 'neutral', label: 'Text' },
    { color: 'orange', label: 'Text' },
    { color: 'blue', label: 'Text' },
    { color: 'dark-blue', label: 'Text' },
    { color: 'green', label: 'Text' },
    { color: 'red', label: 'Text' },
  ];
  protected readonly tableDemoSections: TableDemoSection[] = TABLE_DEMO_SECTIONS;
  protected readonly tableApiRows: TableApiRow[] = TABLE_API_ROWS;
  protected readonly tableOutputRows: TableApiRow[] = TABLE_OUTPUT_ROWS;
  protected readonly tableTypeRows: TableApiRow[] = TABLE_TYPE_ROWS;
  protected readonly tableVariableGroups: ResolvedVariableTokenGroup[] =
    this.buildResolvedVariableTokenGroups(TABLE_VARIABLE_GROUPS);
  protected readonly tableVariableNotes = TABLE_VARIABLE_NOTES;
  protected readonly activeTableSection = signal(
    this.getTableSectionId(this.tableDemoSections[0]?.id ?? 'basic'),
  );
  protected readonly expandedTableDemoIds = signal<string[]>([]);
  protected readonly copiedTableDemoId = signal<string | null>(null);
  protected readonly paginationDemoSections: PaginationDemoSection[] = PAGINATION_DEMO_SECTIONS;
  protected readonly paginationApiRows: PaginationApiRow[] = PAGINATION_API_ROWS;
  protected readonly paginationOutputRows: PaginationApiRow[] = PAGINATION_OUTPUT_ROWS;
  protected readonly paginationTypeRows: PaginationApiRow[] = PAGINATION_TYPE_ROWS;
  protected readonly paginationVariableGroups: ResolvedVariableTokenGroup[] =
    this.buildResolvedVariableTokenGroups(PAGINATION_VARIABLE_GROUPS);
  protected readonly paginationVariableNotes = PAGINATION_VARIABLE_NOTES;
  protected readonly activePaginationSection = signal(
    this.getPaginationSectionId(this.paginationDemoSections[0]?.id ?? 'default'),
  );
  protected readonly expandedPaginationDemoIds = signal<string[]>([]);
  protected readonly copiedPaginationDemoId = signal<string | null>(null);
  protected readonly dropdownDemoSections: DropdownDemoSection[] = DROPDOWN_DEMO_SECTIONS;
  protected readonly dropdownApiRows: DropdownApiRow[] = DROPDOWN_API_ROWS;
  protected readonly dropdownTagApiRows: DropdownApiRow[] = DROPDOWN_TAG_API_ROWS;
  protected readonly dropdownVariableGroups: ResolvedVariableTokenGroup[] =
    this.buildResolvedVariableTokenGroups(DROPDOWN_VARIABLE_GROUPS);
  protected readonly dropdownVariableNotes = DROPDOWN_VARIABLE_NOTES;
  protected readonly activeDropdownSection = signal(
    this.getDropdownSectionId(this.dropdownDemoSections[0]?.id ?? 'basic'),
  );
  protected readonly activeFormSection = signal(this.getFormSectionId('default'));
  protected readonly formPatternSelectedRadio = signal<'option-1' | 'option-2'>('option-1');
  protected readonly expandedDropdownDemoIds = signal<string[]>([]);
  protected readonly copiedDropdownDemoId = signal<string | null>(null);
  protected readonly radioDemoSections: RadioDemoSection[] = RADIO_DEMO_SECTIONS;
  protected readonly radioApiRows: RadioApiRow[] = RADIO_API_ROWS;
  protected readonly radioGroupApiRows: RadioApiRow[] = RADIO_GROUP_API_ROWS;
  protected readonly radioVariableGroups: ResolvedVariableTokenGroup[] =
    this.buildResolvedVariableTokenGroups(RADIO_VARIABLE_GROUPS);
  protected readonly radioVariableNotes = RADIO_VARIABLE_NOTES;
  protected readonly activeRadioSection = signal(
    this.getRadioSectionId(this.radioDemoSections[0]?.id ?? 'basic'),
  );
  protected readonly expandedRadioDemoIds = signal<string[]>([]);
  protected readonly copiedRadioDemoId = signal<string | null>(null);
  protected readonly datepickerDemoSections: DatepickerDemoSection[] = DATEPICKER_DEMO_SECTIONS;
  protected readonly datepickerApiRows: DatepickerApiRow[] = DATEPICKER_API_ROWS;
  protected readonly datepickerOutputRows: DatepickerApiRow[] = DATEPICKER_OUTPUT_ROWS;
  protected readonly datepickerVariableGroups: ResolvedVariableTokenGroup[] =
    this.buildResolvedVariableTokenGroups(DATEPICKER_VARIABLE_GROUPS);
  protected readonly datepickerVariableNotes = DATEPICKER_VARIABLE_NOTES;
  protected readonly activeDatepickerSection = signal(
    this.getDatepickerSectionId(this.datepickerDemoSections[0]?.id ?? 'single-date'),
  );
  protected readonly expandedDatepickerDemoIds = signal<string[]>([]);
  protected readonly copiedDatepickerDemoId = signal<string | null>(null);
  protected readonly uploadFileDemoSections: UploadFileDemoSection[] = UPLOAD_FILE_DEMO_SECTIONS;
  protected readonly uploadFileItemUploadApiRows: UploadFileApiRow[] =
    UPLOAD_FILE_ITEM_UPLOAD_API_ROWS;
  protected readonly uploadFileItemFileApiRows: UploadFileApiRow[] = UPLOAD_FILE_ITEM_FILE_API_ROWS;
  protected readonly uploadFileApiRows: UploadFileApiRow[] = UPLOAD_FILE_API_ROWS;
  protected readonly uploadFileTypeRows: UploadFileApiRow[] = UPLOAD_FILE_TYPE_ROWS;
  protected readonly uploadFileVariableGroups: ResolvedVariableTokenGroup[] =
    this.buildResolvedVariableTokenGroups(UPLOAD_FILE_VARIABLE_GROUPS);
  protected readonly uploadFileVariableNotes = UPLOAD_FILE_VARIABLE_NOTES;
  protected readonly activeUploadFileSection = signal(
    this.getUploadFileSectionId(this.uploadFileDemoSections[0]?.id ?? 'item-upload-default'),
  );
  protected readonly expandedUploadFileDemoIds = signal<string[]>([]);
  protected readonly copiedUploadFileDemoId = signal<string | null>(null);
  protected readonly activeInstallationSection = signal('installation-install');
  protected readonly copiedInstallationSnippet = signal<string | null>(null);
  protected readonly installationInstallCommand = 'npm install mbbiz';
  protected readonly installationPeerCommand =
    'npm install @angular/common@^21.2.0 @angular/core@^21.2.0 @angular/forms@^21.2.0 @angular/platform-browser@^21.2.0 ng-zorro-antd@^21.2.2';
  protected readonly installationThemeCode = `@import 'mbbiz/theme.css';
@import 'mbbiz/zorro-bridge.less';`;
  protected readonly installationUsageCode = `import { Component } from '@angular/core';
import { MbbizButtonComponent, MbbizInputComponent } from 'mbbiz';

@Component({
  selector: 'app-root',
  imports: [MbbizButtonComponent, MbbizInputComponent],
  template: \`
    <mbbiz-button>Submit</mbbiz-button>
    <mbbiz-input label="Username" placeholder="Enter username" />
  \`,
})
export class AppComponent {}`;
  protected readonly uploadFilesDone: MbbizUploadFileItem[] = [
    { uid: 'docs-upload-done-1', name: 'Tên tệp tin.pdf', sizeLabel: '2 MB', fileKind: 'pdf' },
    { uid: 'docs-upload-done-2', name: 'Tên tệp tin.docx', sizeLabel: '2 MB', fileKind: 'docx' },
    { uid: 'docs-upload-done-3', name: 'Tên tệp tin.xlsx', sizeLabel: '2 MB', fileKind: 'xlsx' },
  ];
  protected readonly uploadFilesExpanded: MbbizUploadFileItem[] = [
    { uid: 'docs-upload-expanded-1', name: 'Tên tệp tin.pdf', sizeLabel: '2 MB', fileKind: 'pdf' },
    {
      uid: 'docs-upload-expanded-2',
      name: 'Tên tệp tin.docx',
      sizeLabel: '2 MB',
      fileKind: 'docx',
    },
    {
      uid: 'docs-upload-expanded-3',
      name: 'Tên tệp tin.xlsx',
      sizeLabel: '2 MB',
      fileKind: 'xlsx',
    },
    { uid: 'docs-upload-expanded-4', name: 'Tên tệp tin.jpg', sizeLabel: '2 MB', fileKind: 'jpg' },
  ];
  protected readonly uploadFilesLoading: MbbizUploadFileItem[] = [
    {
      uid: 'docs-upload-loading-1',
      name: 'Tên tệp tin.pdf',
      sizeLabel: '2 MB',
      fileKind: 'pdf',
      status: 'uploading',
      percent: 42,
    },
    {
      uid: 'docs-upload-loading-2',
      name: 'Tên tệp tin.xlsx',
      sizeLabel: '2 MB',
      fileKind: 'xlsx',
      status: 'uploading',
      percent: 86,
    },
  ];
  protected readonly uploadFilesError: MbbizUploadFileItem[] = [
    {
      uid: 'docs-upload-error-1',
      name: 'Tên tệp tin.xlsx',
      sizeLabel: '2 MB',
      fileKind: 'xlsx',
      status: 'error',
      errorType: 'size',
      errorMessage: 'File tải lên vượt quá dung lượng cho phép',
    },
    {
      uid: 'docs-upload-error-2',
      name: 'Tên tệp tin.xml',
      sizeLabel: '2 MB',
      fileKind: 'xml',
      status: 'error',
      errorType: 'format',
      errorMessage: 'File tải lên không đúng định dạng. Vui lòng kiểm tra và tải lại',
    },
  ];
  protected readonly uploadFileTypes: MbbizUploadFileItem[] = [
    {
      uid: 'docs-upload-type-xlsx',
      name: 'Tên tệp tin.xlsx',
      sizeLabel: '2 MB',
      fileKind: 'xlsx',
      downloadable: true,
    },
    {
      uid: 'docs-upload-type-docx',
      name: 'Tên tệp tin.docx',
      sizeLabel: '2 MB',
      fileKind: 'docx',
      downloadable: true,
    },
    {
      uid: 'docs-upload-type-pdf',
      name: 'Tên tệp tin.pdf',
      sizeLabel: '2 MB',
      fileKind: 'pdf',
      downloadable: true,
    },
    {
      uid: 'docs-upload-type-jpg',
      name: 'Tên tệp tin.jpg',
      sizeLabel: '2 MB',
      fileKind: 'jpg',
      downloadable: true,
    },
    {
      uid: 'docs-upload-type-xml',
      name: 'Tên tệp tin.xml',
      sizeLabel: '2 MB',
      fileKind: 'xml',
      downloadable: true,
    },
  ];
  protected readonly itemFileKinds: { kind: MbbizItemFileKind; name: string }[] = [
    { kind: 'xlsx', name: 'Tên tệp tin.xlsx' },
    { kind: 'docx', name: 'Tên tệp tin.docx' },
    { kind: 'pdf', name: 'Tên tệp tin.pdf' },
    { kind: 'jpg', name: 'Tên tệp tin.jpg' },
    { kind: 'xml', name: 'Tên tệp tin.xml' },
  ];
  protected readonly itemFileLoadingKinds = this.itemFileKinds.map((item, index) => ({
    ...item,
    percent: [72, 54, 38, 80, 46][index],
  }));
  protected readonly itemFileErrorCases: {
    kind: MbbizItemFileKind;
    name: string;
    errorType: MbbizItemFileErrorType;
  }[] = [
    { kind: 'xlsx', name: 'Tên tệp tin.xlsx', errorType: 'size' },
    { kind: 'pdf', name: 'Tên tệp tin.pdf', errorType: 'upload' },
    { kind: 'error', name: 'Tên tệp tin.xml', errorType: 'format' },
  ];
  protected readonly tablePrimitiveColumns = TABLE_PREVIEW_PRIMITIVE_COLUMNS;
  protected readonly tablePrimitiveRows = TABLE_PREVIEW_PRIMITIVE_ROWS;
  protected readonly tableDefaultColumns = TABLE_PREVIEW_DEFAULT_COLUMNS;
  protected readonly tableDefaultRows = TABLE_PREVIEW_DEFAULT_ROWS;
  protected readonly tableSelectionColumns = TABLE_PREVIEW_SELECTION_COLUMNS;
  protected readonly tableSelectionRows = signal<MbbizTableRow[]>(
    createTablePreviewSelectionRows(),
  );
  protected readonly tableColumnTypeColumns = TABLE_PREVIEW_ALL_COLUMNS;
  protected readonly tableAllColumnRows = signal<MbbizTableRow[]>(
    createTablePreviewAllColumnRows(),
  );
  protected readonly tableFixedRightIconColumns = TABLE_PREVIEW_FIXED_RIGHT_COLUMNS;
  protected readonly tableFixedRightIconRows = createTablePreviewFixedRightRows();
  protected readonly tableSelectedRowKeys = signal<string[]>(['selection-2']);
  protected readonly tablePaginationIndex = signal(1);
  protected readonly paginationDocsDropdownPage = signal(1);
  protected readonly paginationDocsBoundaryPage = signal(10);
  protected readonly paginationDocsQuickPage = signal(23);
  protected readonly paginationDocsDropdownOpen = signal(true);
  protected readonly paginationQuickSelectedRange: MbbizPaginationRangeFormatter = () =>
    'Đã hiển thị 91 - 100 trên 18000 kết quả';
  protected readonly paginationQuickDefaultRange: MbbizPaginationRangeFormatter = () =>
    'Đã hiển thị 1 - 10 trên 18000 kết quả';
  protected readonly paginationQuickMaximumRange: MbbizPaginationRangeFormatter = () =>
    'Đã hiển thị 17990 - 18000 trên 18000 kết quả';
  protected readonly paginationQuickSummary: MbbizPaginationSummaryFormatter = (summary) =>
    `Trang ${new Intl.NumberFormat('vi-VN').format(summary.pageIndex)} / ${new Intl.NumberFormat('vi-VN').format(summary.pageCount)}`;
  protected readonly downloadDocsUploadFile = (file: MbbizUploadFileItem): void => {
    this.downloadDocsFile(file.name);
  };
  protected readonly iconLibraryGroups: IconLibraryGroup[] = ICON_LIBRARY_GROUPS;
  protected readonly iconLibrarySizePreviews: IconSizePreviewRow[] = ICON_LIBRARY_SIZE_PREVIEWS;
  protected readonly iconLibraryPreviewName = signal(
    ICON_LIBRARY_GROUPS.find((group) => group.family === 'linear')?.entries[0]?.name ??
      ICON_LIBRARY_GROUPS[0]?.entries[0]?.name ??
      'alinear_search',
  );
  protected readonly activeIconographySection = signal('iconography-install');
  protected readonly copiedIconLibraryName = signal<string | null>(null);
  protected readonly copiedIconInstallSnippet = signal<string | null>(null);
  protected readonly iconPackageUrl = 'https://www.npmjs.com/package/@mbbiz/icon';
  protected readonly iconInstallCommand = 'npm install @mbbiz/icon';
  protected readonly iconRegisterCode = `import { ApplicationConfig } from '@angular/core';
import { provideIcons, IconComponent } from '@mbbiz/icon/angular';
import { Alinear_searchIcon, Abold_errorIcon } from '@mbbiz/icon';

export const appConfig: ApplicationConfig = {
  providers: [
    provideIcons([Alinear_searchIcon, Abold_errorIcon]),
  ],
};

// In the consuming component:
// imports: [IconComponent]
`;
  protected readonly iconTemplateCode = `<lib-icon name="alinear_search" size="m" />
<lib-icon name="abold_error" size="s" ariaLabel="Error" />

<!-- Color via prop (same model as ng-zorro: currentColor) -->
<lib-icon name="action-plus" size="m" color="#1677ff" />
<lib-icon name="abold_error" size="m" color="var(--semantic-color-error, #f53f3f)" />

<!-- Alias selector also works -->
<mbbiz-icon name="alinear_search" size="l" />
`;
  protected readonly iconColorCode = `<!-- 1. Inherit from parent text color (default) -->
<button style="color: #1677ff">
  <lib-icon name="action-plus" size="s" />
  Add
</button>

<!-- 2. Explicit color prop -->
<lib-icon name="alinear_search" size="m" color="#1677ff" />
<lib-icon name="abold_error" size="m" color="#f53f3f" />

<!-- 3. Design token / CSS variable -->
<lib-icon
  name="abold_success"
  size="m"
  color="var(--semantic-color-success, #00b42a)"
/>

<!-- 4. Class on host / wrapper -->
<span class="icon-muted">
  <lib-icon name="alinear_info" size="m" />
</span>
`;
  protected readonly iconColorCssCode = `.icon-muted {
  color: var(--semantic-color-text-secondary, #86909c);
}

/* Icons follow text color of buttons, links, labels */
.btn-primary {
  color: #ffffff;
}
`;
  protected readonly iconColorPreviewRows = [
    {
      id: 'inherit',
      label: 'Inherit',
      hint: 'currentColor from parent',
      color: '#1677ff',
      mode: 'inherit' as const,
    },
    {
      id: 'prop-blue',
      label: 'Prop',
      hint: 'color="#1677ff"',
      color: '#1677ff',
      mode: 'prop' as const,
    },
    {
      id: 'prop-error',
      label: 'Error',
      hint: 'color="#f53f3f"',
      color: '#f53f3f',
      mode: 'prop' as const,
    },
    {
      id: 'prop-success',
      label: 'Success',
      hint: 'color="#00b42a"',
      color: '#00b42a',
      mode: 'prop' as const,
    },
    {
      id: 'prop-warning',
      label: 'Warning',
      hint: 'color="#ff7d00"',
      color: '#ff7d00',
      mode: 'prop' as const,
    },
    {
      id: 'muted',
      label: 'Muted',
      hint: 'secondary text',
      color: '#86909c',
      mode: 'prop' as const,
    },
  ];
  protected readonly illustrationAssets: IllustrationAsset[] = ILLUSTRATION_ASSETS;
  protected readonly illustrationLibraryAssets: IllustrationAsset[] = ILLUSTRATION_ASSETS.filter(
    (asset) => !asset.id.startsWith('flag-'),
  );
  protected readonly flagIllustrationAssets: IllustrationAsset[] = ILLUSTRATION_ASSETS.filter(
    (asset) => asset.id.startsWith('flag-'),
  );
  protected readonly activeIllustrationSection = signal('illustration-usage');
  protected readonly copiedIllustrationUrl = signal<string | null>(null);
  protected readonly copiedIllustrationSnippet = signal<string | null>(null);
  protected readonly core3InputValue = signal('');
  protected readonly core3AffixPrefixValue = signal('');
  protected readonly core3SearchValue = signal('');
  protected readonly core3PasswordValue = signal('');
  protected readonly core3PasswordVisible = signal(false);
  protected readonly core3TextareaValue = signal('');
  protected readonly core3FloatingLabelValue = signal('');
  protected readonly core3AffixLabelValue = signal('');
  protected readonly core3AffixLabelPrefixValue = signal<string | null>(null);
  protected readonly core3InputTagValue = signal('');
  protected readonly core3InputTagTags = signal<MbbizInputTagValue[]>([]);
  protected readonly core3InputTagValidatedValue = signal('');
  protected readonly core3InputTagValidatedTags = signal<MbbizInputTagValue[]>([]);
  protected readonly inputTagDemoValue = signal('');
  protected readonly inputTagDemoTags = signal<MbbizInputTagValue[]>([]);
  protected readonly inputTagValidatedValue = signal('');
  protected readonly inputTagValidatedTags = signal<MbbizInputTagValue[]>([]);
  protected readonly core3CurrencyAffixItems: readonly MbbizAffixDropdownItem[] = [
    { id: 'vnd', label: 'VND', flagCode: 'vnd' },
    { id: 'usd', label: 'USD', flagCode: 'usd' },
    { id: 'krw', label: 'KRW', flagCode: 'krw' },
    { id: 'gbp', label: 'GBP', flagCode: 'gbp' },
    { id: 'cad', label: 'CAD', flagCode: 'cad' },
    { id: 'thb', label: 'THB', flagCode: 'thb' },
  ];
  protected readonly core3DropdownItems: readonly MbbizDropdownItem[] = [
    { id: 'option-1', label: 'Option 1' },
    { id: 'option-2', label: 'Option 2' },
    { id: 'option-3', label: 'Option 3' },
    { id: 'option-4', label: 'Option 4' },
    { id: 'option-5', label: 'Option 5' },
    { id: 'option-6', label: 'Option 6' },
  ];
  protected readonly core3DropdownBasicItems: readonly MbbizDropdownItem[] =
    this.core3DropdownItems.slice(0, 4);
  protected readonly core3DropdownEmptyItems: readonly MbbizDropdownItem[] = [];
  protected readonly formPreviewFields: readonly {
    id: 'top' | 'middle' | 'bottom';
    title: string;
    placeholder: string;
    showChevron: boolean;
  }[] = [
    { id: 'top', title: 'Title', placeholder: 'Lựa chọn', showChevron: true },
    { id: 'middle', title: 'Title', placeholder: 'Lựa chọn', showChevron: false },
    { id: 'bottom', title: 'Title', placeholder: 'Lựa chọn', showChevron: true },
  ];
  protected readonly core3RadioGroupOptions: readonly MbbizRadioGroupOption[] = [
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b' },
    { label: 'C', value: 'c' },
    { label: 'D', value: 'd' },
  ];
  protected readonly core3RadioGroupValue = signal<string | number | null>('a');
  protected readonly core3RadioGroupVerticalValue = signal<string | number | null>('a');
  protected readonly radioGroupValue = signal<string | number | null>('a');
  protected readonly radioGroupVerticalValue = signal<string | number | null>('a');
  protected readonly core3CheckboxGroupOptions: readonly MbbizCheckboxGroupOption[] = [
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b' },
    { label: 'C', value: 'c' },
    { label: 'D', value: 'd' },
  ];
  protected readonly core3CheckboxGroupValues = signal<(string | number)[]>(['a']);
  protected readonly core3CheckboxGroupVerticalValues = signal<(string | number)[]>(['a']);
  protected readonly core3CheckboxSelectAllValues = signal<(string | number)[]>(['a']);
  protected readonly core3CheckboxAllValues = this.core3CheckboxGroupOptions.map(
    (option) => option.value,
  );
  protected readonly core3CheckboxSelectAllChecked = computed(
    () => this.core3CheckboxSelectAllValues().length === this.core3CheckboxAllValues.length,
  );
  protected readonly core3CheckboxSelectAllIndeterminate = computed(() => {
    const selectedCount = this.core3CheckboxSelectAllValues().length;
    return selectedCount > 0 && selectedCount < this.core3CheckboxAllValues.length;
  });
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
    const valueOverrides = Object.keys(
      SEMANTIC_THEME_ALIAS_OVERRIDES[this.activeThemeBrand()].dark,
    );
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
    page:
      | 'buttons'
      | 'buttonMapping'
      | 'buttonLink'
      | 'inputField'
      | 'form'
      | 'inputTag'
      | 'breadcrumb'
      | 'steps'
      | 'tab'
      | 'dropdown'
      | 'radio'
      | 'checkbox'
      | 'switch'
      | 'badge'
      | 'status'
      | 'message'
      | 'modal'
      | 'table'
      | 'pagination'
      | 'datepicker'
      | 'uploadFile'
      | 'iconography'
      | 'illustration'
      | 'pageHeaderPattern'
      | 'footerPattern'
      | 'stepProcessPattern'
      | 'formPattern'
      | 'introduction'
      | 'installation'
      | 'color'
      | 'tokens'
      | 'spacing'
      | 'layout'
      | 'typography',
  ) {
    this.activePage.set(page);
    this.openFooterPatternOverflowId.set(null);
    if (page === 'introduction' || page === 'installation') {
      this.isGettingStartedOpen.set(true);
    }
    if (
      page === 'pageHeaderPattern' ||
      page === 'footerPattern' ||
      page === 'stepProcessPattern' ||
      page === 'formPattern'
    ) {
      this.isPatternOpen.set(true);
    }
    if (page === 'tokens' || page === 'spacing' || page === 'layout' || page === 'typography') {
      setTimeout(() => this.updateActiveTokenSection(), 0);
    } else if (page === 'formPattern') {
      setTimeout(() => this.updateActiveFormPatternSection(), 0);
    } else if (page === 'pageHeaderPattern') {
      setTimeout(() => this.updateActivePageHeaderPatternSection(), 0);
    } else if (page === 'footerPattern') {
      setTimeout(() => this.updateActiveFooterPatternSection(), 0);
    } else if (page === 'stepProcessPattern') {
      setTimeout(() => this.updateActiveStepProcessPatternSection(), 0);
    } else if (page === 'buttons') {
      setTimeout(() => this.updateActiveButtonSection(), 0);
    } else if (page === 'buttonMapping') {
      setTimeout(() => this.updateActiveButtonMappingSection(), 0);
    } else if (page === 'buttonLink') {
      setTimeout(() => this.updateActiveButtonLinkSection(), 0);
    } else if (page === 'inputField') {
      setTimeout(() => this.updateActiveInputSection(), 0);
    } else if (page === 'form') {
      setTimeout(() => this.updateActiveFormSection(), 0);
    } else if (page === 'inputTag') {
      setTimeout(() => this.updateActiveInputTagSection(), 0);
    } else if (page === 'breadcrumb') {
      setTimeout(() => this.updateActiveBreadcrumbSection(), 0);
    } else if (page === 'steps') {
      setTimeout(() => this.updateActiveStepsSection(), 0);
    } else if (page === 'tab') {
      setTimeout(() => this.updateActiveTabSection(), 0);
    } else if (page === 'badge') {
      setTimeout(() => this.updateActiveBadgeSection(), 0);
    } else if (page === 'status') {
      setTimeout(() => this.updateActiveStatusSection(), 0);
    } else if (page === 'message') {
      setTimeout(() => this.updateActiveMessageSection(), 0);
    } else if (page === 'modal') {
      setTimeout(() => this.updateActiveModalSection(), 0);
    } else if (page === 'switch') {
      setTimeout(() => this.updateActiveSwitchSection(), 0);
    } else if (page === 'table') {
      setTimeout(() => this.updateActiveTableSection(), 0);
    } else if (page === 'pagination') {
      setTimeout(() => this.updateActivePaginationSection(), 0);
    } else if (page === 'dropdown') {
      setTimeout(() => this.updateActiveDropdownSection(), 0);
    } else if (page === 'radio') {
      setTimeout(() => this.updateActiveRadioSection(), 0);
    } else if (page === 'datepicker') {
      setTimeout(() => this.updateActiveDatepickerSection(), 0);
    } else if (page === 'uploadFile') {
      setTimeout(() => this.updateActiveUploadFileSection(), 0);
    } else if (page === 'iconography') {
      setTimeout(() => this.updateActiveIconographySection(), 0);
    } else if (page === 'illustration') {
      setTimeout(() => this.updateActiveIllustrationSection(), 0);
    } else if (page === 'installation') {
      setTimeout(() => this.updateActiveInstallationSection(), 0);
    }
  }

  protected toggleSection(section: 'gettingStarted' | 'designTokens' | 'components' | 'pattern') {
    if (section === 'gettingStarted') {
      this.isGettingStartedOpen.update((v) => !v);
    } else if (section === 'designTokens') {
      this.isDesignTokensOpen.update((v) => !v);
    } else if (section === 'pattern') {
      this.isPatternOpen.update((v) => !v);
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

  protected getFooterPatternSectionId(sectionId: FooterPatternVariant['id']): string {
    return `footer-pattern-${sectionId}`;
  }

  protected getFormPatternSectionId(sectionId: FormPatternCase['id']): string {
    return `form-pattern-${sectionId}`;
  }

  protected getPageHeaderPatternSectionId(sectionId: PageHeaderPatternCase['id']): string {
    return `page-header-pattern-${sectionId}`;
  }

  protected getStepProcessPatternSectionId(sectionId: StepProcessPatternCase['id']): string {
    return `step-process-pattern-${sectionId}`;
  }

  protected setActiveTokenSection(sectionId: string) {
    this.activeTokenSection.set(sectionId);
  }

  protected setActiveButtonSection(sectionId: string) {
    this.activeButtonSection.set(sectionId);
  }

  protected setActiveFooterPatternSection(sectionId: string) {
    this.activeFooterPatternSection.set(sectionId);
  }

  protected setActiveFormPatternSection(sectionId: string) {
    this.activeFormPatternSection.set(sectionId);
  }

  protected setActivePageHeaderPatternSection(sectionId: string) {
    this.activePageHeaderPatternSection.set(sectionId);
  }

  protected setActiveStepProcessPatternSection(sectionId: string) {
    this.activeStepProcessPatternSection.set(sectionId);
  }

  protected setActiveButtonMappingSection(sectionId: string) {
    this.activeButtonMappingSection.set(sectionId);
  }

  protected setActiveInputSection(sectionId: string) {
    this.activeInputSection.set(sectionId);
  }

  protected setActiveInstallationSection(sectionId: string) {
    this.activeInstallationSection.set(sectionId);
  }

  protected toggleFooterPatternOverflow(variantId: FooterPatternVariant['id'], event?: Event) {
    event?.stopPropagation();
    this.openFooterPatternOverflowId.update((current) => (current === variantId ? null : variantId));
  }

  protected isFooterPatternOverflowOpen(variantId: FooterPatternVariant['id']): boolean {
    return this.openFooterPatternOverflowId() === variantId;
  }

  protected setFormPatternSelectedRadio(value: 'option-1' | 'option-2') {
    this.formPatternSelectedRadio.set(value);
  }

  protected getButtonVariant(action: ButtonDemoAction): MbbizButtonVariant {
    return action.tone === 'secondary' ? 'secondary' : 'primary';
  }

  protected getButtonSize(action: ButtonDemoAction): MbbizButtonSize {
    switch (action.size) {
      case 'small':
        return 'sm';
      case 'medium':
        return 'md';
      default:
        return 'lg';
    }
  }

  protected getButtonDocState(
    action: ButtonDemoAction,
  ): 'default' | 'hover' | 'pressed' | 'disabled' {
    return action.state ?? 'default';
  }

  protected isButtonActionDisabled(action: ButtonDemoAction): boolean {
    return this.getButtonDocState(action) === 'disabled';
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

  protected setCore3InputValue(value: string) {
    this.core3InputValue.set(value);
  }

  protected setCore3AffixPrefixValue(value: string) {
    this.core3AffixPrefixValue.set(value);
  }

  protected setCore3SearchValue(value: string) {
    this.core3SearchValue.set(value);
  }

  protected setCore3PasswordValue(value: string) {
    this.core3PasswordValue.set(value);
  }

  protected setCore3PasswordVisible(value: boolean) {
    this.core3PasswordVisible.set(value);
  }

  protected setCore3TextareaValue(value: string) {
    this.core3TextareaValue.set(value);
  }

  protected setCore3FloatingLabelValue(value: string) {
    this.core3FloatingLabelValue.set(value);
  }

  protected setCore3AffixLabelValue(value: string) {
    this.core3AffixLabelValue.set(value);
  }

  protected setCore3AffixLabelPrefixValue(value: string | null) {
    this.core3AffixLabelPrefixValue.set(value);
  }

  protected setCore3InputTagValue(value: string) {
    this.core3InputTagValue.set(value);
  }

  protected setCore3InputTagTags(value: MbbizInputTagValue[]) {
    this.core3InputTagTags.set(value);
  }

  protected setCore3InputTagValidatedValue(value: string) {
    this.core3InputTagValidatedValue.set(value);
  }

  protected setCore3InputTagValidatedTags(value: MbbizInputTagValue[]) {
    this.core3InputTagValidatedTags.set(value);
  }

  protected setInputTagDemoValue(value: string) {
    this.inputTagDemoValue.set(value);
  }

  protected setInputTagDemoTags(value: MbbizInputTagValue[]) {
    this.inputTagDemoTags.set(value);
  }

  protected setInputTagValidatedValue(value: string) {
    this.inputTagValidatedValue.set(value);
  }

  protected setInputTagValidatedTags(value: MbbizInputTagValue[]) {
    this.inputTagValidatedTags.set(value);
  }

  protected setCore3RadioGroupValue(value: string | number | null) {
    this.core3RadioGroupValue.set(value);
  }

  protected setCore3RadioGroupVerticalValue(value: string | number | null) {
    this.core3RadioGroupVerticalValue.set(value);
  }

  protected setCore3CheckboxGroupValues(value: (string | number)[]) {
    this.core3CheckboxGroupValues.set(value);
  }

  protected setCore3CheckboxGroupVerticalValues(value: (string | number)[]) {
    this.core3CheckboxGroupVerticalValues.set(value);
  }

  protected setCore3CheckboxSelectAllValues(value: (string | number)[]) {
    this.core3CheckboxSelectAllValues.set(value);
  }

  protected setCore3CheckboxSelectAll(checked: boolean) {
    this.core3CheckboxSelectAllValues.set(checked ? [...this.core3CheckboxAllValues] : []);
  }

  protected readonly core3InputTagResponsiveOverflowRender = (count: number) => `+${count} More`;

  protected readonly core3InputTagRenderTone = ({
    value,
    label,
  }: {
    value: string;
    label: string;
  }) => {
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

  protected readonly core3InputTagEmailValidate = (
    inputValue: string,
    tags: readonly MbbizInputTagValue[],
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

  protected isButtonMappingDemoExpanded(sectionId: string): boolean {
    return this.expandedButtonMappingDemoIds().includes(sectionId);
  }

  protected toggleButtonMappingDemoCode(sectionId: string) {
    const next = new Set(this.expandedButtonMappingDemoIds());
    if (next.has(sectionId)) {
      next.delete(sectionId);
    } else {
      next.add(sectionId);
    }
    this.expandedButtonMappingDemoIds.set([...next]);
  }

  protected toggleAllButtonMappingDemoCode() {
    const expanded = this.expandedButtonMappingDemoIds();
    const allIds = this.buttonMappingDemoSections.map((section) => section.id);
    const shouldExpandAll = expanded.length !== allIds.length;
    this.expandedButtonMappingDemoIds.set(shouldExpandAll ? allIds : []);
  }

  protected areAllButtonMappingDemoCodeExpanded(): boolean {
    return this.expandedButtonMappingDemoIds().length === this.buttonMappingDemoSections.length;
  }

  protected getButtonMappingDemoCode(section: ButtonMappingDemoSection): string {
    return section.snippetTs;
  }

  protected getButtonMappingDemoHighlightedCode(section: ButtonMappingDemoSection): string {
    const code = this.getButtonMappingDemoCode(section);
    return this.highlightTypeScriptSnippet(code);
  }

  protected getButtonMappingCodeLanguageLabel(): string {
    return 'button-demo.component.ts';
  }

  protected getButtonMappingCodeHint(): string {
    return 'Angular standalone snippet';
  }

  protected async copyButtonMappingDemoCode(section: ButtonMappingDemoSection) {
    const code = this.getButtonMappingDemoCode(section);
    await this.writeTextToClipboard(code);
    this.copiedButtonMappingDemoId.set(section.id);
    setTimeout(() => {
      if (this.copiedButtonMappingDemoId() === section.id) {
        this.copiedButtonMappingDemoId.set(null);
      }
    }, 1200);
  }

  protected getButtonSectionId(sectionId: string): string {
    return `button-${sectionId}`;
  }

  protected getButtonMappingSectionId(sectionId: string): string {
    return `button-mapping-${sectionId}`;
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

  protected isInputDocsDemoExpanded(sectionId: string): boolean {
    return this.expandedInputDocsDemoIds().includes(sectionId);
  }

  protected toggleInputDocsDemoCode(sectionId: string) {
    const next = new Set(this.expandedInputDocsDemoIds());
    if (next.has(sectionId)) {
      next.delete(sectionId);
    } else {
      next.add(sectionId);
    }
    this.expandedInputDocsDemoIds.set([...next]);
  }

  protected toggleAllInputDocsDemoCode() {
    const expanded = this.expandedInputDocsDemoIds();
    const shouldExpandAll = expanded.length !== INPUT_DOC_SECTION_IDS.length;
    this.expandedInputDocsDemoIds.set(shouldExpandAll ? [...INPUT_DOC_SECTION_IDS] : []);
  }

  protected areAllInputDocsDemoCodeExpanded(): boolean {
    return this.expandedInputDocsDemoIds().length === INPUT_DOC_SECTION_IDS.length;
  }

  protected getInputDocsDemoCode(sectionId: string): string {
    switch (sectionId) {
      case 'input-basic-text':
        return this.buildInputDocsBasicSnippet();
      case 'input-affix-prefix':
        return this.buildInputDocsAffixPrefixSnippet();
      case 'input-affix-both':
        return this.buildInputDocsAffixBothSnippet();
      case 'input-search':
        return this.buildInputDocsSearchSnippet();
      case 'input-password':
        return this.buildInputDocsPasswordSnippet();
      case 'input-textarea':
        return this.buildInputDocsTextareaSnippet();
      case 'input-floating-label':
        return this.buildInputDocsFloatingLabelSnippet();
      case 'input-affix-label':
        return this.buildInputDocsAffixLabelSnippet();
      case 'input-status':
        return this.buildInputDocsStatusSnippet();
      case 'input-disabled':
        return this.buildInputDocsDisabledSnippet();
      default:
        return '';
    }
  }

  protected getInputDocsDemoHighlightedCode(sectionId: string): string {
    return this.highlightTypeScriptSnippet(this.getInputDocsDemoCode(sectionId));
  }

  protected getInputDocsCodeLanguageLabel(sectionId: string): string {
    switch (sectionId) {
      case 'input-affix-prefix':
      case 'input-affix-both':
        return 'affix-input-demo.component.ts';
      case 'input-search':
        return 'search-input-demo.component.ts';
      case 'input-password':
        return 'password-input-demo.component.ts';
      case 'input-textarea':
        return 'textarea-demo.component.ts';
      case 'input-floating-label':
        return 'floating-label-input-demo.component.ts';
      case 'input-affix-label':
        return 'affix-label-input-demo.component.ts';
      case 'input-status':
        return 'input-status-demo.component.ts';
      case 'input-disabled':
        return 'input-disabled-demo.component.ts';
      default:
        return 'input-basic-demo.component.ts';
    }
  }

  protected getInputDocsCodeHint(): string {
    return 'Angular standalone snippet';
  }

  protected async copyInputDocsDemoCode(sectionId: string) {
    const code = this.getInputDocsDemoCode(sectionId);
    await this.writeTextToClipboard(code);
    this.copiedInputDocsDemoId.set(sectionId);
    setTimeout(() => {
      if (this.copiedInputDocsDemoId() === sectionId) {
        this.copiedInputDocsDemoId.set(null);
      }
    }, 1200);
  }

  protected setActiveInputTagSection(sectionId: string) {
    this.activeInputTagSection.set(sectionId);
  }

  protected getInputTagSectionId(sectionId: string): string {
    return `input-tag-${sectionId}`;
  }

  protected isInputTagDemoExpanded(sectionId: string): boolean {
    return this.expandedInputTagDemoIds().includes(sectionId);
  }

  protected toggleInputTagDemoCode(sectionId: string) {
    const next = new Set(this.expandedInputTagDemoIds());
    if (next.has(sectionId)) {
      next.delete(sectionId);
    } else {
      next.add(sectionId);
    }
    this.expandedInputTagDemoIds.set([...next]);
  }

  protected toggleAllInputTagDemoCode() {
    const expanded = this.expandedInputTagDemoIds();
    const allIds = this.inputTagDemoSections.map((section) => section.id);
    const shouldExpandAll = expanded.length !== allIds.length;
    this.expandedInputTagDemoIds.set(shouldExpandAll ? allIds : []);
  }

  protected areAllInputTagDemoCodeExpanded(): boolean {
    return this.expandedInputTagDemoIds().length === this.inputTagDemoSections.length;
  }

  protected getInputTagDemoCode(section: InputTagDemoSection): string {
    return section.snippetTs;
  }

  protected getInputTagDemoHighlightedCode(section: InputTagDemoSection): string {
    return this.highlightTypeScriptSnippet(this.getInputTagDemoCode(section));
  }

  protected getInputTagCodeLanguageLabel(section: InputTagDemoSection): string {
    return `input-tag-${section.id}-demo.component.ts`;
  }

  protected getInputTagCodeHint(): string {
    return 'Angular standalone snippet';
  }

  protected async copyInputTagDemoCode(section: InputTagDemoSection) {
    const code = this.getInputTagDemoCode(section);
    await this.writeTextToClipboard(code);
    this.copiedInputTagDemoId.set(section.id);
    setTimeout(() => {
      if (this.copiedInputTagDemoId() === section.id) {
        this.copiedInputTagDemoId.set(null);
      }
    }, 1200);
  }

  protected setActiveBreadcrumbSection(sectionId: string) {
    this.activeBreadcrumbSection.set(sectionId);
  }

  protected getBreadcrumbSectionId(sectionId: string): string {
    return `breadcrumb-${sectionId}`;
  }

  protected isBreadcrumbDemoExpanded(sectionId: string): boolean {
    return this.expandedBreadcrumbDemoIds().includes(sectionId);
  }

  protected toggleBreadcrumbDemoCode(sectionId: string) {
    const next = new Set(this.expandedBreadcrumbDemoIds());
    if (next.has(sectionId)) {
      next.delete(sectionId);
    } else {
      next.add(sectionId);
    }
    this.expandedBreadcrumbDemoIds.set([...next]);
  }

  protected toggleAllBreadcrumbDemoCode() {
    const expanded = this.expandedBreadcrumbDemoIds();
    const allIds = this.breadcrumbDemoSections.map((section) => section.id);
    const shouldExpandAll = expanded.length !== allIds.length;
    this.expandedBreadcrumbDemoIds.set(shouldExpandAll ? allIds : []);
  }

  protected areAllBreadcrumbDemoCodeExpanded(): boolean {
    return this.expandedBreadcrumbDemoIds().length === this.breadcrumbDemoSections.length;
  }

  protected getBreadcrumbDemoCode(section: BreadcrumbDemoSection): string {
    return section.snippetTs;
  }

  protected getBreadcrumbDemoHighlightedCode(section: BreadcrumbDemoSection): string {
    return this.highlightTypeScriptSnippet(this.getBreadcrumbDemoCode(section));
  }

  protected getBreadcrumbCodeLanguageLabel(section: BreadcrumbDemoSection): string {
    return `breadcrumb-${section.id}-demo.component.ts`;
  }

  protected getBreadcrumbCodeHint(): string {
    return 'Angular standalone snippet';
  }

  protected async copyBreadcrumbDemoCode(section: BreadcrumbDemoSection) {
    const code = this.getBreadcrumbDemoCode(section);
    await this.writeTextToClipboard(code);
    this.copiedBreadcrumbDemoId.set(section.id);
    setTimeout(() => {
      if (this.copiedBreadcrumbDemoId() === section.id) {
        this.copiedBreadcrumbDemoId.set(null);
      }
    }, 1200);
  }

  protected setActiveStepsSection(sectionId: string) {
    this.activeStepsSection.set(sectionId);
  }

  protected getStepsSectionId(sectionId: string): string {
    return `steps-${sectionId}`;
  }

  protected setActiveTabSection(sectionId: string) {
    this.activeTabSection.set(sectionId);
  }

  protected getTabSectionId(sectionId: string): string {
    return `tab-${sectionId}`;
  }

  protected setActiveBadgeSection(sectionId: string) {
    this.activeBadgeSection.set(sectionId);
  }

  protected getBadgeSectionId(sectionId: string): string {
    return `badge-${sectionId}`;
  }

  protected setActiveSwitchSection(sectionId: string) {
    this.activeSwitchSection.set(sectionId);
  }

  protected getSwitchSectionId(sectionId: string): string {
    return `switch-${sectionId}`;
  }

  protected setActiveModalSection(sectionId: string) {
    this.activeModalSection.set(sectionId);
  }

  protected getModalSectionId(sectionId: string): string {
    return `modal-${sectionId}`;
  }

  protected setActiveButtonLinkSection(sectionId: string) {
    this.activeButtonLinkSection.set(sectionId);
  }

  protected getButtonLinkSectionId(sectionId: string): string {
    return `button-link-${sectionId}`;
  }

  protected setActiveStatusSection(sectionId: string) {
    this.activeStatusSection.set(sectionId);
  }

  protected getStatusSectionId(sectionId: string): string {
    return `status-${sectionId}`;
  }

  protected setActiveMessageSection(sectionId: string) {
    this.activeMessageSection.set(sectionId);
  }

  protected getMessageSectionId(sectionId: string): string {
    return `message-${sectionId}`;
  }

  protected showMessage(type: MbbizMessageType): void {
    const content =
      this.messageCases.find((item) => item.type === type)?.content ?? 'Informative inform.';
    this.messageService.create(type, content, {
      closable: type !== 'inform',
      duration: 5000,
      top: 32,
    });
  }

  protected clearMessages(): void {
    this.messageService.remove();
  }

  protected setActiveTableSection(sectionId: string) {
    this.activeTableSection.set(sectionId);
  }

  protected getTableSectionId(sectionId: string): string {
    return `table-${sectionId}`;
  }

  protected setActivePaginationSection(sectionId: string) {
    this.activePaginationSection.set(sectionId);
  }

  protected getPaginationSectionId(sectionId: string): string {
    return `pagination-${sectionId}`;
  }

  protected isPaginationDemoExpanded(sectionId: string): boolean {
    return this.expandedPaginationDemoIds().includes(sectionId);
  }

  protected togglePaginationDemoCode(sectionId: string) {
    const next = new Set(this.expandedPaginationDemoIds());
    if (next.has(sectionId)) {
      next.delete(sectionId);
    } else {
      next.add(sectionId);
    }
    this.expandedPaginationDemoIds.set([...next]);
  }

  protected toggleAllPaginationDemoCode() {
    const expanded = this.expandedPaginationDemoIds();
    const allIds = this.paginationDemoSections.map((section) => section.id);
    const shouldExpandAll = expanded.length !== allIds.length;
    this.expandedPaginationDemoIds.set(shouldExpandAll ? allIds : []);
  }

  protected areAllPaginationDemoCodeExpanded(): boolean {
    return this.expandedPaginationDemoIds().length === this.paginationDemoSections.length;
  }

  protected getPaginationDemoCode(section: PaginationDemoSection): string {
    return section.snippetTs;
  }

  protected getPaginationDemoHighlightedCode(section: PaginationDemoSection): string {
    return this.highlightTypeScriptSnippet(this.getPaginationDemoCode(section));
  }

  protected getPaginationCodeLanguageLabel(section: PaginationDemoSection): string {
    return `pagination-${section.id}-demo.component.ts`;
  }

  protected getPaginationCodeHint(): string {
    return 'Angular standalone snippet';
  }

  protected async copyPaginationDemoCode(section: PaginationDemoSection) {
    const code = this.getPaginationDemoCode(section);
    await this.writeTextToClipboard(code);
    this.copiedPaginationDemoId.set(section.id);
    setTimeout(() => {
      if (this.copiedPaginationDemoId() === section.id) {
        this.copiedPaginationDemoId.set(null);
      }
    }, 1200);
  }

  protected isTableDemoExpanded(sectionId: string): boolean {
    return this.expandedTableDemoIds().includes(sectionId);
  }

  protected toggleTableDemoCode(sectionId: string) {
    const next = new Set(this.expandedTableDemoIds());
    if (next.has(sectionId)) {
      next.delete(sectionId);
    } else {
      next.add(sectionId);
    }
    this.expandedTableDemoIds.set([...next]);
  }

  protected toggleAllTableDemoCode() {
    const expanded = this.expandedTableDemoIds();
    const allIds = this.tableDemoSections.map((section) => section.id);
    const shouldExpandAll = expanded.length !== allIds.length;
    this.expandedTableDemoIds.set(shouldExpandAll ? allIds : []);
  }

  protected areAllTableDemoCodeExpanded(): boolean {
    return this.expandedTableDemoIds().length === this.tableDemoSections.length;
  }

  protected getTableDemoCode(section: TableDemoSection): string {
    return section.snippetTs;
  }

  protected getTableDemoHighlightedCode(section: TableDemoSection): string {
    return this.highlightTypeScriptSnippet(this.getTableDemoCode(section));
  }

  protected getTableCodeLanguageLabel(section: TableDemoSection): string {
    return `table-${section.id}-demo.component.ts`;
  }

  protected getTableCodeHint(): string {
    return 'Angular standalone snippet';
  }

  protected async copyTableDemoCode(section: TableDemoSection) {
    const code = this.getTableDemoCode(section);
    await this.writeTextToClipboard(code);
    this.copiedTableDemoId.set(section.id);
    setTimeout(() => {
      if (this.copiedTableDemoId() === section.id) {
        this.copiedTableDemoId.set(null);
      }
    }, 1200);
  }

  protected isStepsDemoExpanded(sectionId: string): boolean {
    return this.expandedStepsDemoIds().includes(sectionId);
  }

  protected toggleStepsDemoCode(sectionId: string) {
    const next = new Set(this.expandedStepsDemoIds());
    if (next.has(sectionId)) {
      next.delete(sectionId);
    } else {
      next.add(sectionId);
    }
    this.expandedStepsDemoIds.set([...next]);
  }

  protected toggleAllStepsDemoCode() {
    const expanded = this.expandedStepsDemoIds();
    const allIds = this.stepsDemoSections.map((section) => section.id);
    const shouldExpandAll = expanded.length !== allIds.length;
    this.expandedStepsDemoIds.set(shouldExpandAll ? allIds : []);
  }

  protected areAllStepsDemoCodeExpanded(): boolean {
    return this.expandedStepsDemoIds().length === this.stepsDemoSections.length;
  }

  protected getStepsDemoCode(section: StepsDemoSection): string {
    return section.snippetTs;
  }

  protected getStepsDemoHighlightedCode(section: StepsDemoSection): string {
    return this.highlightTypeScriptSnippet(this.getStepsDemoCode(section));
  }

  protected getStepsCodeLanguageLabel(section: StepsDemoSection): string {
    return `steps-${section.id}-demo.component.ts`;
  }

  protected getStepsCodeHint(): string {
    return 'Angular standalone snippet';
  }

  protected async copyStepsDemoCode(section: StepsDemoSection) {
    const code = this.getStepsDemoCode(section);
    await this.writeTextToClipboard(code);
    this.copiedStepsDemoId.set(section.id);
    setTimeout(() => {
      if (this.copiedStepsDemoId() === section.id) {
        this.copiedStepsDemoId.set(null);
      }
    }, 1200);
  }

  protected setActiveDropdownSection(sectionId: string) {
    this.activeDropdownSection.set(sectionId);
  }

  protected getDropdownSectionId(sectionId: string): string {
    return `dropdown-${sectionId}`;
  }

  protected setActiveFormSection(sectionId: string) {
    this.activeFormSection.set(sectionId);
  }

  protected getFormSectionId(sectionId: 'default' | 'variables'): string {
    return `form-${sectionId}`;
  }

  protected setActiveRadioSection(sectionId: string) {
    this.activeRadioSection.set(sectionId);
  }

  protected getRadioSectionId(sectionId: string): string {
    return `radio-${sectionId}`;
  }

  protected setActiveDatepickerSection(sectionId: string) {
    this.activeDatepickerSection.set(sectionId);
  }

  protected getDatepickerSectionId(sectionId: string): string {
    return `datepicker-${sectionId}`;
  }

  protected setActiveUploadFileSection(sectionId: string) {
    this.activeUploadFileSection.set(sectionId);
  }

  protected getUploadFileSectionId(sectionId: string): string {
    return `upload-file-${sectionId}`;
  }

  protected isDropdownDemoExpanded(sectionId: string): boolean {
    return this.expandedDropdownDemoIds().includes(sectionId);
  }

  protected toggleDropdownDemoCode(sectionId: string) {
    const next = new Set(this.expandedDropdownDemoIds());
    if (next.has(sectionId)) {
      next.delete(sectionId);
    } else {
      next.add(sectionId);
    }
    this.expandedDropdownDemoIds.set([...next]);
  }

  protected toggleAllDropdownDemoCode() {
    const expanded = this.expandedDropdownDemoIds();
    const allIds = this.dropdownDemoSections.map((section) => section.id);
    const shouldExpandAll = expanded.length !== allIds.length;
    this.expandedDropdownDemoIds.set(shouldExpandAll ? allIds : []);
  }

  protected areAllDropdownDemoCodeExpanded(): boolean {
    return this.expandedDropdownDemoIds().length === this.dropdownDemoSections.length;
  }

  protected getDropdownDemoCode(section: DropdownDemoSection): string {
    return section.snippetTs;
  }

  protected getDropdownDemoHighlightedCode(section: DropdownDemoSection): string {
    return this.highlightTypeScriptSnippet(this.getDropdownDemoCode(section));
  }

  protected getDropdownCodeLanguageLabel(section: DropdownDemoSection): string {
    return `dropdown-${section.id}-demo.component.ts`;
  }

  protected getDropdownCodeHint(): string {
    return 'Angular standalone snippet';
  }

  protected async copyDropdownDemoCode(section: DropdownDemoSection) {
    const code = this.getDropdownDemoCode(section);
    await this.writeTextToClipboard(code);
    this.copiedDropdownDemoId.set(section.id);
    setTimeout(() => {
      if (this.copiedDropdownDemoId() === section.id) {
        this.copiedDropdownDemoId.set(null);
      }
    }, 1200);
  }

  protected isRadioDemoExpanded(sectionId: string): boolean {
    return this.expandedRadioDemoIds().includes(sectionId);
  }

  protected toggleRadioDemoCode(sectionId: string) {
    const next = new Set(this.expandedRadioDemoIds());
    if (next.has(sectionId)) {
      next.delete(sectionId);
    } else {
      next.add(sectionId);
    }
    this.expandedRadioDemoIds.set([...next]);
  }

  protected toggleAllRadioDemoCode() {
    const expanded = this.expandedRadioDemoIds();
    const allIds = this.radioDemoSections.map((section) => section.id);
    const shouldExpandAll = expanded.length !== allIds.length;
    this.expandedRadioDemoIds.set(shouldExpandAll ? allIds : []);
  }

  protected areAllRadioDemoCodeExpanded(): boolean {
    return this.expandedRadioDemoIds().length === this.radioDemoSections.length;
  }

  protected getRadioDemoCode(section: RadioDemoSection): string {
    return section.snippetTs;
  }

  protected getRadioDemoHighlightedCode(section: RadioDemoSection): string {
    return this.highlightTypeScriptSnippet(this.getRadioDemoCode(section));
  }

  protected getRadioCodeLanguageLabel(section: RadioDemoSection): string {
    return `radio-${section.id}-demo.component.ts`;
  }

  protected getRadioCodeHint(): string {
    return 'Angular standalone snippet';
  }

  protected async copyRadioDemoCode(section: RadioDemoSection) {
    const code = this.getRadioDemoCode(section);
    await this.writeTextToClipboard(code);
    this.copiedRadioDemoId.set(section.id);
    setTimeout(() => {
      if (this.copiedRadioDemoId() === section.id) {
        this.copiedRadioDemoId.set(null);
      }
    }, 1200);
  }

  protected isDatepickerDemoExpanded(sectionId: string): boolean {
    return this.expandedDatepickerDemoIds().includes(sectionId);
  }

  protected toggleDatepickerDemoCode(sectionId: string) {
    const next = new Set(this.expandedDatepickerDemoIds());
    if (next.has(sectionId)) {
      next.delete(sectionId);
    } else {
      next.add(sectionId);
    }
    this.expandedDatepickerDemoIds.set([...next]);
  }

  protected toggleAllDatepickerDemoCode() {
    const expanded = this.expandedDatepickerDemoIds();
    const allIds = this.datepickerDemoSections.map((section) => section.id);
    const shouldExpandAll = expanded.length !== allIds.length;
    this.expandedDatepickerDemoIds.set(shouldExpandAll ? allIds : []);
  }

  protected areAllDatepickerDemoCodeExpanded(): boolean {
    return this.expandedDatepickerDemoIds().length === this.datepickerDemoSections.length;
  }

  protected getDatepickerDemoCode(section: DatepickerDemoSection): string {
    return section.snippetTs;
  }

  protected getDatepickerDemoHighlightedCode(section: DatepickerDemoSection): string {
    return this.highlightTypeScriptSnippet(this.getDatepickerDemoCode(section));
  }

  protected getDatepickerCodeLanguageLabel(section: DatepickerDemoSection): string {
    return `datepicker-${section.id}-demo.component.ts`;
  }

  protected getDatepickerCodeHint(): string {
    return 'Angular standalone snippet';
  }

  protected async copyDatepickerDemoCode(section: DatepickerDemoSection) {
    const code = this.getDatepickerDemoCode(section);
    await this.writeTextToClipboard(code);
    this.copiedDatepickerDemoId.set(section.id);
    setTimeout(() => {
      if (this.copiedDatepickerDemoId() === section.id) {
        this.copiedDatepickerDemoId.set(null);
      }
    }, 1200);
  }

  protected isUploadFileDemoExpanded(sectionId: string): boolean {
    return this.expandedUploadFileDemoIds().includes(sectionId);
  }

  protected toggleUploadFileDemoCode(sectionId: string) {
    const next = new Set(this.expandedUploadFileDemoIds());
    if (next.has(sectionId)) {
      next.delete(sectionId);
    } else {
      next.add(sectionId);
    }
    this.expandedUploadFileDemoIds.set([...next]);
  }

  protected toggleAllUploadFileDemoCode() {
    const expanded = this.expandedUploadFileDemoIds();
    const allIds = this.uploadFileDemoSections.map((section) => section.id);
    const shouldExpandAll = expanded.length !== allIds.length;
    this.expandedUploadFileDemoIds.set(shouldExpandAll ? allIds : []);
  }

  protected areAllUploadFileDemoCodeExpanded(): boolean {
    return this.expandedUploadFileDemoIds().length === this.uploadFileDemoSections.length;
  }

  protected getUploadFileDemoCode(section: UploadFileDemoSection): string {
    return section.snippetTs;
  }

  protected getUploadFileDemoHighlightedCode(section: UploadFileDemoSection): string {
    return this.highlightTypeScriptSnippet(this.getUploadFileDemoCode(section));
  }

  protected getUploadFileCodeLanguageLabel(section: UploadFileDemoSection): string {
    return `upload-file-${section.id}-demo.component.ts`;
  }

  protected getUploadFileCodeHint(): string {
    return 'Angular standalone snippet';
  }

  protected async copyUploadFileDemoCode(section: UploadFileDemoSection) {
    const code = this.getUploadFileDemoCode(section);
    await this.writeTextToClipboard(code);
    this.copiedUploadFileDemoId.set(section.id);
    setTimeout(() => {
      if (this.copiedUploadFileDemoId() === section.id) {
        this.copiedUploadFileDemoId.set(null);
      }
    }, 1200);
  }

  protected async copyInstallationSnippet(snippetId: string, code: string) {
    await this.writeTextToClipboard(code);
    this.copiedInstallationSnippet.set(snippetId);
    setTimeout(() => {
      if (this.copiedInstallationSnippet() === snippetId) {
        this.copiedInstallationSnippet.set(null);
      }
    }, 1200);
  }

  protected setActiveIllustrationSection(sectionId: string) {
    this.activeIllustrationSection.set(sectionId);
  }

  protected setActiveIconographySection(sectionId: string) {
    this.activeIconographySection.set(sectionId);
  }

  protected getIconLibrarySnippet(entry: IconLibraryEntry, size: IconSizeToken = 'm'): string {
    return `<lib-icon name="${entry.name}" size="${size}" />`;
  }

  protected setIconLibraryPreviewName(name: string) {
    this.iconLibraryPreviewName.set(name);
  }

  protected async copyIconLibrarySnippet(entry: IconLibraryEntry) {
    await this.writeTextToClipboard(this.getIconLibrarySnippet(entry));
    this.copiedIconLibraryName.set(entry.name);
    setTimeout(() => {
      if (this.copiedIconLibraryName() === entry.name) {
        this.copiedIconLibraryName.set(null);
      }
    }, 1600);
  }

  protected async copyIconInstallSnippet(snippetId: string, code: string) {
    await this.writeTextToClipboard(code);
    this.copiedIconInstallSnippet.set(snippetId);
    setTimeout(() => {
      if (this.copiedIconInstallSnippet() === snippetId) {
        this.copiedIconInstallSnippet.set(null);
      }
    }, 1600);
  }

  protected getIllustrationSnippet(asset: IllustrationAsset): string {
    return `<img src="${asset.src}" alt="${asset.alt}" />`;
  }

  protected async copyIllustrationAssetUrl(asset: IllustrationAsset) {
    await this.writeTextToClipboard(asset.src);
    this.copiedIllustrationUrl.set(asset.id);
    setTimeout(() => {
      if (this.copiedIllustrationUrl() === asset.id) {
        this.copiedIllustrationUrl.set(null);
      }
    }, 1200);
  }

  protected async copyIllustrationAssetSnippet(asset: IllustrationAsset) {
    await this.writeTextToClipboard(this.getIllustrationSnippet(asset));
    this.copiedIllustrationSnippet.set(asset.id);
    setTimeout(() => {
      if (this.copiedIllustrationSnippet() === asset.id) {
        this.copiedIllustrationSnippet.set(null);
      }
    }, 1200);
  }

  protected setRadioGroupValue(value: string | number | null) {
    this.radioGroupValue.set(value);
  }

  protected setRadioGroupVerticalValue(value: string | number | null) {
    this.radioGroupVerticalValue.set(value);
  }

  protected downloadDocsItemFile(file: { name: string }): void {
    this.downloadDocsFile(file.name);
  }

  protected setTablePaginationIndex(value: number): void {
    this.tablePaginationIndex.set(value);
  }

  protected setPaginationDocsDropdownPage(value: number): void {
    this.paginationDocsDropdownPage.set(value);
  }

  protected setPaginationDocsBoundaryPage(value: number): void {
    this.paginationDocsBoundaryPage.set(value);
  }

  protected setPaginationDocsQuickPage(value: number): void {
    this.paginationDocsQuickPage.set(value);
  }

  protected setPaginationDocsDropdownOpen(value: boolean): void {
    this.paginationDocsDropdownOpen.set(value);
  }

  protected updateTableAllColumnCellValue(event: MbbizTableCellValueChange): void {
    this.updateTableRows(this.tableAllColumnRows, event);
  }

  protected updateTableSelectionCellValue(event: MbbizTableCellValueChange): void {
    this.updateTableRows(this.tableSelectionRows, event);
    this.syncTableSelectionKeys();
  }

  private updateTableRows(
    rowsSignal: WritableSignal<MbbizTableRow[]>,
    event: MbbizTableCellValueChange,
  ): void {
    rowsSignal.update((rows) =>
      rows.map((row, index) => {
        const rowKey = String(row['id'] ?? index);
        if (rowKey !== event.rowKey) {
          return row;
        }

        const currentValue = row[event.column.key];
        const currentObject =
          typeof currentValue === 'object' && currentValue !== null
            ? (currentValue as Record<string, unknown>)
            : {};

        return {
          ...row,
          [event.column.key]: {
            ...currentObject,
            value: event.nextValue,
          },
        };
      }),
    );
  }

  private syncTableSelectionKeys(): void {
    const selectedKeys = this.tableSelectionRows()
      .filter((row) => {
        const selected = row['selected'];
        return (
          typeof selected === 'object' &&
          selected !== null &&
          'value' in selected &&
          !!selected.value
        );
      })
      .map((row, index) => String(row['id'] ?? index));

    this.tableSelectedRowKeys.set(selectedKeys);
  }

  private downloadDocsFile(fileName: string): void {
    if (typeof document === 'undefined') {
      return;
    }

    const blob = new Blob([`Mbbiz docs download: ${fileName}\n`], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    anchor.rel = 'noopener noreferrer';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  protected onViewportChange() {
    this.updateActiveTokenSection();
    this.updateActivePageHeaderPatternSection();
    this.updateActiveFooterPatternSection();
    this.updateActiveStepProcessPatternSection();
    this.updateActiveFormPatternSection();
    this.updateActiveButtonSection();
    this.updateActiveButtonMappingSection();
    this.updateActiveButtonLinkSection();
    this.updateActiveInputSection();
    this.updateActiveFormSection();
    this.updateActiveInputTagSection();
    this.updateActiveBreadcrumbSection();
    this.updateActiveStepsSection();
    this.updateActiveTabSection();
    this.updateActiveBadgeSection();
    this.updateActiveStatusSection();
    this.updateActiveMessageSection();
    this.updateActiveModalSection();
    this.updateActiveSwitchSection();
    this.updateActiveTableSection();
    this.updateActivePaginationSection();
    this.updateActiveDropdownSection();
    this.updateActiveRadioSection();
    this.updateActiveDatepickerSection();
    this.updateActiveUploadFileSection();
    this.updateActiveIconographySection();
    this.updateActiveIllustrationSection();
    this.updateActiveInstallationSection();
  }

  @HostListener('document:click')
  protected onDocumentClick() {
    if (this.openFooterPatternOverflowId()) {
      this.openFooterPatternOverflowId.set(null);
    }
  }

  private updateActiveTokenSection() {
    if (
      (this.activePage() !== 'tokens' &&
        this.activePage() !== 'spacing' &&
        this.activePage() !== 'layout' &&
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

  private updateActiveFooterPatternSection() {
    if (this.activePage() !== 'footerPattern' || typeof document === 'undefined') {
      return;
    }

    const sectionIds = this.getFooterPatternSectionIds();
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

    this.activeFooterPatternSection.set(currentSection);
  }

  private updateActiveFormPatternSection() {
    if (this.activePage() !== 'formPattern' || typeof document === 'undefined') {
      return;
    }

    const sectionIds = this.getFormPatternSectionIds();
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

    this.activeFormPatternSection.set(currentSection);
  }

  private updateActivePageHeaderPatternSection() {
    if (this.activePage() !== 'pageHeaderPattern' || typeof document === 'undefined') {
      return;
    }

    const sectionIds = this.getPageHeaderPatternSectionIds();
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

    this.activePageHeaderPatternSection.set(currentSection);
  }

  private updateActiveStepProcessPatternSection() {
    if (this.activePage() !== 'stepProcessPattern' || typeof document === 'undefined') {
      return;
    }

    const sectionIds = this.getStepProcessPatternSectionIds();
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

    this.activeStepProcessPatternSection.set(currentSection);
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

  private updateActiveButtonMappingSection() {
    if (this.activePage() !== 'buttonMapping' || typeof document === 'undefined') {
      return;
    }

    const sectionIds = this.getButtonMappingSectionIds();
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

    this.activeButtonMappingSection.set(currentSection);
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

  private updateActiveInputTagSection() {
    if (this.activePage() !== 'inputTag' || typeof document === 'undefined') {
      return;
    }

    const sectionIds = this.getInputTagSectionIds();
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

    this.activeInputTagSection.set(currentSection);
  }

  private updateActiveBreadcrumbSection() {
    if (this.activePage() !== 'breadcrumb' || typeof document === 'undefined') {
      return;
    }

    const sectionIds = this.getBreadcrumbSectionIds();
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

    this.activeBreadcrumbSection.set(currentSection);
  }

  private updateActiveStepsSection() {
    if (this.activePage() !== 'steps' || typeof document === 'undefined') {
      return;
    }

    const sectionIds = this.getStepsSectionIds();
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

    this.activeStepsSection.set(currentSection);
  }

  private updateActiveTabSection() {
    if (this.activePage() !== 'tab' || typeof document === 'undefined') {
      return;
    }

    const sectionIds = this.getTabSectionIds();
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

    this.activeTabSection.set(currentSection);
  }

  private updateActiveBadgeSection() {
    if (this.activePage() !== 'badge' || typeof document === 'undefined') {
      return;
    }

    const sectionIds = this.getBadgeSectionIds();
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

    this.activeBadgeSection.set(currentSection);
  }

  private updateActiveSwitchSection() {
    if (this.activePage() !== 'switch' || typeof document === 'undefined') {
      return;
    }

    const sectionIds = this.getSwitchSectionIds();
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

    this.activeSwitchSection.set(currentSection);
  }

  private updateActiveModalSection() {
    if (this.activePage() !== 'modal' || typeof document === 'undefined') {
      return;
    }

    const sectionIds = this.getModalSectionIds();
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

    this.activeModalSection.set(currentSection);
  }

  private updateActiveButtonLinkSection() {
    if (this.activePage() !== 'buttonLink' || typeof document === 'undefined') {
      return;
    }

    const sectionIds = this.getButtonLinkSectionIds();
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

    this.activeButtonLinkSection.set(currentSection);
  }

  private updateActiveStatusSection() {
    if (this.activePage() !== 'status' || typeof document === 'undefined') {
      return;
    }

    const sectionIds = this.getStatusSectionIds();
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

    this.activeStatusSection.set(currentSection);
  }

  private updateActiveMessageSection() {
    if (this.activePage() !== 'message' || typeof document === 'undefined') {
      return;
    }

    const sectionIds = this.getMessageSectionIds();
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

    this.activeMessageSection.set(currentSection);
  }

  private updateActiveTableSection() {
    if (this.activePage() !== 'table' || typeof document === 'undefined') {
      return;
    }

    const sectionIds = this.getTableSectionIds();
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

    this.activeTableSection.set(currentSection);
  }

  private updateActivePaginationSection() {
    if (this.activePage() !== 'pagination' || typeof document === 'undefined') {
      return;
    }

    const sectionIds = this.getPaginationSectionIds();
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

    this.activePaginationSection.set(currentSection);
  }

  private updateActiveDropdownSection() {
    if (this.activePage() !== 'dropdown' || typeof document === 'undefined') {
      return;
    }

    const sectionIds = this.getDropdownSectionIds();
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

    this.activeDropdownSection.set(currentSection);
  }

  private updateActiveFormSection() {
    if (this.activePage() !== 'form' || typeof document === 'undefined') {
      return;
    }

    const sectionIds = this.getFormSectionIds();
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

    this.activeFormSection.set(currentSection);
  }

  private updateActiveRadioSection() {
    if (this.activePage() !== 'radio' || typeof document === 'undefined') {
      return;
    }

    const sectionIds = this.getRadioSectionIds();
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

    this.activeRadioSection.set(currentSection);
  }

  private updateActiveDatepickerSection() {
    if (this.activePage() !== 'datepicker' || typeof document === 'undefined') {
      return;
    }

    const sectionIds = this.getDatepickerSectionIds();
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

    this.activeDatepickerSection.set(currentSection);
  }

  private updateActiveUploadFileSection() {
    if (this.activePage() !== 'uploadFile' || typeof document === 'undefined') {
      return;
    }

    const sectionIds = this.getUploadFileSectionIds();
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

    this.activeUploadFileSection.set(currentSection);
  }

  private updateActiveIllustrationSection() {
    if (this.activePage() !== 'illustration' || typeof document === 'undefined') {
      return;
    }

    const sectionIds = this.getIllustrationSectionIds();
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

    this.activeIllustrationSection.set(currentSection);
  }

  private updateActiveIconographySection() {
    if (this.activePage() !== 'iconography' || typeof document === 'undefined') {
      return;
    }

    const sectionIds = this.getIconographySectionIds();
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

    this.activeIconographySection.set(currentSection);
  }

  private updateActiveInstallationSection() {
    if (this.activePage() !== 'installation' || typeof document === 'undefined') {
      return;
    }

    const sectionIds = this.getInstallationSectionIds();
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

    this.activeInstallationSection.set(currentSection);
  }

  private buildSemanticTokenGroups(): SemanticTokenGroup[] {
    const normalizeAlias = (alias: string) => alias.replace(/^color\/semantic\//, '');
    const orderPairs: Array<[string, readonly string[]]> = [
      ['background', SEMANTIC_BACKGROUND_FIGMA_ORDER],
      ['background-gradient', SEMANTIC_BACKGROUND_GRADIENT_FIGMA_ORDER],
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

  private formatTokenDescription(path?: string, appliesTo?: string, notes?: string): string {
    const wrapPath = (value: string) => value.replace(/\//g, '/\u200B');
    const meta = [appliesTo, notes].filter(Boolean).join(' · ');
    if (path && meta) {
      return `${wrapPath(path)}\n· ${meta}`;
    }
    if (path) {
      return wrapPath(path);
    }
    return meta;
  }

  private buildButtonSemanticBindingGroups(
    groups: ButtonSemanticBindingGroup[],
  ): ResolvedButtonSemanticBindingGroup[] {
    return groups.map((group) => ({
      title: group.title,
      description: group.description,
      rows: group.rows.map((row) => {
        const mapped = this.lookupSemanticColorToken(row.semanticAlias);
        return {
          alias: this.toShortSemanticAlias(row.semanticAlias),
          globalColor: this.toShortPrimitiveRef(mapped?.primitive ?? 'N/A'),
          hexValue: mapped?.value ?? 'N/A',
          description: this.formatTokenDescription(row.componentToken, row.appliesTo, row.notes),
        };
      }),
    }));
  }

  private buildInputSemanticBindingGroups(
    groups: InputSemanticBindingGroup[],
  ): ResolvedInputSemanticBindingGroup[] {
    return groups.map((group) => ({
      title: group.title,
      description: group.description,
      rows: group.rows.map((row) => {
        const mapped = this.lookupSemanticColorToken(row.semanticAlias);
        return {
          alias: this.toShortSemanticAlias(row.semanticAlias),
          globalColor: this.toShortPrimitiveRef(mapped?.primitive ?? 'N/A'),
          hexValue: mapped?.value ?? 'N/A',
          description: this.formatTokenDescription(row.componentToken, row.appliesTo, row.notes),
        };
      }),
    }));
  }

  private buildResolvedVariableTokenGroups(
    groups: readonly {
      title: string;
      rows: readonly {
        token: string;
        value: string;
        appliesTo: string;
        notes: string;
      }[];
    }[],
  ): ResolvedVariableTokenGroup[] {
    const resolved: ResolvedVariableTokenGroup[] = [];

    for (const group of groups) {
      const colorRows = group.rows.filter((row) => this.isGlobalColorRef(row.value));
      const specRows = group.rows.filter((row) => !this.isGlobalColorRef(row.value));

      if (colorRows.length > 0) {
        resolved.push({
          title:
            colorRows.length === group.rows.length || /color/i.test(group.title)
              ? group.title
              : `${group.title} · Color`,
          kind: 'alias-color',
          aliasRows: colorRows.map((row) => {
            const mapped = this.lookupSemanticColorToken(row.token);
            return {
              alias: this.toShortSemanticAlias(row.token),
              globalColor: this.toShortPrimitiveRef(mapped?.primitive ?? row.value),
              hexValue: mapped?.value ?? 'N/A',
              description: this.formatTokenDescription(undefined, row.appliesTo, row.notes),
            };
          }),
          specRows: [],
        });
      }

      if (specRows.length > 0) {
        resolved.push({
          title:
            specRows.length === group.rows.length
              ? group.title
              : /color/i.test(group.title)
                ? group.title.replace(/Color Tokens?/i, 'Sizing Specs').trim()
                : `${group.title} · Specs`,
          kind: 'spec',
          aliasRows: [],
          specRows: specRows.map((row) => ({
            token: row.token,
            value: row.value,
            appliesTo: row.appliesTo,
            notes: row.notes,
          })),
        });
      }
    }

    return resolved;
  }

  private lookupSemanticColorToken(alias: string): SemanticColorTokenMapping | undefined {
    const shortAlias = this.toShortSemanticAlias(alias);
    const fullAlias = shortAlias.startsWith('color/semantic/')
      ? shortAlias
      : `color/semantic/${shortAlias}`;

    return (
      this.semanticTokenMappings.find((token) => token.alias === fullAlias) ??
      this.semanticTokenMappings.find((token) => token.alias === shortAlias) ??
      this.semanticTokenMappings.find(
        (token) => this.toShortSemanticAlias(token.alias) === shortAlias,
      )
    );
  }

  private toShortSemanticAlias(alias: string): string {
    return alias.replace(/^color\/semantic\//, '');
  }

  private toShortPrimitiveRef(primitive: string): string {
    return primitive.replace(/^color\/primitive\//, '');
  }

  private isGlobalColorRef(value: string): boolean {
    return /^[a-z][a-z0-9-]*\/[a-z0-9%.-]+$/i.test(value.trim());
  }

  private getTokenSectionIds(): string[] {
    if (this.activePage() === 'spacing') {
      return ['spacing-scale', 'radius-scale', 'iconsize-scale'];
    }

    if (this.activePage() === 'layout') {
      return ['layout-grid-demo', ...this.layoutTokenGroups.map((group) => group.id)];
    }

    if (this.activePage() === 'typography') {
      return [
        'typography-font-styles',
        ...this.typographyStyleGroups.map((group) => group.id),
        ...this.typographyScaleGroups.map((group) => this.getTypographySectionId(group.title)),
      ];
    }

    return this.semanticTokenGroups.map((group) => this.getTokenSectionId(group.category));
  }

  private getButtonSectionIds(): string[] {
    return [
      ...this.buttonMappingDemoSections.map((section) => this.getButtonSectionId(section.id)),
      'button-api',
      'button-variables',
    ];
  }

  private getFooterPatternSectionIds(): string[] {
    return this.footerPatternVariants.map((variant) => this.getFooterPatternSectionId(variant.id));
  }

  private getFormPatternSectionIds(): string[] {
    return this.formPatternCases.map((patternCase) => this.getFormPatternSectionId(patternCase.id));
  }

  private getPageHeaderPatternSectionIds(): string[] {
    return this.pageHeaderPatternCases.map((patternCase) =>
      this.getPageHeaderPatternSectionId(patternCase.id),
    );
  }

  private getStepProcessPatternSectionIds(): string[] {
    return this.stepProcessPatternCases.map((patternCase) =>
      this.getStepProcessPatternSectionId(patternCase.id),
    );
  }

  private getButtonMappingSectionIds(): string[] {
    return [
      ...this.buttonMappingDemoSections.map((section) =>
        this.getButtonMappingSectionId(section.id),
      ),
      'button-mapping-api',
      'button-mapping-variables',
    ];
  }

  private getInputSectionIds(): string[] {
    return [
      'input-basic-text',
      'input-affix-prefix',
      'input-affix-both',
      'input-search',
      'input-password',
      'input-textarea',
      'input-floating-label',
      'input-affix-label',
      'input-status',
      'input-disabled',
      'input-api',
      'input-state-contract',
      'input-spacing',
      'input-variables',
    ];
  }

  private getInputTagSectionIds(): string[] {
    return [
      ...this.inputTagDemoSections.map((section) => this.getInputTagSectionId(section.id)),
      'input-tag-api',
      'input-tag-variables',
    ];
  }

  private getBreadcrumbSectionIds(): string[] {
    return [
      ...this.breadcrumbDemoSections.map((section) => this.getBreadcrumbSectionId(section.id)),
      'breadcrumb-api',
      'breadcrumb-variables',
    ];
  }

  private getStepsSectionIds(): string[] {
    return [
      ...this.stepsDemoSections.map((section) => this.getStepsSectionId(section.id)),
      'steps-variables',
    ];
  }

  private getTabSectionIds(): string[] {
    return [
      ...this.tabDemoSections.map((section) => this.getTabSectionId(section.id)),
      'tab-variables',
    ];
  }

  private getBadgeSectionIds(): string[] {
    return [
      ...this.badgeDemoSections.map((section) => this.getBadgeSectionId(section.id)),
      'badge-variables',
    ];
  }

  private getSwitchSectionIds(): string[] {
    return [
      ...this.switchDemoSections.map((section) => this.getSwitchSectionId(section.id)),
      'switch-variables',
    ];
  }

  private getModalSectionIds(): string[] {
    return [
      ...this.modalDemoSections.map((section) => this.getModalSectionId(section.id)),
      'modal-variables',
    ];
  }

  private getButtonLinkSectionIds(): string[] {
    return [
      ...this.buttonLinkDemoSections.map((section) => this.getButtonLinkSectionId(section.id)),
      'button-link-variables',
    ];
  }

  private getStatusSectionIds(): string[] {
    return [
      ...this.statusDemoSections.map((section) => this.getStatusSectionId(section.id)),
      'status-variables',
    ];
  }

  private getMessageSectionIds(): string[] {
    return [
      ...this.messageDemoSections.map((section) => this.getMessageSectionId(section.id)),
      'message-variables',
    ];
  }

  private getTableSectionIds(): string[] {
    return [
      ...this.tableDemoSections.map((section) => this.getTableSectionId(section.id)),
      'table-api',
      'table-variables',
    ];
  }

  private getPaginationSectionIds(): string[] {
    return [
      ...this.paginationDemoSections.map((section) => this.getPaginationSectionId(section.id)),
      'pagination-api',
      'pagination-variables',
    ];
  }

  private getDropdownSectionIds(): string[] {
    return [
      ...this.dropdownDemoSections.map((section) => this.getDropdownSectionId(section.id)),
      'dropdown-api',
      'dropdown-variables',
    ];
  }

  private getFormSectionIds(): string[] {
    return [this.getFormSectionId('default'), this.getFormSectionId('variables')];
  }

  private getRadioSectionIds(): string[] {
    return [
      ...this.radioDemoSections.map((section) => this.getRadioSectionId(section.id)),
      'radio-api',
      'radio-variables',
    ];
  }

  private getDatepickerSectionIds(): string[] {
    return [
      ...this.datepickerDemoSections.map((section) => this.getDatepickerSectionId(section.id)),
      'datepicker-api',
      'datepicker-variables',
    ];
  }

  private getUploadFileSectionIds(): string[] {
    return [
      ...this.uploadFileDemoSections.map((section) => this.getUploadFileSectionId(section.id)),
      'upload-file-api',
      'upload-file-variables',
    ];
  }

  private getIllustrationSectionIds(): string[] {
    return [
      'illustration-usage',
      'illustration-assets',
      'illustration-flags',
      'illustration-naming',
    ];
  }

  private getIconographySectionIds(): string[] {
    return [
      'iconography-install',
      'iconography-usage',
      'iconography-sizes',
      'iconography-color',
      ...this.iconLibraryGroups.map((group) => group.id),
      'iconography-naming',
    ];
  }

  private getInstallationSectionIds(): string[] {
    return [
      'installation-install',
      'installation-style',
      'installation-usage',
      'installation-next',
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

    // First visit: always light mode (do not follow OS prefers-color-scheme).
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
    const actionRows = section.actions
      .map((action) => this.buildButtonCodeActionMarkup(action, '  '))
      .join('\n\n');
    return `<section class="button-demo-preview">\n${actionRows}\n</section>`;
  }

  private buildTypeScriptSnippet(section: ButtonDemoSection): string {
    const actionRows = section.actions
      .map((action) => `    ${this.formatActionForSnippet(action)},`)
      .join('\n');

    return `import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MbbizButtonComponent } from 'mbbiz';

type ButtonDocState = 'default' | 'hover' | 'pressed' | 'disabled';

interface ButtonAction {
  label: string;
  shape: 'rectangle' | 'pill';
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
  docState: ButtonDocState;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
}

@Component({
  selector: 'app-button-demo',
  standalone: true,
  imports: [CommonModule, MbbizButtonComponent],
  template: \`
    <div class="button-demo-preview">
      <mbbiz-button
        *ngFor="let action of actions"
        [shape]="action.shape"
        [variant]="action.variant"
        [size]="action.size"
        [disabled]="action.docState === 'disabled'"
        [class.button-doc-state-hover]="action.docState === 'hover'"
        [class.button-doc-state-pressed]="action.docState === 'pressed'"
      >
        @if (action.showLeftIcon) {
          <span mbbizButtonStartIcon aria-hidden="true">+</span>
        }
        {{ action.label }}
        @if (action.showRightIcon) {
          <span mbbizButtonEndIcon aria-hidden="true">+</span>
        }
      </mbbiz-button>
    </div>
  \`,
})
export class ButtonDemoComponent {
  readonly actions: ButtonAction[] = [
${actionRows}
  ];
}`;
  }

  private buildButtonCodeActionMarkup(action: ButtonDemoAction, indent: string): string {
    const state = this.getButtonDocState(action);
    const lines = [
      `${indent}<mbbiz-button`,
      `${indent}  shape="${action.shape ?? 'rectangle'}"`,
      `${indent}  variant="${this.getButtonVariant(action)}"`,
      `${indent}  size="${this.getButtonSize(action)}"`,
    ];

    if (state === 'hover') {
      lines.push(`${indent}  class="button-doc-state-hover"`);
    } else if (state === 'pressed') {
      lines.push(`${indent}  class="button-doc-state-pressed"`);
    }

    if (state === 'disabled') {
      lines.push(`${indent}  [disabled]="true"`);
    }

    lines.push(`${indent}>`);

    if (action.showLeftIcon) {
      lines.push(`${indent}  <span mbbizButtonStartIcon aria-hidden="true">+</span>`);
    }

    lines.push(`${indent}  ${action.label}`);

    if (action.showRightIcon) {
      lines.push(`${indent}  <span mbbizButtonEndIcon aria-hidden="true">+</span>`);
    }

    lines.push(`${indent}</mbbiz-button>`);

    return lines.join('\n');
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
          isPassword || isFloatingLabel ? '\n        [title]="action.title ?? \'Title\'"' : ''
        }${isPassword ? '\n        [contentMode]="action.contentMode ?? \'hide\'"' : ''}${
          isAffix ? '\n        [affixMode]="action.affixMode ?? \'prefix\'"' : ''
        }${isAffixLabel ? '\n        [labelMode]="action.labelMode ?? \'front\'"' : ''}${
          !isPassword
            ? `\n        [placeholder]="action.placeholder ?? '${defaultPlaceholder}'"`
            : ''
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

  private buildInputDocsBasicSnippet(): string {
    return `import { Component, signal } from '@angular/core';
import { MbbizInputComponent } from 'mbbiz';

@Component({
  selector: 'app-input-basic-demo',
  standalone: true,
  imports: [MbbizInputComponent],
  template: \`
    <mbbiz-input
      inputId="basic-input"
      placeholder="Input text"
      [value]="value()"
      (valueChange)="value.set($event)"
    />
  \`,
})
export class InputBasicDemoComponent {
  readonly value = signal('');
}`;
  }

  private buildInputDocsAffixPrefixSnippet(): string {
    return `import { Component, signal } from '@angular/core';
import { MbbizAffixInputComponent } from 'mbbiz';

@Component({
  selector: 'app-affix-input-prefix-demo',
  standalone: true,
  imports: [MbbizAffixInputComponent],
  template: \`
    <mbbiz-affix-input
      inputId="affix-prefix-input"
      mode="prefix"
      prefixText="₫"
      placeholder="Input text"
      [value]="value()"
      (valueChange)="value.set($event)"
    />
  \`,
})
export class AffixInputPrefixDemoComponent {
  readonly value = signal('');
}`;
  }

  private buildInputDocsAffixBothSnippet(): string {
    return `import { Component, signal } from '@angular/core';
import { MbbizAffixInputComponent } from 'mbbiz';

@Component({
  selector: 'app-affix-input-both-demo',
  standalone: true,
  imports: [MbbizAffixInputComponent],
  template: \`
    <mbbiz-affix-input
      inputId="affix-both-input"
      mode="both"
      prefixText="₫"
      suffixText="VND"
      placeholder="Input text"
      [value]="value()"
      (valueChange)="value.set($event)"
    />
  \`,
})
export class AffixInputBothDemoComponent {
  readonly value = signal('');
}`;
  }

  private buildInputDocsSearchSnippet(): string {
    return `import { Component, signal } from '@angular/core';
import { MbbizSearchInputComponent } from 'mbbiz';

@Component({
  selector: 'app-search-input-demo',
  standalone: true,
  imports: [MbbizSearchInputComponent],
  template: \`
    <mbbiz-search-input
      inputId="search-input"
      placeholder="Input text"
      [value]="query()"
      (valueChange)="query.set($event)"
      (searchSubmit)="submitSearch($event)"
    />
  \`,
})
export class SearchInputDemoComponent {
  readonly query = signal('');

  submitSearch(value: string) {
    this.query.set(value.trim());
  }
}`;
  }

  private buildInputDocsPasswordSnippet(): string {
    return `import { Component, signal } from '@angular/core';
import { MbbizPasswordInputComponent } from 'mbbiz';

@Component({
  selector: 'app-password-input-demo',
  standalone: true,
  imports: [MbbizPasswordInputComponent],
  template: \`
    <mbbiz-password-input
      inputId="password-input"
      [value]="password()"
      [visible]="visible()"
      (valueChange)="password.set($event)"
      (visibleChange)="visible.set($event)"
    />
  \`,
})
export class PasswordInputDemoComponent {
  readonly password = signal('');
  readonly visible = signal(false);
}`;
  }

  private buildInputDocsTextareaSnippet(): string {
    return `import { Component, signal } from '@angular/core';
import { MbbizTextareaComponent } from 'mbbiz';

@Component({
  selector: 'app-textarea-demo',
  standalone: true,
  imports: [MbbizTextareaComponent],
  template: \`
    <mbbiz-textarea
      textareaId="message-textarea"
      placeholder="Input text"
      [rows]="4"
      [maxLength]="100"
      [value]="message()"
      (valueChange)="message.set($event)"
    />
  \`,
})
export class TextareaDemoComponent {
  readonly message = signal('');
}`;
  }

  private buildInputDocsFloatingLabelSnippet(): string {
    return `import { Component, signal } from '@angular/core';
import { MbbizFloatingLabelInputComponent } from 'mbbiz';

@Component({
  selector: 'app-floating-label-input-demo',
  standalone: true,
  imports: [MbbizFloatingLabelInputComponent],
  template: \`
    <mbbiz-floating-label-input
      inputId="floating-label-input"
      label="Title"
      placeholder="Input text"
      [value]="value()"
      (valueChange)="value.set($event)"
    />
  \`,
})
export class FloatingLabelInputDemoComponent {
  readonly value = signal('');
}`;
  }

  private buildInputDocsAffixLabelSnippet(): string {
    return `import { Component, signal } from '@angular/core';
import {
  MbbizAffixDropdownItem,
  MbbizAffixLabelInputComponent,
} from 'mbbiz';

@Component({
  selector: 'app-affix-label-input-demo',
  standalone: true,
  imports: [MbbizAffixLabelInputComponent],
  template: \`
    <mbbiz-affix-label-input
      inputId="currency-input"
      placeholder="Input text"
      prefixLabel="Loại tiền"
      [prefixDropdownItems]="currencyItems"
      [prefixDropdownValue]="currencyId()"
      [value]="value()"
      (prefixDropdownValueChange)="currencyId.set($event)"
      (valueChange)="value.set($event)"
    />
  \`,
})
export class AffixLabelInputDemoComponent {
  readonly value = signal('');
  readonly currencyId = signal<string | null>(null);

  readonly currencyItems: readonly MbbizAffixDropdownItem[] = [
    { id: 'vnd', label: 'VND', flagCode: 'vnd' },
    { id: 'usd', label: 'USD', flagCode: 'usd' },
    { id: 'krw', label: 'KRW', flagCode: 'krw' },
  ];
}`;
  }

  private buildInputDocsStatusSnippet(): string {
    return `import { Component } from '@angular/core';
import {
  MbbizFloatingLabelInputComponent,
  MbbizInputComponent,
  MbbizPasswordInputComponent,
  MbbizSearchInputComponent,
  MbbizTextareaComponent,
} from 'mbbiz';

@Component({
  selector: 'app-input-status-demo',
  standalone: true,
  imports: [
    MbbizInputComponent,
    MbbizSearchInputComponent,
    MbbizPasswordInputComponent,
    MbbizTextareaComponent,
    MbbizFloatingLabelInputComponent,
  ],
  template: \`
    <mbbiz-input inputId="input-error" placeholder="Input text" status="error" />
    <mbbiz-search-input inputId="search-error" placeholder="Input text" status="error" />
    <mbbiz-password-input inputId="password-error" status="error" />
    <mbbiz-textarea
      textareaId="textarea-error"
      placeholder="Input text"
      [rows]="4"
      [maxLength]="100"
      status="error"
    />
    <mbbiz-floating-label-input
      inputId="floating-error"
      label="Title"
      placeholder="Input text"
      status="error"
    />
  \`,
})
export class InputStatusDemoComponent {}`;
  }

  private buildInputDocsDisabledSnippet(): string {
    return `import { Component } from '@angular/core';
import {
  MbbizFloatingLabelInputComponent,
  MbbizInputComponent,
  MbbizPasswordInputComponent,
  MbbizSearchInputComponent,
  MbbizTextareaComponent,
} from 'mbbiz';

@Component({
  selector: 'app-input-disabled-demo',
  standalone: true,
  imports: [
    MbbizInputComponent,
    MbbizSearchInputComponent,
    MbbizPasswordInputComponent,
    MbbizTextareaComponent,
    MbbizFloatingLabelInputComponent,
  ],
  template: \`
    <mbbiz-input inputId="input-disabled" placeholder="Input text" [disabled]="true" />
    <mbbiz-search-input inputId="search-disabled" placeholder="Input text" [disabled]="true" />
    <mbbiz-password-input inputId="password-disabled" [disabled]="true" />
    <mbbiz-textarea
      textareaId="textarea-disabled"
      placeholder="Input text"
      [rows]="4"
      [maxLength]="100"
      [disabled]="true"
    />
    <mbbiz-floating-label-input
      inputId="floating-disabled"
      label="Title"
      placeholder="Input text"
      [disabled]="true"
    />
  \`,
})
export class InputDisabledDemoComponent {}`;
  }

  private formatActionForSnippet(action: ButtonDemoAction): string {
    const parts = [
      `label: '${this.escapeForSingleQuote(action.label)}'`,
      `shape: '${action.shape ?? 'rectangle'}'`,
      `variant: '${this.getButtonVariant(action)}'`,
      `size: '${this.getButtonSize(action)}'`,
      `docState: '${this.getButtonDocState(action)}'`,
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
    const escaped = this.escapeHtml(code);

    return this.highlightEscapedHtmlSnippet(escaped, stash);
  }

  private highlightEscapedHtmlSnippet(escapedCode: string, stash: string[]): string {
    let escaped = this.captureToken(escapedCode, /(&lt;!--[\s\S]*?--&gt;)/g, 'comment', stash);

    escaped = this.captureToken(escaped, /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g, 'string', stash);

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
    escaped = escaped.replace(
      /\b(from\s*)("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g,
      (_match, prefix: string, literal: string) => {
        const key = `__code_token_${stash.length}__`;
        stash.push(`<span class="code-token module">${literal}</span>`);
        return `${prefix}${key}`;
      },
    );
    escaped = escaped.replace(/`([\s\S]*?)`/g, (_match, templateBody: string) => {
      const key = `__code_token_${stash.length}__`;
      const highlightedTemplate = this.highlightEscapedHtmlSnippet(templateBody, []);
      stash.push(
        `<span class="code-token punctuation">\`</span>${highlightedTemplate}<span class="code-token punctuation">\`</span>`,
      );
      return key;
    });
    escaped = this.captureToken(escaped, /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g, 'string', stash);

    escaped = escaped.replace(
      /\b(import|from|const|readonly|interface|type|export|class|return|true|false)\b/g,
      '<span class="code-token keyword">$1</span>',
    );
    escaped = escaped.replace(
      /\b(Component|MbbizButtonComponent|MbbizInputComponent|MbbizAffixInputComponent|MbbizSearchInputComponent|MbbizPasswordInputComponent|MbbizTextareaComponent|MbbizFloatingLabelInputComponent|MbbizAffixLabelInputComponent|MbbizAffixDropdownItem|MbbizDropdownComponent|MbbizDropdownTagComponent|MbbizDropdownItem|MbbizInputTagComponent|MbbizInputTagValue|MbbizDatepickerComponent|MbbizDatepickerCell|MbbizDatepickerRangeValue|MbbizBreadcrumbComponent|MbbizBreadcrumbItem|MbbizStepsComponent|MbbizStepItem|ButtonDocState|DsButtonComponent|DsInputBasicComponent|DsInputBasicState|DsInputAffixComponent|DsInputAffixState|DsInputAffixMode|DsInputAffixLabelComponent|DsInputAffixLabelState|DsInputAffixLabelMode|DsInputFloatingLabelComponent|DsInputFloatingLabelState|DsInputPasswordComponent|DsInputPasswordState|DsInputPasswordContentMode|DsInputSearchComponent|DsInputSearchState|DsTextAreaComponent|DsTextAreaState)\b/g,
      '<span class="code-token type">$1</span>',
    );
    escaped = escaped.replace(/\b([0-9]+)\b/g, '<span class="code-token number">$1</span>');
    escaped = escaped.replace(
      /(\{|\}|\(|\)|\[|\]|:|,|;|=>)/g,
      '<span class="code-token punctuation">$1</span>',
    );

    return this.restoreCapturedTokens(escaped, stash);
  }

  private captureToken(
    source: string,
    pattern: RegExp,
    className: string,
    stash: string[],
  ): string {
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
