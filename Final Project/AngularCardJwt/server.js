function requiredHTTPS(req, res, next) {
    //membuat semua request yang sebelumnya http biasa menjadi https
    if (
        !res.secure
        // untuk server yang di deploy di heroku
        && res.get('x-forwarded-proto') !== 'https'
    ) {
        return res.redirect(
            'https://' + req.get('host') + req.url
        );
    }
    next();
}

const express = require('express');
const app = express();
const port = process.env.PORT || 8080

// app.use(requiredHTTPS);
// nama app di package.json
app.use(express.static('./dist/angular-card-jwt'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', { root: 'dist/angular-card-jwt/' }),
);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})