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

    const line_items = items.map((item: CartItem ) => ({
      price: item.priceId,
      quantity: 1,
    }));

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

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
