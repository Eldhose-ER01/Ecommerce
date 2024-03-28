import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "./Navbar/Nav";
import axios from "axios";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const location = useLocation();
  const ID = location.state || {};
  const navigate = useNavigate();

  const Addtocart = (product) => {
    navigate("/addtocart", { state: product });
  };

  const ShopNow = () => {
    navigate("/success");
  };
  //take Product Details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.escuelajs.co/api/v1/products/${ID}`
        );
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductDetails();
  }, [ID]);

  return (
    <>
      <Nav />
      <div className="flex justify-center items-center h-full mt-10">
        <div className="w-full lg:w-[50rem] pt-4 shadow-2xl">
          <h2 className="text-3xl font-bold mb-1 text-center md:text-center">
            Product Details
          </h2>

          <div className="w-full mt-2 lg:mt-0 lg:w-[45rem] lg:h-96 flex flex-col lg:flex-row ml-10">
            {product && (
              <>
                <div className="w-full lg:w-[40%] md:h-[130%] lg:h-[100%] flex flex-col justify-center items-center shadow-xl bg-slate-100">
                  <img
                    src={product.category.image} // Assuming there's an 'image' field in the product object
                    className="w-64 h-48 mb-10 "
                    alt=""
                  />
                  <div className="w-full flex justify-between">
                    {product.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        className="w-16 h-16 mb-4"
                        alt={`Product Image ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="w-full lg:w-[60%] md:h-[130%] lg:h-[100%] py-6 shadow-xl bg-slate-100 ">
                  <div className="flex flex-col justify-between pl-2 pr-2 pt-3">
                    <p className="font-bold mt-1">
                      {" "}
                      Product Name:
                      <span className="font-bold text-gray-600">
                        {product.category.name}
                      </span>
                    </p>
                    <p className="font-bold mt-2">
                      Title:
                      <span className="font-bold text-gray-600">
                        {product.title}
                      </span>
                    </p>
                    <p className="font-bold mt-2">
                      Desc:
                      <span className="font-bold text-gray-600">
                        {product.description}
                      </span>
                    </p>
                    <p className="font-bold mt-2">
                      Price:
                      <span className="font-bold text-gray-600 text-xl">
                        ${product.price}
                      </span>
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="flex justify-center mb-2">
            <button
              className="h-11 w-64 text-white bg-black ml-3 mt-3 font-bold rounded-sm hover:bg-green-500 border border-sky-300"
              onClick={() => Addtocart(product)}
            >
              ADD TO CART
            </button>
            <button
              className="h-11 w-64 text-white bg-black ml-3 mt-3 font-bold rounded-sm hover:bg-green-500 border border-sky-300"
              onClick={ShopNow}
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
