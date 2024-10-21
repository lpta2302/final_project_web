import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAccount, deleteAccount, readAllAccount, readAllProducts, updateAccountStatus } from "./api";
import { READ_ALL_ACCOUNTS } from "./queryKeys";


//----------------------------- Account -----------------------------
export const useCreateAccount = () => {
    return useMutation({
        mutationFn: (user) => createAccount(user)
    });
}

export const useReadAllAccount = () => {
    return useQuery({
        queryKey: [READ_ALL_ACCOUNTS],
        queryFn: () => readAllAccount(),
    })
}

export const useUpdateAccountStatus = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (user) => updateAccountStatus(user),
        onSuccess: () => {
            queryClient.invalidateQueries([READ_ALL_ACCOUNTS])
        }
    })
}

export const useDeleteAccount = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (user) => deleteAccount(user),
        onSuccess: () => {
            queryClient.invalidateQueries([READ_ALL_ACCOUNTS])
        }
    })
}

//----------------------------- Manage Product -----------------------------
export const useReadAllProduct = () => {
    return useQuery({
        queryKey: [READ_ALL_ACCOUNTS],
        queryFn: () => readAllProducts(),
    })
}