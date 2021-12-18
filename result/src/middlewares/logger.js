module.exports = (req, res, next) => {
    console.log("URL = ", req.url);
    console.log("Original_URL = ", req.originalUrl);
    console.log("METHOD = ", req.method);
    console.log("HOST = ", req.headers.host);
    console.log("IsSecure = ", req.secure);
    console.log("BODY", req.body);
    console.log("QUERY", req.query);

    next();
}
