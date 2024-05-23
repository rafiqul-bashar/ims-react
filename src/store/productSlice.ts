import { create } from "zustand";

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.warn("Warning: API_URL is not defined in the .env file.");
}

async function makeRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error making request to ${url}: ${error.message}`);
  }
}

export const useProductStore = create((set) => ({
  products: [],
  fetchProducts: async () => {
    try {
      const data = await makeRequest(API_URL);
      set({ products: data });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
  addProduct: async (newProduct) => {
    console.log(newProduct);
    // try {
    //   const data = await makeRequest(API_URL, {
    //     method: "POST",
    //     body: JSON.stringify(newProduct),
    //   });
    //   set((state) => ({ products: [...state.products, data] }));
    // } catch (error) {
    //   console.error("Error adding product:", error);
    // }
  },
  updateProduct: async (productId, updatedProduct) => {
    try {
      const data = await makeRequest(`${API_URL}/${productId}`, {
        method: "PUT",
        body: JSON.stringify(updatedProduct),
      });
      set((state) => ({
        products: state.products.map((product) =>
          product.id === productId ? { ...product, ...updatedProduct } : product
        ),
      }));
    } catch (error) {
      console.error("Error updating product:", error);
    }
  },
  deleteProduct: async (productId) => {
    try {
      await makeRequest(`${API_URL}/${productId}`, { method: "DELETE" });
      set((state) => ({
        products: state.products.filter((product) => product.id !== productId),
      }));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  },
  //  functions ends
}));
