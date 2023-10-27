import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { type Product } from "~/data/productsDB";
import productCSS from "./product.css?inline";
import { currencyFormat } from "~/routes/util";
import {type ActionStore, Form} from "@builder.io/qwik-city";
import CartSvg from "~/components/icons/cart";

interface ProductCmpProps {
  product?: Product;
  displayLink?: boolean;
  displayDescription?: boolean;
  action: ActionStore<any, any, boolean>;
}

export const ProductCmp = component$(
  ({
     product,
     displayLink = false,
     displayDescription = true,
     action
   }: ProductCmpProps) => {
    useStylesScoped$(productCSS);
    return product ? (
      <div class="card">
        <div class="container">
          <img alt={`${product.name} image`} src={product.image} />
          <h2>
            {product.name} ({currencyFormat(product.price)})
          </h2>
          {displayDescription && <p>{product.description}</p>}
          <Form action={action}>
            <input type="hidden" name="id" value={product.id} />
            <button type="submit">
              <CartSvg />
              <div>Add to cart</div>
            </button>
          </Form>
          {displayLink && (
            <a class="learnMore" href={`/product/${product.id}`}>
              Learn More &gt;
            </a>
          )}
        </div>
      </div>
    ) : (
      <div />
    );
  }
);
