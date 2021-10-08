const redis = require("redis");
const client = redis.createClient();

const { promisify } = require("util");
const redisGet = promisify(client.get).bind(client);
const redisSet = promisify(client.set).bind(client);

module.exports = { redisGet, redisSet };
