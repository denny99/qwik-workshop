import {component$, useSignal, useStylesScoped$, useTask$} from '@builder.io/qwik';
import {PlusMinus} from '~/components/plus-minus-button/PlusMinusButton';
import {type ResolvedCartItem, useUpdateCountAction} from '~/routes/cart';
import {currencyFormat} from '~/routes/util';
import indexCSS from './cartItem.css?inline';

interface CartItemProps {
  item: ResolvedCartItem;
}

export const CartItem = component$(({item}: CartItemProps) => {
  // const item = useSignal(props.item);
  
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
        <img src={item.product.image} alt={`${item.product.name} image`}/>
      </td>
      <td width="342" class="cart-full-text">{item.product.name}</td>
      <td width="325">
        <a href={`/product/${item.productId}`}>Details</a>
      </td>
      <td width="300" class="cart-full-text">{currencyFormat(item.product.price)}</td>
      <td width="142">
        <PlusMinus
          qty={item.qty}
          id={item.productId}
          updateAction={updateAction}
        />
      </td>
    </tr>
  );
});
