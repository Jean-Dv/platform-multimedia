import { Given, Then } from '@cucumber/cucumber'
import assert from 'assert'
import request from 'supertest'
import { application } from './hooks.steps'

let _request: request.Test
let _response: request.Response

Given('I send a GET request to {string}', (route: string) => {
  _request = request(application.getHttpServer()).get(route)
})

Given(
  'I send a PUT request to {string} with body:',
  (route: string, body: string) => {
    _request = request(application.getHttpServer())
      .put(route)
      .send(JSON.parse(body))
  }
)

Given(
  'I send a POST request to {string} with body:',
  (route: string, body: string) => {
    _request = request(application.getHttpServer())
      .post(route)
      .send(JSON.parse(body))
  }
)

Then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status)
})

Then('the response content should not be empty', () => {
  assert.notEqual(_response.body.length, 0)
})

Then('the response content should be:', (body: string) => {
  assert.deepStrictEqual(_response.body, JSON.parse(body))
})

Then('the response content should be an array', () => {
  assert.deepStrictEqual(Array.isArray(_response.body.data), true)
})
