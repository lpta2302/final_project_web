import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { renderEditProductStatus, renderProductStatus, STATUS_OPTIONS } from './customRenderer/productStatus.jsx';
import { useEffect, useState } from 'react';
import DataGridConfirmDialog from '../../../components/dialogs/DataGridConfirmDialog.jsx';
import { CustomGridToolbar, CustomPageContainer, FilterDrawer, ManagePageSearch } from "../../../components";
import { enqueueSnackbar as toaster } from 'notistack';
import { Box, Button, ButtonGroup, Drawer, IconButton, useTheme } from '@mui/material';
import { Delete, Filter, FilterAlt, FilterAltOff } from '@mui/icons-material';
import { useDeleteProduct, useReadAllProduct, useSearchProductAdmin } from '../../../api/queries.js';
import { useNavigate } from 'react-router-dom';
import renderImageSamples from './customRenderer/renderImageSamples.jsx';

const columnFields = [
  {
    field: 'imageUrls',
    headerName: 'Avatar',
    display: 'flex',
    renderCell: renderImageSamples,
    valueGetter: (value, row) => row.imageURLs,
    sortable: false,
    filterable: false,
   },
  { field: 'productCode', headerName: 'Id', width: 150 },
  { field: 'productName', headerName: 'Tên sản phẩm', flex: 1 },
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
  const [rows, setRows] = useState()
  const [searchValue, setSearchValue] = useState('')
  const [searchParam, setSearchParam] = useState({})

  
  const { data, isPending: isLoading } = useReadAllProduct();
  const [dialogPayload, setDialogPayload] = useState({ state: false, id: null });
  
  const { mutateAsync: deleteAccount } = useDeleteProduct();
  // const { mutateAsync: updateAccountStatus } = useUpdateAccountStatus();
  const { data: searchResult } = useSearchProductAdmin(searchParam);
  console.log(rows);


  const breadcrumbs = [
    { path: '/', title: 'Home' },
    { path: '/manage-product', title: 'Quản lý sản phẩm' },
  ]

  useEffect(() => setRows(data?.map(item=>({...item, category:item?.category?.categoryName}))), [data])

  const columns = [
    ...columnFields,
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
    if (!searchValue && Object.keys(searchParam).length <= 2) {
      return;
    }

    const param = {};
    if (searchValue.startsWith('#')) {
      param[columnFields[0].field] = searchValue.substring(1)
    } else {
      param[columnFields[1].field] = searchValue
    }
    setSearchParam(param)
  }

  useEffect(() => {
    setTimeout(() => {
      const param = {};
      if (searchValue.startsWith('#')) {
        param[columnFields[0].field] = searchValue.substring(1)
      } else {
        param[columnFields[1].field] = searchValue
      }
      setSearchParam(param)
    }, 1500);
  }, [searchValue]);


  return (
    <CustomPageContainer
      title='Quản lý sản phẩm'
      breadCrumbs={breadcrumbs}
      sx={{ maxWidth: { xl: 'unset', lg: '94vw', sm: '92vw', xs: '100vw' } }}
    >
      <Box
        display='flex'
        width='100%'
        justifyContent='flex-end'
        alignItems='center'
        mb={3}
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
        rows={searchResult ? searchResult : rows}
        columns={columns}
        slots={{ toolbar: CustomGridToolbar }}
        slotProps={{ toolbar: { onClick: () => navigate('create-product') } }}
        processRowUpdate={handleUpdate}
        onProcessRowUpdateError={handleUpdateError}
        loading={isLoading}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10]}
      />

    </CustomPageContainer>
  )
}

export default ManageAccount