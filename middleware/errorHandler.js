const notFound = (req, res, next) => {
    res.status(404).send("Error Status(404)");
  };
  
  let errors = {
    notFound,
  };
  
module.exports = errors;