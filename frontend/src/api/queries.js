import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAccount, deleteRecord, readAll, updateAccountStatus } from "./api";
import {
    READ_ALL_ACCOUNTS,
    READ_ALL_PRODUCTS,
    READ_ALL_TAGS,
    READ_ALL_CATEGORIES,
    READ_ALL_BRANDS,
    READ_ALL_VOUCHERS,
    READ_ALL_SPECIFICATION
} from "./queryKeys";

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
export const useReadAllProduct = () => {
    return useQuery({
        queryKey: [READ_ALL_PRODUCTS],
        queryFn: () => readAll('product'),
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
export const useReadAllTag = () => {
    return useQuery({
        queryKey: [READ_ALL_TAGS],
        queryFn: () => readAll('tag'),
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
export const useReadAllCategory = () => {
    return useQuery({
        queryKey: [READ_ALL_CATEGORIES],
        queryFn: () => readAll('category'),
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
export const useReadAllBrand = () => {
    return useQuery({
        queryKey: [READ_ALL_BRANDS],
        queryFn: () => readAll('brand'),
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
export const useReadAllVoucher = () => {
    return useQuery({
        queryKey: [READ_ALL_VOUCHERS],
        queryFn: () => readAll('voucher'),
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
export const useReadAllSpecification = () => {
    return useQuery({
        queryKey: [READ_ALL_SPECIFICATION],
        queryFn: () => readAll('spec'),
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
