import { useState, useEffect } from "react";
import Nav from "./Navbar/Nav";
import ProductList from "./ProductList";
import CatObservable from "./UseCategory";
import axios from "axios";
export default function ProductCategory() {
  const [selectedCategories, setSelectedCategories] = useState("All");
  const [catagories, setcategory] = useState([]);

  const handleCategoryChange = (category) => {
    setSelectedCategories(category);
  };
//Take categorys
  useEffect(() => {
    const catagory = async () => {
      try {
        const response = await axios.get(
          " https://api.escuelajs.co/api/v1/categories"
        );
        response.data.unshift({ name: "All" });
        setcategory(response.data.map((data) => data.name));
      } catch (error) {
        console.log(error);
      }
    };
    catagory();
  }, [selectedCategories]);

  return (
    <>
      <Nav />
      <div className="flex flex-wrap items-center gap-4 ml-3 mt-8">
        {catagories.map((category, index) => (
          <div key={index} className="flex items-center">
            <input
              type="checkbox"
              id={`category-${index}`}
              checked={selectedCategories === category}
              onChange={() => {
                handleCategoryChange(category);
                CatObservable.notify(index);
              }}
              className="mr-2"
            />
            <label
              htmlFor={`category-${index}`}
              className="text-lg cursor-pointer"
            >
              {category}
            </label>
          </div>
        ))}
      </div>
      <ProductList />
    </>
  );
}
