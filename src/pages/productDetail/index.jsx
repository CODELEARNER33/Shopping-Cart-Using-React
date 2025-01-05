import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCartContext } from "../../context";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const {
    productDetails,
    setProductDetails,
    loading,
    setLoading,
    handleGoToCart,
    cartItem,
  } = useContext(ShoppingCartContext);

  async function fetchProductDetails() {
    const apiResponse = await fetch(`https://dummyjson.com/products/${id}`);
    const result = await apiResponse.json();

    if (result) {
      setProductDetails(result);
      setLoading(false);
    }

    if (loading) return <h1>Loading...</h1>;
  }

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  console.log(productDetails);

  return (
    <div>
      <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
        <div className="grid items-centre grid-cols-1 lg:grid-cols-5 gap-12 shadow-sm p-6">
          <div className="lg:col-span-3 w-full lg:sticky top-0 text-centre">
            <div className="px-4 py-10 rounded-xl shadow-lg relative">
              <img
                className="w-4/5 rounded object-cover"
                src={productDetails?.thumbnail}
                alt={productDetails?.title}
              />
            </div>
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-extrabold text-[#333333]">
                {productDetails?.title}
              </h2>
              <div className="flex flex-wrap gap-4 mt-4">
                <p className="text-sm font-bold">${productDetails?.price}</p>
              </div>
              <div>
                <button
                  onClick={() => handleGoToCart(productDetails)}
                  className="disabled:opacity-65 mt-5 min-w-[200px] px-4 py-3 border-[#333] bg-transparent text-sm font-semibold rounded hover:bg-black hover:text-white transition-all duration-500"
                  disabled={cartItem.findIndex(item => item?.id === productDetails?.id) > -1}
                >
                  Add to the Cart
                </button>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap justify-centre gap-6 mx-auto">
              {productDetails?.images?.length
                ? productDetails?.images.map((imageItem) => (
                    <div className="rounded-xl p-4 shadow-md" key={imageItem}>
                      <img
                        className="w-24 cursor-ponter"
                        src={imageItem}
                        alt="product's-secondary-image"
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
