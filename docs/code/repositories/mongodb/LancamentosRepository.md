---
title: LancamentosRepository
---

# LancamentosRepository

<a name="LancamentosRepository"></a>

## LancamentosRepository
**Kind**: global class  

* [LancamentosRepository](#LancamentosRepository)
    * [new LancamentosRepository(db)](#new_LancamentosRepository_new)
    * [.converterImagemBase64(doc)](#LancamentosRepository+converterImagemBase64)
    * [.converterNomeCategoria(doc)](#LancamentosRepository+converterNomeCategoria)
    * [.insert(doc)](#LancamentosRepository+insert) ⇒ <code>Promise.&lt;Object&gt;</code>

<a name="new_LancamentosRepository_new"></a>

### new LancamentosRepository(db)
Inicializa uma nova instância da classe LancamentosRepository


| Param | Type | Description |
| --- | --- | --- |
| db | <code>Db</code> | Instância de banco de dados do MongoDB (db) |

<a name="LancamentosRepository+converterImagemBase64"></a>

### lancamentosRepository.converterImagemBase64(doc)
Converte a propriedade `imagem` de um objeto para um Binary do MongoDB

**Kind**: instance method of [<code>LancamentosRepository</code>](#LancamentosRepository)  

| Param | Type | Description |
| --- | --- | --- |
| doc | <code>Object</code> | Objeto com a propriedade imagem a ser convertida. |

<a name="LancamentosRepository+converterNomeCategoria"></a>

### lancamentosRepository.converterNomeCategoria(doc)
Converte a propriedade `categoria` de um objeto para um ObjectId correspondente à categoria no banco de dados

**Kind**: instance method of [<code>LancamentosRepository</code>](#LancamentosRepository)  

| Param | Type | Description |
| --- | --- | --- |
| doc | <code>Object</code> | Objeto com a propriedade `categoria` a ser convertida. |

<a name="LancamentosRepository+insert"></a>

### lancamentosRepository.insert(doc) ⇒ <code>Promise.&lt;Object&gt;</code>
Insere um novo lançamento no banco de dados.

**Kind**: instance method of [<code>LancamentosRepository</code>](#LancamentosRepository)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - Promise resolvida com o documento inserido, junto com a propriedade _id  

| Param | Type | Description |
| --- | --- | --- |
| doc | <code>Object</code> | Documento a ser inserido no banco de dados. |

**Example**  
```js
repositorio = await insert({ valor: -69.47 })
```
