const RestRepository = require('./RestRepository.js');

class LancamentosRepository extends RestRepository {
  constructor(apiUrl) {
    super(apiUrl, '/lancamentos');
  }

  async obterSaldo() {
    const lancamentos = await this.list();
    return lancamentos.reduce((saldo, { valor }) => {
      return saldo + valor;
    }, 0);
  }

  async resumoPorCategoria() {
    const lancamentos = await this.list();

    return lancamentos.reduce((grupos, lancamento) => {
      if (!grupos[lancamento.categoria]) {
        grupos[lancamento.categoria] = lancamento.valor;
      } else {
        grupos[lancamento.categoria] += lancamento.valor;
      }
      return grupos;
    }, {});
  }
}

module.exports = LancamentosRepository;