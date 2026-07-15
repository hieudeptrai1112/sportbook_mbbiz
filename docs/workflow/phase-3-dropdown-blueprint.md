# Phase 3 Dropdown Blueprint

Mục tiêu: chuẩn hóa lại dropdown family trên preview theo hướng docs-ready use case, để bước `mapping` và `tách` không bê nguyên layout QA lên app docs.

## Scope guard

- Preview app: `http://127.0.0.1:4300/`.
- Không sửa tab docs/app mbbiz trong phase này.
- Không thêm use case ngoài Figma node đã cung cấp hoặc yêu cầu rõ ràng của user.
- Rule sản phẩm đã chốt: nếu droplist có hơn 5 option thì hiển thị search bar và scrollbar.
- Error state của dropdown tag không hiển thị helptext.

## Figma nodes

| Scope | Nodes |
| --- | --- |
| Dropdown family | `19564:29158`, `18679:398700`, `19564:29826`, `19564:44125`, `19564:45850`, `18676:395476` |

## Single select

| Use case | Preview coverage | Evidence |
| --- | --- | --- |
| Basic Select | Empty trigger + selected value | Single-select trigger node and previously approved preview states. |
| Inside label | Selected value with label inside trigger | User corrected there is no outside title for this component; inside label is the valid label pattern. |
| Searchable Droplist | Selected trigger open with options list | Dropdown open state was provided in supplemental nodes; selected value keeps it visually distinct from the empty default trigger. |
| Status | Error border without adding extra title | Previously approved preview had error state. |
| Disabled | Disabled trigger | Required semantic state from Figma variants. |

## Multi select

| Use case | Preview coverage | Evidence |
| --- | --- | --- |
| Multiple Select | Empty multi trigger + selected multi values | Multi-select supplemental node provided. |
| Inside label | Selected values with label inside trigger | Matches existing component label mode. |
| Searchable Droplist | Open multi droplist with selected options | Required for interaction QA. |
| Status | Error border with selected values | Previously approved preview had error state. |
| Disabled | Disabled selected trigger | Required semantic state from Figma variants. |

## Dropdown tag

| Use case | Preview coverage | Evidence |
| --- | --- | --- |
| Tag Select | Empty trigger + selected tags + overflow `+N` | Tag node provided and user asked to revise `+N` logic. |
| Tag Droplist | Open tag droplist with selected tags | Required for trigger + droplist QA. |
| Status | Error trigger without helptext | User explicitly requested removing helptext in error state. |
| Disabled | Disabled selected tag trigger | Required semantic state from Figma variants. |

## Empty states

| Use case | Preview coverage | Evidence |
| --- | --- | --- |
| No data | Empty droplist illustration/copy | Empty-state Figma nodes provided. |
| Search no data | Search bar + no-result illustration/copy | Empty-state Figma nodes provided. |
| API error | Error illustration + retry button | Empty-state Figma nodes provided. |
| Loading | Loading state | Empty-state component scope retained for product behavior. |

## Suggested missing cases

- Keyboard navigation/focus ring behavior: useful like NG-Zorro/Arco, but no explicit Figma node was provided in this phase.
- Placement variants: common in NG-Zorro/Arco, but not in provided node scope.
- Custom option content: common in NG-Zorro/Arco, but not in provided node scope.

## Docs-ready grouping

- Basic Select
- Multiple Select
- Tag Select
- Inside Label
- Searchable Droplist
- Tag Droplist
- Status
- Disabled
- Empty States

## Done criteria

- Preview uses independent docs-ready use case cards, not QA state stacks.
- Open droplist demos have dedicated vertical space and do not overlay unrelated use cases.
- No outside title is reintroduced.
- Dropdown tag error keeps no helptext.
- Type check and library tests pass.
