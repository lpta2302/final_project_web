import { ShoppingCart } from "@mui/icons-material";
import { CartIcon, OrderIcon, VoucherIcon } from "../icons/CustomIcons";

const appBar = {
    admin: [{
        title: 'Tài khoản',
        icon: ShoppingCart
    },
    {
        title: 'Kho hàng',
        icon: ShoppingCart
    },
    {
        title: 'Sản phẩm',
        icon: ShoppingCart
    },
    {
        title: 'Dòng sản phẩm',
        icon: ShoppingCart
    },
    {
        title: 'Đơn hàng',
        icon: ShoppingCart
    },
    {
        title: 'Mã giảm giá',
        icon: ShoppingCart
    },
    {
        title: 'Thống kê',
        icon: ShoppingCart
    }],
    customer: [{
        title: 'Khuyến mãi',
        icon: VoucherIcon

    },
    {
        title: 'Đơn của tôi',
        icon: OrderIcon
    },
    {
        title: 'Giỏ hàng',
        icon: CartIcon
    }]
}

export {
    appBar
};