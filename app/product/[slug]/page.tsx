'use client'
import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/lib/cartStore'
import { client } from '@/sanity/lib/client'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'

type Props = {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: Props) {
  const addToCart = useCartStore((state) => state.addToCart)
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      const query = `*[_type == "product" && slug.current == $slug][0]{
      _id,
      title,
      price,
      description,
      image,
      priceId
    }`
      const result = await client.fetch(query, { slug: params.slug })
      if (!result) return notFound()

      console.log('Fetched product:', result)

      setProduct(result)
    }

    fetchProduct()
  }, [params.slug])

  if (!product) return <p>Loading...</p>

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      title: product.title,
      price: product.price,
      image: product.image ? urlFor(product.image).url() : '',
      priceId: product.priceId,
    })
    window.location.href = '/orders'
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-white bg-gray-600">
      <header className="w-full px-6 py-4 border-b border-neutral-800 flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-wide">SPINE</h1>
        <nav>
          <a href="/shop" className="text-sm hover:underline">
            <ShoppingCart />
          </a>
        </nav>
      </header>
      <div className="grid md:grid-cols-2 gap-8">
        {product.image && (
          <Image
            src={urlFor(product.image).url()}
            alt={product.title}
            width={600}
            height={600}
            className="rounded"
            priority
          />
        )}
        <div>
          <h1 className="text-4xl text-gray-300 font-bold mb-4">{product.title}</h1>
          <p className="text-xl text-gray-300 mb-4">${product.price}</p>
          <p className="text-base text-gray-300">{product.description}</p>
          <button
            className="mt-6 bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
