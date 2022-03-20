function errorHandler(error, req, res, next){
    // Hata yakalndığındığında çalışan middleware 
    // Database loglama için kaydedilebilir
    res.statusCode = error.statusCode || 400;
    res.json({
        statusCode : error.statusCode || 400,
        message : error.message
    })
}

module.exports = errorHandler