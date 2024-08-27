// middleware/authMiddleware.js
function ensureAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        // res.redirect('/login');
    }
    return next();
}

module.exports = ensureAuthenticated;
