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
      'https://etimg.etb2bimg.com/photo/80272433.cms',
    price: 6499900,
    images: [
      {
        url: 'https://etimg.etb2bimg.com/photo/80272433.cms',
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
    name: 'Football shoes',
    image:
      'https://sg-live-02.slatic.net/p/0652fd67d844a16c0fa9155746693d68.jpg',
    price: 3499900,
    images: [
      {
        url: 'https://sg-live-02.slatic.net/p/0652fd67d844a16c0fa9155746693d68.jpg',
        filename: 'product',
      },
    ],
    description:
      "Professional high top Football boot, men's training shoes, broken nails 2023-1 | Lazada.vn",
    rating: 4.5,
    numberOfReviews: 0,
    featured: true,
    stock: 10,
    company: 'nike',
    reviews: [],
    company_id: 2,
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'shoes',
    colors: ['#ff0000', '#00ff00', '#0000ff'],
    stars: 4.5,
  },
  {
    id: 3,
    name: 'H&M hoody',
    image:
      'https://5.imimg.com/data5/SELLER/Default/2021/12/SF/NH/PV/144640267/hm1-500x500.jpg',
    price: 2009900,
    images: [
      {
        url: 'https://5.imimg.com/data5/SELLER/Default/2021/12/SF/NH/PV/144640267/hm1-500x500.jpg',
        filename: 'product',
      },
    ],
    description: 'Full Sleeves H&M Unisex Hoodies For Men/Women',
    rating: 4.5,
    numberOfReviews: 0,
    featured: true,
    stock: 10,
    company: 'H&M',
    reviews: [],
    company_id: 3,
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'clothing',
    colors: ['#ff0000', '#00ff00', '#0000ff'],
    stars: 4.5,
  },
  {
    id: 4,
    name: 'Puma Sneakers',
    image:
      'https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/20982442/2022/11/29/d4c004ad-d941-447e-9f3a-e496ea748d381669728094821CasualShoes1.jpg',
    price: 4009900,
    images: [
      {
        url: 'https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/20982442/2022/11/29/d4c004ad-d941-447e-9f3a-e496ea748d381669728094821CasualShoes1.jpg',
        filename: 'product',
      },
    ],
    description: 'Puma Casual Shoes - Buy Puma Casual Shoes online in India',
    rating: 4.5,
    numberOfReviews: 0,
    featured: true,
    stock: 10,
    company: 'Puma',
    reviews: [],
    company_id: 4,
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'shoes',
    colors: ['#ff0000', '#00ff00', '#0000ff'],
    stars: 4.5,
  },
  {
    id: 6,
    name: 'H&M flannel shirt',
    image:
      'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F9f%2Fdf%2F9fdfcc23665fe9e2b389b686a85cc9c97084d238.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_shirts_longsleeved%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/fullscreen]',
    price: 2209900,
    images: [
      {
        url: 'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F9f%2Fdf%2F9fdfcc23665fe9e2b389b686a85cc9c97084d238.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_shirts_longsleeved%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/fullscreen]',
        filename: 'product',
      },
    ],
    description:
      'Shirt in soft, checked cotton flannel with a turn-down collar, classic front, two open chest pockets and a yoke at the back. ',
    rating: 4.5,
    numberOfReviews: 0,
    featured: true,
    stock: 10,
    company: 'H&M',
    reviews: [],
    company_id: 5,
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'clothing',
    colors: ['#ff0000', '#00ff00', '#0000ff'],
    stars: 4.5,
  },
  {
    id: 5,
    name: 'Puma White Tshirt',
    image:
      'https://www.sportsdirect.com/images/imgzoom/62/62030002_xxl.jpg',
    price: 1119900,
    images: [
      {
        url: 'https://www.sportsdirect.com/images/imgzoom/62/62030002_xxl.jpg',
        filename: 'product',
      },
    ],
    description:
      "Puma | Training T-Shirt Mens | Short Sleeve Performance T-Shirts | SportsDirect.com",
    rating: 5,
    numberOfReviews: 0,
    featured: true,
    stock: 10,
    company: 'Puma',
    reviews: [],
    company_id: 5,
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'clothing',
    colors: ['#ff0000', '#00ff00', '#0000ff'],
    stars: 4.5,
  },

  {
    id: 7,
    name: 'Nike Sneakers',
    image:
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png',
    price: 3009900,
    images: [
      {
        url: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png',
        filename: 'product',
      },
    ],
    description:
      "Nike Dunk High By You Custom Men's Shoes",
    rating: 4.3,
    numberOfReviews: 0,
    featured: true,
    stock: 10,
    company: 'nike',
    reviews: [],
    company_id: 7,
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'shoes',
    colors: ['#ff0000', '#00ff00', '#0000ff'],
    stars: 4.5,
  },
  {
    id: 8,
    name: 'Mac book pro',
    image:
      'https://telecomtalk.info/wp-content/uploads/2022/10/apple-might-launch-new-macbook-pro-mac.png',
    price: 9999900,
    images: [
      {
        url: 'https://telecomtalk.info/wp-content/uploads/2022/10/apple-might-launch-new-macbook-pro-mac.png',
        filename: 'product',
      },
    ],
    description:
      "Apple MacBook Pro M1 Pro (2021) 16 Gris sidéral 16Go/512Go (MK183FN/A)",
    rating: 5,
    numberOfReviews: 0,
    featured: true,
    stock: 10,
    company: 'apple',
    reviews: [],
    company_id: 8,
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
