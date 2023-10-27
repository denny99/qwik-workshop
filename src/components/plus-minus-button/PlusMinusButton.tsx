import {component$, useStylesScoped$, useTask$} from '@builder.io/qwik';
import {ActionButton} from '../action-button/ActionButton';
import indexCSS from './PlusMinusButton.css?inline';
import {type ActionStore} from '@builder.io/qwik-city';

interface PlusMinusProps {
  qty: number;
  id: string;
  updateAction: ActionStore<any, any, boolean>;
}

export const PlusMinus = component$(
  ({qty, id, updateAction}: PlusMinusProps) => {
    useStylesScoped$(indexCSS);
    return (
      <div>
        <ActionButton action={updateAction} params={{id: id, qtyChange: 1}}>
          +
        </ActionButton>
        <div>{qty}</div>
        <ActionButton action={updateAction} params={{id: id, qtyChange: -1}}>
          -
        </ActionButton>
      </div>
    );
  },
);
