import { AccountCircleOutlined, ShoppingCart } from "@mui/icons-material";
import { CartIcon, OrderIcon, VoucherIcon } from "../icons/CustomIcons";
import { Dashboard, ManageAccount, ManageInventory, ManageOrder, ManageProduct, ManageVoucher } from "../_root/pages";

const adminNavbar = [
    {
        element: ManageAccount,
        segment: 'manage-account',
        title: 'Tài khoản',
        icon: ShoppingCart 
    },
    {
        element: ManageInventory,
        segment: 'manage-inventory',
        title: 'Kho hàng',
        icon: ShoppingCart 
    },
    {
        element: ManageProduct,
        segment: 'manage-product',
        title: 'Sản phẩm',
        icon: ShoppingCart 
    },
    {
        element: ManageOrder,
        segment: 'manage-order',
        title: 'Đơn hàng',
        icon: ShoppingCart 
    },
    {
        element: ManageVoucher,
        segment: 'manage-voucher',
        title: 'Mã giảm giá',
        icon: ShoppingCart 
    },
    {
        element: Dashboard,
        segment: 'dashboard',
        title: 'Thống kê',
        icon: ShoppingCart 
    }
]

const appBar = {
    admin: [{
        segment: 'manage-account',
        title: 'Tài khoản',
        icon: ShoppingCart
    },
    {
        segment: 'manage-inventory',
        title: 'Kho hàng',
        icon: ShoppingCart
    },
    {
        segment: 'manage-product',
        title: 'Sản phẩm',
        icon: ShoppingCart
    },
    {
        segment: 'manage-order',
        title: 'Đơn hàng',
        icon: ShoppingCart
    },
    {
        segment: 'manage-voucher',
        title: 'Mã giảm giá',
        icon: ShoppingCart
    },
    {
        segment: 'dashboard',
        title: 'Thống kê',
        icon: ShoppingCart
    }],
    customer: [{
        title: 'Khuyến mãi',
        icon: VoucherIcon,
        path: '/vouchers'
    },
    {
        title: 'Đơn của tôi',
        icon: OrderIcon,
        path: '/orders'
    },
    {
        title: 'Giỏ hàng',
        icon: CartIcon,
        path: '/cart'
    },
    {
        title: 'Đăng nhập',
        icon: AccountCircleOutlined,
        path: '/login'
    }]
}

export {
    appBar,
    adminNavbar
};