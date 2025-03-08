// src/reducers/productReducer.js
const initialState = {
  products: [],
  loading: false,
  error: null,
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_PRODUCTS_SUCCESS":
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case "FETCH_PRODUCTS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "ADD_PRODUCT_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "ADD_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload],
      };
    case "ADD_PRODUCT_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "DELETE_PRODUCT_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "DELETE_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
      };
    case "DELETE_PRODUCT_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default ProductReducer;
