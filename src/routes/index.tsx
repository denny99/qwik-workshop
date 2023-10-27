import {component$} from '@builder.io/qwik';
import {useAuthSession} from '~/routes/plugin@auth';
import {RequestEvent, routeAction$} from '@builder.io/qwik-city';

export const onGet = async ({ cookie, redirect }: RequestEvent) => {
  if (cookie.has('next-auth.session-token')) {
    console.log('Authenticated');
    throw redirect(302, '/cart');
  } else {
    throw redirect(302, '/login');
  }
};

export default component$(() => {
  return (
    <>
    </>
  );
});
