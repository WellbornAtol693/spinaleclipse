'use client';

import { useCartStore } from '@/lib/cartStore';
import { ShoppingCart } from 'lucide-react';

export default function OrdersPage() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const handleCheckout = async (req, res) => {
    try {
    	const response = await fetch('./api/checkout', {
    		method: 'POST',
    		headers: {
    			'Content-Type':"application/json",
    		},
    		body: JSON.stringify({ items }),
    	});

    	if (!response.ok) {
    		throw new Error(`HTTP error! Status: ${response.status}`);
    	};

    	const { url } = await response.json();
    	clearCart();
    	window.location.href = url;
    } catch (error) {
    	console.error('Checkout failed:', error);
    }
  };

  return (
    <main className="p-6 max-w-2xl mx-auto bg-gray-300 backdrop-blur">
    <header className="w-full px-6 py-4 border-b border-neutral-800 flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-wide">SPINE</h1>
        <nav>
          <a href="/shop" className="text-sm hover:underline">
          	<ShoppingCart />
          </a>
        </nav>
      </header>
      <h1 className="text-3xl font-bold mb-6">Your Bag</h1>

      {items.length === 0 ? (
        <p className="text-neutral-400">Your Bag Is Empty</p>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="border border-gray-700 p-4 rounded shadow"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-sm text-neutral-400">${item.price}</p>
                  </div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <button
                  	onClick={() => removeFromCart(item.id)}
                  	className='text-red-500 hover:underline'
                  >
                  	X
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <button
            className="mt-8 bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
            onClick={handleCheckout}
          >
            Proceed To Checkout
          </button>
        </>
      )}
    </main>
  );
}
