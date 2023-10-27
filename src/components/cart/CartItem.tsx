import {component$, useSignal, useStylesScoped$, useTask$} from '@builder.io/qwik';
import {PlusMinus} from '~/components/plus-minus-button/PlusMinusButton';
import {type ResolvedCartItem, useUpdateCountAction} from '~/routes/cart';
import {currencyFormat} from '~/routes/util';
import indexCSS from './cartItem.css?inline';

interface CartItemProps {
  item: ResolvedCartItem;
}

export const CartItem = component$((props: CartItemProps) => {
  const item = useSignal(props.item);
  
  // todo uncomment and it works
  /* useTask$((tracker) => {
    tracker.track(props);
    item.value = props.item;
  }); */
  
  useStylesScoped$(indexCSS);
  const updateAction = useUpdateCountAction();
  return (
    <tr class="cartItem">
      <td width="65">
        <img src={item.value.product.image} alt={`${item.value.product.name} image`}/>
      </td>
      <td width="342" class="cart-full-text">{item.value.product.name}</td>
      <td width="325">
        <a href={`/product/${item.value.productId}`}>Details</a>
      </td>
      <td width="300" class="cart-full-text">{currencyFormat(item.value.product.price)}</td>
      <td width="142">
        <PlusMinus
          qty={item.value.qty}
          id={item.value.productId}
          updateAction={updateAction}
        />
      </td>
    </tr>
  );
});
