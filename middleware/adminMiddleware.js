
const adminMiddleware = async (req, res, next) => {
    if(!req.user.isAdmin){
        res.status(403).json({'msg' : 'Yetkiniz bulunmamaktadır !'})
    }
    next();
};

module.exports = adminMiddleware;
