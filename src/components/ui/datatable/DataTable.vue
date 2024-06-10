<script setup lang="ts">
import type { DataTableProps } from './DataTable'

const props = withDefaults(
  defineProps<DataTableProps>(),
  {
    value: null,
    dataKey: null,
    rows: 0,
    first: 0,
    totalRecords: 0,
    paginator: false,
    paginatorPosition: 'bottom',
    alwaysShowPaginator: true,
    paginatorTemplate: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
    pageLinkSize: 5,
    rowsPerPageOptions: null,
    currentPageReportTemplate: '({currentPage} of {totalPages})',
    lazy: false,
    loading: false,
    loadingIcon: undefined,
    sortField: null,
    sortOrder: null,
    defaultSortOrder: 1,
    nullSortOrder: 1,
    multiSortMeta: null,
    sortMode: 'single',
    removableSort: false,
    filters: null,
    filterDisplay: null,
    globalFilterFields: null,
    filterLocale: undefined,
    selection: null,
    selectionMode: null,
    compareSelectionBy: 'deepEquals',
    metaKeySelection: false,
    contextMenu: false,
    contextMenuSelection: null,
    selectAll: null,
    rowHover: false,
    csvSeparator: ',',
    exportFilename: 'download',
    exportFunction: null,
    resizableColumns: false,
    columnResizeMode: 'fit',
    reorderableColumns: false,
    expandedRows: null,
    expandedRowIcon: undefined,
    collapsedRowIcon: undefined,
    rowGroupMode: null,
    groupRowsBy: null,
    expandableRowGroups: false,
    expandedRowGroups: null,
    stateStorage: 'session',
    stateKey: null,
    editMode: null,
    editingRows: null,
    rowClass: null,
    rowStyle: null,
    scrollable: false,
    virtualScrollerOptions: null,
    scrollHeight: null,
    frozenValue: null,
    responsiveLayout: 'scroll',
    breakpoint: '960px',
    showGridlines: false,
    stripedRows: false,
    highlightOnSelect: false,
    size: null,
    tableStyle: null,
    tableClass: null,
    tableProps: null,
    filterInputProps: null,
  },
)
</script>

<style>
.p-datatable {
  position: relative;
}

.p-datatable-table {
  border-spacing: 0px;
  width: 100%;
}

.p-datatable .p-sortable-column {
  cursor: pointer;
  user-select: none;
}

.p-datatable .p-sortable-column .p-column-title,
.p-datatable .p-sortable-column .p-sortable-column-icon,
.p-datatable .p-sortable-column .p-sortable-column-badge {
  vertical-align: middle;
}

.p-datatable .p-sortable-column .p-sortable-column-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.p-datatable-hoverable-rows .p-selectable-row {
  cursor: pointer;
}

/* Scrollable */
.p-datatable-scrollable > .p-datatable-wrapper {
  position: relative;
}

.p-datatable-scrollable-table > .p-datatable-thead {
  top: 0;
  z-index: 1;
}

.p-datatable-scrollable-table > .p-datatable-frozen-tbody {
  position: sticky;
  z-index: 1;
}

.p-datatable-scrollable-table > .p-datatable-tfoot {
  bottom: 0;
  z-index: 1;
}

.p-datatable-scrollable .p-frozen-column {
  position: sticky;
  background: inherit;
}

.p-datatable-scrollable th.p-frozen-column {
  z-index: 1;
}

.p-datatable-flex-scrollable {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.p-datatable-flex-scrollable > .p-datatable-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
}

.p-datatable-scrollable-table > .p-datatable-tbody > .p-rowgroup-header {
  position: sticky;
  z-index: 1;
}

/* Resizable */
.p-datatable-resizable-table > .p-datatable-thead > tr > th,
.p-datatable-resizable-table > .p-datatable-tfoot > tr > td,
.p-datatable-resizable-table > .p-datatable-tbody > tr > td {
  overflow: hidden;
  white-space: nowrap;
}

.p-datatable-resizable-table > .p-datatable-thead > tr > th.p-resizable-column:not(.p-frozen-column) {
  background-clip: padding-box;
  position: relative;
}

.p-datatable-resizable-table-fit > .p-datatable-thead > tr > th.p-resizable-column:last-child .p-column-resizer {
  display: none;
}

.p-datatable .p-column-resizer {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  width: 0.5rem;
  height: 100%;
  padding: 0px;
  cursor: col-resize;
  border: 1px solid transparent;
}

.p-datatable .p-column-header-content {
  display: flex;
  align-items: center;
}

.p-datatable .p-column-resizer-helper {
  width: 1px;
  position: absolute;
  z-index: 10;
  display: none;
}

.p-datatable .p-row-editor-init,
.p-datatable .p-row-editor-save,
.p-datatable .p-row-editor-cancel {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

/* Expand */
.p-datatable .p-row-toggler {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

/* Reorder */
.p-datatable-reorder-indicator-up,
.p-datatable-reorder-indicator-down {
  position: absolute;
  display: none;
}

.p-reorderable-column,
.p-datatable-reorderablerow-handle {
  cursor: move;
}

/* Loader */
.p-datatable .p-datatable-loading-overlay {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

/* Filter */
.p-column-filter-row {
  display: flex;
  align-items: center;
  width: 100%;
}

.p-column-filter-menu {
  display: inline-flex;
  margin-left: auto;
}

.p-column-filter-row .p-column-filter-element {
  flex: 1 1 auto;
  width: 1%;
}

.p-column-filter-menu-button,
.p-column-filter-clear-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  overflow: hidden;
  position: relative;
}

.p-column-filter-row-items {
  margin: 0;
  padding: 0;
  list-style: none;
}

.p-column-filter-row-item {
  cursor: pointer;
}

.p-column-filter-add-button,
.p-column-filter-remove-button {
  justify-content: center;
}

.p-column-filter-add-button .p-button-label,
.p-column-filter-remove-button .p-button-label {
  flex-grow: 0;
}

.p-column-filter-buttonbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.p-column-filter-buttonbar .p-button:not(.p-button-icon-only) {
  width: auto;
}

/* Responsive */
.p-datatable .p-datatable-tbody > tr > td > .p-column-title {
  display: none;
}

/* VirtualScroller */
.p-datatable-virtualscroller-spacer {
  display: flex;
}

.p-datatable .p-virtualscroller .p-virtualscroller-loading {
  transform: none !important;
  min-height: 0;
  position: sticky;
  top: 0;
  left: 0;
}

.p-datatable .p-paginator-top {
  border-width: 1px 0 1px 0;
  border-radius: 0;
}
.p-datatable .p-paginator-bottom {
  border-width: 0 0 1px 0;
  border-radius: 0;
}
.p-datatable .p-datatable-header {
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.6);
  border: 1px solid #383838;
  border-width: 0 0 1px 0;
  padding: 1rem 1rem;
  font-weight: 600;
}
.p-datatable .p-datatable-footer {
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid #383838;
  border-width: 0 0 1px 0;
  padding: 1rem 1rem;
  font-weight: 600;
}
.p-datatable .p-datatable-thead > tr > th {
  text-align: left;
  padding: 1rem 1rem;
  border: 1px solid #383838;
  border-width: 0 0 1px 0;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.87);
  background: #1e1e1e;
  transition: box-shadow 0.2s;
}
.p-datatable .p-datatable-tfoot > tr > td {
  text-align: left;
  padding: 1rem 1rem;
  border: 1px solid #383838;
  border-width: 0 0 1px 0;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.87);
  background: #1e1e1e;
}
.p-datatable .p-sortable-column .p-sortable-column-icon {
  color: rgba(255, 255, 255, 0.6);
  margin-left: 0.5rem;
}
.p-datatable .p-sortable-column .p-sortable-column-badge {
  border-radius: 50%;
  height: 1.143rem;
  min-width: 1.143rem;
  line-height: 1.143rem;
  color: rgba(255, 255, 255, 0.87);
  background: rgba(255, 213, 79, 0.16);
  margin-left: 0.5rem;
}
.p-datatable .p-sortable-column:not(.p-highlight):hover {
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.87);
}
.p-datatable .p-sortable-column:not(.p-highlight):hover .p-sortable-column-icon {
  color: rgba(255, 255, 255, 0.87);
}
.p-datatable .p-sortable-column.p-highlight {
  background: #1e1e1e;
  color: #FFD54F;
}
.p-datatable .p-sortable-column.p-highlight .p-sortable-column-icon {
  color: #FFD54F;
}
.p-datatable .p-sortable-column.p-highlight:hover {
  background: rgba(255, 255, 255, 0.03);
  color: #FFD54F;
}
.p-datatable .p-sortable-column.p-highlight:hover .p-sortable-column-icon {
  color: #FFD54F;
}
.p-datatable .p-sortable-column:focus-visible {
  box-shadow: inset 0 0 0 0.15rem #ffe284;
  outline: 0 none;
}
.p-datatable .p-datatable-tbody > tr {
  background: #1e1e1e;
  color: rgba(255, 255, 255, 0.87);
  transition: box-shadow 0.2s;
}
.p-datatable .p-datatable-tbody > tr > td {
  text-align: left;
  border: 1px solid #383838;
  border-width: 0 0 1px 0;
  padding: 1rem 1rem;
}
.p-datatable .p-datatable-tbody > tr > td .p-row-toggler,
.p-datatable .p-datatable-tbody > tr > td .p-row-editor-init,
.p-datatable .p-datatable-tbody > tr > td .p-row-editor-save,
.p-datatable .p-datatable-tbody > tr > td .p-row-editor-cancel {
  width: 2rem;
  height: 2rem;
  color: rgba(255, 255, 255, 0.6);
  border: 0 none;
  background: transparent;
  border-radius: 50%;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
  outline-color: transparent;
}
.p-datatable .p-datatable-tbody > tr > td .p-row-toggler:enabled:hover,
.p-datatable .p-datatable-tbody > tr > td .p-row-editor-init:enabled:hover,
.p-datatable .p-datatable-tbody > tr > td .p-row-editor-save:enabled:hover,
.p-datatable .p-datatable-tbody > tr > td .p-row-editor-cancel:enabled:hover {
  color: rgba(255, 255, 255, 0.87);
  border-color: transparent;
  background: rgba(255, 255, 255, 0.03);
}
.p-datatable .p-datatable-tbody > tr > td .p-row-toggler:focus-visible,
.p-datatable .p-datatable-tbody > tr > td .p-row-editor-init:focus-visible,
.p-datatable .p-datatable-tbody > tr > td .p-row-editor-save:focus-visible,
.p-datatable .p-datatable-tbody > tr > td .p-row-editor-cancel:focus-visible {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #ffe284;
}
.p-datatable .p-datatable-tbody > tr > td .p-row-editor-save {
  margin-right: 0.5rem;
}
.p-datatable .p-datatable-tbody > tr > td > .p-column-title {
  font-weight: 600;
}
.p-datatable .p-datatable-tbody > tr:focus-visible {
  outline: 0.15rem solid #ffe284;
  outline-offset: -0.15rem;
}
.p-datatable .p-datatable-tbody > tr.p-highlight {
  background: rgba(255, 213, 79, 0.16);
  color: rgba(255, 255, 255, 0.87);
}
.p-datatable .p-datatable-tbody > tr.p-highlight-contextmenu {
  outline: 0.15rem solid #ffe284;
  outline-offset: -0.15rem;
}
.p-datatable .p-datatable-tbody > tr.p-datatable-dragpoint-top > td {
  box-shadow: inset 0 2px 0 0 rgba(255, 213, 79, 0.16);
}
.p-datatable .p-datatable-tbody > tr.p-datatable-dragpoint-bottom > td {
  box-shadow: inset 0 -2px 0 0 rgba(255, 213, 79, 0.16);
}
.p-datatable.p-datatable-hoverable-rows .p-datatable-tbody > tr:not(.p-highlight):hover {
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.87);
}
.p-datatable .p-column-resizer-helper {
  background: #FFD54F;
}
.p-datatable.p-datatable-scrollable > .p-datatable-wrapper > .p-datatable-table > .p-datatable-thead,
.p-datatable.p-datatable-scrollable > .p-datatable-wrapper > .p-datatable-table > .p-datatable-tfoot, .p-datatable.p-datatable-scrollable > .p-datatable-wrapper > .p-virtualscroller > .p-datatable-table > .p-datatable-thead,
.p-datatable.p-datatable-scrollable > .p-datatable-wrapper > .p-virtualscroller > .p-datatable-table > .p-datatable-tfoot {
  background-color: #1e1e1e;
}
.p-datatable .p-datatable-loading-icon {
  font-size: 2rem;
}
.p-datatable .p-datatable-loading-icon.p-icon {
  width: 2rem;
  height: 2rem;
}
.p-datatable.p-datatable-gridlines .p-datatable-header {
  border-width: 1px 1px 0 1px;
}
.p-datatable.p-datatable-gridlines .p-datatable-footer {
  border-width: 0 1px 1px 1px;
}
.p-datatable.p-datatable-gridlines .p-paginator-top {
  border-width: 0 1px 0 1px;
}
.p-datatable.p-datatable-gridlines .p-paginator-bottom {
  border-width: 0 1px 1px 1px;
}
.p-datatable.p-datatable-gridlines .p-datatable-thead > tr > th {
  border-width: 1px 0 1px 1px;
}
.p-datatable.p-datatable-gridlines .p-datatable-thead > tr > th:last-child {
  border-width: 1px;
}
.p-datatable.p-datatable-gridlines .p-datatable-tbody > tr > td {
  border-width: 1px 0 0 1px;
}
.p-datatable.p-datatable-gridlines .p-datatable-tbody > tr > td:last-child {
  border-width: 1px 1px 0 1px;
}
.p-datatable.p-datatable-gridlines .p-datatable-tbody > tr:last-child > td {
  border-width: 1px 0 1px 1px;
}
.p-datatable.p-datatable-gridlines .p-datatable-tbody > tr:last-child > td:last-child {
  border-width: 1px;
}
.p-datatable.p-datatable-gridlines .p-datatable-tfoot > tr > td {
  border-width: 1px 0 1px 1px;
}
.p-datatable.p-datatable-gridlines .p-datatable-tfoot > tr > td:last-child {
  border-width: 1px 1px 1px 1px;
}
.p-datatable.p-datatable-gridlines .p-datatable-thead + .p-datatable-tfoot > tr > td {
  border-width: 0 0 1px 1px;
}
.p-datatable.p-datatable-gridlines .p-datatable-thead + .p-datatable-tfoot > tr > td:last-child {
  border-width: 0 1px 1px 1px;
}
.p-datatable.p-datatable-gridlines:has(.p-datatable-thead):has(.p-datatable-tbody) .p-datatable-tbody > tr > td {
  border-width: 0 0 1px 1px;
}
.p-datatable.p-datatable-gridlines:has(.p-datatable-thead):has(.p-datatable-tbody) .p-datatable-tbody > tr > td:last-child {
  border-width: 0 1px 1px 1px;
}
.p-datatable.p-datatable-gridlines:has(.p-datatable-tbody):has(.p-datatable-tfoot) .p-datatable-tbody > tr:last-child > td {
  border-width: 0 0 0 1px;
}
.p-datatable.p-datatable-gridlines:has(.p-datatable-tbody):has(.p-datatable-tfoot) .p-datatable-tbody > tr:last-child > td:last-child {
  border-width: 0 1px 0 1px;
}
.p-datatable.p-datatable-striped .p-datatable-tbody > tr.p-row-odd {
  background: #242424;
}
.p-datatable.p-datatable-striped .p-datatable-tbody > tr.p-row-odd.p-highlight {
  background: rgba(255, 213, 79, 0.16);
  color: rgba(255, 255, 255, 0.87);
}
.p-datatable.p-datatable-striped .p-datatable-tbody > tr.p-row-odd.p-highlight .p-row-toggler {
  color: rgba(255, 255, 255, 0.87);
}
.p-datatable.p-datatable-striped .p-datatable-tbody > tr.p-row-odd.p-highlight .p-row-toggler:hover {
  color: rgba(255, 255, 255, 0.87);
}
.p-datatable.p-datatable-sm .p-datatable-header {
  padding: 0.5rem 0.5rem;
}
.p-datatable.p-datatable-sm .p-datatable-thead > tr > th {
  padding: 0.5rem 0.5rem;
}
.p-datatable.p-datatable-sm .p-datatable-tbody > tr > td {
  padding: 0.5rem 0.5rem;
}
.p-datatable.p-datatable-sm .p-datatable-tfoot > tr > td {
  padding: 0.5rem 0.5rem;
}
.p-datatable.p-datatable-sm .p-datatable-footer {
  padding: 0.5rem 0.5rem;
}
.p-datatable.p-datatable-lg .p-datatable-header {
  padding: 1.25rem 1.25rem;
}
.p-datatable.p-datatable-lg .p-datatable-thead > tr > th {
  padding: 1.25rem 1.25rem;
}
.p-datatable.p-datatable-lg .p-datatable-tbody > tr > td {
  padding: 1.25rem 1.25rem;
}
.p-datatable.p-datatable-lg .p-datatable-tfoot > tr > td {
  padding: 1.25rem 1.25rem;
}
.p-datatable.p-datatable-lg .p-datatable-footer {
  padding: 1.25rem 1.25rem;
}

/* Extra */
.p-datatable .p-datatable-tbody > tr.p-datatable-dragpoint-top > td {
  box-shadow: inset 0 2px 0 0 #FFD54F;
}
.p-datatable .p-datatable-tbody > tr.p-datatable-dragpoint-bottom > td {
  box-shadow: inset 0 -2px 0 0 #FFD54F;
}
</style>
