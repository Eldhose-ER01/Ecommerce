import Nav from "./Navbar/Nav";
import ProductList from "./ProductList";
export default function Home() {
  return (
    <>
      <div>
        <Nav />
      </div>
      <div className="w-full">
        <img
          src="https://img.freepik.com/premium-vector/digital-marketing-concept-shopping-online-mobile-application_68971-366.jpg?w=1380"
          className="w-full h-[32rem]"
          alt=""
        />
      </div>
      <div>
        <ProductList />
      </div>
    </>
  );
}
