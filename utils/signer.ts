type SignType = 'sign';

// getSignature: (address, type) => {
//   return axios.get(`${config.apiGateway.URL}/signature/${address}_${type}`);
// },

export const postSignature = (
  message: string,
  signature: string,
  address: string,
  type: SignType,
): void => {
  const resp = fetch(`${config.apiGateway.URL}/signature`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      type,
      message,
      address,
      signature,
    }),
  });
  console.log(resp); // eslint-disable-line no-console
};
