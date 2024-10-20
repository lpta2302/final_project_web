import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import { PageContainer } from '@toolpad/core';
import { useEffect, useState } from 'react';
import DataGridConfirmDialog from '../../../components/dialogs/DataGridConfirmDialog.jsx';
import { ManagePageSearch, SplitButton } from "../../../components";
import { enqueueSnackbar as toaster } from 'notistack';
import { Box, Button, ButtonGroup } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useDeleteBrand, useDeleteCategory, useDeleteSpecification, useDeleteTag, useReadAllBrand, useReadAllCategory, useReadAllSpecification, useReadAllTag } from '../../../api/queries.js';

const criteria = {
  brand: {
    read: useReadAllBrand,
    delete: useDeleteBrand,
    columns: [
      { field: 'brandCode', headerName: 'Id', width: 150 },
      { field: 'brandName', headerName: 'Hãng sản xuất', width: 200 }
    ]
  },
  category: {
    read: useReadAllCategory,
    delete: useDeleteCategory,
    columns: [
      { field: 'categoryCode', headerName: 'Id', width: 150 },
      { field: 'categoryName', headerName: 'Loại sản phẩm', width: 200 }
    ]
  },
  tag: {
    read: useReadAllTag,
    delete: useDeleteTag,
    columns: [
      { field: 'tagCode', headerName: 'Id', width: 150 },
      { field: 'tagName', headerName: 'Tên thẻ', width: 200 }
    ]
  },
  // specification:{
  //   read: useReadAllSpecification,
  //   delete: useDeleteSpecification,
  //   columns: [
  //     { field: 'specCode', headerName: 'Id', width: 150 },
  //   { field: 'specName', headerName: 'Loại ', width: 200 }
  //   ]
  // }
}

const criteriaKeys = Object.keys(criteria);

function ManageCriteria() {
  const [criterion, setCriterion] = useState('category')
  const [searchValue, setSearchValue] = useState('')
  const [rows, setRows] = useState()
  const { data } = criteria[criterion].read();
  const [dialogPayload, setDialogPayload] = useState({ state: false, id: null });
  const { mutateAsync: handleDelete } = criteria[criterion].delete();
  // const { mutateAsync: updateAccountStatus } = useUpdateAccountStatus();


  const breadcrumbs = [
    { path: '/', title: 'Home' },
    { path: '/manage-criteria', title: 'Quản lý tiêu chí phân loại' },
  ]

  useEffect(() => setRows(data), [data,criterion])
  console.log(data);
  

  const columns = [
    ...criteria[criterion].columns,
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      width: 100,
      align: 'center',
      cellClassName: 'actions',
      getActions: ({ row: { _id: id } }) => {
        return [
          <GridActionsCellItem
            icon={<Delete color='error' />}
            label="Delete"
            onClick={() => setDialogPayload({ state: true, id: id })}
            color="inherit"
            key="delete"
          />
        ];
      }
    }
  ];

  const handleDeleteClick = async (isAccept) => {

    const { id } = dialogPayload

    if (!isAccept) {
      setDialogPayload({ state: false, id: null });
      return;
    }


    await handleDelete(id)
    setRows(rows.filter((row) => row.accountCode !== id));
    setDialogPayload({ state: false, id: null });
  }

  const handleUpdate = async (updatedRow) => {
    console.log(updatedRow);

    // await updateAccountStatus(updatedRow)
    // toaster("Cập nhật trạng thái tài khoản thành công", { variant: 'success' })
    return updatedRow;
  }

  const handleUpdateError = () => {
    toaster("Cập nhật trạng thái tài khoản thất bại", { variant: 'error' })
  }

  const handleSearch = () => {
    console.log(searchValue);

  }


  return (
    <PageContainer
      title='Quản lý tiêu chí phân loại'
      breadCrumbs={breadcrumbs}
      sx={{ maxWidth: { xl: 'unset', lg: '94vw', sm: '92vw', xs: '100vw' } }}
    >
      <Box
        display='flex'
        width='100%'
        justifyContent='space-between'
      >
        <Box
          maxHeight='50%'
        >
          <SplitButton
            options={criteriaKeys}
            selecting={criterion}
            setSelecting={setCriterion}
          />
        </Box>
        <ManagePageSearch
          {...{ searchValue, setSearchValue, handleSearch }}
        />
      </Box>
      <DataGridConfirmDialog
        onClick={handleDeleteClick}
        state={dialogPayload.state}
        title="Xác nhận xóa?"
        content="Sản phẩm, bao gồm cả thông tin sẽ bị xóa vĩnh viễn và không thể khôi phục."
      />
      <DataGrid
        getRowId={(row) => row[criterion+'Code']}
        rows={rows}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        checkboxSelection
        processRowUpdate={handleUpdate}
        onProcessRowUpdateError={handleUpdateError}
      />

    </PageContainer>
  )
}

export default ManageCriteria