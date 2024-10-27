import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import { PageContainer } from '@toolpad/core';
import { renderEditProductStatus, renderProductStatus, STATUS_OPTIONS } from './customRenderer/productStatus.jsx';
import { useEffect, useState } from 'react';
import DataGridConfirmDialog from '../../../components/dialogs/DataGridConfirmDialog.jsx';
import { CustomGridToolbar, ManagePageSearch } from "../../../components";
import { enqueueSnackbar as toaster } from 'notistack';
import { Box } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useDeleteProduct, useReadAllProduct } from '../../../api/queries.js';
import { useNavigate } from 'react-router-dom';

const columnFields = [
  { field: 'productCode', headerName: 'Id', width: 150 },
    { field: 'productName', headerName: 'Tên sản phẩm', width: 200 },
    { field: 'description', headerName: 'Mô tả', width: 300 },
    {
      field: 'productStatus',
      headerName: 'Trạng thái',
      width: 150,
      renderCell: renderProductStatus,
      renderEditCell: renderEditProductStatus,
      type: 'singleSelect',
      valueOptions: STATUS_OPTIONS,
      editable: true,
      align: 'center'
    },
]


function ManageAccount() {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')
  const [rows, setRows] = useState()

  const { data, isPending: isLoading } = useReadAllProduct();
  const [dialogPayload, setDialogPayload] = useState({ state: false, id: null });

  const { mutateAsync: deleteAccount } = useDeleteProduct();
  // const { mutateAsync: updateAccountStatus } = useUpdateAccountStatus();


  const breadcrumbs = [
    { path: '/', title: 'Home' },
    { path: '/manage-product', title: 'Quản lý sản phẩm' },
  ]

  useEffect(() => setRows(data), [data])
  console.log(data);

  const columns = [
    ...columnFields,
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
    //   headerName: 'Phân loại',
    //   width: 150,
    //   valueGetter: (value, row) => console.log(row),
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
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      width: 100,
      align: 'center',
      cellClassName: 'actions',
      getActions: ({ row:{_id: id}}) => {
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


    await deleteAccount(id)
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
        content="Sản phẩm, bao gồm cả thông tin sẽ bị xóa vĩnh viễn và không thể khôi phục."
      />
      <DataGrid
        getRowId={(row) => row.productCode}
        rows={rows}
        columns={columns}
        slots={{ toolbar: CustomGridToolbar }}
        slotProps={{toolbar:{onClick: ()=> navigate('create-product')}}}
        checkboxSelection
        processRowUpdate={handleUpdate}
        onProcessRowUpdateError={handleUpdateError}
        loading={isLoading}
      />

    </PageContainer>
  )
}

export default ManageAccount