import { CommonModule } from '@angular/common';
import { Component, HostListener, computed, signal, type WritableSignal } from '@angular/core';
import type { DsInputPasswordState } from './components/ds-input-password/ds-input-password.component';
import {
  Sportbook6vnAffixInputComponent,
  Sportbook6vnAffixLabelInputComponent,
  type Sportbook6vnAffixDropdownItem,
  Sportbook6vnButtonComponent,
  Sportbook6vnBreadcrumbComponent,
  Sportbook6vnCheckboxComponent,
  Sportbook6vnCheckboxGroupComponent,
  type Sportbook6vnCheckboxGroupOption,
  Sportbook6vnDatepickerComponent,
  Sportbook6vnDropdownComponent,
  type Sportbook6vnDropdownItem,
  Sportbook6vnDropdownTagComponent,
  Sportbook6vnFloatingLabelInputComponent,
  Sportbook6vnInputComponent,
  Sportbook6vnInputTagComponent,
  Sportbook6vnItemFileComponent,
  type Sportbook6vnItemFileErrorType,
  type Sportbook6vnItemFileKind,
  Sportbook6vnItemUploadComponent,
  type Sportbook6vnInputTagValue,
  Sportbook6vnPasswordInputComponent,
  Sportbook6vnPaginationComponent,
  type Sportbook6vnPaginationRangeFormatter,
  type Sportbook6vnPaginationSummaryFormatter,
  Sportbook6vnRadioComponent,
  Sportbook6vnRadioGroupComponent,
  type Sportbook6vnRadioGroupOption,
  Sportbook6vnSearchInputComponent,
  Sportbook6vnStepsComponent,
  Sportbook6vnTableComponent,
  type Sportbook6vnTableCellValueChange,
  type Sportbook6vnTableColumn,
  type Sportbook6vnTableRow,
  Sportbook6vnTextareaComponent,
  Sportbook6vnUploadFileComponent,
  type Sportbook6vnUploadFileItem,
  type Sportbook6vnButtonSize,
  type Sportbook6vnButtonVariant,
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
  type InputTagVariableGroup,
} from './input-tag-demos.data';
import {
  DROPDOWN_API_ROWS,
  DROPDOWN_DEMO_SECTIONS,
  DROPDOWN_TAG_API_ROWS,
  DROPDOWN_VARIABLE_GROUPS,
  DROPDOWN_VARIABLE_NOTES,
  type DropdownApiRow,
  type DropdownDemoSection,
  type DropdownVariableGroup,
} from './dropdown-demos.data';
import {
  RADIO_API_ROWS,
  RADIO_DEMO_SECTIONS,
  RADIO_GROUP_API_ROWS,
  RADIO_VARIABLE_GROUPS,
  RADIO_VARIABLE_NOTES,
  type RadioApiRow,
  type RadioDemoSection,
  type RadioVariableGroup,
} from './radio-demos.data';
import {
  DATEPICKER_API_ROWS,
  DATEPICKER_DEMO_SECTIONS,
  DATEPICKER_OUTPUT_ROWS,
  DATEPICKER_VARIABLE_GROUPS,
  DATEPICKER_VARIABLE_NOTES,
  type DatepickerApiRow,
  type DatepickerDemoSection,
  type DatepickerVariableGroup,
} from './datepicker-demos.data';
import {
  BREADCRUMB_API_ROWS,
  BREADCRUMB_DEMO_SECTIONS,
  BREADCRUMB_VARIABLE_GROUPS,
  BREADCRUMB_VARIABLE_NOTES,
  type BreadcrumbApiRow,
  type BreadcrumbDemoSection,
  type BreadcrumbVariableGroup,
} from './breadcrumb-demos.data';
import {
  STEPS_API_ROWS,
  STEPS_DEMO_SECTIONS,
  STEPS_VARIABLE_GROUPS,
  STEPS_VARIABLE_NOTES,
  type StepsApiRow,
  type StepsDemoSection,
  type StepsVariableGroup,
} from './steps-demos.data';
import {
  TABLE_API_ROWS,
  TABLE_DEMO_SECTIONS,
  TABLE_OUTPUT_ROWS,
  TABLE_TYPE_ROWS,
  TABLE_VARIABLE_GROUPS,
  TABLE_VARIABLE_NOTES,
  type TableApiRow,
  type TableDemoSection,
  type TableVariableGroup,
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
  type PaginationVariableGroup,
} from './pagination-demos.data';
import {
  ILLUSTRATION_ASSETS,
  type IllustrationAsset,
} from './illustration-assets.data';
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
  type UploadFileVariableGroup,
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
    Sportbook6vnAffixInputComponent,
    Sportbook6vnAffixLabelInputComponent,
    Sportbook6vnButtonComponent,
    Sportbook6vnBreadcrumbComponent,
    Sportbook6vnCheckboxComponent,
    Sportbook6vnCheckboxGroupComponent,
    Sportbook6vnDatepickerComponent,
    Sportbook6vnDropdownComponent,
    Sportbook6vnDropdownTagComponent,
    Sportbook6vnFloatingLabelInputComponent,
    Sportbook6vnInputComponent,
    Sportbook6vnInputTagComponent,
    Sportbook6vnItemFileComponent,
    Sportbook6vnItemUploadComponent,
    Sportbook6vnPasswordInputComponent,
    Sportbook6vnPaginationComponent,
    Sportbook6vnRadioComponent,
    Sportbook6vnRadioGroupComponent,
    Sportbook6vnSearchInputComponent,
    Sportbook6vnStepsComponent,
    Sportbook6vnTableComponent,
    Sportbook6vnTextareaComponent,
    Sportbook6vnUploadFileComponent,
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
    'buttons'
    | 'buttonMapping'
    | 'inputField'
    | 'inputTag'
    | 'breadcrumb'
    | 'steps'
    | 'dropdown'
    | 'radio'
    | 'checkbox'
    | 'table'
    | 'pagination'
    | 'datepicker'
    | 'uploadFile'
    | 'illustration'
    | 'pattern'
    | 'introduction'
    | 'installation'
    | 'color'
    | 'tokens'
    | 'spacing'
    | 'typography'
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
  protected readonly buttonMappingDemoSections: ButtonMappingDemoSection[] = BUTTON_MAPPING_DEMO_SECTIONS;
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
  protected readonly inputTagVariableGroups: InputTagVariableGroup[] = INPUT_TAG_VARIABLE_GROUPS;
  protected readonly inputTagVariableNotes = INPUT_TAG_VARIABLE_NOTES;
  protected readonly activeInputTagSection = signal(
    this.getInputTagSectionId(this.inputTagDemoSections[0]?.id ?? 'interactive'),
  );
  protected readonly expandedInputTagDemoIds = signal<string[]>([]);
  protected readonly copiedInputTagDemoId = signal<string | null>(null);
  protected readonly breadcrumbDemoSections: BreadcrumbDemoSection[] = BREADCRUMB_DEMO_SECTIONS;
  protected readonly breadcrumbApiRows: BreadcrumbApiRow[] = BREADCRUMB_API_ROWS;
  protected readonly breadcrumbVariableGroups: BreadcrumbVariableGroup[] = BREADCRUMB_VARIABLE_GROUPS;
  protected readonly breadcrumbVariableNotes = BREADCRUMB_VARIABLE_NOTES;
  protected readonly activeBreadcrumbSection = signal(
    this.getBreadcrumbSectionId(this.breadcrumbDemoSections[0]?.id ?? 'amount'),
  );
  protected readonly expandedBreadcrumbDemoIds = signal<string[]>([]);
  protected readonly copiedBreadcrumbDemoId = signal<string | null>(null);
  protected readonly stepsDemoSections: StepsDemoSection[] = STEPS_DEMO_SECTIONS;
  protected readonly stepsApiRows: StepsApiRow[] = STEPS_API_ROWS;
  protected readonly stepsVariableGroups: StepsVariableGroup[] = STEPS_VARIABLE_GROUPS;
  protected readonly stepsVariableNotes = STEPS_VARIABLE_NOTES;
  protected readonly activeStepsSection = signal(
    this.getStepsSectionId(this.stepsDemoSections[0]?.id ?? 'basic'),
  );
  protected readonly expandedStepsDemoIds = signal<string[]>([]);
  protected readonly copiedStepsDemoId = signal<string | null>(null);
  protected readonly tableDemoSections: TableDemoSection[] = TABLE_DEMO_SECTIONS;
  protected readonly tableApiRows: TableApiRow[] = TABLE_API_ROWS;
  protected readonly tableOutputRows: TableApiRow[] = TABLE_OUTPUT_ROWS;
  protected readonly tableTypeRows: TableApiRow[] = TABLE_TYPE_ROWS;
  protected readonly tableVariableGroups: TableVariableGroup[] = TABLE_VARIABLE_GROUPS;
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
  protected readonly paginationVariableGroups: PaginationVariableGroup[] = PAGINATION_VARIABLE_GROUPS;
  protected readonly paginationVariableNotes = PAGINATION_VARIABLE_NOTES;
  protected readonly activePaginationSection = signal(
    this.getPaginationSectionId(this.paginationDemoSections[0]?.id ?? 'default'),
  );
  protected readonly expandedPaginationDemoIds = signal<string[]>([]);
  protected readonly copiedPaginationDemoId = signal<string | null>(null);
  protected readonly dropdownDemoSections: DropdownDemoSection[] = DROPDOWN_DEMO_SECTIONS;
  protected readonly dropdownApiRows: DropdownApiRow[] = DROPDOWN_API_ROWS;
  protected readonly dropdownTagApiRows: DropdownApiRow[] = DROPDOWN_TAG_API_ROWS;
  protected readonly dropdownVariableGroups: DropdownVariableGroup[] = DROPDOWN_VARIABLE_GROUPS;
  protected readonly dropdownVariableNotes = DROPDOWN_VARIABLE_NOTES;
  protected readonly activeDropdownSection = signal(
    this.getDropdownSectionId(this.dropdownDemoSections[0]?.id ?? 'basic'),
  );
  protected readonly expandedDropdownDemoIds = signal<string[]>([]);
  protected readonly copiedDropdownDemoId = signal<string | null>(null);
  protected readonly radioDemoSections: RadioDemoSection[] = RADIO_DEMO_SECTIONS;
  protected readonly radioApiRows: RadioApiRow[] = RADIO_API_ROWS;
  protected readonly radioGroupApiRows: RadioApiRow[] = RADIO_GROUP_API_ROWS;
  protected readonly radioVariableGroups: RadioVariableGroup[] = RADIO_VARIABLE_GROUPS;
  protected readonly radioVariableNotes = RADIO_VARIABLE_NOTES;
  protected readonly activeRadioSection = signal(
    this.getRadioSectionId(this.radioDemoSections[0]?.id ?? 'basic'),
  );
  protected readonly expandedRadioDemoIds = signal<string[]>([]);
  protected readonly copiedRadioDemoId = signal<string | null>(null);
  protected readonly datepickerDemoSections: DatepickerDemoSection[] = DATEPICKER_DEMO_SECTIONS;
  protected readonly datepickerApiRows: DatepickerApiRow[] = DATEPICKER_API_ROWS;
  protected readonly datepickerOutputRows: DatepickerApiRow[] = DATEPICKER_OUTPUT_ROWS;
  protected readonly datepickerVariableGroups: DatepickerVariableGroup[] = DATEPICKER_VARIABLE_GROUPS;
  protected readonly datepickerVariableNotes = DATEPICKER_VARIABLE_NOTES;
  protected readonly activeDatepickerSection = signal(
    this.getDatepickerSectionId(this.datepickerDemoSections[0]?.id ?? 'single-date'),
  );
  protected readonly expandedDatepickerDemoIds = signal<string[]>([]);
  protected readonly copiedDatepickerDemoId = signal<string | null>(null);
  protected readonly uploadFileDemoSections: UploadFileDemoSection[] = UPLOAD_FILE_DEMO_SECTIONS;
  protected readonly uploadFileItemUploadApiRows: UploadFileApiRow[] = UPLOAD_FILE_ITEM_UPLOAD_API_ROWS;
  protected readonly uploadFileItemFileApiRows: UploadFileApiRow[] = UPLOAD_FILE_ITEM_FILE_API_ROWS;
  protected readonly uploadFileApiRows: UploadFileApiRow[] = UPLOAD_FILE_API_ROWS;
  protected readonly uploadFileTypeRows: UploadFileApiRow[] = UPLOAD_FILE_TYPE_ROWS;
  protected readonly uploadFileVariableGroups: UploadFileVariableGroup[] = UPLOAD_FILE_VARIABLE_GROUPS;
  protected readonly uploadFileVariableNotes = UPLOAD_FILE_VARIABLE_NOTES;
  protected readonly activeUploadFileSection = signal(
    this.getUploadFileSectionId(this.uploadFileDemoSections[0]?.id ?? 'item-upload-default'),
  );
  protected readonly expandedUploadFileDemoIds = signal<string[]>([]);
  protected readonly copiedUploadFileDemoId = signal<string | null>(null);
  protected readonly activeInstallationSection = signal('installation-install');
  protected readonly copiedInstallationSnippet = signal<string | null>(null);
  protected readonly installationInstallCommand = 'npm install sportbook6vn';
  protected readonly installationPeerCommand =
    'npm install @angular/common@^21.2.0 @angular/core@^21.2.0 @angular/forms@^21.2.0 @angular/platform-browser@^21.2.0 ng-zorro-antd@^21.2.2';
  protected readonly installationThemeCode = `@import 'sportbook6vn/theme.css';
@import 'sportbook6vn/zorro-bridge.less';`;
  protected readonly installationUsageCode = `import { Component } from '@angular/core';
import { Sportbook6vnButtonComponent, Sportbook6vnInputComponent } from 'sportbook6vn';

@Component({
  selector: 'app-root',
  imports: [Sportbook6vnButtonComponent, Sportbook6vnInputComponent],
  template: \`
    <sportbook6vn-button>Submit</sportbook6vn-button>
    <sportbook6vn-input label="Username" placeholder="Enter username" />
  \`,
})
export class AppComponent {}`;
  protected readonly uploadFilesDone: Sportbook6vnUploadFileItem[] = [
    { uid: 'docs-upload-done-1', name: 'Tên tệp tin.pdf', sizeLabel: '2 MB', fileKind: 'pdf' },
    { uid: 'docs-upload-done-2', name: 'Tên tệp tin.docx', sizeLabel: '2 MB', fileKind: 'docx' },
    { uid: 'docs-upload-done-3', name: 'Tên tệp tin.xlsx', sizeLabel: '2 MB', fileKind: 'xlsx' },
  ];
  protected readonly uploadFilesExpanded: Sportbook6vnUploadFileItem[] = [
    { uid: 'docs-upload-expanded-1', name: 'Tên tệp tin.pdf', sizeLabel: '2 MB', fileKind: 'pdf' },
    { uid: 'docs-upload-expanded-2', name: 'Tên tệp tin.docx', sizeLabel: '2 MB', fileKind: 'docx' },
    { uid: 'docs-upload-expanded-3', name: 'Tên tệp tin.xlsx', sizeLabel: '2 MB', fileKind: 'xlsx' },
    { uid: 'docs-upload-expanded-4', name: 'Tên tệp tin.jpg', sizeLabel: '2 MB', fileKind: 'jpg' },
  ];
  protected readonly uploadFilesLoading: Sportbook6vnUploadFileItem[] = [
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
  protected readonly uploadFilesError: Sportbook6vnUploadFileItem[] = [
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
  protected readonly uploadFileTypes: Sportbook6vnUploadFileItem[] = [
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
  protected readonly itemFileKinds: { kind: Sportbook6vnItemFileKind; name: string }[] = [
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
    kind: Sportbook6vnItemFileKind;
    name: string;
    errorType: Sportbook6vnItemFileErrorType;
  }[] = [
    { kind: 'xlsx', name: 'Tên tệp tin.xlsx', errorType: 'size' },
    { kind: 'pdf', name: 'Tên tệp tin.pdf', errorType: 'upload' },
    { kind: 'error', name: 'Tên tệp tin.xml', errorType: 'format' },
  ];
  private readonly tableColumnFileKinds: Sportbook6vnItemFileKind[] = ['xlsx', 'docx', 'pdf', 'jpg', 'xml'];
  private readonly tableColumnStatusTones = ['success', 'error', 'warning', 'neutral', 'info'] as const;
  protected readonly tablePrimitiveColumns: Sportbook6vnTableColumn[] = Array.from({ length: 5 }, (_, index) => ({
    key: `column${index + 1}`,
    title: 'Title',
    width: 170,
  }));
  protected readonly tablePrimitiveRows: Sportbook6vnTableRow[] = Array.from({ length: 4 }, (_, rowIndex) => ({
    id: `table-row-${rowIndex + 1}`,
    column1: 'Text',
    column2: 'Text',
    column3: 'Text',
    column4: 'Text',
    column5: 'Text',
  }));
  protected readonly tableDefaultColumns: Sportbook6vnTableColumn[] = [
    { key: 'accountType', title: 'Loại tài khoản', width: 150, sortable: true },
    { key: 'file', title: 'File', type: 'file', width: 100 },
    { key: 'status', title: 'Trạng thái', type: 'status', width: 145 },
    { key: 'amount', title: 'Số tiền', type: 'money', width: 150 },
    { key: 'action', title: 'Hành động', type: 'button', width: 124 },
  ];
  protected readonly tableDefaultRows: Sportbook6vnTableRow[] = [
    {
      id: 'account-1',
      accountType: 'Tài khoản thanh toán',
      file: { kind: 'xlsx', alt: 'Excel file' },
      status: { label: 'Hoạt động', tone: 'success' },
      amount: 1000000000,
      action: { label: 'Chi tiết' },
    },
    {
      id: 'account-2',
      accountType: 'Tài khoản tiết kiệm',
      file: { kind: 'docx', alt: 'Word file' },
      status: { label: 'Hết hiệu lực', tone: 'error' },
      amount: 52000000,
      action: { label: 'Chi tiết' },
    },
    {
      id: 'account-3',
      accountType: 'Tài khoản vay',
      file: { kind: 'pdf', alt: 'PDF file' },
      status: { label: 'Hoạt động', tone: 'success' },
      amount: 176500000,
      action: { label: 'Chi tiết' },
    },
  ];
  protected readonly tableSelectionColumns: Sportbook6vnTableColumn[] = [
    { key: 'selected', title: 'Title', type: 'checkbox', width: 132 },
    ...this.tableDefaultColumns,
  ];
  protected readonly tableSelectionRows = signal<Sportbook6vnTableRow[]>(
    this.tableDefaultRows.map((row, index) => ({
      ...row,
      id: `selection-${index + 1}`,
      selected: { label: 'Text', value: index === 1 },
    })),
  );
  protected readonly tableColumnTypeColumns: Sportbook6vnTableColumn[] = [
    { key: 'checkbox', title: 'Title', type: 'checkbox', width: 100 },
    { key: 'number', title: 'STT', type: 'number', width: 48 },
    { key: 'time', title: 'Ngày/Giờ', type: 'time', width: 134 },
    { key: 'referenceNumber', title: 'Số tham chiếu', type: 'reference-number', width: 160 },
    { key: 'paymentCode', title: 'Mã giao dịch', type: 'payment-code', width: 136 },
    { key: 'icon', title: 'Hành động', type: 'icon', width: 124 },
    { key: 'text', title: 'Loại tài khoản', width: 150 },
    { key: 'money', title: 'Số tiền', type: 'money', width: 150 },
    { key: 'moneyOut', title: 'Số tiền', type: 'money-out', width: 150 },
    { key: 'moneyIn', title: 'Số tiền', type: 'money-in', width: 150 },
    { key: 'currency', title: 'Loại tiền', type: 'currency', width: 104 },
    { key: 'file', title: 'File', type: 'file', width: 100 },
    { key: 'status', title: 'Trạng thái', type: 'status', width: 145 },
    { key: 'input', title: 'Hành động', type: 'input', width: 170, placeholder: 'Input text' },
    {
      key: 'dropdown',
      title: 'Hành động',
      type: 'dropdown',
      width: 170,
      placeholder: 'Lựa chọn',
      options: [
        { label: 'Tuỳ chọn 1', value: 'option-1' },
        { label: 'Tuỳ chọn 2', value: 'option-2' },
      ],
    },
    {
      key: 'pillAction',
      title: 'Hành động',
      type: 'button',
      width: 150,
      align: 'left',
      headerAlign: 'left',
      buttonVariant: 'secondary',
      buttonShape: 'pill',
      buttonSize: 'md',
    },
    { key: 'remind', title: '', type: 'remind', width: 56 },
  ];
  protected readonly tableAllColumnRows = signal<Sportbook6vnTableRow[]>(
    Array.from({ length: 5 }, (_, index) => this.createTableAllColumnRow(index)),
  );
  protected readonly tableFixedRightIconColumns: Sportbook6vnTableColumn[] = [
    { key: 'checkbox', title: 'Title', type: 'checkbox', width: 100 },
    { key: 'number', title: 'STT', type: 'number', width: 60 },
    { key: 'time', title: 'Ngày/Giờ', type: 'time', width: 150 },
    { key: 'referenceNumber', title: 'Số tham chiếu', type: 'reference-number', width: 170 },
    { key: 'paymentCode', title: 'Mã giao dịch', type: 'payment-code', width: 160 },
    { key: 'text', title: 'Loại tài khoản', width: 170 },
    { key: 'money', title: 'Số tiền', type: 'money', width: 160 },
    { key: 'moneyOut', title: 'Số tiền', type: 'money-out', width: 160 },
    { key: 'moneyIn', title: 'Số tiền', type: 'money-in', width: 160 },
    { key: 'currency', title: 'Loại tiền', type: 'currency', width: 120 },
    { key: 'file', title: 'File', type: 'file', width: 100 },
    { key: 'status', title: 'Trạng thái', type: 'status', width: 150 },
    { key: 'icon', title: 'Hành động', type: 'icon', width: 104, fixed: 'right' },
  ];
  protected readonly tableFixedRightIconRows: Sportbook6vnTableRow[] = Array.from({ length: 5 }, (_, index) => ({
    ...this.createTableAllColumnRow(index),
    id: `fixed-right-icon-${index + 1}`,
    icon: {
      icons: [{ icon: 'trash', label: `Xóa dòng ${index + 1}` }],
    },
  }));
  protected readonly tableSelectedRowKeys = signal<string[]>(['selection-2']);
  protected readonly tablePaginationIndex = signal(1);
  protected readonly paginationDocsDropdownPage = signal(1);
  protected readonly paginationDocsBoundaryPage = signal(10);
  protected readonly paginationDocsQuickPage = signal(23);
  protected readonly paginationDocsDropdownOpen = signal(true);
  protected readonly paginationQuickSelectedRange: Sportbook6vnPaginationRangeFormatter = () =>
    'Đã hiển thị 91 - 100 trên 18000 kết quả';
  protected readonly paginationQuickDefaultRange: Sportbook6vnPaginationRangeFormatter = () =>
    'Đã hiển thị 1 - 10 trên 18000 kết quả';
  protected readonly paginationQuickMaximumRange: Sportbook6vnPaginationRangeFormatter = () =>
    'Đã hiển thị 17990 - 18000 trên 18000 kết quả';
  protected readonly paginationQuickSummary: Sportbook6vnPaginationSummaryFormatter = (summary) =>
    `Trang ${new Intl.NumberFormat('vi-VN').format(summary.pageIndex)} / ${new Intl.NumberFormat('vi-VN').format(summary.pageCount)}`;
  protected readonly downloadDocsUploadFile = (file: Sportbook6vnUploadFileItem): void => {
    this.downloadDocsFile(file.name);
  };
  protected readonly illustrationAssets: IllustrationAsset[] = ILLUSTRATION_ASSETS;
  protected readonly illustrationLibraryAssets: IllustrationAsset[] = ILLUSTRATION_ASSETS.filter(
    (asset) => !asset.id.startsWith('flag-'),
  );
  protected readonly flagIllustrationAssets: IllustrationAsset[] = ILLUSTRATION_ASSETS.filter((asset) =>
    asset.id.startsWith('flag-'),
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
  protected readonly core3InputTagTags = signal<Sportbook6vnInputTagValue[]>([]);
  protected readonly core3InputTagValidatedValue = signal('');
  protected readonly core3InputTagValidatedTags = signal<Sportbook6vnInputTagValue[]>([]);
  protected readonly inputTagDemoValue = signal('');
  protected readonly inputTagDemoTags = signal<Sportbook6vnInputTagValue[]>([]);
  protected readonly inputTagValidatedValue = signal('');
  protected readonly inputTagValidatedTags = signal<Sportbook6vnInputTagValue[]>([]);
  protected readonly core3CurrencyAffixItems: readonly Sportbook6vnAffixDropdownItem[] = [
    { id: 'vnd', label: 'VND', flagCode: 'vnd' },
    { id: 'usd', label: 'USD', flagCode: 'usd' },
    { id: 'krw', label: 'KRW', flagCode: 'krw' },
    { id: 'gbp', label: 'GBP', flagCode: 'gbp' },
    { id: 'cad', label: 'CAD', flagCode: 'cad' },
    { id: 'thb', label: 'THB', flagCode: 'thb' },
  ];
  protected readonly core3DropdownItems: readonly Sportbook6vnDropdownItem[] = [
    { id: 'option-1', label: 'Option 1' },
    { id: 'option-2', label: 'Option 2' },
    { id: 'option-3', label: 'Option 3' },
    { id: 'option-4', label: 'Option 4' },
    { id: 'option-5', label: 'Option 5' },
    { id: 'option-6', label: 'Option 6' },
  ];
  protected readonly core3DropdownBasicItems: readonly Sportbook6vnDropdownItem[] =
    this.core3DropdownItems.slice(0, 4);
  protected readonly core3DropdownEmptyItems: readonly Sportbook6vnDropdownItem[] = [];
  protected readonly core3RadioGroupOptions: readonly Sportbook6vnRadioGroupOption[] = [
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b' },
    { label: 'C', value: 'c' },
    { label: 'D', value: 'd' },
  ];
  protected readonly core3RadioGroupValue = signal<string | number | null>('a');
  protected readonly core3RadioGroupVerticalValue = signal<string | number | null>('a');
  protected readonly radioGroupValue = signal<string | number | null>('a');
  protected readonly radioGroupVerticalValue = signal<string | number | null>('a');
  protected readonly core3CheckboxGroupOptions: readonly Sportbook6vnCheckboxGroupOption[] = [
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b' },
    { label: 'C', value: 'c' },
    { label: 'D', value: 'd' },
  ];
  protected readonly core3CheckboxGroupValues = signal<(string | number)[]>(['a']);
  protected readonly core3CheckboxGroupVerticalValues = signal<(string | number)[]>(['a']);
  protected readonly core3CheckboxSelectAllValues = signal<(string | number)[]>(['a']);
  protected readonly core3CheckboxAllValues = this.core3CheckboxGroupOptions.map((option) => option.value);
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
    page:
      | 'buttons'
      | 'buttonMapping'
      | 'inputField'
      | 'inputTag'
      | 'breadcrumb'
      | 'steps'
      | 'dropdown'
      | 'radio'
      | 'checkbox'
      | 'table'
      | 'pagination'
      | 'datepicker'
      | 'uploadFile'
      | 'illustration'
      | 'pattern'
      | 'introduction'
      | 'installation'
      | 'color'
      | 'tokens'
      | 'spacing'
      | 'typography',
  ) {
    this.activePage.set(page);
    if (page === 'tokens' || page === 'spacing' || page === 'typography') {
      setTimeout(() => this.updateActiveTokenSection(), 0);
    } else if (page === 'buttons') {
      setTimeout(() => this.updateActiveButtonSection(), 0);
    } else if (page === 'buttonMapping') {
      setTimeout(() => this.updateActiveButtonMappingSection(), 0);
    } else if (page === 'inputField') {
      setTimeout(() => this.updateActiveInputSection(), 0);
    } else if (page === 'inputTag') {
      setTimeout(() => this.updateActiveInputTagSection(), 0);
    } else if (page === 'breadcrumb') {
      setTimeout(() => this.updateActiveBreadcrumbSection(), 0);
    } else if (page === 'steps') {
      setTimeout(() => this.updateActiveStepsSection(), 0);
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
    } else if (page === 'illustration') {
      setTimeout(() => this.updateActiveIllustrationSection(), 0);
    } else if (page === 'installation') {
      setTimeout(() => this.updateActiveInstallationSection(), 0);
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

  protected setActiveButtonMappingSection(sectionId: string) {
    this.activeButtonMappingSection.set(sectionId);
  }

  protected setActiveInputSection(sectionId: string) {
    this.activeInputSection.set(sectionId);
  }

  protected setActiveInstallationSection(sectionId: string) {
    this.activeInstallationSection.set(sectionId);
  }

  protected getButtonVariant(action: ButtonDemoAction): Sportbook6vnButtonVariant {
    return action.tone === 'secondary' ? 'secondary' : 'primary';
  }

  protected getButtonSize(action: ButtonDemoAction): Sportbook6vnButtonSize {
    switch (action.size) {
      case 'small':
        return 'sm';
      case 'medium':
        return 'md';
      default:
        return 'lg';
    }
  }

  protected getButtonDocState(action: ButtonDemoAction): 'default' | 'hover' | 'pressed' | 'disabled' {
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

  protected setCore3InputTagTags(value: Sportbook6vnInputTagValue[]) {
    this.core3InputTagTags.set(value);
  }

  protected setCore3InputTagValidatedValue(value: string) {
    this.core3InputTagValidatedValue.set(value);
  }

  protected setCore3InputTagValidatedTags(value: Sportbook6vnInputTagValue[]) {
    this.core3InputTagValidatedTags.set(value);
  }

  protected setInputTagDemoValue(value: string) {
    this.inputTagDemoValue.set(value);
  }

  protected setInputTagDemoTags(value: Sportbook6vnInputTagValue[]) {
    this.inputTagDemoTags.set(value);
  }

  protected setInputTagValidatedValue(value: string) {
    this.inputTagValidatedValue.set(value);
  }

  protected setInputTagValidatedTags(value: Sportbook6vnInputTagValue[]) {
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

  protected readonly core3InputTagRenderTone = ({ value, label }: { value: string; label: string }) => {
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

  protected updateTableAllColumnCellValue(event: Sportbook6vnTableCellValueChange): void {
    this.updateTableRows(this.tableAllColumnRows, event);
  }

  protected updateTableSelectionCellValue(event: Sportbook6vnTableCellValueChange): void {
    this.updateTableRows(this.tableSelectionRows, event);
    this.syncTableSelectionKeys();
  }

  private createTableAllColumnRow(index: number): Sportbook6vnTableRow {
    const fileKind = this.tableColumnFileKinds[index % this.tableColumnFileKinds.length];
    const statusTone = this.tableColumnStatusTones[index % this.tableColumnStatusTones.length];

    return {
      id: `all-column-${index + 1}`,
      currency: 'VND',
      file: { kind: fileKind, alt: `${fileKind.toUpperCase()} file` },
      remind: { alt: 'Remind' },
      checkbox: { label: 'Text', value: index === 0 },
      number: index + 1,
      time: '10/07/2024 16:00',
      referenceNumber: '619835274089',
      paymentCode: 'FT890123456789',
      icon: {
        icons: [
          { icon: 'trash', label: `Xóa dòng ${index + 1}` },
          { icon: 'trash', label: `Xóa dòng ${index + 1}` },
          { icon: 'trash', label: `Xóa dòng ${index + 1}` },
        ],
      },
      pillAction: { label: 'Text', variant: 'secondary', shape: 'pill', size: 'md' },
      text: 'Tài khoản thanh toán',
      money: 1000000000,
      moneyOut: 1000000000,
      moneyIn: 1000000000,
      status: { label: 'Text', tone: statusTone },
      input: { placeholder: 'Input text' },
      dropdown: {
        value: null,
        placeholder: 'Lựa chọn',
        options: [
          { label: 'Tuỳ chọn 1', value: 'option-1' },
          { label: 'Tuỳ chọn 2', value: 'option-2' },
        ],
      },
    };
  }

  private updateTableRows(
    rowsSignal: WritableSignal<Sportbook6vnTableRow[]>,
    event: Sportbook6vnTableCellValueChange,
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
        return typeof selected === 'object' && selected !== null && 'value' in selected && !!selected.value;
      })
      .map((row, index) => String(row['id'] ?? index));

    this.tableSelectedRowKeys.set(selectedKeys);
  }

  private downloadDocsFile(fileName: string): void {
    if (typeof document === 'undefined') {
      return;
    }

    const blob = new Blob([`Sportbook6vn docs download: ${fileName}\n`], {
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
    this.updateActiveButtonSection();
    this.updateActiveButtonMappingSection();
    this.updateActiveInputSection();
    this.updateActiveInputTagSection();
    this.updateActiveBreadcrumbSection();
    this.updateActiveStepsSection();
    this.updateActiveTableSection();
    this.updateActivePaginationSection();
    this.updateActiveDropdownSection();
    this.updateActiveRadioSection();
    this.updateActiveDatepickerSection();
    this.updateActiveUploadFileSection();
    this.updateActiveIllustrationSection();
    this.updateActiveInstallationSection();
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
      ...this.buttonMappingDemoSections.map((section) => this.getButtonSectionId(section.id)),
      'button-api',
      'button-variables',
    ];
  }

  private getButtonMappingSectionIds(): string[] {
    return [
      ...this.buttonMappingDemoSections.map((section) => this.getButtonMappingSectionId(section.id)),
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
      'steps-api',
      'steps-variables',
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
    return ['illustration-usage', 'illustration-assets', 'illustration-flags', 'illustration-naming'];
  }

  private getInstallationSectionIds(): string[] {
    return ['installation-install', 'installation-style', 'installation-usage', 'installation-next'];
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
import { Sportbook6vnButtonComponent } from 'sportbook6vn';

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
  imports: [CommonModule, Sportbook6vnButtonComponent],
  template: \`
    <div class="button-demo-preview">
      <sportbook6vn-button
        *ngFor="let action of actions"
        [shape]="action.shape"
        [variant]="action.variant"
        [size]="action.size"
        [disabled]="action.docState === 'disabled'"
        [class.button-doc-state-hover]="action.docState === 'hover'"
        [class.button-doc-state-pressed]="action.docState === 'pressed'"
      >
        @if (action.showLeftIcon) {
          <span sportbook6vnButtonStartIcon aria-hidden="true">+</span>
        }
        {{ action.label }}
        @if (action.showRightIcon) {
          <span sportbook6vnButtonEndIcon aria-hidden="true">+</span>
        }
      </sportbook6vn-button>
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
      `${indent}<sportbook6vn-button`,
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
      lines.push(`${indent}  <span sportbook6vnButtonStartIcon aria-hidden="true">+</span>`);
    }

    lines.push(`${indent}  ${action.label}`);

    if (action.showRightIcon) {
      lines.push(`${indent}  <span sportbook6vnButtonEndIcon aria-hidden="true">+</span>`);
    }

    lines.push(`${indent}</sportbook6vn-button>`);

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

  private buildInputDocsBasicSnippet(): string {
    return `import { Component, signal } from '@angular/core';
import { Sportbook6vnInputComponent } from 'sportbook6vn';

@Component({
  selector: 'app-input-basic-demo',
  standalone: true,
  imports: [Sportbook6vnInputComponent],
  template: \`
    <sportbook6vn-input
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
import { Sportbook6vnAffixInputComponent } from 'sportbook6vn';

@Component({
  selector: 'app-affix-input-prefix-demo',
  standalone: true,
  imports: [Sportbook6vnAffixInputComponent],
  template: \`
    <sportbook6vn-affix-input
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
import { Sportbook6vnAffixInputComponent } from 'sportbook6vn';

@Component({
  selector: 'app-affix-input-both-demo',
  standalone: true,
  imports: [Sportbook6vnAffixInputComponent],
  template: \`
    <sportbook6vn-affix-input
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
import { Sportbook6vnSearchInputComponent } from 'sportbook6vn';

@Component({
  selector: 'app-search-input-demo',
  standalone: true,
  imports: [Sportbook6vnSearchInputComponent],
  template: \`
    <sportbook6vn-search-input
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
import { Sportbook6vnPasswordInputComponent } from 'sportbook6vn';

@Component({
  selector: 'app-password-input-demo',
  standalone: true,
  imports: [Sportbook6vnPasswordInputComponent],
  template: \`
    <sportbook6vn-password-input
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
import { Sportbook6vnTextareaComponent } from 'sportbook6vn';

@Component({
  selector: 'app-textarea-demo',
  standalone: true,
  imports: [Sportbook6vnTextareaComponent],
  template: \`
    <sportbook6vn-textarea
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
import { Sportbook6vnFloatingLabelInputComponent } from 'sportbook6vn';

@Component({
  selector: 'app-floating-label-input-demo',
  standalone: true,
  imports: [Sportbook6vnFloatingLabelInputComponent],
  template: \`
    <sportbook6vn-floating-label-input
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
  Sportbook6vnAffixDropdownItem,
  Sportbook6vnAffixLabelInputComponent,
} from 'sportbook6vn';

@Component({
  selector: 'app-affix-label-input-demo',
  standalone: true,
  imports: [Sportbook6vnAffixLabelInputComponent],
  template: \`
    <sportbook6vn-affix-label-input
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

  readonly currencyItems: readonly Sportbook6vnAffixDropdownItem[] = [
    { id: 'vnd', label: 'VND', flagCode: 'vnd' },
    { id: 'usd', label: 'USD', flagCode: 'usd' },
    { id: 'krw', label: 'KRW', flagCode: 'krw' },
  ];
}`;
  }

  private buildInputDocsStatusSnippet(): string {
    return `import { Component } from '@angular/core';
import {
  Sportbook6vnFloatingLabelInputComponent,
  Sportbook6vnInputComponent,
  Sportbook6vnPasswordInputComponent,
  Sportbook6vnSearchInputComponent,
  Sportbook6vnTextareaComponent,
} from 'sportbook6vn';

@Component({
  selector: 'app-input-status-demo',
  standalone: true,
  imports: [
    Sportbook6vnInputComponent,
    Sportbook6vnSearchInputComponent,
    Sportbook6vnPasswordInputComponent,
    Sportbook6vnTextareaComponent,
    Sportbook6vnFloatingLabelInputComponent,
  ],
  template: \`
    <sportbook6vn-input inputId="input-error" placeholder="Input text" status="error" />
    <sportbook6vn-search-input inputId="search-error" placeholder="Input text" status="error" />
    <sportbook6vn-password-input inputId="password-error" status="error" />
    <sportbook6vn-textarea
      textareaId="textarea-error"
      placeholder="Input text"
      [rows]="4"
      [maxLength]="100"
      status="error"
    />
    <sportbook6vn-floating-label-input
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
  Sportbook6vnFloatingLabelInputComponent,
  Sportbook6vnInputComponent,
  Sportbook6vnPasswordInputComponent,
  Sportbook6vnSearchInputComponent,
  Sportbook6vnTextareaComponent,
} from 'sportbook6vn';

@Component({
  selector: 'app-input-disabled-demo',
  standalone: true,
  imports: [
    Sportbook6vnInputComponent,
    Sportbook6vnSearchInputComponent,
    Sportbook6vnPasswordInputComponent,
    Sportbook6vnTextareaComponent,
    Sportbook6vnFloatingLabelInputComponent,
  ],
  template: \`
    <sportbook6vn-input inputId="input-disabled" placeholder="Input text" [disabled]="true" />
    <sportbook6vn-search-input inputId="search-disabled" placeholder="Input text" [disabled]="true" />
    <sportbook6vn-password-input inputId="password-disabled" [disabled]="true" />
    <sportbook6vn-textarea
      textareaId="textarea-disabled"
      placeholder="Input text"
      [rows]="4"
      [maxLength]="100"
      [disabled]="true"
    />
    <sportbook6vn-floating-label-input
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
    escaped = this.captureToken(
      escaped,
      /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g,
      'string',
      stash,
    );

    escaped = escaped.replace(
      /\b(import|from|const|readonly|interface|type|export|class|return|true|false)\b/g,
      '<span class="code-token keyword">$1</span>',
    );
    escaped = escaped.replace(
      /\b(Component|Sportbook6vnButtonComponent|Sportbook6vnInputComponent|Sportbook6vnAffixInputComponent|Sportbook6vnSearchInputComponent|Sportbook6vnPasswordInputComponent|Sportbook6vnTextareaComponent|Sportbook6vnFloatingLabelInputComponent|Sportbook6vnAffixLabelInputComponent|Sportbook6vnAffixDropdownItem|Sportbook6vnDropdownComponent|Sportbook6vnDropdownTagComponent|Sportbook6vnDropdownItem|Sportbook6vnInputTagComponent|Sportbook6vnInputTagValue|Sportbook6vnDatepickerComponent|Sportbook6vnDatepickerCell|Sportbook6vnDatepickerRangeValue|Sportbook6vnBreadcrumbComponent|Sportbook6vnBreadcrumbItem|Sportbook6vnStepsComponent|Sportbook6vnStepItem|ButtonDocState|DsButtonComponent|DsInputBasicComponent|DsInputBasicState|DsInputAffixComponent|DsInputAffixState|DsInputAffixMode|DsInputAffixLabelComponent|DsInputAffixLabelState|DsInputAffixLabelMode|DsInputFloatingLabelComponent|DsInputFloatingLabelState|DsInputPasswordComponent|DsInputPasswordState|DsInputPasswordContentMode|DsInputSearchComponent|DsInputSearchState|DsTextAreaComponent|DsTextAreaState)\b/g,
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
