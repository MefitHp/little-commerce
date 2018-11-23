const express = require('express')
const router = express.Router()
const Producto = require('../models/Producto')
const Tienda = require('../models/Tienda')

//crear productos
router.get('/new/:tiendaID', (req, res, next) => {
  const { tiendaID } = req.params
  const action = `/productos/new/${tiendaID}`
  res.render('productos/crear-producto', { action })
})

router.post('/new/:tiendaID', (req, res, next) => {
  const { tiendaID } = req.params
  Producto.create({ tiendaID, ...req.body })
    .then(producto => {
      Tienda.findByIdAndUpdate(tiendaID, { $push: { products: producto._id } })
        .then(tienda => {
          res.redirect(`/productos/detail/${producto._id}`)
        }).catch(err => next(err))
    }).catch(err => {
      res.render('productos/crear-producto', { err, producto: req.body })
    })
})

//Detalle producto

router.get('/detail/:id', (req, res, next) => {
  const { id } = req.params
  Producto.findById(id).populate('tiendaID')
    .then(producto => {
      res.render('productos/detalle', producto)
    }).catch(err => next(err))
})


module.exports = router