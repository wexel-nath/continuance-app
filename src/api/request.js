export const request = promise => {
  return promise.then(response => response).catch(error => error.response);
};
