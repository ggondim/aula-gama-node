const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');

const connectionString = 'mongodb://localhost:27017/teste';

exports.token = async (req, h) => {
  const response = h.response();

  const { authorization } = req.headers;

  if (!authorization) {
    return h.response({ error: 'Authorization não foi enviado!' }).code(401);
  }

  const [scheme, valor] = authorization.split(' ');

  if (scheme !== 'Basic') {
    return h.response({ error: 'Scheme inválido' }).code(401);
  }

  const credenciais = Buffer.from(valor, 'base64').toString();
  const [email, senha] = credenciais.split(':');

  if (!email || !senha) {
    response.statusCode = 401;
    return { error: 'Não existe usuário ou senha' };
  }

  const client = await MongoClient.connect(connectionString);
  const db = client.db('teste');

  const usuario = await db.collection('usuarios').findOne({ email, senha});

  if (!usuario) {
    response.statusCode = 401;
    return { error: 'Usuário ou senha inválidos' };
  }

  const token = jwt.sign({ sub: usuario._id.toString() }, 'chavesecreta');

  return {
    access_token: token,
  };
}