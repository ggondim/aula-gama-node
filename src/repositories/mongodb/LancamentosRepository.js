const { Binary } = require('mongodb');
const MongoDbRepository = require('./MongoDbRepository.js');

class LancamentosRepository extends MongoDbRepository {
  /**
   * Inicializa uma nova instância da classe LancamentosRepository
   * @param {Db} db Instância de banco de dados do MongoDB (db)
   */
  constructor(db) {
    super(db, 'lancamentos');
  }

  /**
   * Converte a propriedade `imagem` de um objeto para um Binary do MongoDB
   * @param {Object} doc Objeto com a propriedade imagem a ser convertida.
   */
  converterImagemBase64(doc) {
    if (doc.imagem) {
      const buffer = Buffer.from(doc.imagem, 'base64');
      doc.imagem = new Binary(buffer);
    }
  }

  /**
   * Converte a propriedade `categoria` de um objeto para um ObjectId correspondente à categoria no banco de dados
   * @param {Object} doc Objeto com a propriedade `categoria` a ser convertida.
   */
  async converterNomeCategoria(doc) {
    if (doc.categoria) {
      const query = { nome: doc.categoria };
      const collectionCategoria = this.db.collection('categorias');
      const categoria = await collectionCategoria.findOne(query, { projection: { _id: 1 } });
      doc.categoria = categoria?._id;
    }
  }

  /**
   * Insere um novo lançamento no banco de dados.
   * @async
   * @param {Object} doc Documento a ser inserido no banco de dados.
   * @returns {Promise<Object>} Promise resolvida com o documento inserido, junto com a propriedade _id
   * @example
   * repositorio = await insert({ valor: -69.47 })
   */
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
        $lookup:
        {
            from: 'categorias',
            let: { idCategoria: '$_id' },
            pipeline: [
                { $match: { $expr: { $eq: ['$$idCategoria', '$_id'] } } },
                { $project: { nome: 1, _id: 0 } }
            ],
            as: 'categoria'
        }
      },
      {
          $unwind: '$categoria'
      },
      {
          $project: { _id: 0, categoria: '$categoria.nome', total: 1 }
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