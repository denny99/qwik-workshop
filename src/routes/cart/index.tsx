import {component$, useStylesScoped$} from '@builder.io/qwik';
import {type Cookie, type DocumentHead, routeAction$, routeLoader$, zod$} from '@builder.io/qwik-city';
import {z} from 'zod';
import {CartItem} from '~/components/cart/CartItem';
import {type Product, products} from '~/data/productsDB';
import {currencyFormat} from '../util';
import indexCSS from './index.css?inline';

export interface CartItem {
  productId: string;
  qty: number;
}

export interface ResolvedCartItem extends CartItem {
  product: Product;
}

export const useUpdateCountAction = routeAction$(
  ({id, qtyChange}, {cookie}) => {
    console.log('updateCountAction', id, qtyChange);
    let cartItems: CartItem[] = getCartItemsFromCookie(cookie);
    const existingItem = cartItems.find((item) => item.productId === id);
    if (existingItem) {
      existingItem.qty += qtyChange;
      if (existingItem.qty <= 0) {
        cartItems = cartItems.filter((item) => item.productId !== id);
      }
    }
    updateCartItemsCookie(cookie, cartItems);
  },
  zod$({
    id: z.string(),
    qtyChange: z.coerce.number(),
  }),
);

export const useCartLoader = routeLoader$(({cookie}) => {
  const cartItems: CartItem[] = getCartItemsFromCookie(cookie);
  return cartItems.map((item) => ({
    ...item,
    product: products.find((product) => product.id === item.productId)!,
  }));
});

export function getCartItemsFromCookie(cookie: Cookie): CartItem[] {
  const headers = cookie.headers();
  const header = headers.find((header) => header.startsWith('cart='));
  let cartItems: CartItem[] = [];
  if (header) {
    cartItems = JSON.parse(
      decodeURIComponent(header.substring('cart='.length, header.indexOf(';'))),
    );
  } else {
    cartItems = cookie.get('cart')
      ?.json() || [];
  }
  console.log('HEADER GET', 'cart', cartItems);
  return cartItems;
}

export function updateCartItemsCookie(cookie: Cookie, cartItems: CartItem[]) {
  console.log('COOKIE SET', 'cart', cartItems);
  cookie.set('cart', cartItems, {path: '/'});
}

export default component$(() => {
  useStylesScoped$(indexCSS);
  const cartSignal = useCartLoader();
  return (
    <div>
      <h1>Cart</h1>
      {cartSignal.value.length > 0 ? (
        <div>
          <div class="boxHeader">
            <h2 class="header">Lightsabers in Cart</h2>
          </div>
          <div class="middleCart">
            <table class="cartTable">
              <tbody>
              {cartSignal.value.map((item) => (
                <CartItem item={item} key={item.productId}/>
              ))}
              </tbody>
            </table>
          </div>
          <div class="cartBottom">
            <div>
              Total:{' '}
              <label>
                {currencyFormat(
                  cartSignal.value.reduce(
                    (sum, item) => sum + item.qty * item.product.price,
                    0,
                  ),
                )}
              </label>
            </div>
          </div>
          <div>
            <div class="total">
              <button
                onClick$={() => {
                  window.location.replace('/payment');
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <h3>No selected Items</h3>
      )}
    </div>
  );
});

export const head: DocumentHead = ({resolveValue}) => {
  return {
    title:
      'Your cart has ' +
      resolveValue(useCartLoader)
        .reduce((sum, item) => sum + item.qty, 0) +
      ' items',
    meta: [
      {
        name: 'description',
        content: 'Qwik checkout cart page',
      },
    ],
  };
};
