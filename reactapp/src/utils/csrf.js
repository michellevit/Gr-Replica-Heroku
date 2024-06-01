export const getCsrfToken = () => {
  const token = document.querySelector('meta[name="csrf-token"]') || document.querySelector('#root').dataset.csrfToken;
  return token ? token.getAttribute('content') : '';
};