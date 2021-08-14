const request = require('supertest')
const app = require('src/services/server')

test('GET request - test healthcheck', async () => {
    await request(app).get('/api/healthcheck')
        .send()
        .expect(200)
})
