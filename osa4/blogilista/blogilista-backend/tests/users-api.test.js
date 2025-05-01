const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test-helper'
const bcrypt = require('bcrypt')

const api = supertest(app)

describe('when initial users are loaded to db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = ('sekret', 10)
    const user = new User({username: 'root', passwordHash })

    await user.save()
  })

  test('user can be saved', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "test",
      name: "test user",
      password: "sekret"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtStart.length + 1, usersAtEnd.length)

    const usernamesAtEnd = usersAtEnd.map(u => u.username)
    assert(usernamesAtEnd.includes(newUser.username))
  })


})

after(async () => {
  await mongoose.connection.close()
})
