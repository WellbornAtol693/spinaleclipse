'use client';

import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const data = await client.fetch(`*[_type == "product"] | order(_createdAt desc)`);
      setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-700 text-white flex flex-col justify-between">
      {/* HEADER */}
      <header className="w-full px-6 py-4 border-b border-neutral-800 flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-wide">SPINE</h1>
        <nav>
          <div className='absolute left-1/2 transform -translate-x-1/2'>
          <a href="/" className="flex-1 flex text-2xl justify-center hover:underline font-bold">Back to Landing</a>
          </div>
          <a href="/orders" className="text-sm hover:underline">
            < ShoppingBag />
          </a>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-[450px] w-full overflow-hidden mb-5">
        {/* Horizontally Stretched Animated Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden zoom-in-out">
          <Image
            src="/logo2.png"
            alt="Tattoo background"
            fill
            className="object-cover scale-x-[1.25]"
            priority
          />
        </div>

        {/* Overlay Text - Fully Centered */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 bg-black/30 backdrop-blur-sm">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-md fade-in zoom-in-out">
            SHOP MERCH
          </h2>
          <p className="text-base sm:text-lg text-neutral-200 fade-in" style={{ animationDelay: '0.3s' }}>
            Custom drops. Premium ink. Designed to bite.
          </p>
        </div>
      </section>    

      {/* PRODUCT GRID */}
      <section className="px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
           <Link href={`/product/${product.slug.current}`} key={product._id}>
          <div className="bg-neutral-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-200 ease-in-out cursor-pointer">
            {product.image && (
              <Image
                src={urlFor(product.image).url()}
                alt={product.title}
                width={500}
                height={500}
                className="object-cover w-full h-80"
              />
            )}
            <div className="p-3">
              <h3 className="text-white text-sm font-semibold truncate">{product.title}</h3>
              <p className="text-neutral-400 text-xs">${product.price}</p>
            </div>
          </div>
        </Link>


          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-800 text-center text-neutral-500 text-sm py-6">
        &copy; {new Date().getFullYear()} SPINE x Carolingian Programs Inc. All rights reserved.
      </footer>
    </div>
  );
}
