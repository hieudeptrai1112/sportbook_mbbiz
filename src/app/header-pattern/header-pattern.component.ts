import { Component, ElementRef, HostListener, computed, inject, input, signal } from '@angular/core';
import { IconComponent } from '@mbbiz/icon/angular';
import {
  MbbizAvatarComponent,
  MbbizBadgeComponent,
  MbbizSearchInputComponent,
  MbbizSwitchComponent,
} from 'mbbiz';

import type { HeaderPatternCase } from '../pattern-demos.data';

type HeaderPanel = 'support' | 'search' | 'contact' | 'language' | 'profile';

interface HeaderLanguage {
  id: 'vi' | 'zh' | 'en' | 'ko';
  label: string;
  flag: 'vn' | 'cn' | 'gb' | 'kr';
}

interface HeaderAccount {
  id: string;
  name: string;
  company: string;
  role: 'Người tạo' | 'Người duyệt';
}

const LANGUAGES: readonly HeaderLanguage[] = [
  { id: 'vi', label: 'Tiếng Việt', flag: 'vn' },
  { id: 'zh', label: 'Tiếng Chinese', flag: 'cn' },
  { id: 'en', label: 'Tiếng Anh', flag: 'gb' },
  { id: 'ko', label: 'Tiếng Korean', flag: 'kr' },
];

const SEARCH_OPTIONS = [
  'Chuyển tiền trong nước',
  'Chuyển tiền quốc tế',
  'Tra cứu giao dịch',
  'Thanh toán hóa đơn',
] as const;

const ACCOUNTS: readonly HeaderAccount[] = [
  {
    id: 'maker',
    name: 'HOÀNG LÊ PHƯƠNG MAI -PHUONGMAI_MK',
    company: 'CTY Cổ phần Đầu tư Thế giới di động',
    role: 'Người tạo',
  },
  {
    id: 'checker',
    name: 'HOÀNG LÊ PHƯƠNG MAI -PHUONGMAI_RL',
    company: 'CTY Cổ phần Dệt may - Đầu tư - Thương mại Thành Công',
    role: 'Người duyệt',
  },
];

const HELP_LINKS = [
  'Câu hỏi thường gặp',
  'Hướng dẫn sử dụng',
  'Điều khoản sử dụng',
  'Giao dịch an toàn',
] as const;

@Component({
  selector: 'app-header-pattern',
  imports: [
    IconComponent,
    MbbizAvatarComponent,
    MbbizBadgeComponent,
    MbbizSearchInputComponent,
    MbbizSwitchComponent,
  ],
  templateUrl: './header-pattern.component.html',
  styleUrl: './header-pattern.component.scss',
})
export class HeaderPatternComponent {
  private readonly host = inject(ElementRef<HTMLElement>);

  readonly patternCase = input.required<HeaderPatternCase>();

  protected readonly languages = LANGUAGES;
  protected readonly helpLinks = HELP_LINKS;
  protected readonly panel = signal<HeaderPanel | null>(null);
  protected readonly query = signal('');
  protected readonly languageId = signal<HeaderLanguage['id']>('vi');
  protected readonly keepLogin = signal(false);

  protected readonly language = computed(
    () => this.languages.find((item) => item.id === this.languageId()) ?? this.languages[0],
  );

  protected readonly accounts = computed(() => {
    const mode = this.patternCase().menuAccounts;
    if (mode === 'two') {
      return ACCOUNTS;
    }
    if (mode === 'one') {
      return ACCOUNTS.slice(0, 1);
    }
    return [];
  });

  protected readonly activeAccountId = computed(() =>
    this.patternCase().roleLabel === 'Người duyệt' ? 'checker' : 'maker',
  );

  protected readonly searchMatches = computed(() => {
    const query = this.query().trim().toLowerCase();
    if (!query) {
      return [];
    }
    return SEARCH_OPTIONS.filter((option) => option.toLowerCase().includes(query));
  });

  protected readonly searchPhase = computed<'empty' | 'results' | 'error'>(() => {
    if (!this.query().trim()) {
      return 'empty';
    }
    return this.searchMatches().length > 0 ? 'results' : 'error';
  });

  protected readonly searchSummary = computed(() => {
    const query = this.query().trim();
    const count = this.searchMatches().length;
    return `“${query}” ${count} kết quả tìm kiếm`;
  });

  protected readonly panelAlignEnd = computed(() => {
    const panel = this.panel();
    if (!panel) {
      return false;
    }
    if (panel === 'support') {
      return !this.patternCase().loggedIn;
    }
    return true;
  });

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent) {
    if (!this.panel()) {
      return;
    }
    const target = event.target;
    if (target instanceof Node && this.host.nativeElement.contains(target)) {
      return;
    }
    this.panel.set(null);
  }

  protected toggle(next: HeaderPanel) {
    this.panel.update((current) => (current === next ? null : next));
  }

  protected onSearch(value: string) {
    this.query.set(value);
  }

  protected selectLanguage(id: HeaderLanguage['id']) {
    this.languageId.set(id);
    this.panel.set(null);
  }

  protected selectAccount(id: string) {
    if (!this.accounts().some((account) => account.id === id)) {
      return;
    }
    this.panel.set(null);
  }
}
