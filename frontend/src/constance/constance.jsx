import { AccountBoxOutlined, Dashboard, WarehouseOutlined } from "@mui/icons-material";
import { BoxIcon, CartIcon, OrderIcon, OrderTextIcon, VoucherIcon } from "../icons/CustomIcons";
import { Cart, ManageAccount, ManageInventory, ManageOrder, ManageProduct, ManageVoucher, Voucher, Dashboard as DashboardPage } from "../_root/pages";
import Orders from "../_root/pages/customer/Orders";

export const adminNav = [
  {
    kind: 'header',
    title: 'Quản lý hàng hóa'
  },
  {
    segment: 'manage-product',
    title: 'Sản phẩm',
    icon: <BoxIcon />,
    element: <ManageProduct/>
  },
  {
    segment: 'manage-inventory',
    title: 'Kho hàng',
    icon: <WarehouseOutlined />,
    element: <ManageInventory/>
  },
  {
    kind: 'header',
    title: 'Quản lý mua hàng'
  },
  {
    segment: 'manage-voucher',
    title: 'Mã giảm giá',
    icon: <VoucherIcon />,
    element: <ManageVoucher/>
  },
  {
    segment: 'manage-order',
    title: 'Đơn hàng',
    icon: <OrderTextIcon />,
    element: <ManageOrder/>
  },
  {
    kind: 'header',
    title: 'Quản lý tài khoản'
  },
  {
    segment: 'manage-account',
    title: 'Tài khoản',
    icon: <AccountBoxOutlined />,
    element: <ManageAccount/>
  },
  {
    segment: 'dashboard',
    title: 'Thống kê',
    icon: <Dashboard />,
    element: <DashboardPage/>
  }];

export const customerNav = [{
  title: 'Khuyến mãi',
  icon: <VoucherIcon />,
  segment: '/vouchers',
  element: <Voucher />
},
{
  title: 'Đơn của tôi',
  icon: <OrderIcon />,
  segment: '/orders',
  element: <Orders />
},
{
  title: 'Giỏ hàng',
  icon: <CartIcon />,
  segment: '/cart',
  element: <Cart />
}]