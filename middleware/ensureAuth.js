// middleware/authMiddleware.js
function ensureAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        // return res.render('auth/login');
    }
    next();
}

module.exports = ensureAuthenticated;
