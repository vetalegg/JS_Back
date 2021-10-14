module.exports = (err, req, res, next) => {
    err.error = true;
    res.status(err.httpCode ?? 200)
    delete err.httpCode;

    console.log('Response error: ', err);
    res.json(err);
}