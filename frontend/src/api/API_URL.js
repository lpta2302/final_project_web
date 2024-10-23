export const AUTH_URL = {
    login: '/login',
    register: '/register',
    forgotPassword: ''
}

//----------------------------- CREATE -----------------------------

export const CREATE_URL ={
    product: '/product/postProduct',
    tag: '/tag/add',
    category: '/category/add',
    brand: '/brand',
    voucher: '/voucher/add',
    specification: '/spec',
    carousel: '/carousel',
    review: '/reviews',
    address: '/client/address/add',  
    cart: '/client/cart/add',  
    seenProduct: '/client/seen/add',  
    wishList: '/client/add-to-wishList',  
}

//----------------------------- READ -----------------------------

export const READ_ALL_URL = (id)=>({
    account: '/account/Quan-ly-tai-khoan',
    product: '/product',
    tag: '/tag',
    category: '/category',
    brand: '/brand',
    voucher: '/voucher',
    specification: '/spec',
    carousel: '/carousel',
    order: '/order',
    review: '/reviews/'+id,
    address: '/client/address/'+id,  
    cart: '/client/cart/showCart/'+id,  
    wishList: '/client/wishList/my-wishList/'+id,  // URL for accessing wishlist
})

export const READ_DETAIL_URL = (id) => {
    return {
        account: 'account/Quan-ly-tai-khoan/' + id,
        brand: '/brand/' + id,
        product: `/product/productDetail/${id}`,
        order: `/order/detail/${id}`,
        review: `/reviews/${id}`,
    }
}

export const SEARCH_URL = (param) => {
    return {
        account: 'account/Quan-ly-tai-khoan/search',
        brand: '/brand/search',
        category: '/category/search',
        product: '/product/search',
        order: '/order/search',
        tag: '/tag/search',
        voucher: '/voucher/search',
        review: `/reviews/${param}/search`,
        specification: '/spec/search',
    }
}

//----------------------------- UPDATE -----------------------------

export const UPDATE_URL = (id) => {
    return {
        accountStatus: `account/Quan-ly-tai-khoan/${id}/Chinh-sua-trang-thai-tai-khoan`,
        account: 'account/details/' + id,
        brand: `/brand/${id}`,
        category: `/category/edit/${id}`,
        carousel: `/carousel/${id}`,
        product: `/product/editProduct/${id}`,
        order: `/order/edit/${id}`,
        specification: `/spec/${id}`,
        tag: `/tag/edit/${id}`,
        voucher: `/voucher/edit/${id}`,
        address: `/client/address/edit/${id}`,  
        cart: `/client/cart/my-cart/${id}`,  
    }
}

//----------------------------- DELETE -----------------------------

export const DELETE = (id) => {
    return {
        account: '/account/Quan-ly-tai-khoan/' + id,
        product: '/product/deleteProduct/' + id,
        tag: '/tag/delete/' + id,
        category: '/category/delete/' + id,
        brand: '/brand/del/' + id,
        voucher: '/voucher/delete/' + id,
        specification: '/spec/' + id,
        carousel: '/carousel/' + id,
        order: `/order/delete/${id}`,
        review: `/reviews/${id}`,
        address: `/client/address/delete/${id}`,  
    }
}
