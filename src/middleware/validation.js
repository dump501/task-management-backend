const validRegisterParams = async(req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (name && email && password) {
            next()
        } else {
            res.status(400).json({error: `name, email, and password filed are valid`})
        }
    } catch (error) {
        res.status(500).json({ error })
    }
}

const validLoginParams = async(req, res, next) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            next()
        } else {
            res.status(400).json({error: `email, and password filed are valid`})
        }
    } catch (error) {
        res.status(500).json({ error })
    }
}

const validationMiddleware = {
    validRegisterParams,
    validLoginParams 
}

module.exports = validationMiddleware