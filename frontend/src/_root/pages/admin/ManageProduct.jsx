import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import { PageContainer } from '@toolpad/core';
import { renderEditStatus, renderStatus, STATUS_OPTIONS } from './customRenderer/status.jsx';
import { useDeleteAccount, useReadAllProduct, useUpdateAccountStatus } from '../../../api/queries.js';
import { Delete } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import DataGridConfirmDialog from '../../../components/dialogs/DataGridConfirmDialog.jsx';
import { ManagePageSearch } from "../../../components";
import { enqueueSnackbar as toaster } from 'notistack';
import { Box } from '@mui/material';


function ManageAccount() {
  const [searchValue, setSearchValue] = useState('')
  const [rows, setRows] = useState()
  const { data } = useReadAllProduct();
  const [dialogPayload, setDialogPayload] = useState({ state: false, id: null });
  const { mutateAsync: deleteAccount } = useDeleteAccount();
  const { mutateAsync: updateAccountStatus } = useUpdateAccountStatus();
  
  
  const breadcrumbs = [
    { path: '/', title: 'Home' },
    { path: '/manage-product', title: 'Quản lý sản phẩm' },
  ]
  
  useEffect(() => setRows(data), [data])
  console.log(data);

  const columns = [
    { field: 'productCode', headerName: 'Mã sản phẩm', width: 150 },
    { field: 'productName', headerName: 'Tên sản phẩm', width: 200 },
    { field: 'description', headerName: 'Mô tả', width: 300 },
    {
      field: 'productStatus',
      headerName: 'Trạng thái',
      width: 150,
      renderCell: renderStatus,
      renderEditCell: renderEditStatus,
      type: 'singleSelect',
      valueOptions: STATUS_OPTIONS,
      editable: true,
      align: 'center'
    },
    // {
    //   field: 'imageURLs',
    //   headerName: 'Hình ảnh',
    //   width: 200,
    //   renderCell: (params) => (
    //     <img src={params.value[0]} alt="Product" style={{ width: '50px', height: '50px' }} />
    //   ),
    // },
    // {
    //   field: 'category',
    //   headerName: 'Danh mục',
    //   width: 150,
    //   valueGetter: (params) => console.log(params)
    //   ,
    // },
    // {
    //   field: 'brand',
    //   headerName: 'Thương hiệu',
    //   width: 150,
    //   valueGetter: (params) => params.row.brand.name || '',
    // },
    // {
    //   field: 'specs',
    //   headerName: 'Thông số kỹ thuật',
    //   width: 200,
    //   renderCell: (params) => params.value.map(spec => spec.name).join(', '),
    // },
    // {
    //   field: 'actions',
    //   type: 'actions',
    //   headerName: '',
    //   width: 100,
    //   align: 'center',
    //   cellClassName: 'actions',
    //   getActions: ({ id }) => {
    //     return [
    //       <GridActionsCellItem
    //         icon={<Delete color='error' />}
    //         label="Delete"
    //         onClick={() => setDialogPayload({ state: true, id: id })}
    //         color="inherit"
    //         key="delete"
    //       />
    //     ];
    //   }
    // }
  ];

  const handleDeleteClick = async (isAccept) => {
    console.log(isAccept);

    const { id } = dialogPayload

    if (!isAccept) {
      setDialogPayload({ state: false, id: null });
      return;
    }


    await deleteAccount(id)
    setRows(rows.filter((row) => row.accountCode !== id));
    setDialogPayload({ state: false, id: null });
  }

  const handleUpdate = async (updatedRow) => {
    await updateAccountStatus(updatedRow)
    toaster("Cập nhật trạng thái tài khoản thành công", { variant: 'success' })
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
      title='Quản lý sản phẩm'
      breadCrumbs={breadcrumbs}
      sx={{ maxWidth: { xl: 'unset', lg: '94vw', sm: '92vw', xs: '100vw' } }}
    >
      <Box
        display='flex'
        width='100%'
        justifyContent='flex-end'
      >
        <ManagePageSearch
          {...{ searchValue, setSearchValue, handleSearch }}
        />
      </Box>
      <DataGridConfirmDialog
        onClick={handleDeleteClick}
        state={dialogPayload.state}
        title="Xác nhận xóa?"
        content="Người dùng, bao gồm cả thông tin sẽ bị xóa vĩnh viễn và không thể khôi phục."
      />
      <DataGrid
        getRowId={(row) => row.productCode}
        rows={rows}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        checkboxSelection
        // onCellEditStop={handleUpdate}
        processRowUpdate={handleUpdate}
        onProcessRowUpdateError={handleUpdateError}
      />

    </PageContainer>
  )
}

export default ManageAccount