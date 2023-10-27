import {component$, Slot, useStyles$} from '@builder.io/qwik';
import type {RequestHandler} from '@builder.io/qwik-city';
import {routeAction$, routeLoader$, zod$} from '@builder.io/qwik-city';

import styles from './styles.css?inline';
import {z} from 'zod';
import {CartItem, getCartItemsFromCookie, updateCartItemsCookie} from '~/routes/cart';


export const useAddToCartAction = routeAction$(
  async ({id}, {redirect, cookie}) => {
    console.log('Add to cart', id);
    const cartItems: CartItem[] = getCartItemsFromCookie(cookie);
    const existingItem = cartItems.find((item) => item.productId === id);
    if (existingItem) {
      existingItem.qty++;
    } else {
      cartItems.push({productId: id, qty: 1});
    }
    updateCartItemsCookie(cookie, cartItems);
    throw redirect(302, '/cart/');
  },
  zod$({
    id: z.string(),
  }),
);

export const onGet: RequestHandler = async ({cacheControl}) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  useStyles$(styles);
  return (
    <>
      <main>
        <Slot/>
      </main>
    </>
  );
});
