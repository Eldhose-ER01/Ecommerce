import { useEffect, useState } from "react";
import Nav from "./Navbar/Nav";
import ProductList from "./ProductList";
import CatObservable from "./UseCategory";
import axios from "axios";

export default function ListCategory() {
  const [categorylist, setcategorylist] = useState([]);
  const [visible, setvisble] = useState("flex");

  useEffect(() => {
    const alldatas = async () => {
      const response = await axios.get(
        "https://api.escuelajs.co/api/v1/categories"
      );
      setcategorylist(response.data);
    };
    alldatas();
  }, []);
  //Filtering values upon click.
  const handleClick = (index) => {
    CatObservable.notify(index + 1);
    setvisble("hidden");
  };

  return (
    <div>
      <Nav />
      <>
        <div className={`bg-white ${visible} flex-col items-center`}>
          <h1 className="text-black text-2xl mt-8 mb-4 font-extrabold">
            Category List
          </h1>
          <div className="flex flex-wrap justify-center">
            {categorylist.length >= 0 &&
              categorylist.map((product, index) => {
                return (
                  <div
                    key={product.id}
                    className="w-full sm:w-72 h-96 bg-red-550 shadow-md m-3 rounded-md border-2 border-sky-300"
                  >
                    <div className="h-72">
                      <img
                        src={product.image}
                        alt=""
                        className="w-full h-40  rounde-md"
                      />
                      <h1 className=" text-center  font-medium text-black">
                        {product.name}
                      </h1>
                    </div>
                    <div className="mt-7">
                      <button
                        className="h-11 w-64 bg-black ml-3  text-white font-bold rounded-sm hover:bg-green-400 border border-green-300"
                        onClick={() => handleClick(index)}
                      >
                        Prodcuct Page
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className={`${visible === "flex" ? "hidden" : "flex"}`}>
          <ProductList />
        </div>
      </>
    </div>
  );
}
