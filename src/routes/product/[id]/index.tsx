import {component$, useStylesScoped$} from '@builder.io/qwik';
import {routeLoader$} from '@builder.io/qwik-city';
import {products} from '~/data/productsDB';
import {ProductCmp} from '~/components/product/product';
import indexCSS from './index.css?inline';
import CartSvg from '~/components/icons/cart';
import {useAddToCartAction} from '~/routes/layout';

export const useProductLoader = routeLoader$(({params}) => {
  return products.find((product) => product.id === params.id);
});

export default component$(() => {
  useStylesScoped$(indexCSS);
  const addAction = useAddToCartAction();
  const productSignal = useProductLoader();
  return (
    <div class="container">
      <section>
        <div class="cart">
          <a class="goToCart" href="/cart">
            <CartSvg/>
            <div>Go to cart</div>
          </a>
        </div>
      </section>
      <div class="productContainer">
        <ProductCmp product={productSignal.value} action={addAction}/>
      </div>
    </div>
  );
});
