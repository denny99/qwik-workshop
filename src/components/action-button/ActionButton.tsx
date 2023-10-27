import {component$, JSXChildren} from '@builder.io/qwik';
import {ActionStore, Form} from '@builder.io/qwik-city';

interface ActionButtonProps {
  action: ActionStore<any, any>;
  children: JSXChildren;
  params?: Record<string, any>;
}

export const ActionButton = ({
                               action,
                               children,
                               params,
                             }: ActionButtonProps) => {
  return (
    <Form action={action}>
      {params &&
        Object.keys(params).map((key) => (
          <input key={key} type="hidden" name={key} value={params[key]} />
        ))}
      <button>{children}</button>
    </Form>
  );
};

