import { useState } from "react";
import Nav from "./Navbar/Nav";
import { useLocation, useNavigate } from "react-router-dom";
export default function AddToCart() {
  const location = useLocation();
  const details = location.state || {};

  const [cartItems, setCartItems] = useState(details);
  const navigate = useNavigate();
  const paymentpage = () => {
    navigate("/success");
  };
  return (
    <div>
      <Nav />

      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Add to Cart Page</h1>

        <div className="flex flex-wrap gap-8">
          <div className="w-1/2">
            <div className="border p-4 flex justify-between">
              <img src={cartItems.images[0]} className="h-32 w-32" alt="" />
              <div>
                <h1 className="text-xl">Name:{cartItems.title}</h1>
                <h1 className="text-xl">Category:{cartItems.category.name}</h1>
                <h1 className="text-xl">Price:${cartItems.price}</h1>
              </div>
            </div>
          </div>

          {/* Shop Now Box - Right Side */}
          <div className="w-full md:w-1/3">
            <div className="bg-gray-200 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Shop Now</h2>
              <p className="text-gray-600 mb-4">
                Explore more products and add to your cart.
              </p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
                onClick={paymentpage}
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
