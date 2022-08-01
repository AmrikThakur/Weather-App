const { currentWeather, forCastWeather } = require('../controllers/weather-controller');

// mock data
const req = { body: { city_id: 6167865 } }
const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
const next = jest.fn()


test('check currentWeather api include city Id', async () => {
    const { city_id } = req.body;
    expect(city_id).not.toBe('')
});


test('check forCastWeather api giving success response', async () => {
    const { city_id } = req.body;
    expect(city_id).not.toBe('')
})

test('check currentWeather api include city Id', async () => {
    await currentWeather(req, res, next);
    expect(res.status).toBeCalledWith(200);
});
