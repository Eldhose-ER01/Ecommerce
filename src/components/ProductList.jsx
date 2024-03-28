import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import CatObservable from "./UseCategory";
export default function ProductList() {
  const navigate = useNavigate();

  const [Products, SetProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstIndex = lastItemIndex - itemsPerPage;
  const thisPageItems = Products.slice(firstIndex, lastItemIndex);
  const [category, setSelectedCategory] = useState(0);
  //catagory filter
  const setter = (value) => {
    setSelectedCategory(value);
  };
  //Subscribe architecture: Using the data will be placed in CatObservable, then take and use it
  useEffect(() => {
    CatObservable.subscribe(setter);

    () => CatObservable.unsubscribe(setter);
  }, []);

  const pages = [];
  for (let i = 1; i <= Math.ceil(Products.length / itemsPerPage); i++) {
    pages.push(i);
  }

  //Add to cart
  const AddToCart = (product) => {
    navigate("/addtocart", { state: product });
  };

  //Take Products List
  const ProductList = async () => {
    try {
      if (category === 0) {
        const response = await axios.get(
          "https://api.escuelajs.co/api/v1/products"
        );
        if (response) {
          SetProducts(response.data);
        }
      } else {
        const response = await axios.get(
          `https://api.escuelajs.co/api/v1/categories/${category}/products/`
        );
        if (response) {
          SetProducts(response.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  //Go to Single Product Page
  const ProductClick = (productId) => {
    navigate("/productdetails", { state: productId });
  };
  useEffect(() => {
    ProductList();
  }, [category]);

  return (
    <>
      <ToastContainer />

      <div className="bg-white flex flex-col items-center">
        <h1 className="text-black text-2xl mt-8 mb-4 font-extrabold">
          All Products
        </h1>
        <div className="flex flex-wrap justify-center">
          {thisPageItems.length >= 0 &&
            thisPageItems.map((product) => {
              return (
                <div
                  key={product.id}
                  className="w-full sm:w-72 h-96 bg-red-550 shadow-md m-3 rounded-md border-2 border-sky-300"
                >
                  <div
                    className="h-72"
                    onClick={() => ProductClick(product.id)}
                  >
                    <img
                      src={product.images[0]}
                      alt=""
                      className="w-full h-40  rounde-md"
                    />
                    <h1 className=" text-center  font-medium text-black">
                      {product.title}
                    </h1>
                    <p className="font-sm text-lg mt-2 ml-2">
                      CategoryName:
                      <span className="font-bold">{product.category.name}</span>
                    </p>
                    <p className="text-lg mt-1 ml-2">
                      Price<span className="font-bold ml-2">$</span>:
                      {product.price}
                    </p>
                  </div>
                  <div className="mt-7">
                    <button
                      className="h-11 w-64 bg-black ml-3  text-white font-bold rounded-sm hover:bg-green-400 border border-green-300"
                      onClick={() => AddToCart(product)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="flex justify-center items-center text-center mt-5">
          {pages
            .slice(
              Math.max(currentPage - 2, 0),
              Math.min(currentPage + 1, pages.length)
            )
            .map((page, index) => (
              <button
                onClick={() => setCurrentPage(page)}
                key={index}
                className={`font-extrabold p-2 ${
                  currentPage === page
                    ? "text-md text-white border border-gray-300 bg-black rounded-md"
                    : "text-md text-green-600"
                }`}
              >
                {page}
              </button>
            ))}
        </div>
      </div>
    </>
  );
}
