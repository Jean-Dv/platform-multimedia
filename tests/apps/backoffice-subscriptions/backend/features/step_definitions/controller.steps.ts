import request from 'supertest'
import assert from 'assert'
import { application } from './hooks.steps'
import { Given, Then } from '@cucumber/cucumber'

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

Then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status)
})

Then('the response content should be:', (body: string) => {
  assert.deepStrictEqual(_response.body, JSON.parse(body))
})
