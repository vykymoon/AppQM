import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../Firebase";
import Swal from "sweetalert2";

// Imágenes de puntos de servicio
import restauranteEscuela from "../components/login/Assets/RestauranteEscuela.webp";
import restauranteArcos from "../components/login/Assets/Arcos.webp";
import embarcaderoCarta from "../components/login/Assets/Embarcadero.webp";
import terrazaLiving from "../components/login/Assets/Terraza living.webp";
import kioskos from "../components/login/Assets/Kioskos.webp";
import autoservicioMenu from "../components/login/Assets/Meson.webp";
import puntoWok from "../components/login/Assets/Punto Wok.webp";
import banderitas from "../components/login/Assets/Meson-2.webp";
import puntoCafe from "../components/login/Assets/Punto verde.webp";
import cafeBolsa from "../components/login/Assets/Cafe bolsa-2.webp";
import cafeEmbarcadero from "../components/login/Assets/Embarcadero Cafe-5.webp";
import cafeEstudio from "../components/login/Assets/Cafe estudio.webp";
import cipreses from "../components/login/Assets/Cipreses.webp";
import cafeLetras from "../components/login/Assets/Café y Letras.webp";
import puntoSandwich from "../components/login/Assets/Punto Sandwich.webp";

const defaultImg = "https://via.placeholder.com/120";

const servicePoints = [
  { id: "Restaurante Escuela", nombre: "Restaurante Escuela", imagen: restauranteEscuela },
  { id: "Restaurante Arcos", nombre: "Restaurante Arcos", imagen: restauranteArcos },
  { id: "Embarcadero Carta", nombre: "Embarcadero Carta", imagen: embarcaderoCarta },
  { id: "Terraza Living", nombre: "Terraza Living", imagen: terrazaLiving },
  { id: "Kioskos", nombre: "Kioskos", imagen: kioskos },
  { id: "Autoservicio Menú del día", nombre: "Autoservicio Menú del día", imagen: autoservicioMenu },
  { id: "Punto Wok", nombre: "Punto Wok", imagen: puntoWok },
  { id: "Banderitas", nombre: "Banderitas", imagen: banderitas },
  { id: "Punto Café", nombre: "Punto Café", imagen: puntoCafe },
  { id: "Café de la Bolsa", nombre: "Café de la Bolsa", imagen: cafeBolsa },
  { id: "Café Embarcadero", nombre: "Café Embarcadero", imagen: cafeEmbarcadero },
  { id: "Café Estudio", nombre: "Café Estudio", imagen: cafeEstudio },
  { id: "Cipreses", nombre: "Cipreses", imagen: cipreses },
  { id: "Café y Letras", nombre: "Café y Letras", imagen: cafeLetras },
  { id: "Punto Sándwich", nombre: "Punto Sándwich", imagen: puntoSandwich },
];

function ProductListManagement() {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("select"); // select | list | add | edit | delete
  const [selectedServicePoint, setSelectedServicePoint] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedForDelete, setSelectedForDelete] = useState([]);
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [price, setPrice] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [img, setImg] = useState(defaultImg);

  const fetchProducts = async () => {
    if (!selectedServicePoint) return;
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((product) => product.proveedor === selectedServicePoint);
      setProducts(productList);
    } catch (error) {
      Swal.fire("Error", "No se pudieron cargar los productos", "error");
    }
  };

  useEffect(() => {
    if (view === "list") {
      fetchProducts();
    }
  }, [view, selectedServicePoint]);

  const goBack = () => {
    setView("select");
    setSelectedServicePoint(null);
    setSelectedProduct(null);
    setSelectedForDelete([]);
    resetForm();
  };

  const resetForm = () => {
    setNombre("");
    setCategoria("");
    setPrice("");
    setCantidad("");
    setProveedor("");
    setImg(defaultImg);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "products"), {
        nombre,
        categoria,
        price: Number(price),
        cantidad: Number(cantidad),
        proveedor: selectedServicePoint,
        img,
      });
      Swal.fire("¡Éxito!", "Producto añadido correctamente", "success");
      fetchProducts();
      goBack();
    } catch {
      Swal.fire("Error", "No se pudo añadir el producto", "error");
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const productRef = doc(db, "products", selectedProduct.id);
      await updateDoc(productRef, {
        nombre,
        categoria,
        price: Number(price),
        cantidad,
        proveedor: selectedServicePoint,
        img,
      });
      Swal.fire("¡Éxito!", "Producto editado correctamente", "success");
      fetchProducts();
      goBack();
    } catch {
      Swal.fire("Error", "No se pudo editar el producto", "error");
    }
  };

  const handleDelete = async () => {
    if (selectedForDelete.length === 0) {
      Swal.fire("Selecciona al menos un producto", "", "info");
      return;
    }
    Swal.fire({
      title: "¿Eliminar productos seleccionados?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await Promise.all(
            selectedForDelete.map((id) => deleteDoc(doc(db, "products", id)))
          );
          Swal.fire("¡Eliminados!", "Productos eliminados correctamente", "success");
          fetchProducts();
          goBack();
        } catch {
          Swal.fire("Error", "No se pudieron eliminar los productos", "error");
        }
      }
    });
  };

  const toggleSelectDelete = (id) => {
    setSelectedForDelete((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#bfc8e6] flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-[#2E2955] text-white">
        <h1 className="text-2xl font-bold tracking-widest">MANAGE PRODUCTS</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex justify-center items-center">
        {/* Selección de punto de servicio */}
        {view === "select" && (
          <div className="w-full flex flex-col items-center">
            <h2 className="text-2xl font-bold text-[#2E2955] mb-6">Selecciona un Restaurante</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicePoints.map((point) => (
                <div
                  key={point.id}
                  onClick={() => {
                    setSelectedServicePoint(point.id);
                    setView("list");
                  }}
                  className="border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col items-center"
                >
                  <img src={point.imagen} alt={point.nombre} className="w-full h-48 object-cover" />
                  <h3 className="text-lg font-bold text-[#2E2955] mt-2">{point.nombre}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lista de productos */}
        {view === "list" && (
          <div className="w-full flex flex-col items-center">
            <button
              onClick={goBack}
              className="mb-4 bg-white rounded-full px-3 py-1 font-bold text-[#2E2955] shadow"
            >
              ← Back
            </button>
            <h2 className="text-2xl font-bold text-[#2E2955] mb-6">
              Productos de {selectedServicePoint}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  onClick={() => toggleSelectDelete(product.id)}
                  className={`bg-white rounded-lg shadow-lg p-4 text-center cursor-pointer ${
                    selectedForDelete.includes(product.id) ? "border-2 border-red-500" : ""
                  }`}
                >
                  <h3 className="text-lg font-bold text-[#2E2955]">{product.nombre}</h3>
                  <p className="text-sm text-gray-600">Precio: ${product.price}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                      setNombre(product.nombre);
                      setCategoria(product.categoria);
                      setPrice(product.price);
                      setCantidad(product.cantidad);
                      setProveedor(product.proveedor);
                      setImg(product.img || defaultImg);
                      setView("edit");
                    }}
                    className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
                  >
                    Editar
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setView("add")}
                className="bg-green-500 text-white px-6 py-2 rounded"
              >
                Añadir Producto
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-6 py-2 rounded"
              >
                Eliminar Seleccionados
              </button>
            </div>
          </div>
        )}

        {/* Formulario de añadir o editar */}
        {(view === "add" || view === "edit") && (
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <button
              onClick={goBack}
              className="mb-4 bg-gray-200 rounded-full px-3 py-1 font-bold text-[#2E2955] shadow"
            >
              ← Back
            </button>
            <h2 className="text-2xl font-bold text-[#2E2955] mb-4">
              {view === "add" ? "Añadir Producto" : "Editar Producto"}
            </h2>
            <form
              onSubmit={view === "add" ? handleAdd : handleEdit}
              className="flex flex-col gap-4"
            >
              <input
                className="border p-2 rounded"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre del Producto"
                required
              />
              <input
                className="border p-2 rounded"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                placeholder="Categoría"
                required
              />
              <input
                className="border p-2 rounded"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Precio"
                type="number"
                required
              />
              <input
                className="border p-2 rounded"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                placeholder="Cantidad"
                type="number"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {view === "add" ? "Añadir" : "Guardar Cambios"}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

export default ProductListManagement;
