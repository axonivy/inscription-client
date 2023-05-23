import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Mapping, MappingInfo } from '@axonivy/inscription-protocol';
import {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table';
import { MappingTreeData } from './mapping-tree-data';
import { IvyIcons } from '@axonivy/editor-icons';
import {
  CodeEditorCell,
  ExpandableCell,
  ExpandableHeader,
  Fieldset,
  FieldsetControl,
  IconInput,
  Table,
  TableCell,
  TableHeader
} from '../../../../components/widgets';

const MappingTree = (props: { data: Mapping; mappingInfo: MappingInfo; onChange: (change: Mapping) => void; location: string }) => {
  const [tree, setTree] = useState<MappingTreeData[]>([]);
  const [showGlobalFilter, setShowGlobalFilter] = useState(false);
  const [showOnlyInscribed, setShowOnlyInscribed] = useState(false);

  useEffect(() => {
    const treeData = MappingTreeData.of(props.mappingInfo);
    Object.entries(props.data).forEach(mapping => MappingTreeData.update(props.mappingInfo, treeData, mapping[0].split('.'), mapping[1]));
    setTree(treeData);
  }, [props.data, props.mappingInfo]);

  const loadChildren = useCallback<(row: MappingTreeData) => void>(
    row => setTree(tree => MappingTreeData.loadChildrenFor(props.mappingInfo, row.type, tree)),
    [props.mappingInfo, setTree]
  );

  const columns = useMemo<ColumnDef<MappingTreeData>[]>(
    () => [
      {
        accessorFn: row => row.attribute,
        id: 'attribute',
        header: header => <ExpandableHeader header={header} name='Attribute' />,
        cell: cell => (
          <ExpandableCell
            cell={cell}
            isLoaded={cell.row.original.isLoaded}
            loadChildren={() => loadChildren(cell.row.original)}
            isUnknown={cell.row.original.type.length === 0}
          />
        ),
        footer: props => props.column.id,
        enableSorting: false
      },
      {
        accessorFn: row => row.simpleType,
        id: 'simpleType',
        header: () => <span>Type</span>,
        cell: cell => <span title={cell.row.original.type}>{cell.getValue() as string}</span>,
        footer: props => props.column.id,
        enableSorting: false
      },
      {
        accessorFn: row => row.value,
        id: 'value',
        header: () => <span>Expression</span>,
        cell: cell => <CodeEditorCell cell={cell} context={{ type: cell.row.original.type, location: props.location }} />,
        footer: props => props.column.id,
        filterFn: (row, columnId, filterValue) => filterValue || row.original.value.length > 0
      }
    ],
    [loadChildren, props.location]
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>(true);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const tableControls: FieldsetControl[] = [
    {
      label: 'Toggle Search',
      icon: IvyIcons.Search,
      active: showGlobalFilter,
      action: () => {
        setShowGlobalFilter(show => !show);
        setGlobalFilter('');
      }
    },
    {
      label: 'Toggle Inscribed',
      icon: IvyIcons.Rule,
      active: showOnlyInscribed,
      action: () => {
        setShowOnlyInscribed(show => !show);
        setColumnFilters([{ id: 'value', value: showOnlyInscribed }]);
      }
    }
  ];

  const table = useReactTable({
    data: tree,
    columns: columns,
    state: {
      sorting,
      expanded,
      globalFilter,
      columnFilters
    },
    filterFromLeafRows: true,
    onExpandedChange: setExpanded,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getSubRows: row => row.children,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    meta: {
      updateData: (rowId: string, columnId: string, value: unknown) => {
        const rowIndex = rowId.split('.').map(parseFloat);
        props.onChange(MappingTreeData.to(MappingTreeData.updateDeep(tree, rowIndex, columnId, value)));
      }
    }
  });

  return (
    <Fieldset label='Mapping' htmlFor='mapping' controls={tableControls}>
      {showGlobalFilter && <IconInput value={globalFilter} onChange={setGlobalFilter} icon={IvyIcons.Search} placeholder='Search' />}
      <Table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHeader key={header.id} colSpan={header.colSpan}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHeader>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Fieldset>
  );
};

export default memo(MappingTree);
