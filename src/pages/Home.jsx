import React, { useEffect, useState } from "react";

export default function Home() {
  // state
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch products
  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/products"); // replace with real endpoint if available
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        if (mounted) setProducts(data);
      } catch (e) {
        // fallback sample data
        if (mounted) {
          setProducts([
            { id: 1, name: "Veterinary Feed", price: 12.5, desc: "High quality feed" },
            { id: 2, name: "Farm Boots", price: 25.0, desc: "Durable boots" },
            { id: 3, name: "Dewormer", price: 8.75, desc: "Safe for livestock" },
          ]);
          setError("Using local fallback data.");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  // handlers
  function handleAddToCart(product) {
    // placeholder - integrate with cart logic
    console.log("Add to cart:", product);
    alert(`Added "${product.name}" to cart (placeholder).`);
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  // UI
  return (
    <div style={{ padding: 20 }}>
      <h1>Home</h1>
      <div style={{ marginBottom: 12 }}>
        <input
          aria-label="search"
          placeholder="Search products..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ padding: 8, width: 300 }}
        />
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: "orange" }}>{error}</p>}

      {!loading && filtered.length === 0 && <p>No products found.</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filtered.map(p => (
          <li key={p.id} style={{ border: "1px solid #ddd", padding: 12, marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong>{p.name}</strong>
                <div style={{ fontSize: 14, color: "#555" }}>{p.desc}</div>
                <div style={{ marginTop: 6 }}>${p.price?.toFixed(2)}</div>
              </div>
              <button onClick={() => handleAddToCart(p)} style={{ padding: "8px 12px" }}>
                Add to Cart
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


