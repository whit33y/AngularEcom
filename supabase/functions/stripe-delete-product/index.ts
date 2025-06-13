import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@12.0.0?target=deno';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2023-10-16',
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': '*',
};

serve(async (req) => {
  const { method } = req;

  if (method === 'OPTIONS') {
    return new Response('OK', { headers: corsHeaders });
  }

  if (method === 'POST') {
    try {
      const { productId } = await req.json();

      if (!productId) {
        return new Response(JSON.stringify({ error: 'Missing productId' }), {
          status: 400,
          headers: corsHeaders,
        });
      }

      await stripe.products.del(productId);

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
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
