import { EXAMPLE_REQUEST_RESULT, EXAMPLE_RECEIVE_RESULT } from "./constant";

export const fetchSomething = (payload) => (dispatch) => {
  dispatch(exampleRequestResult(payload));

  let url = "https://url.com/api";

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      dispatch(processResponse(data));
    })
    .catch((error) => {
      console.error(error);
    });
};

const parseData = (someData) => {
  // Do something with the data
  if (someData) {
    let newData = [];

    return newData;
  }
};

const processResponse = (data) => (dispatch) => {
  const result = parseData(data);

  dispatch(exampleReceiveResult(result));
};

export const exampleRequestResult = (payload) => ({
  type: EXAMPLE_REQUEST_RESULT,
  ...payload,
});

export const exampleReceiveResult = (payload) => ({
  type: EXAMPLE_RECEIVE_RESULT,
  results: payload,
});
