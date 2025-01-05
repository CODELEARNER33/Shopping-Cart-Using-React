/* eslint-disable react/prop-types */

//Create the context
//Provide the state to context
//Wrap the context in root component
//Consume the context using useContext

import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ShoppingCartContext = createContext(null);

export default function ShoppingCartProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [listOfProducts, setListOfProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [cartItem, setCartItem] = useState([]);
  const navigate = useNavigate();

  async function fetchListOfProducts() {
    const apiResponse = await fetch("https://dummyjson.com/products");
    const result = await apiResponse.json();

    if (result && result?.products) {
      setListOfProducts(result?.products);
      setLoading(false);
    }
  }

  function handleGoToCart(getproductDetails) {
    let copyExistingCartItem = [...cartItem];
    const findIndexOfCurrentItem = copyExistingCartItem.findIndex(
      (cartItem) => cartItem.id === getproductDetails.id
    );

    if (findIndexOfCurrentItem === -1) {
      copyExistingCartItem.push({
        ...getproductDetails,
        quantity: 1,
        totalPrice: getproductDetails?.price,
      });
    } else {
      console.log("its coming here!!");
      copyExistingCartItem[findIndexOfCurrentItem] = {
        ...copyExistingCartItem[findIndexOfCurrentItem],
        quantity: copyExistingCartItem[findIndexOfCurrentItem].quantity + 1,
        totalPrice:
          (copyExistingCartItem[findIndexOfCurrentItem].quantity + 1) *
          copyExistingCartItem[findIndexOfCurrentItem].price,
      };
    }

    setCartItem(copyExistingCartItem);
    localStorage.setItem("cartItem", JSON.stringify(copyExistingCartItem));

    navigate("/cart");
  }

  function handleRemoveFromCart(getproductDetails, isFullyRemoved) {
    let copyExistingCartItem = [...cartItem];

    const findIndexOfCurrentCartItem = copyExistingCartItem.findIndex(
      (Item) => Item.id === getproductDetails.id
    );

    if (isFullyRemoved) {
      copyExistingCartItem.splice(findIndexOfCurrentCartItem, 1);
    } else {
      copyExistingCartItem[findIndexOfCurrentCartItem] = {
        ...copyExistingCartItem[findIndexOfCurrentCartItem],
        quantity: copyExistingCartItem[findIndexOfCurrentCartItem].quantity - 1,
        totalPrice:
          (copyExistingCartItem[findIndexOfCurrentCartItem].quantity - 1) *
          copyExistingCartItem[findIndexOfCurrentCartItem].price,
      };
    }

    localStorage.setItem("cartItem", JSON.stringify(copyExistingCartItem));
    setCartItem(copyExistingCartItem);
  }

  useEffect(() => {
    fetchListOfProducts();
    setCartItem(JSON.parse(localStorage.getItem("cartItem") || []));
  }, []);

  return (
    <ShoppingCartContext.Provider
      value={{
        listOfProducts,
        loading,
        productDetails,
        setLoading,
        setProductDetails,
        handleGoToCart,
        handleRemoveFromCart,
        cartItem,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
