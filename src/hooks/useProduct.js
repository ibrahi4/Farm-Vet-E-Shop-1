import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../features/products/productsSlice.js";

const useProducts = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return { items, loading, error };
};
export default useProducts;
