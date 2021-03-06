const RestRepository = require('../repositories/rest/RestRepository.js');
const LancamentosRepository = require('../repositories/rest/LancamentosRepository.js');

const apiUrl = 'http://localhost:3030';

exports.listarLancamentos = async (req, h) => {
  const repositorio = new RestRepository(apiUrl, '/lancamentos');
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
  const repositorio = new RestRepository(apiUrl, '/lancamentos');
  const lancamento = await repositorio.getById(req.params.id);
  return lancamento;
}

exports.inserirLancamento = async (req, h) => {
  const repoLancamentos = new RestRepository(apiUrl, '/lancamentos');
  return repoLancamentos.insert(lancamento);
}

exports.atualizarLancamento = async (req, h) => {
  const repoLancamentos = new RestRepository(apiUrl, '/lancamentos');
  return repoLancamentos.update(req.params.id, req.payload);
}

exports.apagarLancamento = async (req, h) => {
  const repoLancamentos = new RestRepository(apiUrl, '/lancamentos');
  return repoLancamentos.delete(req.params.id);
}

exports.obterSaldo = async (req, h) => {
  const repoLancamentos = new LancamentosRepository(apiUrl);

  const saldo = await repoLancamentos.obterSaldo();
  return saldo;
}

exports.agruparPorCategoria = async (req, h) => {
  const repoLancamentos = new LancamentosRepository(apiUrl);

  return repoLancamentos.resumoPorCategoria();
}