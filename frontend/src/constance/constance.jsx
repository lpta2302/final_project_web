import { AccountBoxOutlined, CategoryOutlined, Dashboard, WarehouseOutlined } from "@mui/icons-material";
import { BoxIcon, CartIcon, OrderIcon, OrderTextIcon, VoucherIcon } from "../icons/CustomIcons";
import { Cart, ManageAccount, ManageInventory, ManageOrder, ManageProduct, ManageVoucher, Voucher, Dashboard as DashboardPage, ManageSpecification } from "../_root/pages";
import Orders from "../_root/pages/customer/Orders";
import CartPage from "../pages/ShoppingCart";

export const adminNav = [
  {
    kind: "header",
    title: "Quản lý hàng hóa",
  },
  {
    title: 'Sản phẩm',
    segment: 'manage-product',
    icon: <BoxIcon/>,
    element: <ManageProduct/>
  },
  {
    segment: 'manage-specification',
    title: 'Phân loại',
    icon: <CategoryOutlined />,
    element: <ManageSpecification/>
  },
  {
    segment: 'manage-inventory',
    title: 'Kho hàng',
    icon: <WarehouseOutlined />,
    element: <ManageInventory />,
  },
  {
    kind: "header",
    title: "Quản lý mua hàng",
  },
  {
    segment: "manage-voucher",
    title: "Mã giảm giá",
    icon: <VoucherIcon />,
    element: <ManageVoucher />,
  },
  {
    segment: "manage-order",
    title: "Đơn hàng",
    icon: <OrderTextIcon />,
    element: <ManageOrder />,
  },
  {
    kind: "header",
    title: "Quản lý tài khoản",
  },
  {
    segment: "manage-account",
    title: "Tài khoản",
    icon: <AccountBoxOutlined />,
    element: <ManageAccount/>
  },
  {
    kind: 'header',
    title: 'Báo cáo'
  },
  {
    segment: "dashboard",
    title: "Thống kê",
    icon: <Dashboard />,
    element: <DashboardPage />,
  },
];

export const customerNav = [
  {
    title: "Khuyến mãi",
    icon: <VoucherIcon />,
    segment: "/vouchers",
    element: <Voucher />,
  },
  {
    title: "Đơn của tôi",
    icon: <OrderIcon />,
    segment: "/orders",
    element: <Orders />,
  },
  {
    title: "Giỏ hàng",
    icon: <CartIcon />,
    segment: "/shopingcart",
    element: <CartPage />,
  },
];
