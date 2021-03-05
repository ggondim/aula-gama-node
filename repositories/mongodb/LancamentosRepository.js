const { Binary } = require('mongodb');
const MongoDbRepository = require('./MongoDbRepository.js');


class LancamentosRepository extends MongoDbRepository {
  constructor(db) {
    super(db, 'lancamentos');
  }

  converterImagemBase64(doc) {
    if (doc.imagem) {
      const buffer = Buffer.from(doc.imagem, 'base64');
      doc.imagem = new Binary(buffer);
    }
  }

  async converterNomeCategoria(doc) {
    if (doc.categoria) {
      const query = { nome: doc.categoria };
      const collectionCategoria = this.db.collection('categorias');
      const categoria = await collectionCategoria.findOne(query, { projection: { _id: 1 } });
      doc.categoria = categoria?._id;
    }
  }

  async insert(doc) {
    this.converterImagemBase64(doc);
    await this.converterNomeCategoria(doc);
    return super.insert(doc);
  }

  async update(id, obj) {
    this.converterImagemBase64(obj);
    await this.converterNomeCategoria(obj);
    return super.update(id, obj);
  }

  async obterSaldo() {
    const resultado = await this.collection.aggregate([
      {
        $group: {
            _id: '',
            saldo: { $sum: '$$ROOT.valor' }
        }
      }
    ]).toArray();
    const [{ saldo }] = resultado;
    return saldo;
  }

  async resumoPorCategoria() {
    const agrupamentos = await this.collection.aggregate([
      {
        $group: { _id: '$categoria', total: { $sum: '$$ROOT.valor' } }
      },
      {
        $lookup: {
          from: 'categorias',
          localField: '_id',
          foreignField: '_id',
          as: 'categoria'
        }
      },
      {
        $unwind: '$categoria'
      },
      {
        $project: { total: 1, categoria: '$categoria.nome', _id: 0 }
      }
    ]).toArray();

    const resultado = agrupamentos.reduce((acumulador, { total, categoria }) => {
      acumulador[categoria] = total;
      return acumulador;
    }, {});

    return resultado;
  }
}

module.exports = LancamentosRepository;