export const getCsrfToken = () => {
  const token = document.querySelector('meta[name="csrf-token"]') || document.querySelector('#root').dataset.csrfToken;
  console.log('CSRF Token:', token ? token.getAttribute('content') : 'Token not found');
  return token ? token.getAttribute('content') : '';
};
