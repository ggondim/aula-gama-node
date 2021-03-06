
/**
 * Endpoint PUT de JavaScript
 * @param {String} req Requisição do Hapi
 * @param {String} res Resposta do Hapi
 * @returns {Object} Objeto com a resposta do nosso enpoint
 * @example
 *   javascript(req, res);
 *   function javascript(req, res) {
 *     return { linguagem: 'JavaScript' };
 *   }
 */
function javascript(req, res) {
  return { linguagem: 'JavaScript' };
}

function python(req, res) {
  javascript()
  return { linguagem: 'Python' };
}

module.exports = {
  javascript,
  python,
};
