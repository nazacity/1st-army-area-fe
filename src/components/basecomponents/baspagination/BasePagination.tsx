import React from 'react';
import {
  gridPageCountSelector,
  GridPagination,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import {
  Pagination as MuiPagination,
  TablePaginationProps,
} from '@mui/material';

interface IProps {
  props: any;
}

const BasePagination: React.FC<IProps> = (props) => {
  const Pagination: React.FC<
    Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className'>
  > = ({ page, onPageChange, className }) => {
    const apiRef = useGridApiContext();
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
      <MuiPagination
        color="primary"
        count={pageCount}
        page={page}
        onChange={(event, value) => {
          onPageChange(event as any, value);
        }}
        variant="outlined"
        shape="rounded"
        className={className}
      />
    );
  };

  return <GridPagination ActionsComponent={Pagination} {...props} />;
};

export default BasePagination;
