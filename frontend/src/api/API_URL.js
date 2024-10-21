export const READ_URL = {
    account: '/account/Quan-ly-tai-khoan',
    product: '/product',
    tag: '/tag',
    category: '/category',
    brand: '/brand',
    voucher: '/voucher',
    specification: '/spec'
}

export const CREATE_URL = {
    account: '/auth/register',
    product: '/product/postProduct',
    tag: '/tag/add',
    category: '/category/add',
    brand: '/brand',
    voucher: '/voucher/add',
    specification: '/spec'
}

export const DELETE = (id) => {
    return {
        account: '/account/Quan-ly-tai-khoan/' + id,
        product: '/product/deleteProduct/' + id,
        tag: '/tag/delete/' + id,
        category: '/category/delete/' + id,
        brand: '/brand/del/' + id,
        voucher: '/voucher/delete/' + id,
        specification: '/spec/' + id,
    }
}