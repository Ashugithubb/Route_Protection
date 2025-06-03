import { useEffect, useState } from 'react'
import axios from 'axios'; 
import Card from './Card';
import Pagination from './Pagination';
import { Navbar } from "./Navbar";
import '../App.css'
import '../Style/Card.css'
import Profile from "./Profile";
import { Link, useNavigate } from "react-router-dom";
export interface products {
  id: number;
  title: string;
  price: number;
  rating: number;
  thumbnail: string; 
}

interface HomeProps {
  cart: products[];
  setCart: React.Dispatch<React.SetStateAction<products[]>>;
}

const Home: React.FC<HomeProps> = ({ cart, setCart }) => {
  const navigate = useNavigate()

  const [data, setData] = useState<products[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_URL}`)
      .then((res) => {
        setData(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const PAGE_SIZE = 10;
  const totalProducts = data.length;
  const noOfPage = Math.ceil(totalProducts / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  function handlePageChange() {
    setCurrentPage((prev) => prev);
  }
  function goToNextPage() {
    setCurrentPage((prev) => prev + 1);
  }
  function goToPrevPage() {
    setCurrentPage((prev) => prev - 1);
  }
  function navbarsChange(num: number) {
    setCurrentPage(num);
  }
  function handleAddToCart(item: products) {
    setCart((prevCart) => [...prevCart, item]);
  }
  function handleDeleteFromCart(index: number) {
  setCart((prevCart) => prevCart.filter((_, i) => i !== index));
}
  return data.length == 0 ? (<h1>Not able to fetch data</h1>) : (
    <>
      <Navbar
        currentPage={currentPage}
        navbarsChange={navbarsChange}
        cartCount={cart.length}
      />
      <Profile />
      <h1>All Products</h1>
      <div className="card">
        {data.slice(start, end).map((item) => (
          // <Link
          //   to={`/product/${item.id}`}
          //   key={item.id}
          //   style={{ textDecoration: "none", color: "inherit" }}
          // >
          <div onClick={() => {
              navigate(`/product/${item.id}`)
            }}>
            <Card 
              key={item.id}
              id = {item.id}
              thumbnail={item.thumbnail}
              title={item.title}
              price={item.price}
              rating={item.rating}
              onAddToCart={() => handleAddToCart(item)}
            />
          </div>
          // </Link>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        goToNextPage={goToNextPage}
        goToPrevPage={goToPrevPage}
        handlePageChange={handlePageChange}
        noOfPage={noOfPage}
      />
      
    </>
  )
}
export default Home;