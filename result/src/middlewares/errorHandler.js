module.exports = (err, _req, res, _next) => {
    console.log("Error:", err.message, err.stack);

    res.status(err.code ?? 500)
        .json({message: err.message});
}
