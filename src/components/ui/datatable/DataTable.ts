import type { InputHTMLAttributes, TableHTMLAttributes } from 'vue'
import type { HintedString, Maybe } from '~/types/utils'

/**
 * Defines valid properties in DataTable component.
 */
export interface DataTableProps {
  /**
   * An array of objects to display.
   */
  value?: Maybe<never[]>
  /**
   * Name of the field that uniquely identifies a record in the data.
   */
  dataKey?: Maybe<string | ((item: never) => string)>
  /**
   * Number of rows to display per page.
   */
  rows?: Maybe<number>
  /**
   * Index of the first row to be displayed.
   */
  first?: number
  /**
   * Number of total records, defaults to length of value when not defined.
   */
  totalRecords?: number
  /**
   * When specified as true, enables the pagination.
   */
  paginator?: boolean
  /**
   * Position of the paginator, options are 'top','bottom' or 'both'.
   */
  paginatorPosition?: 'top' | 'bottom' | 'both'
  /**
   * Whether to show it even there is only one page.
   */
  alwaysShowPaginator?: boolean
  /**
   * Template of the paginator. It can be customized using the template property using the predefined keys.
   *
   * - FirstPageLink
   * - PrevPageLink
   * - PageLinks
   * - NextPageLink
   * - LastPageLink
   * - RowsPerPageDropdown
   * - JumpToPageDropdown
   * - JumpToPageInput
   * - CurrentPageReport
   */
  paginatorTemplate?: never | string
  /**
   * Number of page links to display.
   */
  pageLinkSize?: number
  /**
   * Array of integer values to display inside rows per page dropdown.
   */
  rowsPerPageOptions?: Maybe<number[]>
  /**
   * Template of the current page report element. It displays information about the pagination state. Available placeholders are the following;
   *
   * - {currentPage}
   * - {totalPages}
   * - {rows}
   * - {first}
   * - {last}
   * - {totalRecords}
   */
  currentPageReportTemplate?: string
  /**
   * Defines if data is loaded and interacted with in lazy manner.
   */
  lazy?: boolean
  /**
   * Displays a loader to indicate data load is in progress.
   */
  loading?: boolean
  /**
   * The icon to show while indicating data load is in progress.
   *  @deprecated since v3.27.0. Use 'loadingicon' slot.
   */
  loadingIcon?: string
  /**
   * Property name or a getter function of a row data used for sorting by default
   */
  sortField?: Maybe<string | ((item: never) => string)>
  /**
   * Order to sort the data by default.
   */
  sortOrder?: Maybe<number>
  /**
   * Determines how null values are sorted.
   */
  nullSortOrder?: number
  /**
   * Default sort order of an unsorted column.
   */
  defaultSortOrder?: number
  /**
   * An array of SortMeta objects to sort the data.
   */
  multiSortMeta?: Maybe<DataTableSortMeta[]>
  /**
   * Defines whether sorting works on single column or on multiple columns.
   */
  sortMode?: 'single' | 'multiple'
  /**
   * When enabled, columns can have an un-sorted state.
   */
  removableSort?: boolean
  /**
   * Filters object with key-value pairs to define the filters.
   * @see DataTableFilterMeta
   */
  filters?: Maybe<DataTableFilterMeta>
  /**
   * Layout of the filter elements.
   */
  filterDisplay?: Maybe<'menu' | 'row'>
  /**
   * An array of fields as string or function to use in global filtering.
   */
  globalFilterFields?: Maybe<(string | ((data: never) => string))[]>
  /**
   * Locale to use in filtering. The default locale is the host environment's current locale.
   */
  filterLocale?: string
  /**
   * Selected row in single mode or an array of values in multiple mode.
   */
  selection?: Maybe<never[] | never>
  /**
   * Specifies the selection mode.
   */
  selectionMode?: Maybe<'single' | 'multiple'>
  /**
   * Algorithm to define if a row is selected.
   */
  compareSelectionBy?: 'equals' | 'deepEquals'
  /**
   * Defines whether metaKey is requred or not for the selection. When true metaKey needs to be pressed to select or unselect an item and
   * when set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically.
   */
  metaKeySelection?: boolean
  /**
   * Enables context menu integration.
   */
  contextMenu?: boolean
  /**
   * Selected row instance with the ContextMenu.
   */
  contextMenuSelection?: Maybe<never | never[]>
  /**
   * Whether all data is selected.
   */
  selectAll?: Maybe<boolean>
  /**
   * When enabled, background of the rows change on hover.
   */
  rowHover?: boolean
  /**
   * Character to use as the csv separator.
   */
  csvSeparator?: string
  /**
   * Name of the exported file.
   */
  exportFilename?: string
  /**
   * Custom function to export data.
   */
  exportFunction?: Maybe<(options: DataTableExportFunctionOptions) => never>
  /**
   * When enabled, columns can be resized using drag and drop.
   */
  resizableColumns?: boolean
  /**
   * Defines whether the overall table width.
   */
  columnResizeMode?: 'fit' | 'expand'
  /**
   * When enabled, columns can be reordered using drag and drop.
   */
  reorderableColumns?: boolean
  /**
   * A collection of row data display as expanded.
   */
  expandedRows?: never[] | DataTableExpandedRows | null
  /**
   * Icon of the row toggler to display the row as expanded.
   * @deprecated since v3.27.0. Use 'rowtogglericon' slot.
   */
  expandedRowIcon?: string
  /**
   * Icon of the row toggler to display the row as collapsed.
   * @deprecated since v3.27.0. Use 'rowtogglericon' slot.
   */
  collapsedRowIcon?: string
  /**
   * Defines the row group mode.
   */
  rowGroupMode?: Maybe<'subheader' | 'rowspan'>
  /**
   * One or more field names to use in row grouping.
   */
  groupRowsBy?: Maybe<((field: string) => object) | string[] | string>
  /**
   * Whether the row groups can be expandable.
   */
  expandableRowGroups?: boolean
  /**
   * An array of group field values whose groups would be rendered as expanded.
   */
  expandedRowGroups?: Maybe<never[] | DataTableExpandedRows>
  /**
   * Defines where a stateful table keeps its state.
   */
  stateStorage?: 'session' | 'local'
  /**
   * Unique identifier of a stateful table to use in state storage.
   */
  stateKey?: Maybe<string>
  /**
   * Defines the incell editing mode.
   */
  editMode?: Maybe<'cell' | 'row'>
  /**
   * A collection of rows to represent the current editing data in row edit mode.
   */
  editingRows?: Maybe<never[] | DataTableEditingRows>
  /**
   * A function that takes the row data as a parameter and returns a string to apply a particular class for the row.
   * The return value is added to the row's :classes array (see Vue.js class bindings).
   */
  rowClass?: Maybe<(data: never) => string | object>
  /**
   * A function that takes the row data as a parameter and returns the inline style object for the corresponding row.
   * The function may also return an array of style objects which will be merged.
   * The return value of this function is directly applied as a Vue.js style-binding on the table row.
   */
  rowStyle?: Maybe<(data: never) => object | object[]>
  /**
   * When specified, enables horizontal and/or vertical scrolling.
   */
  scrollable?: boolean
  /**
   * Height of the scroll viewport in fixed pixels or the 'flex' keyword for a dynamic size.
   */
  scrollHeight?: Maybe<HintedString<'flex'>>
  // /**
  //  * Whether to use the virtualScroller feature. The properties of VirtualScroller component can be used like an object in it.
  //  * Note: Currently only vertical orientation mode is supported.
  //  */
  // virtualScrollerOptions?: VirtualScrollerProps
  /**
   * Items of the frozen part in scrollable DataTable.
   */
  frozenValue?: Maybe<never[]>
  /**
   * The breakpoint to define the maximum width boundary when using stack responsive layout.
   */
  breakpoint?: string
  /**
   * Whether to show grid lines between cells.
   * @defaultValue false
   */
  showGridlines?: boolean
  /**
   * Whether to displays rows with alternating colors.
   */
  stripedRows?: boolean
  /**
   *  Highlights automatically the first item.
   */
  highlightOnSelect?: boolean
  /**
   * Defines the size of the table.
   */
  size?: Maybe<'small' | 'large'>
  /**
   * Inline style of the table element.
   */
  tableStyle?: Maybe<string | object>
  /**
   * Style class of the table element.
   */
  tableClass?: Maybe<string | object>
  /**
   * Used to pass all properties of the TableHTMLAttributes to table element inside the component.
   */
  tableProps?: Maybe<TableHTMLAttributes>
  /**
   * Used to pass all properties of the HTMLInputElement to the focusable filter input element inside the component.
   */
  filterInputProps?: Maybe<InputHTMLAttributes>
}

/**
 * Custom datatable sort meta.
 */
export interface DataTableSortMeta {
  /**
   * Column field
   */
  field: string
  /**
   * Column sort order
   */
  order: Maybe<1 | 0 | -1>
}

/**
 * Custom datatable filter metadata.
 */
export interface DataTableFilterMetaData {
  /**
   * Filter value
   */
  value: never
  /**
   * Filter match mode
   */
  matchMode: HintedString<'startsWith' | 'contains' | 'notContains' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte' | 'between' | 'dateIs' | 'dateIsNot' | 'dateBefore' | 'dateAfter'>
}

/**
 * Custom datatable filter metadata.
 */
export interface DataTableFilterMeta {
  /**
   * Extra options
   */
  [key: string]: string | DataTableFilterMetaData | DataTableOperatorFilterMetaData
}

/**
 * Custom datatable operator filter metadata.
 */
export interface DataTableOperatorFilterMetaData {
  /**
   * Filter operator
   */
  operator: string
  /**
   * Array of filter meta datas.
   */
  constraints: DataTableFilterMetaData[]
}

/**
 * Custom datatable export metadata.
 */
export interface DataTableExportFunctionOptions {
  /**
   * Row data
   */
  data: never
  /**
   * Column Field
   */
  field: string
}

/**
 * Custom datatable expanded rows.
 */
export interface DataTableExpandedRows {
  [key: string]: boolean
}

/**
 * Custom datatable editing rows.
 */
export interface DataTableEditingRows {
  [key: string]: boolean
}
