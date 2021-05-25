
module.exports = (res, e) => {
   return res.status(400).json({
        message: e.message
    })
}