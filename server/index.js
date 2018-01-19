var express = require('express')
var cors = require('cors')
require('dotenv').config()
var bodyParser = require('body-parser')
var multipart = require('connect-multiparty')
var jwt = require('express-jwt')
var morgan = require('morgan')
var jwks = require('jwks-rsa');
var compression = require('compression')
var helmet = require('helmet')
const routes = require('./routes')

var app = express()
const router = express.Router()

/* Configure Middlewares */
app.use(helmet())
if (process.env.NODE_ENV != 'test')
    app.use(morgan('common'))
app.use(cors())
app.use(bodyParser.json())
app.use(compression())

/*var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://{YOUR-AUTH0-URL-HERE}.auth0.com/.well-known/jwks.json"
    }),
    audience: '{YOUR-API-AUDIENCE-GOES-HERE}',
    issuer: "{YOUR-AUTH0-ISSUER-HERE}",
    algorithms: ['RS256']
});

app.use(jwtCheck);

// catch error
app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Invalid token, or no token supplied!');
    } else {
        res.status(401).send(err);
    }
});
*/
app.use((err, request, response, next) => {

    response.status(err.status || 500);
    response.json({
        error: "Server error"
    })
});

routes(router)
app.use('/api', router)
let port = process.env.PORT || 3003

app.listen(port, () => {
    console.log(`Server listening on port:${port}`)
})
module.exports = app