import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAccount, createRecord, deleteRecord, login, readAll, updateAccountStatus, updateRecord } from "./api";
import {
    READ_ALL_ACCOUNTS,
    READ_ALL_PRODUCTS,
    READ_ALL_TAGS,
    READ_ALL_CATEGORIES,
    READ_ALL_BRANDS,
    READ_ALL_VOUCHERS,
    READ_ALL_SPECIFICATION,
    READ_ALL_WISHLISTS,
    READ_ALL_CARTS,
    READ_ALL_ADDRESSES,
    READ_ALL_REVIEWS,
    READ_ALL_ORDERS,
    READ_ALL_CAROUSEL,
    CURRENT_TOKEN
} from "./queryKeys";

//----------------------------- Auth -----------------------------
export const useLogin = () => {
    return useMutation({
        mutationFn: (loginInfo) => login(loginInfo),
    });
};


//----------------------------- Account -----------------------------
export const useCreateAccount = () => {
    return useMutation({
        mutationFn: (user) => createAccount(user),
    });
};

export const useReadAllAccount = () => {
    return useQuery({
        queryKey: [READ_ALL_ACCOUNTS],
        queryFn: () => readAll('account'),
    });
};

export const useUpdateAccountStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (user) => updateAccountStatus(user),
        onSuccess: () => {
            queryClient.invalidateQueries([READ_ALL_ACCOUNTS]);
        },
    });
};

export const useUpdateAccount = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (account) => updateRecord('account', account),
        onSuccess: () => {
            queryClient.invalidateQueries([READ_ALL_ACCOUNTS]);
        },
    });
};

export const useDeleteAccount = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userId) => deleteRecord(userId, 'account'),
        onSuccess: () => {
            queryClient.invalidateQueries([READ_ALL_ACCOUNTS]);
        },
    });
};

//----------------------------- Product -----------------------------
export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (product) => createRecord('product', product),
        onSuccess: () => {
            queryClient.invalidateQueries([READ_ALL_PRODUCTS]);
        },
    });
};

export const useReadAllProduct = () => {
    return useQuery({
        queryKey: [READ_ALL_PRODUCTS],
        queryFn: () => readAll('product'),
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (product) => updateRecord('product', product),
        onSuccess: () => {
            queryClient.invalidateQueries([READ_ALL_PRODUCTS]);
        },
    });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (productId) => deleteRecord(productId, 'product'),
        onSuccess: () => {
            queryClient.invalidateQueries([READ_ALL_PRODUCTS]);
        },
    });
};

//----------------------------- Tag -----------------------------
export const useCreateTag = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (tag) => createRecord('tag', tag),
        onSuccess: () => {
            queryClient.invalidateQueries([READ_ALL_TAGS]);
        },
    });
};

export const useReadAllTag = () => {
    return useQuery({
        queryKey: [READ_ALL_TAGS],
        queryFn: () => readAll('tag'),
    });
};

export const useUpdateTag = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (tag) => updateRecord('tag', tag),
        onSuccess: () => {
            queryClient.invalidateQueries([READ_ALL_TAGS]);
        },
    });
};

export const useDeleteTag = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (tagId) => deleteRecord(tagId, 'tag'),
        onSuccess: () => {
            queryClient.invalidateQueries([READ_ALL_TAGS]);
        },
    });
};

//----------------------------- Category -----------------------------
export const useCreateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (category) => createRecord('category', category),
        onSuccess: () => {
            queryClient.invalidateQueries([READ_ALL_CATEGORIES]);
        },
    });
};

export const useReadAllCategory = () => {
    return useQuery({
        queryKey: [READ_ALL_CATEGORIES],
        queryFn: () => readAll('category'),
    });
};

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (category) => updateRecord('category', category),
        onSuccess: () => {
            queryClient.invalidateQueries([READ_ALL_CATEGORIES]);
        },
    });
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (categoryId) => deleteRecord(categoryId, 'category'),
        onSuccess: () => {
            queryClient.invalidateQueries([READ_ALL_CATEGORIES]);
        },
    });
};

//----------------------------- Brand -----------------------------
export const useCreateBrand = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (brand) => createRecord('brand', brand),
        onSuccess: () => {
            queryClient.invalidateQueries([READ_ALL_BRANDS]);
        },
    });
};

export const useReadAllBrand = () => {
    return useQuery({
        queryKey: [READ_ALL_BRANDS],
        queryFn: () => readAll('brand'),
    });
};

export const useUpdateBrand = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (brand) => updateRecord('brand', brand),
        onSuccess: () => {
            queryClient.invalidateQueries([READ_ALL_BRANDS]);
        },
    });
};

export const useDeleteBrand = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (brandId) => deleteRecord(brandId, 'brand'),
        onSuccess: () => {
            queryClient.invalidateQueries([READ_ALL_BRANDS]);
        },
    });
};

//----------------------------- Voucher -----------------------------
export const useCreateVoucher = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (voucher) => createRecord('voucher', voucher),
        onSuccess: () => {
            queryClient.invalidateQueries([READ_ALL_VOUCHERS]);
        },
    });
};

export const useReadAllVoucher = () => {
    return useQuery({
        queryKey: [READ_ALL_VOUCHERS],
        queryFn: () => readAll('voucher'),
    });
};

export const useUpdateVoucher = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (voucher) => updateRecord('voucher', voucher),
        onSuccess: () => {
            queryClient.invalidateQueries([READ_ALL_VOUCHERS]);
        },
    });
};

export const useDeleteVoucher = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (voucherId) => deleteRecord(voucherId, 'voucher'),
        onSuccess: () => {
            queryClient.invalidateQueries([READ_ALL_VOUCHERS]);
        },
    });
};

//----------------------------- Specification -----------------------------
export const useCreateSpecification = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (spec) => createRecord('specification', spec),
        onSuccess: () => {
            queryClient.invalidateQueries([READ_ALL_SPECIFICATION]);
        },
    });
};

export const useReadAllSpecification = () => {
    return useQuery({
        queryKey: [READ_ALL_SPECIFICATION],
        queryFn: () => readAll('spec'),
    });
};

export const useUpdateSpecification = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (spec) => updateRecord('specification', spec),
        onSuccess: () => {
            queryClient.invalidateQueries([READ_ALL_SPECIFICATION]);
        },
    });
};

export const useDeleteSpecification = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (specId) => deleteRecord(specId, 'spec'),
        onSuccess: () => {
            queryClient.invalidateQueries([READ_ALL_SPECIFICATION]);
        },
    });
};

//----------------------------- Carousel -----------------------------
export const useCreateCarousel = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (carousel) => createRecord('carousel', carousel),
        onSuccess: () => {
            queryClient.invalidateQueries([READ_ALL_CAROUSEL]);
        },
    });
};

export const useReadAllCarousel = () => {
    return useQuery({
        queryKey: [READ_ALL_CAROUSEL],
        queryFn: () => readAll('carousel'),
    });
};

export const useUpdateCarousel = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (carousel) => updateRecord('carousel', carousel),
        onSuccess: () => {
            queryClient.invalidateQueries([READ_ALL_CAROUSEL]);
        },
    });
};

//----------------------------- Order -----------------------------
export const useReadAllOrder = () => {
    return useQuery({
        queryKey: [READ_ALL_ORDERS],
        queryFn: () => readAll('order'),
    });
};

//----------------------------- Review -----------------------------
export const useCreateReview = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (review) => createRecord('review', review),
        onSuccess: () => {
            queryClient.invalidateQueries([READ_ALL_REVIEWS]);
        },
    });
};

export const useReadAllReview = () => {
    return useQuery({
        queryKey: [READ_ALL_REVIEWS],
        queryFn: (id) => readAll('review',id),
    });
};

export const useUpdateReview = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (review) => updateRecord('review', review),
        onSuccess: () => {
            queryClient.invalidateQueries([READ_ALL_REVIEWS]);
        },
    });
};

//----------------------------- Address -----------------------------
export const useCreateAddress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (address) => createRecord('address', address),
        onSuccess: () => {
            queryClient.invalidateQueries([READ_ALL_ADDRESSES]);
        },
    });
};

export const useReadAllAddress = () => {
    return useQuery({
        queryKey: [READ_ALL_ADDRESSES],
        queryFn: (accountId) => readAll('address', accountId),
    });
};

export const useUpdateAddress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (address) => updateRecord('address', address),
        onSuccess: () => {
            queryClient.invalidateQueries([READ_ALL_ADDRESSES]);
        },
    });
};

//----------------------------- Cart -----------------------------
export const useCreateCartItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (cart) => createRecord('cart', cart),
        onSuccess: () => {
            queryClient.invalidateQueries([READ_ALL_CARTS]);
        },
    });
};

export const useReadAllCart = () => {
    return useQuery({
        queryKey: [READ_ALL_CARTS],
        queryFn: (userId) => readAll('cart',userId),
    });
};

export const useUpdateCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (cart) => updateRecord('cart', cart),
        onSuccess: () => {
            queryClient.invalidateQueries([READ_ALL_CARTS]);
        },
    });
};
//----------------------------- Wishlist -----------------------------
export const useCreateWishlistItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (wishlist) => createRecord('wishList', wishlist),
        onSuccess: () => {
            queryClient.invalidateQueries([READ_ALL_WISHLISTS]);
        },
    });
};

export const useReadAllWishlist = () => {
    return useQuery({
        queryKey: [READ_ALL_WISHLISTS],
        queryFn: (userId) => readAll('wishList',userId),
    });
};

export const useUpdateWishlist = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (wishlist) => updateRecord('wishList', wishlist),
        onSuccess: () => {
            queryClient.invalidateQueries([READ_ALL_WISHLISTS]);
        },
    });
};

