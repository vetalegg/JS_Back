const asyncHandler = require('./asyncHandler');
const syncHandler = require('./syncHandler');
const notFound = require('./notfound');
const validateToken = require('./validateToken');
const errorHandler = require('./errorHandler');
const httpLogger = require('./logger')
module.exports = {
  errorHandler,
  asyncHandler,
  syncHandler,
  notFound,
  validateToken,
  httpLogger
};
