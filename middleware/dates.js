const dates = function (req, _res, next) {
  console.log(`<<< Consulta realizada: ${new Date().toLocaleString()} ${req.method} ${req.url} >>>`)
  next()
}
//error status 404

module.exports = dates;