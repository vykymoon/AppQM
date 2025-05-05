import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../FireBase"; // Asegúrate de que esta ruta sea correcta

function ProductListManagement() {
  const [products, setProducts] = useState([]);
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [price, setPrice] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    } catch (error) {
      console.error("Error al traer productos:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddOrEdit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        nombre,
        categoria,
        price: Number(price),
        cantidad: Number(cantidad),
        proveedor,
      };

      if (editingId) {
        const productRef = doc(db, "products", editingId);
        await updateDoc(productRef, productData);
        setEditingId(null);
      } else {
        await addDoc(collection(db, "products"), productData);
      }

      setNombre("");
      setCategoria("");
      setPrice("");
      setCantidad("");
      setProveedor("");
      fetchProducts();
    } catch (error) {
      console.error("Error al guardar producto:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setNombre(product.nombre);
    setCategoria(product.categoria);
    setPrice(product.price);
    setCantidad(product.cantidad);
    setProveedor(product.proveedor);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      fetchProducts();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-200">
        <button>
          <span className="text-2xl text-[#2E2955]">←</span>
        </button>
        <h1 className="text-lg font-bold text-[#2E2955]">Gestión de Productos</h1>
        <button>
          <span className="text-2xl text-[#2E2955]">🛒</span>
        </button>
      </header>

      {/* Formulario de agregar/editar */}
      <form onSubmit={handleAddOrEdit} className="p-4 space-y-2">
        <input
          className="border p-2 rounded w-full"
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          className="border p-2 rounded w-full"
          type="text"
          placeholder="Categoría"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
        />
        <input
          className="border p-2 rounded w-full"
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          className="border p-2 rounded w-full"
          type="number"
          placeholder="Cantidad"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          required
        />
        <input
          className="border p-2 rounded w-full"
          type="text"
          placeholder="Proveedor"
          value={proveedor}
          onChange={(e) => setProveedor(e.target.value)}
          required
        />
        <button
          className="bg-[#6C63FF] text-white px-4 py-2 rounded-full w-full"
          type="submit"
        >
          {editingId ? "Guardar Cambios" : "Agregar Producto"}
        </button>
      </form>

      {/* Lista de productos */}
      <main className="flex-1 overflow-y-auto px-4 space-y-4 pb-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center bg-gray-100 rounded-xl p-4 shadow-sm"
          >
            <img
              src="https://via.placeholder.com/80"
              alt={product.nombre}
              className="w-20 h-20 rounded-xl object-cover mr-4"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-[#2E2955]">{product.nombre}</h3>
              <p className="text-sm text-gray-500">{product.categoria}</p>
              <p className="text-[#2E2955] font-bold">${product.price}</p>
              <p className="text-sm text-gray-600">Cantidad: {product.cantidad}</p>
              <p className="text-sm text-gray-600">Proveedor: {product.proveedor}</p>
            </div>
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-400 text-white px-3 py-1 rounded-full text-sm"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-full text-sm"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* Bottom Nav */}
      <nav className="flex justify-around items-center border-t border-gray-200 py-3 text-xs text-[#2E2955] font-medium">
        <div className="flex flex-col items-center">
          <span className="text-xl">🏠</span>
          Home
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl">🍽️</span>
          Menu
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl">📖</span>
          Record
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl">👤</span>
          Profile
        </div>
      </nav>
    </div>
  );
}

export default ProductListManagement;
