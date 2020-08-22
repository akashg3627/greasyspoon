module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.status(401).json({
            error: 'Unauthorized'
        })
    },
    ensureUser: function(req, res, next) {
        if (req.isAuthenticated() && req.user.role == 'User') {
            return next();
        } else {
            res.status(401).json({
                error: 'Unauthorized',
            })
        }
    },
    ensureCafe: function(req, res, next) {
        if (req.isAuthenticated() && req.user.role == 'Cafe') {
            return next();
        } else {
            res.status(401).json({
                error: 'Unauthorized',
            })
        }
    }

}

