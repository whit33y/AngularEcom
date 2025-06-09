import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@12.0.0?target=deno';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2023-10-16',
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': '*',
};

serve(async (req) => {
  const { method } = req;

  if (method === 'OPTIONS') {
    return new Response('OK', { headers: corsHeaders });
  }

  if (method === 'GET') {
    try {
      const products = await stripe.products.list({ limit: 100 });

      return new Response(JSON.stringify(products.data), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), {
        status: 500,
        headers: corsHeaders,
      });
    }
  }

  if (method === 'POST') {
    try {
      const body = await req.json();

      const product = await stripe.products.create({
        name: body.name,
        description: body.description || '',
      });

      const price = await stripe.prices.create({
        unit_amount: body.amount,
        currency: body.currency || 'pln',
        product: product.id,
        recurring: body.recurring ?? undefined,
      });

      return new Response(JSON.stringify({ product, price }), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), {
        status: 500,
        headers: corsHeaders,
      });
    }
  }

  return new Response('Method Not Allowed', {
    status: 405,
    headers: corsHeaders,
  });
});
