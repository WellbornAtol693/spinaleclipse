// app/api/checkout/route.ts

import { NextRequest, NextResponse } from 'next/server';
import type { CartItem } from '@/lib/cartStore';
import stripe from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }

    const line_items = items.map((item: CartItem) => ({
      quantity: 1,
      adjustable_quantity: { enabled: false },
      price_data: {
        currency: 'usd',
        unit_amount: Math.round(item.price * 100), // convert dollars to cents
        product_data: {
          name: `${item.title} - Size ${item.size}`,
          metadata: {
            productId: item.productId,
            size: item.size,
          },
        },
      },
    }));

    const origin =
      req.headers.get('origin') ||
      process.env.NEXT_PUBLIC_APP_URL ||
      'https://spinaleclipse.vercel.app';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: `${origin}/success`,
      cancel_url: `${origin}/orders`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('[Stripe Checkout Error]', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
