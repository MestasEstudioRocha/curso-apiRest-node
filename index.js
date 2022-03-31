'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Product = require('./models/product');

const app = express();
const port = process.env.PORT || '3000';

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get('/api/product', (req, res) => {
    res.send(200, {
        products: []
    })
})

app.get('/api/product/:productId', (req, res) => {

})

app.post('/api/product', (req, res) => {
    console.log('POST /api/product')
    console.log(req.body)
    let product = new Product();
    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description

    product.save((err, productStored) => {
        if (err) res.status(500).send({
            message: `errror al guardar en la base de dartos ${err}`
        })

        res.status(200).send({
            product: productStored
        })
    })
})

app.put('/api/product/:productId', (req, res) => {

})

app.delete('/api/product/:productId', (req, res) => {

})

mongoose.connect('mongodb://localhost:27017/shop'), (err, res) => {
    if (err) {
        return console.log(`error al conectarse a la base de datos: ${err}`)
    }
    console.log('coneccion con la base de datos establecida... ');

}
app.listen(port, () => {
    console.log(`API REST corriendo en http://localhost:${port}`)
})