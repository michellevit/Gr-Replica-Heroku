export const getCsrfToken = () => {
  const tokenMeta = document.querySelector('meta[name="csrf-token"]');
  const tokenData = document.querySelector('#root').dataset.csrfToken;
  const token = tokenMeta ? tokenMeta.getAttribute('content') : tokenData;
  console.log('CSRF Token:', token ? token : 'Token not found');
  return token ? token : '';
};