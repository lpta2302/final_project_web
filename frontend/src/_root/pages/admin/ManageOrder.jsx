import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import { renderEditCustomerStatus, renderCustomerStatus, STATUS_OPTIONS } from './customRenderer/customerStatus.jsx';
import { useDeleteAccount, useReadAllAccount, useReadAllOrdersAdmin, useUpdateAccountStatus } from '../../../api/queries.js';
import { CreditCard, Delete, Done, DoNotDisturbAltOutlined, HourglassTopOutlined, LocalShipping, Money, Pending } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import DataGridConfirmDialog from '../../../components/dialogs/DataGridConfirmDialog.jsx';
import { CustomPageContainer, ManagePageSearch } from "../../../components";
import { enqueueSnackbar as toaster } from 'notistack';
import { Box } from '@mui/material';
import { renderCustomStatus } from './customRenderer/customStatusRender.jsx';

// {"_id":"6718dc7a3010027ae58c30d1",
//   "userId":"670dd3f0602cc40efb3bc78c",
//   "orderNote":"Please handle with care.",
//   "expectedReceiveTime":"2024-11-01T12:00:00.000Z",
//   "takeOrderTime":"2024-10-21T08:30:00.000Z",
//   "address":"605c71ae1b1e4c4798a29f91",
//   "voucher":["605c71ae1b1e4c4798a29f92",
//   "605c71ae1b1e4c4798a29f93"],
//   "cart": ,
//   "createdAt":"2024-10-23T11:22:34.357Z",
//   "updatedAt":"2024-10-23T11:22:34.357Z",
//   "__v":0}

const paymentStatus = {
  paid: {
    label: 'paid',
    color: 'success',
    icon: Done,
  },
  unpaid: {
    label: 'unpaid',
    color: 'error',
    icon: DoNotDisturbAltOutlined,
  },
};
const paymentMethod = {
  credit_card: {
    label: 'credit_card',
    color: 'secondary',
    icon: CreditCard,
  },
  cash: {
    label: 'cash',
    color: 'warning',
    icon: Money,
  },
};
const processStatus = {
  completed: {
    label: 'completed',
    color: 'success',
    icon: Done,
  },
  canceled: {
    label: 'cancel',
    color: 'error',
    icon: DoNotDisturbAltOutlined,
  },
  pending: {
    label: 'pending',
    color: 'secondary',
    icon: Pending,
  },
  shipping: {
    label: 'shipping',
    color: 'warning',
    icon: LocalShipping,
  },
  processing: {
    label: 'processing',
    color: 'info',
    icon: HourglassTopOutlined,
  },
};

function ManageOrder() {
  const [searchValue,setSearchValue] = useState('')
  const [rows, setRows] = useState()
  const { data, isLoading } = useReadAllOrdersAdmin();
  const [dialogPayload, setDialogPayload] = useState({ state: false, id: null });
  const { mutateAsync: deleteAccount } = useDeleteAccount();
  const { mutateAsync: updateAccountStatus } = useUpdateAccountStatus();
  
console.log(rows);

  const breadcrumbs = [
    { path: '/', title: 'Home' },
    { path: '/manage-order', title: 'Quản lý đơn hàng' },
  ]

  useEffect(() => setRows(data), [data])

  const columns = [
    // { field: 'accountCode', headerName: 'Id', width: 150 },
    // { field: 'username', headerName: 'Tên tài khoản', width: 150 },
    // { field: 'firstName', headerName: 'Họ', width: 80 },
    // { field: 'lastName', headerName: 'Tên', width: 200 },
    // { field: 'email', headerName: 'Email', width: 200 },
    // { field: 'phoneNumber', headerName: 'Số điện thoại', width: 150 }
    { 
      field: 'shippingCost', 
      type: 'number', 
      headerName: 'Phí Ship', 
      width: 150 ,
    },
    { field: 'discountAmount', type: 'number', headerName: 'Số tiền giảm', width: 150 },
    { field: 'totalAmount', type: 'number', headerName: 'Thành tiền', width: 150 },
    { field: 'createdAt', 
      headerName: 'Ngày tạo đơn', 
      width: 150, valueFormatter:(value)=> new Date(value).toLocaleString() 
    },
    {
      field: 'paymentMethod', headerName: 'Phương thức TT', width: 150, renderCell: (params)=>renderCustomStatus(params,paymentMethod),
      renderEditCell: renderEditCustomerStatus,
      type: 'singleSelect',
    },
    {
      field: 'paymentStatus', headerName: 'Trạng thái TT', width: 150, renderCell: (params)=>renderCustomStatus(params,paymentStatus),
      type: 'singleSelect',
    },
    {
      field: 'processStatus', headerName: 'Trạng thái đơn', width: 150, renderCell: (params)=>renderCustomStatus(params,processStatus),
      renderEditCell: renderEditCustomerStatus,
      type: 'singleSelect',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [<GridActionsCellItem
          icon={<Delete color='error' />}
          label="Delete"
          onClick={() => setDialogPayload({ state: true, id: id })}
          color="inherit"
          key="delete"
        />]
      }
    }
  ].map(col=>({ ...col, headerAlign: 'center', align: 'center' }))

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
    <CustomPageContainer
      title='Quản lý đơn hàng'
      breadCrumbs={breadcrumbs}
      sx={{ maxWidth: { xl: 'unset', lg: '94vw', sm: '92vw', xs: '100vw' } }}
    >
      <Box
        display='flex'
        width='100%'
        justifyContent='flex-end'
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
        content="Người dùng, bao gồm cả thông tin sẽ bị xóa vĩnh viễn và không thể khôi phục."
      />
      <DataGrid
        getRowId={(row) => row._id}
        rows={rows}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
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

export default ManageOrder