const hapiMongodb = require('hapi-mongodb');

module.exports = async (server) => {

  await server.register({
    plugin: hapiMongodb,
    options: {
      url: 'mongodb://localhost:27017/teste'
    },
    decorate: true
  });

}