// queries.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAccount,
  createRecord,
  deleteRecord,
  login,
  readAll,
  search,
  updateRecord,
  getCurrentUser
} from "./api";
import {
  READ_ALL_ACCOUNTS,
  ADMIN_ACCOUNT_DETAIL,
  READ_ALL_PRODUCTS,
  SEARCH_PRODUCT,
  READ_PRODUCT_DETAIL,
  RELATIVE_PRODUCTS,
  PRODUCT_DETAIL,
  STATISTIC_BRAND,
  READ_ALL_VOUCHERS,
  READ_VOUCHER,
  SEARCH_VOUCHER,
  READ_ALL_BRANDS,
  READ_ALL_TAGS,
  READ_ALL_CATEGORIES,
  READ_ALL_CAROUSEL,
  READ_ALL_ORDERS,
  READ_ALL_REVIEWS,
  SEARCH_ACCOUNT,
  ORDER_DETAIL,
  READ_ALL_SPECIFICATION_KEY,
  USE_READ_OWN_CART,
  CURRENT_USER
} from "./queryKeys";
import { admin_url, customer_url } from "./API_URL";

//----------------------------- Auth -----------------------------
export const useLogin = () => {
  return useMutation({
    mutationFn: (loginInfo) => login(loginInfo),
  });
};

export function useGetCurrentUser() {
  return useQuery({
    queryKey: [CURRENT_USER],
    queryFn: () => getCurrentUser(),
  });
}

//----------------------------- Account -----------------------------
//client
export const useCreateAccount = () => {
  return useMutation({
    mutationFn: (user) => createAccount(user),
  });
};

export const useGetAccountDetail = (accountId) => {
  return useQuery({
    queryKey: [ADMIN_ACCOUNT_DETAIL, accountId],
    queryFn: () => readAll(customer_url.account.getAccountDetail(accountId)),
    enabled: !!accountId
  });
};

export const useUpdateAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user) =>
      updateRecord(
        customer_url.account.udpateAccountDetail(user._id),
        user
      ),
    onSuccess: (data) => {
      console.log(data);

      queryClient.invalidateQueries([ADMIN_ACCOUNT_DETAIL, data._id]);
    },
  });
};


//admin
const admin_account_url = admin_url.account;
export const useReadAllAccount = () => {
  return useQuery({
    queryKey: [READ_ALL_ACCOUNTS],
    queryFn: () => readAll(admin_account_url.getAllAccounts()),
  });
};

export const useGetAdminAccountDetail = (accountId) => {
  return useQuery({
    queryKey: [ADMIN_ACCOUNT_DETAIL, accountId],
    queryFn: () => readAll(admin_account_url.getAccountDetail(accountId)),
    enabled: !!accountId
  });
};

export const useUpdateAccountStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user) =>
      updateRecord(
        admin_account_url.updateAccountDetail(user.accountCode),
        user
      ),
    onSuccess: () => {
      queryClient.invalidateQueries([READ_ALL_ACCOUNTS]);
    },
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId) =>
      deleteRecord(admin_account_url.deleteAccount(userId), userId),
    onSuccess: () => {
      queryClient.invalidateQueries([READ_ALL_ACCOUNTS]);
    },
  });
};

export const useSearchAccount = (searchParam) => {
  return useQuery({
    queryKey: [SEARCH_ACCOUNT, searchParam],
    queryFn: () => search(admin_account_url.search(), searchParam),
    enabled: !!searchParam
  });
};
//----------------------------- Product -----------------------------
//client
const customer_product_url = customer_url.product;
export const useReadAllProduct = () => {
  return useQuery({
    queryKey: [READ_ALL_PRODUCTS],
    queryFn: () => readAll(customer_product_url.getAllProduct()),
  });
};

export const useSearchProduct = (searchParam) => {
  return useQuery({
    queryKey: [SEARCH_PRODUCT, searchParam],
    queryFn: () => search(customer_product_url.search(), searchParam),
    enabled: !!searchParam
  });
};

export const useReadProductByTag = (tagId) => {
  return useQuery({
    queryKey: [READ_ALL_PRODUCTS, tagId],
    queryFn: () => readAll(customer_product_url.getProductByTag(tagId)),
    enabled: !!tagId
  });
};

export const useReadProductDetail = (productId) => {
  return useQuery({
    queryKey: [READ_PRODUCT_DETAIL, productId],
    queryFn: () => readAll(customer_product_url.getDetailProduct(productId)),
    enabled: !!productId
  });
};

export const useReadRelativeProducts = (productId) => {
  return useQuery({
    queryKey: [RELATIVE_PRODUCTS, productId],
    queryFn: () => readAll(customer_product_url.getRelativeProducts(productId)),
    enabled: !!productId
  });
};
//admin
const admin_product_url = admin_url.product;
export const useReadAllProductAdmin = () => {
  return useQuery({
    queryKey: [READ_ALL_PRODUCTS],
    queryFn: () => readAll(admin_product_url.getAllProduct()),
  });
};

export const useReadProductDetailAdmin = (productId) => {
  return useQuery({
    queryKey: [PRODUCT_DETAIL, productId],
    queryFn: () => readAll(admin_product_url.getProductDetail(productId)),
    enabled: !!productId
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product) =>
      createRecord(admin_product_url.createProduct(), product),
    onSuccess: () => {
      queryClient.invalidateQueries([READ_ALL_PRODUCTS]);
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product) =>
      updateRecord(
        admin_product_url.updateProduct(product._id),
        product
      ),
    onSuccess: () => {
      queryClient.invalidateQueries([READ_ALL_PRODUCTS]);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId) =>
      deleteRecord(admin_product_url.deleteProduct(productId)),
    onSuccess: () => {
      queryClient.invalidateQueries([READ_ALL_PRODUCTS]);
    },
  });
};

export const useSearchProductAdmin = (searchParam) => {
  return useQuery({
    queryKey: [SEARCH_PRODUCT, searchParam],
    queryFn: () => search(admin_product_url.search(), searchParam),
    enabled: !!searchParam
  });
};

export const useReadStatisticBrand = (brandId) => {
  return useQuery({
    queryKey: [STATISTIC_BRAND, brandId],
    queryFn: () => readAll(admin_product_url.statisticBrand(brandId)),
    enabled: !!brandId
  });
};

//----------------------------- Voucher -----------------------------
// client
const customer_voucher_url = customer_url.voucher;
export const useReadAllVouchers = () => {
  return useQuery({
    queryKey: [READ_ALL_VOUCHERS],
    queryFn: () => readAll(customer_voucher_url.getAllVoucher()),
  });
};

export const useReadOwnVouchers = (currentAccountId) => {
  return useQuery({
    queryKey: [READ_ALL_VOUCHERS, currentAccountId],
    queryFn: () => readAll(customer_voucher_url.getOwnVouchers(currentAccountId)),
    enabled: !!currentAccountId
  });
};

export const useReadVoucher = (voucherId) => {
  return useQuery({
    queryKey: [READ_VOUCHER, voucherId],
    queryFn: () => readAll(customer_voucher_url.readVoucher(voucherId)),
  });
};

export const useSearchVoucher = (searchParam) => {
  return useQuery({
    queryKey: [SEARCH_VOUCHER, searchParam],
    queryFn: () => search(customer_voucher_url.search(), searchParam),
    enabled: !!searchParam
  });
};

//admin
const admin_voucher_url = admin_url.voucher;
export const useReadAllVoucherAdmin = () => {
  return useQuery({
    queryKey: [READ_ALL_VOUCHERS],
    queryFn: () => readAll(admin_voucher_url.getAllVoucher()),
  });
};
export const useCreateVoucher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (voucher) =>
      createRecord(admin_voucher_url.addVoucher(), voucher),
    onSuccess: () => {
      queryClient.invalidateQueries([READ_ALL_VOUCHERS]);
    },
  });
};
export const useUpdateVoucher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (voucher) =>
      updateRecord(
        admin_voucher_url.updateVoucher(voucher._id),
        voucher
      ),
    onSuccess: () => {
      queryClient.invalidateQueries([READ_ALL_VOUCHERS]);
    },
  });
};
export const useDeleteVoucher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (voucherId) =>
      deleteRecord(admin_voucher_url.deleteVoucher(voucherId)),
    onSuccess: () => {
      queryClient.invalidateQueries([READ_ALL_VOUCHERS]);
    },
  });
};
export const useSearchVoucherAdmin = (searchParam) => {
  return useQuery({
    queryKey: [SEARCH_VOUCHER, searchParam],
    queryFn: () => search(admin_voucher_url.search(), searchParam),
    enabled: !!searchParam
  });
};
//----------------------------- Brand -----------------------------
//client
const customer_brand_url = customer_url.brand;
export const useReadAllBrand = () => {
  return useQuery({
    queryKey: [READ_ALL_BRANDS],
    queryFn: () => readAll(customer_brand_url.getAllBrand()),
  });
};
export const useSearchBrand = (searchParam) => {
  return useQuery({
    queryKey: [SEARCH_VOUCHER, searchParam],
    queryFn: () => search(customer_brand_url.search(), searchParam),
    enabled: !!searchParam
  });
};
//admin
const admin_brand_url = admin_url.brand;
export const useReadAllBrandAdmin = () => {
  return useQuery({
    queryKey: [READ_ALL_BRANDS],
    queryFn: () => readAll(admin_brand_url.getAllBrand()),
  });
};
export const useCreateBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (brand) => createRecord(admin_brand_url.addBrand(), brand),
    onSuccess: () => {
      queryClient.invalidateQueries([READ_ALL_BRANDS]);
    },
  });
};
export const useUpdateBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (brand) =>
      updateRecord(admin_brand_url.updateBrand(brand._id), brand),
    onSuccess: () => {
      queryClient.invalidateQueries([READ_ALL_BRANDS]);
    },
  });
};
export const useDeleteBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (brandId) => deleteRecord(admin_brand_url.delete(brandId)),
    onSuccess: () => {
      queryClient.invalidateQueries([READ_ALL_BRANDS]);
    },
  });
};
export const useSearchBrandAdmin = (searchParam) => {
  return useQuery({
    queryKey: [SEARCH_VOUCHER, searchParam],
    queryFn: () => search(admin_brand_url.search(), searchParam),
    enabled: !!searchParam
  });
};
//----------------------------- Tag -----------------------------
//admin
const admin_tag_url = admin_url.tag;
export const useReadAllTagAdmin = () => {
  return useQuery({
    queryKey: [READ_ALL_TAGS],
    queryFn: () => readAll(admin_tag_url.getAllTag()),
  });
};
export const useCreateTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (tag) => createRecord(admin_tag_url.addTag(), tag),
    onSuccess: () => {
      queryClient.invalidateQueries([READ_ALL_TAGS]);
    },
  });
};
export const useUpdateTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (tag) => updateRecord(admin_tag_url.updateTag(tag._id), tag),
    onSuccess: () => {
      queryClient.invalidateQueries([READ_ALL_TAGS]);
    },
  });
};
export const useDeleteTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (tagId) => deleteRecord(admin_tag_url.deleteTag(tagId)),
    onSuccess: () => {
      queryClient.invalidateQueries([READ_ALL_TAGS]);
    },
  });
};
export const useSearchTagAdmin = (searchParam) => {
  return useQuery({
    queryKey: [SEARCH_VOUCHER, searchParam],
    queryFn: () => search(admin_tag_url.search(), searchParam),
    enabled: !!searchParam
  });
};
//----------------------------- Category -----------------------------
//client
const customer_category_url = customer_url.category;
export const useReadAllCategory = () => {
  return useQuery({
    queryKey: [READ_ALL_CATEGORIES],
    queryFn: () => readAll(customer_category_url.getAllCategory()),
  });
};
export const useSearchCategory = (searchParam) => {
  return useQuery({
    queryKey: [SEARCH_VOUCHER, searchParam],
    queryFn: () => search(customer_category_url.search(), searchParam),
    enabled: !!searchParam
  });
};
//admin
const admin_category_url = admin_url.category;
export const useReadAllCategoryAdmin = () => {
  return useQuery({
    queryKey: [READ_ALL_CATEGORIES],
    queryFn: () => readAll(admin_category_url.getAllCategory()),
  });
};
export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (category) =>
      createRecord(admin_category_url.addCategory(), category),
    onSuccess: () => {
      queryClient.invalidateQueries([READ_ALL_CATEGORIES]);
    },
  });
};
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (category) =>
      updateRecord(
        admin_category_url.updateCategory(category._id),
        category
      ),
    onSuccess: () => {
      queryClient.invalidateQueries([READ_ALL_CATEGORIES]);
    },
  });
};
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (categoryId) =>
      deleteRecord(admin_category_url.deleteCategory(categoryId)),
    onSuccess: () => {
      queryClient.invalidateQueries([READ_ALL_CATEGORIES]);
    },
  });
};
export const useSearchCategoryAdmin = (searchParam) => {
  return useQuery({
    queryKey: [SEARCH_VOUCHER, searchParam],
    queryFn: () => search(admin_category_url.search(), searchParam),
    enabled: !!searchParam
  });
};
//----------------------------- Carousel -----------------------------
//admin
const admin_carousel_url = admin_url.carousel;
export const useReadAllCarouselAdmin = () => {
  return useQuery({
    queryKey: [READ_ALL_CAROUSEL],
    queryFn: () => readAll(admin_carousel_url.getAllCarousel()),
  });
};
export const useCreateCarousel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (carousel) =>
      createRecord(admin_carousel_url.addCarousel(), carousel),
    onSuccess: () => {
      queryClient.invalidateQueries([READ_ALL_CAROUSEL]);
    },
  });
};
export const useUpdateCarousel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (carousel) =>
      updateRecord(
        admin_carousel_url.updateCarousel(carousel._id),
        carousel
      ),
    onSuccess: () => {
      queryClient.invalidateQueries([READ_ALL_CAROUSEL]);
    },
  });
};
export const useDeleteCarousel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (carouselId) =>
      deleteRecord(admin_carousel_url.deleteCarousel(carouselId)),
    onSuccess: () => {
      queryClient.invalidateQueries([READ_ALL_CAROUSEL]);
    },
  });
};
//----------------------------- Orders -----------------------------
//client
const customer_order_url = customer_url.order;
export const useReadAllOrdersOfUser = (userId) => {
  return useQuery({
    queryKey: [READ_ALL_ORDERS, userId],
    queryFn: () => readAll(customer_order_url.getOwnOrders(userId)),
    enabled: !!userId
  });
};
export const useCreateNewOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (order) => createRecord(customer_order_url.addNewOrder(), order),
    onSuccess: () => {
      queryClient.invalidateQueries([READ_ALL_ORDERS]);
    },
  });
};
export const useGetOrderDetail = (orderId) => {
  return useQuery({
    queryKey: [ORDER_DETAIL, orderId],
    queryFn: () => readAll(customer_order_url.getOrderDetail(orderId)),
    enabled: !!orderId
  });
};
//admin
const admin_order_url = admin_url.order;
export const useReadAllOrdersAdmin = () => {
  return useQuery({
    queryKey: [READ_ALL_ORDERS],
    queryFn: () => readAll(admin_order_url.getAllOrders()),
  });
};
export const useReadOrdersOfUserAdmin = (userId) => {
  return useQuery({
    queryKey: [READ_ALL_ORDERS, userId],
    queryFn: () => readAll(admin_order_url.getOrderOfUser(userId)),
    enabled: !!userId
  });
};
export const useGetOrderDetailAdmin = (orderId) => {
  return useQuery({
    queryKey: [ORDER_DETAIL, orderId],
    queryFn: () => readAll(admin_order_url.getOrderDetail(orderId)),
    enabled: !!orderId
  });
};
export const useUpdateOrderAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (order) =>
      updateRecord(admin_order_url.editOrder(order._id), order),
    onSuccess: () => {
      queryClient.invalidateQueries([READ_ALL_ORDERS]);
    },
  });
};
export const useSearchOrderAdmin = (searchParam) => {
  return useQuery({
    queryKey: [SEARCH_VOUCHER, searchParam],
    queryFn: () => search(admin_order_url.search(), searchParam),
    enabled: !!searchParam
  });
};
//----------------------------- Reviews -----------------------------
//client
const customer_review_url = customer_url.review;
export const useAddNewReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (review) =>
      createRecord(customer_review_url.addReview(review.productId), review),
    onSuccess: () => {
      queryClient.invalidateQueries([READ_ALL_REVIEWS]);
    },
  });
};


//admin
const admin_review_url = admin_url.review;
export const useReadAllReviewsAdmin = (productId) => {
  return useQuery({
    queryKey: [READ_ALL_ORDERS],
    queryFn: () => readAll(admin_review_url.getAllReview(productId)),
  });
};
export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reviewId) =>
      deleteRecord(admin_review_url.deleteReview(reviewId)),
    onSuccess: () => {
      queryClient.invalidateQueries([READ_ALL_REVIEWS]);
    },
  });
};
export const useSearchReviewAdmin = (searchParam) => {
  return useQuery({
    queryKey: [SEARCH_VOUCHER, searchParam],
    queryFn: () => search(admin_review_url.search(), searchParam),
    enabled: !!searchParam
  });
};

//----------------------------- SPECIFICATION KEYS -----------------------------
//admin
const admin_specificationKey_url = admin_url.specificationKey;
export const useReadAllSpecificationKeyAdmin = () => {
  return useQuery({
    queryKey: [READ_ALL_SPECIFICATION_KEY],
    queryFn: () => readAll(admin_specificationKey_url.getAllSpecificationKey()),
  });
};
export const useCreateSpecificationKey = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (SpecificationKey) =>
      createRecord(admin_specificationKey_url.addSpecificationKey(), SpecificationKey),
    onSuccess: () => {
      queryClient.invalidateQueries([READ_ALL_SPECIFICATION_KEY]);
    },
  });
};

export const useUpdateSpecificationKey = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (SpecificationKey) => 
    updateRecord(
      admin_specificationKey_url.updateSpecificationKey(SpecificationKey._id),
      SpecificationKey
    ),
    onSuccess: () => {
      queryClient.invalidateQueries([READ_ALL_SPECIFICATION_KEY]);
    },
  });
};

export const useDeleteSpecificationKey = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (SpecificationKeyId) =>
      deleteRecord(admin_specificationKey_url.deleteSpecificationKey(SpecificationKeyId)),
    onSuccess: () => {
      queryClient.invalidateQueries([READ_ALL_SPECIFICATION_KEY]);
    },
  });
};

export const useSearchSpecificationKey = (searchParam) => {
  return useQuery({
    queryKey: [SEARCH_VOUCHER, searchParam],
    queryFn: () => 
      // search(admin_specificationKey_url.search(), searchParam),
      console.log("searching"),
    enabled: !!searchParam
  });
};

//----------------------------- CART -----------------------------
//client
const customerCart = customer_url.cart;
export const useReadOwnCart = (currentAccountId) => {
  return useQuery({
    queryKey: [USE_READ_OWN_CART],
    queryFn: () => readAll(customerCart.getOwnCart(currentAccountId)),
    enabled: !!currentAccountId
  });
};
export const useAddCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item) =>
      deleteRecord(customerCart.addItem(item)),
    onSuccess: () => {
      queryClient.invalidateQueries([USE_READ_OWN_CART]);
    },
  });
};
export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      deleteRecord(customerCart.deleteItem()),
    onSuccess: () => {
      queryClient.invalidateQueries([USE_READ_OWN_CART]);
    },
  });
};