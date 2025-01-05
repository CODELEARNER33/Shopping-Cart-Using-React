import { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import ProductTitle from "../../components/productTitle";

export default function ProductListPage() {
  const { listOfProducts, loading } = useContext(ShoppingCartContext);

  if (loading)
    return (
      <h1 className="text-3xl font-extralight text-grey-950 sm:text-4xl">
        Loading data...
      </h1>
    );

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-extralight text-grey-950 sm:text-4xl">
            Our Featured Products{" "}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-5 mt-10 lg:mt-16 lg:gap-8 lg:grid-4">
        {listOfProducts && listOfProducts.length > 0 ? (
          listOfProducts.map((singleProductTitle) => (
            <ProductTitle
              key={singleProductTitle?.id}
              singleProductTitle={singleProductTitle}
            />
          ))
        ) : (
          <h3>No product Found...</h3>
        )}
      </div>
    </section>
  );
}
