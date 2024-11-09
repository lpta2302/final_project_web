import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import { renderEditCustomerStatus } from './customRenderer/customerStatus.jsx';
import { useDeleteoOrderAmin, useReadAllOrdersAdmin, useSearchOrderAdmin, useUpdateOrderAdmin } from '../../../api/queries.js';
import { CreditCard, Delete, Done, DoNotDisturbAltOutlined, FilterAlt, FilterAltOff, HourglassTopOutlined, LensBlurRounded, LocalShipping, Money, Pending } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import DataGridConfirmDialog from '../../../components/dialogs/DataGridConfirmDialog.jsx';
import { CustomPageContainer, FilterDrawer, HighLightCard, ManagePageSearch } from "../../../components";
import { enqueueSnackbar as toaster } from 'notistack';
import { Box, Button, ButtonGroup, Drawer, Grid2 } from '@mui/material';
import { renderCustomStatus, renderEditCustomStatus } from './customRenderer/customStatusRender.jsx';
import setDeepState from '../../../util/setDeepState.js';
import { formatDate } from '../../../util/datetimeHandler.js';

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

const defaultSorting = [
  { field: 'processStatus', sort: 'asc' }, // Default sort on 'status' column (Pending -> Processing -> Other)
];

const today = formatDate(new Date());

function ManageOrder() {
  const [isOpenFilter, setIsOpenFilter] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [searchParam, setSearchParam] = useState()
  const [todayOrders, setTodayOrders] = useState()
  const [rows, setRows] = useState()
  const { data: orders, isLoading: isLoadingOrders } = useReadAllOrdersAdmin();
  const [dialogPayload, setDialogPayload] = useState({ state: false, id: null });
  const { mutateAsync: deleteOrder } = useDeleteoOrderAmin();
  const { mutateAsync: updateOrderStatus } = useUpdateOrderAdmin();
  const { data: searchResult } = useSearchOrderAdmin(searchParam);
  const breadcrumbs = [
    { path: '/', title: 'Home' },
    { path: '/manage-order', title: 'Quản lý đơn hàng' },
  ]
  const handleAddParam = setDeepState(setSearchParam);

  useEffect(() => {
    if (!orders) return;
    setRows(orders), [orders];
    setTodayOrders(orders.filter(order => formatDate(new Date(order.createdAt)) === today));
  },[orders])
  useEffect(() => {
    setTimeout(() => {
      if (!searchValue && Object.keys(searchParam)?.length < 1) {
        return;
      }
      setSearchParam(
        prev => ({ ...prev, orderId: searchValue })
      )
    }, 1500);
  }, [searchValue]);
  
  const columns = [
    // { field: 'accountCode', headerName: 'Id', width: 150 },
    // { field: 'username', headerName: 'Tên tài khoản', width: 150 },
    // { field: 'firstName', headerName: 'Họ', width: 80 },
    // { field: 'lastName', headerName: 'Tên', width: 200 },
    // { field: 'email', headerName: 'Email', width: 200 },
    // { field: 'phoneNumber', headerName: 'Số điện thoại', width: 150 }
    {
      field: '_id',
      type: 'string',
      headerName: 'Mã vận đơn',
      width: 150,
    },
    {
      field: 'shippingCost',
      type: 'number',
      headerName: 'Phí Ship',
      width: 150,
    },
    { field: 'discountAmount', type: 'number', headerName: 'Số tiền giảm', width: 150 },
    { field: 'totalAmount', type: 'number', headerName: 'Thành tiền', width: 150 },
    {
      field: 'createdAt',
      headerName: 'Ngày tạo đơn',
      width: 150, valueFormatter: (value) => new Date(value).toLocaleString()
    },
    {
      field: 'paymentMethod', headerName: 'Phương thức TT', width: 150, renderCell: (params) => renderCustomStatus(params, paymentMethod),
      renderEditCell: renderEditCustomerStatus,
      type: 'singleSelect',
    },
    {
      field: 'paymentStatus', headerName: 'Trạng thái TT', width: 150, renderCell: (params) => renderCustomStatus(params, paymentStatus),
      type: 'singleSelect',
    },
    {
      field: 'processStatus', headerName: 'Trạng thái đơn', width: 150, renderCell: (params) => renderCustomStatus(params, processStatus),
      renderEditCell: (params) => renderEditCustomStatus(params, processStatus),
      type: 'singleSelect', editable: 'true',
      sortComparator: (v1, v2) => {
        console.log(v1);

        // Define custom order for statuses
        const order = ['pending', 'processing']; // 'Other' will fall last

        // Compare 'Pending' first, 'Processing' second, then 'Other'
        const index1 = order.indexOf(v1);
        const index2 = order.indexOf(v2);

        // If status is in the order array, it will use the index for sorting, otherwise it will be placed last
        if (index1 !== -1 && index2 === -1) return -1; // v1 is in the order and v2 is not
        if (index1 === -1 && index2 !== -1) return 1;  // v2 is in the order and v1 is not
        return index1 - index2; // Default sorting for statuses in the order array
      },
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
  ].map(col => ({ ...col, headerAlign: 'center', align: 'center' }))
  const filterList = {
    paymentMethod: {
      type: 'select',
      onChange: (e) => {
        const value = e.target.value;
        handleAddParam('paymentMethod', value)
      },
      options: Object.values(paymentMethod).map(value=>value.label),
      label: 'Phương thức TT'
    },
    paymentStatus: {
      type: 'select',
      onChange: (e) => {
        const value = e.target.value;
        handleAddParam('paymentStatus', value)
      },
      options: Object.values(paymentStatus).map(value=>value.label),
      label: 'Trạng thái TT'
    },
    processStatus: {
      type: 'select',
      onChange: (e) => {
        const value = e.target.value;
        handleAddParam('processStatus', value)
      },
      options: Object.values(processStatus).map(value=>value.label),
      label: 'Trạng thái đơn'
    },
    totalAmount: {
      type: 'numberGroup',
      items: {
        minTotalAmount: {
          label: 'Thành tiền tối thiểu',
          onChange: (e) => {
            const value = e.target.value;
            handleAddParam('minTotalAmount', value)
          },
          placeholder: '0'
        },
        maxTotalAmount: {
          label: 'Thành tiền tối đa',
          onChange: (e) => {
            const value = e.target.value;
            handleAddParam('maxTotalAmount', value)
          },
          placeholder: '1 0000 000'
        },
      }
    },

  }
  const handleDeleteClick = async (isAccept) => {
    console.log(isAccept);

    const { id } = dialogPayload

    if (!isAccept) {
      setDialogPayload({ state: false, id: null });
      return;
    }


    await deleteOrder(id)
    setRows(rows.filter((row) => row.accountCode !== id));
    setDialogPayload({ state: false, id: null });
  }

  const handleUpdate = async (updatedRow) => {
    await updateOrderStatus(updatedRow)
    toaster("Cập nhật trạng thái tài khoản thành công", { variant: 'success' })
    return updatedRow;
  }

  const handleUpdateError = () => {
    toaster("Cập nhật trạng thái tài khoản thất bại", { variant: 'error' })
  }
  const handleSearch = () => {
    if (!searchValue && Object.keys(searchParam) < 1) {
      return;
    }
    setSearchParam(prev => ({ ...prev, orderId: searchValue }))
  }

  const toggleDrawer = (newState) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setIsOpenFilter(newState);
  };



  return (
    <CustomPageContainer
      title='Quản lý đơn hàng'
      breadCrumbs={breadcrumbs}
      sx={{ maxWidth: { xl: 'unset', lg: '94vw', sm: '92vw', xs: '100vw' } }}
    >
    <Grid2 container spacing={2} pb={2}>
      {/* Thống kê trong ngày */}
      <Grid2 size={{ md: 4, xs: 12 }} sx={{ boxShadow: '0 0 5px 0 rgba(0,0,0,0.3)' }} padding={{ xs: 2, md: 3 }} borderRadius={1} height={160}>
          <HighLightCard isLoading={!todayOrders} title="Đơn hàng trong ngày" value={todayOrders?.length} />
        </Grid2>
        <Grid2 size={{ md: 4, xs: 12 }} sx={{ boxShadow: '0 0 5px 0 rgba(0,0,0,0.3)' }} padding={{ xs: 2, md: 3 }} borderRadius={1} height={160}>
          <HighLightCard isLoading={isLoadingOrders} title="Đơn hàng chờ xác nhận" value={orders?.filter(o => o.processStatus === 'pending')?.length} />
        </Grid2>
        <Grid2 size={{ md: 4, xs: 12 }} sx={{ boxShadow: '0 0 5px 0 rgba(0,0,0,0.3)' }} padding={{ xs: 2, md: 3 }} borderRadius={1} height={160}>
          <HighLightCard isLoading={isLoadingOrders} title="Đơn hàng đang xử lí" value={orders?.filter(o => o.processStatus === 'processing')?.length} />
        </Grid2>
    </Grid2>

    <Drawer
        sx={{
          '& .MuiDrawer-paper': { backgroundImage: 'none', py: '80px' },
        }}
        anchor={'right'}
        open={isOpenFilter}
        onClose={toggleDrawer(false)}
      >
        <FilterDrawer
          filterList={filterList}
          toggleDrawer={toggleDrawer}
        />
      </Drawer>
      <Box
        display='flex'
        width='100%'
        justifyContent='flex-end'
        mb={3}
      >
        <ButtonGroup color='blackLight' sx={{ mr: 1 }}>
          <Button
            sx={{ width: '44px', height: '44px', minWidth: '44px' }}
          >
            <FilterAltOff />
          </Button>
          <Button
            sx={{ width: '44px', height: '44px', minWidth: '44px' }}
            onClick={toggleDrawer(true)}
          >
            <FilterAlt />
          </Button>
        </ButtonGroup>
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
        rows={searchResult? searchResult :rows}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        processRowUpdate={handleUpdate}
        onProcessRowUpdateError={handleUpdateError}
        loading={isLoadingOrders}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
          sorting: { sortModel: defaultSorting }
        }}
        pageSizeOptions={[5, 10]}
        sortingModel={defaultSorting}
      />

    </CustomPageContainer>
  )
}

export default ManageOrder