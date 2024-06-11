import { cnf } from "../environment/config";

const sendRequest = async ({ _method = "GET", _endpoint = "", _payload }) => {
  const url = `${cnf.URI_SERVER}${_endpoint}`;
  const request = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: _method,
    body: _payload && JSON.stringify(_payload),
  }).catch((error) => {
    return error;
  });
  return request;
};

export const sendPost = async (payload, endpoint) =>
  await sendRequest({
    _payload: payload,
    _endpoint: endpoint,
    _method: "POST",
  });

export const sendDelete = async (payload, endpoint) =>
  await sendRequest({
    _payload: payload,
    _endpoint: endpoint,
    _method: "DELETE",
  });

export const sendGet = async (payload, endpoint) =>
  await sendRequest({ _payload: payload, _endpoint: endpoint });
