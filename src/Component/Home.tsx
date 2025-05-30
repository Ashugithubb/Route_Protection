import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react'
import axios from 'axios';
import Card from './Card';
import Pagination from './Pagination';
import '../App.css'
import '../Style/Card.css'
import Profile from "./Profile";

interface products {
  id: number;
  title: string;
  price: number;
  rating: number;
  thumbnail: string;
}
const Home = () => {
  const [data, setData] = useState<products[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalProducts,  setToatlProducts] = useState<number>(0)

  const PAGE_SIZE = 10;
  // const totalProducts = data.length;


  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  useEffect(() => {

    axios.get(import.meta.env.VITE_BASE_URL + `?limit=${PAGE_SIZE}&skip=${start}`)
      .then((res) => {
        setData(res.data.products);
        setLoading(false);
        setToatlProducts(res.data.total);
        console.log(res.data.products);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [currentPage]);
  const noOfPage = Math.ceil(totalProducts / PAGE_SIZE);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  function handlePageChange() {
    setCurrentPage((prev) => prev);
  }
  function goToNextPage() {
    setCurrentPage((prev) => prev + 1);
  }
  function goToPrevPage() {
    setCurrentPage((prev) => prev - 1);
  }

  return data.length == 0 ? (<h1>No Product is Available</h1>) : (

    <>
      <Profile />
      <h1>All Products</h1>
      <div className="card">
        {data.map((item) => (
          <Card key={item.id}
            thumbnail={item.thumbnail}
            title={item.title}
            price={item.price}
            rating={item.rating} />

        ))}
      </div>
      <Pagination currentPage={currentPage}
        goToNextPage={goToNextPage}
        goToPrevPage={goToPrevPage}
        handlePageChange={handlePageChange}
        noOfPage={noOfPage}
      />
    </>
  )
}
export default Home;