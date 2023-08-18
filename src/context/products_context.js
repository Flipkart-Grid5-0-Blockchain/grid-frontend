import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import reducer from '../reducers/products_reducer';
import { products_url as url } from '../utils/constants';
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
  GET_SINGLE_PRODUCT_REVIEWS_BEGIN,
  GET_SINGLE_PRODUCT_REVIEWS_ERROR,
  GET_SINGLE_PRODUCT_REVIEWS_SUCCESS,
} from '../actions';
import { useUserContext } from './user_context';

const featured = [
  {
    id: 1,
    name: 'Samsung Galaxy S21 Ultra 5G',
    image:
      'https://onsitego.com/blog/wp-content/uploads/2021/10/Samsung-Galaxy-S21-Ultra-With-Box.jpg',
    price: 6499900,
    images: [
      {
        url: 'https://onsitego.com/blog/wp-content/uploads/2021/10/Samsung-Galaxy-S21-Ultra-With-Box.jpg',
        filename: 'product',
      },
    ],
    description:
      "The Galaxy S21 Ultra 5G is the ultimate self-expression smartphone that's designed to give you everything you could ever want in a smartphone. It's a massive leap forward in 5G, camera and display. And with the upgrade to an S Pen, pro-grade camera and the most advanced processor ever in a Galaxy, you won't be able to do anything but keep winning.",
    rating: 4.5,
    numberOfReviews: 0,
    featured: true,
    stock: 10,
    company: 'Samsung',
    reviews: [],
    company_id: 1,
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'tech',
    colors: ['#ff0000', '#00ff00', '#0000ff'],
    stars: 4.5,
  },
  {
    id: 2,
    name: 'Samsung Galaxy S21 Ultra 5G 2',
    image:
      'https://onsitego.com/blog/wp-content/uploads/2021/10/Samsung-Galaxy-S21-Ultra-With-Box.jpg',
    price: 6499900,
    images: [
      {
        url: 'https://onsitego.com/blog/wp-content/uploads/2021/10/Samsung-Galaxy-S21-Ultra-With-Box.jpg',
        filename: 'product',
      },
    ],
    description:
      "The Galaxy S21 Ultra 5G is the ultimate self-expression smartphone that's designed to give you everything you could ever want in a smartphone. It's a massive leap forward in 5G, camera and display. And with the upgrade to an S Pen, pro-grade camera and the most advanced processor ever in a Galaxy, you won't be able to do anything but keep winning.",
    rating: 4.5,
    numberOfReviews: 0,
    featured: true,
    stock: 10,
    company: 'Samsun',
    reviews: [],
    company_id: 2,
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Phones',
    colors: ['#ff0000', '#00ff00', '#0000ff'],
    stars: 4.5,
  },
  {
    id: 3,
    name: 'Samsung Galaxy S21 Ultra 5G  3',
    image:
      'https://onsitego.com/blog/wp-content/uploads/2021/10/Samsung-Galaxy-S21-Ultra-With-Box.jpg',
    price: 6499900,
    images: [
      {
        url: 'https://onsitego.com/blog/wp-content/uploads/2021/10/Samsung-Galaxy-S21-Ultra-With-Box.jpg',
        filename: 'product',
      },
    ],
    description:
      "The Galaxy S21 Ultra 5G is the ultimate self-expression smartphone that's designed to give you everything you could ever want in a smartphone. It's a massive leap forward in 5G, camera and display. And with the upgrade to an S Pen, pro-grade camera and the most advanced processor ever in a Galaxy, you won't be able to do anything but keep winning.",
    rating: 4.5,
    numberOfReviews: 0,
    featured: true,
    stock: 10,
    company: 'Samsung',
    reviews: [],
    company_id: 3,
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'tech',
    colors: ['#ff0000', '#00ff00', '#0000ff'],
    stars: 4.5,
  },
  {
    id: 4,
    name: 'Samsung Galaxy S21 Ultra 5G 4',
    image:
      'https://onsitego.com/blog/wp-content/uploads/2021/10/Samsung-Galaxy-S21-Ultra-With-Box.jpg',
    price: 6499900,
    images: [
      {
        url: 'https://onsitego.com/blog/wp-content/uploads/2021/10/Samsung-Galaxy-S21-Ultra-With-Box.jpg',
        filename: 'product',
      },
    ],
    description:
      "The Galaxy S21 Ultra 5G is the ultimate self-expression smartphone that's designed to give you everything you could ever want in a smartphone. It's a massive leap forward in 5G, camera and display. And with the upgrade to an S Pen, pro-grade camera and the most advanced processor ever in a Galaxy, you won't be able to do anything but keep winning.",
    rating: 4.5,
    numberOfReviews: 0,
    featured: true,
    stock: 10,
    company: 'Samsung',
    reviews: [],
    company_id: 4,
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'tech',
    colors: ['#ff0000', '#00ff00', '#0000ff'],
    stars: 4.5,
  },
];
const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
  single_product_reviews_loading: false,
  single_product_reviews_error: false,
};

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const { currentUser } = useUserContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  const fetchProducts = async (url) => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      // const response = await axios.get(url);
      const products = featured;
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  };

  const fetchSingleProduct = async (id) => {
    console.log(id);
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    try {
      // const response = await axios.get(url);
      // const data = featured.filter((product) =>
      // product.id === id
      // );

      const data = featured.filter(
        (product) => parseInt(product.id) === parseInt(id)
      );
      const singleProduct = data[0];
      dispatch({
        type: GET_SINGLE_PRODUCT_SUCCESS,
        payload: singleProduct,
      });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  };

  const getProductReviews = async (id) => {
    dispatch({ type: GET_SINGLE_PRODUCT_REVIEWS_BEGIN });
    try {
      const response = await axios.get(`${url}/reviews/${id}`);
      const reviews = response.data;
      dispatch({
        type: GET_SINGLE_PRODUCT_REVIEWS_SUCCESS,
        payload: reviews.data,
      });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_REVIEWS_ERROR });
    }
  };

  const reviewProduct = async (id, stars, comment) => {
    if (currentUser) {
      const body = {
        name: currentUser.displayName || 'User',
        email: currentUser.email,
        rating: stars,
        comment: comment,
        productId: id,
      };
      try {
        const response = await axios.post(`${url}/reviews/`, body);
        getProductReviews(id);
        const { success, message } = response.data;
        return { success, message };
      } catch (error) {
        const { success, message } = error.response.data;
        return { success, message };
      }
    }
  };

  useEffect(() => {
    fetchProducts(url);
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
        fetchSingleProduct,
        reviewProduct,
        getProductReviews,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
