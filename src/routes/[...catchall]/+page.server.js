import { redirect } from '@sveltejs/kit';

const refs = {
  sentinel: 'lin_post_refer',
  // buybox: '',
}

export function load({ params }) {
  let requestedRoute;

  if (!params.catchall) {
    requestedRoute = '';
  } else if (Array.isArray(params.catchall)) {
    requestedRoute = params.catchall.join('/');
  } else {
    requestedRoute = params.catchall;
  }
  const refKind = refs[requestedRoute] || '';
  return { ref: refKind }
}

