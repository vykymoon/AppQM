import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Swal from 'sweetalert2';
import { Star } from 'lucide-react';

const ShoppingCart = ({ cartItems, setCartItems, placeOrder }) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(newTotal);
  }, [cartItems]);

  const handleRemoveItem = (index) => {
    const updatedItems = [...cartItems];
    updatedItems.splice(index, 1);
    setCartItems(updatedItems);
    Swal.fire({
      title: 'Producto eliminado',
      text: 'El producto ha sido eliminado del carrito.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  const handlePlaceOrder = () => {
    Swal.fire({
      title: '¿Confirmar pedido?',
      text: `Total: $${total.toFixed(2)}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        placeOrder();
        setCartItems([]);
        Swal.fire({
          title: '¡Gracias por tu pedido!',
          html: '<div style="font-size: 18px;">Por favor califica tu experiencia:</div>' +
                '<div style="display: flex; justify-content: center; margin-top: 10px;">' +
                Array.from({ length: 5 }).map((_, i) => `<span style="font-size: 30px; cursor: pointer;" onclick="Swal.close(); alert('Gracias por tu calificación de ${i + 1} estrellas!')">⭐</span>`).join('') +
                '</div>',
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p className="text-lg">Tu carrito está vacío.</p>
      ) : (
        cartItems.map((item, index) => (
          <Card key={index} className="mb-4 shadow-lg rounded-2xl">
            <CardContent className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-500">${item.price.toFixed(2)} x {item.quantity}</p>
              </div>
              <Button onClick={() => handleRemoveItem(index)} variant="destructive">Eliminar</Button>
            </CardContent>
          </Card>
        ))
      )}
      {cartItems.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Total: ${total.toFixed(2)}</h3>
          <Button onClick={handlePlaceOrder} className="mt-4 w-full" variant="primary">Confirmar Pedido</Button>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
