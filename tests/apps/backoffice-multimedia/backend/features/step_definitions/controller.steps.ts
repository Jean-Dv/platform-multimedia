import request from 'supertest'
import assert from 'assert'
import { Given, Then } from '@cucumber/cucumber'
import { application } from './hooks.steps'

let _request: request.Test
let _response: request.Response

Given(
  'I send a PUT request to {string} with body:',
  (route: string, body: string) => {
    _request = request(application.getHttpServer())
      .put(route)
      .send(JSON.parse(body))
  }
)

Given('I send a DELETE request to {string}', (route: string) => {
  _request = request(application.getHttpServer()).delete(route)
})

Then('the response status code should be {int}', async (statusCode: number) => {
  _response = await _request.expect(statusCode)
})

Then('the response content should be:', (body: string) => {
  assert.deepStrictEqual(_response.body, JSON.parse(body))
})
