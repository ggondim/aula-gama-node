const { MongoClient, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const MongoDbRepository = require('../repositories/MongoDbRepository.js');
const LancamentosRepository = require('../repositories/LancamentosRepository.js');

const connectionString = 'mongodb://localhost:27017/teste';

function validarJwt(token) {
  let valido = false;
  try {
    const payload = jwt.verify(token, 'chavesecreta');
    valido = !!payload;
  } catch {
  }
  return valido;
}

exports.listarLancamentos = async (req, h) => {
  const db = req.server.plugins['hapi-mongodb'].db;
  const repositorio = new LancamentosRepository(db);
  return repositorio.list();
}

exports.listarReceitas = async (req, h) => {
  const db = req.server.plugins['hapi-mongodb'].db;
  const repositorio = new LancamentosRepository(db);
  return repositorio.list({ valor: { $gte: 0 } });
};

exports.listarDespesas = async (req, h) => {
  const db = req.server.plugins['hapi-mongodb'].db;
  const repositorio = new LancamentosRepository(db);
  return repositorio.list({ valor: { $lt: 0 } });
};

exports.obterLancamento = async (req, h) => {
  const db = req.server.plugins['hapi-mongodb'].db;
  const repositorio = new LancamentosRepository(db);
  const lancamento = await repositorio.getById(req.params.id);

  return lancamento;
}

exports.inserirLancamento = async (req, h) => {
  const db = req.server.plugins['hapi-mongodb'].db;
  const repoLancamentos = new LancamentosRepository(db);
  const repoCategorias = new MongoDbRepository(db, 'categorias');

  const { categoria: nome, valor, descricao } = req.payload;

  const categoria = await repoCategorias.get({ nome }, { projection: { _id: 1 } });
  const lancamento = {
    descricao,
    valor,
    categoria: categoria?._id,
    criacao: new Date(),
  };

  return repoLancamentos.insert(lancamento);
}

exports.atualizarLancamento = async (req, h) => {
  const db = req.server.plugins['hapi-mongodb'].db;
  const repoLancamentos = new LancamentosRepository(db);
  const repoCategorias = new MongoDbRepository(db, 'categorias');

  const { categoria: nome } = req.payload;
  const lancamento = req.payload;

  if (nome) {
    const categoria = await repoCategorias.get({ nome }, { projection: { _id: 1 } });
    lancamento.categoria = categoria?._id;
  }

  return repoLancamentos.update(req.params.id, lancamento);
}

exports.apagarLancamento = async (req, h) => {
  const db = req.server.plugins['hapi-mongodb'].db;
  const repoLancamentos = new LancamentosRepository(db);
  return repoLancamentos.delete(req.params.id);
}

exports.obterSaldo = async (req, h) => {
  const db = req.server.plugins['hapi-mongodb'].db;
  const repoLancamentos = new LancamentosRepository(db);

  const saldo = await repoLancamentos.obterSaldo(db);
  return saldo;
}

exports.agruparPorCategoria = async (req, h) => {
  const db = req.server.plugins['hapi-mongodb'].db;
  const repoLancamentos = new LancamentosRepository(db);

  return repoLancamentos.resumoPorCategoria();
}