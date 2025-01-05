import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../../context";

export default function ProductTitle({ singleProductTitle }) {
  const navigate = useNavigate();
  const { handleGoToCart, cartItem } = useContext(ShoppingCartContext);

  function handleNavigateToDetails(getCurrentProductId) {
    navigate(`/product-list/${getCurrentProductId}`);
  }

  return (
    <div className="relative group border border-cyan-700 p-6 cursor-pointer">
      <div className="overflow-hidden aspect-w-1 aspect-h-1">
        <img
          src={singleProductTitle?.thumbnail}
          alt={singleProductTitle.title}
          className="object-cover w-full h-full transition-all duration-300 group-hover:scale-110"
        />
      </div>
      <div className="flex items-start justify-between mt-4 space-x-4">
        <div className="font-bold text-gray-900 sm:text text:xs md:text-base">
          <p className="w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
            {singleProductTitle?.title}
          </p>
        </div>
        <div className="text-right ">
          <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-[14px]">
            {singleProductTitle?.price}
          </p>
        </div>
      </div>
      <button
        onClick={() => handleNavigateToDetails(singleProductTitle?.id)}
        className="px-5 mt-5 w-full py-2 rounded-none bg-gray-600 text-white fomt-bold text-lg hover:bg-gray-900 transition-all duration-500"
      >
        View Details
      </button>
      <button
        className="disabled:opacity-60 px-5 mt-5 w-full py-2 rounded-none bg-gray-600 text-white fomt-bold text-lg hover:bg-gray-900 transition-all duration-500"
        disabled={
          cartItem.findIndex((item) => item?.id === singleProductTitle?.id) > -1
        }
        onClick={() => handleGoToCart(singleProductTitle)}
      >
        Add to Cart
      </button>
    </div>
  );
}
