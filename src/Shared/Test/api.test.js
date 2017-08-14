import cookie from 'react-cookies'
import fetchMock from 'jest-fetch-mock'

import { api } from '../api'

const mockResponse = (json, status=200, headers=null) =>
  fetch.mockResponse(JSON.stringify(json), {status: status, headers: headers})

beforeAll(() => global.fetch = fetchMock)

describe('Error response', () => {
  const response = {fake: 'response'};
  const status = 500
  beforeEach(() => mockResponse(response, status))

  test('catches and resolves exception', () => api('fakeurl').catch(e => {
    expect(e.status).toBe(status);

    e.response.then(json => expect(json).toEqual(response))
  }))
})

describe('Calling', () => {
  const response = {fake: 'response'};
  beforeEach(() => mockResponse(response))

  test('stringifies params on get', () => {
    api('fakeurl', {a: 'b', c: 'd'})

    expect(fetchMock).toHaveBeenCalledWith(
      'fakeurl?a=b&c=d',
      {"body": null, "headers": {}, "method": "get", "mode": "cors"}
    )
  })

  test('adds params on body on non-get', () => {
    const body = {a: 'b', c: 'd'}
    var form = new FormData();
    form.append('a', 'b')
    form.append('c', 'd')
    api('fakeurl', body, 'post')

    expect(fetchMock).toHaveBeenCalledWith(
      'fakeurl',
      {"body": form, "headers": {}, "method": "post", "mode": "cors"}
    )
  })
})

describe('Success response', () => {
  const response = {fake: 'response'};
  beforeEach(() => mockResponse(response))

  test('resolves json and doesnt set cookies', () => api('fakeurl').then(json => {
    expect(json).toEqual(response)
    expect(cookie.load('authorization')).toBe(undefined)
  }))
})

describe('Authorization response', () => {
  const response = {fake: 'response'};
  const previousHeaders = {
    'access-token': 'previous access-token',
    'expiry': 'previous expiry',
    'token-type': 'previous token-type',
    'uid': 'previous uid',
    'client': 'previous client'
  }
  const headers = {
    'access-token': 'fake access-token',
    'expiry': 'fake expiry',
    'token-type': 'fake token-type',
    'uid': 'fake uid',
    'client': 'fake client'
  }
  beforeEach(() => mockResponse(response, 200, headers))

  test('sets empty cookie', () => {
    api('fakeurl').then(_ =>
      expect(cookie.load('authorization')).toEqual(headers)
    )
  })

  test('updates previous cookie', () => {
    cookie.save('authorization', previousHeaders, {path: '/'})
    api('fakeurl').then(_ =>
      expect(cookie.load('authorization')).toEqual(headers)
    )
  })
})
