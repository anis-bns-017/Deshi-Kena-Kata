// src/actions/productActions.js
export const fetchProductsRequest = () => ({
    type: "FETCH_PRODUCTS_REQUEST",
  });
  
  export const fetchProductsSuccess = (products) => ({
    type: "FETCH_PRODUCTS_SUCCESS",
    payload: products,
  });
  
  export const fetchProductsFailure = (error) => ({
    type: "FETCH_PRODUCTS_FAILURE",
    payload: error,
  });
  
  export const addProductRequest = () => ({
    type: "ADD_PRODUCT_REQUEST",
  });
  
  export const addProductSuccess = (product) => ({
    type: "ADD_PRODUCT_SUCCESS",
    payload: product,
  });
  
  export const addProductFailure = (error) => ({
    type: "ADD_PRODUCT_FAILURE",
    payload: error,
  });
  
  export const deleteProductRequest = () => ({
    type: "DELETE_PRODUCT_REQUEST",
  });
  
  export const deleteProductSuccess = (productId) => ({
    type: "DELETE_PRODUCT_SUCCESS",
    payload: productId,
  });
  
  export const deleteProductFailure = (error) => ({
    type: "DELETE_PRODUCT_FAILURE",
    payload: error,
  });