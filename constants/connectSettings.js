const { PORT = 3000, PATH_MONGO = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

module.exports = { PORT, PATH_MONGO };
