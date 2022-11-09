import getToken from '../../services/fetchToken';

export const SUCCESS_TOKEN = 'SUCCESS_TOKEN';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const ERROR_TOKEN = 'ERROR_TOKEN';

export const requestToken = () => ({
  type: REQUEST_TOKEN,
});

export const successToken = (payload) => ({
  type: SUCCESS_TOKEN,
  payload,
});

export const errorToken = (error) => ({
  type: ERROR_TOKEN,
  error,
});

export function thunkToken() {
  return async (dispatch) => {
    dispatch(requestToken());
    try {
      const response = await getToken();
      dispatch(successToken(response));
    } catch (error) {
      dispatch(errorToken(error));
    }
  };
}
