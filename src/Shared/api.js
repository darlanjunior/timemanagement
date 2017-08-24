import cookie from 'react-cookies'
import queryString from 'query-string'

function HttpErrorException(response, status) {
  return {
    response: response,
    status: status
  }
}

const authorizationHeaders = headers =>
  [
    'access-token',
    'expiry',
    'token-type',
    'uid',
    'client'
  ].reduce(
    (acc, header) => Object.assign(acc, {[header]: headers.get(header)}),
    {}
  )

const handleHttpErrorCodes = response => {
  if (!response.ok) {
    return response.json().then((json) => { throw HttpErrorException(json, response.status) })
  }

  return response;
}

const persistAuthorizationHeaders = response => {
  const headers = authorizationHeaders(response.headers)

  if (!!headers['access-token']) {
    cookie.save('authorization',
    {
      ...cookie.load('authorization'),
      ...headers,
      'Cache-Control': 'no-cache'
    },
    {
      path: '/',
      maxAge: headers['expiry'],
      httpOnly: false
    })
  }
  return response;
}

const loadAuthorizationHeaders = () => (
  (!!cookie.load('authorization')? cookie.load('authorization') : {})
)

const buildURL = (url, params, method) => (
  method === 'get'? `${url}?${queryString.stringify(params)}` : url
)

const jsonToFormData = json => {
  const form = new FormData();
  Object.keys(json).forEach(key => form.append(key, json[key]))

  return form
}

const api = (url, params={}, method="get", headers={}) =>
  fetch(buildURL(url, params, method), {
    method: method,
    headers: {
      ...loadAuthorizationHeaders(),
      ...headers
    },
    mode: 'cors',
    body: ['get', 'head'].includes(method)? null : jsonToFormData(params)
  })
  .then(persistAuthorizationHeaders)
  .then(handleHttpErrorCodes)
  .then(response => response.json())

export { HttpErrorException, api };
