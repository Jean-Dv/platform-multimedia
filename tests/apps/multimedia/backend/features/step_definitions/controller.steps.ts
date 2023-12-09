import jwt from 'jsonwebtoken'
import { Given, Then } from '@cucumber/cucumber'
import assert from 'assert'
import request from 'supertest'
import { application } from './hooks.steps'
import authConfig from '@Auth/Shared/infrastructure/config'

let _request: request.Test
let _response: request.Response
let _token: string

Given('I have a valid token', () => {
  _token = jwt.sign(
    {
      userId: '050d3d09-0ffc-40a9-bb66-cd9cabae60b8',
      roleId: '050d3d09-0ffc-40a9-bb66-cd9cabae60b6'
    },
    authConfig.get('auth.secret'),
    {
      expiresIn: 15 * 60 * 1000
    }
  )
})

Given('I send a GET request to {string}', (route: string) => {
  if (_token !== undefined) {
    _request = request(application.getHttpServer())
      .get(route)
      .set('Authorization', `Bearer ${_token}`)
    return
  }
  _request = request(application.getHttpServer()).get(route)
})

Given(
  'I send a PUT request to {string} with body:',
  (route: string, body: string) => {
    if (_token !== undefined) {
      _request = request(application.getHttpServer())
        .put(route)
        .set('Authorization', `Bearer ${_token}`)
        .send(JSON.parse(body))
      return
    }
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

Given('I send a DELETE request to {string}', (route: string) => {
  if (_token !== undefined) {
    _request = request(application.getHttpServer())
      .delete(route)
      .set('Authorization', `Bearer ${_token}`)
    return
  }
  _request = request(application.getHttpServer()).delete(route)
})

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
