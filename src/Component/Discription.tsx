// ProductDetail.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  description: string;
  thumbnail: string;
}

const ProductDetail = () => {
  const { id } = useParams(); // <-- gets ID from URL
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_URL2}/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading product...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found</div>;

  return (
    <div style={{ padding: '20px' }}>
      <img src={product.thumbnail} alt={product.title} width="500" />
      <h2>{product.title}</h2>
      <p><strong>Price:</strong> ₹{product.price}</p>
      <p><strong>Rating:</strong> ⭐ {product.rating}</p>
      <p><strong>Description:</strong> {product.description}</p>
    </div>
  );
};

export default ProductDetail;
