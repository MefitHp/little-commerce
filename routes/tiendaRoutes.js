const express = require('express')
const router = express.Router()
const Tienda = require('../models/Tienda')

//Crear tienda
router.get('/new', (req, res) => {
  const action = '/tiendas/new'
  res.render('tiendas/crear-tienda', { action })
})
router.post('/new', (req, res) => {
  Tienda.create(req.body)
    .then(tienda => {
      res.render('tiendas/tienda-creada', tienda)
    }).catch(err => {
      res.render('tiendas/crear-tienda', { tienda: req.body, err })
    })
})

//Listar tiendas
router.get('/', (req, res, next) => {
  Tienda.find()
    .then(tiendas => {
      res.render('tiendas/lista', { tiendas })
    }).catch(err => {
      next(err)
    })
})

//Detalle tienda
router.get('/detail/:id', (req, res, next) => {
  const { id } = req.params
  Tienda.findById(id).populate('products')
    .then(tienda => {
      console.log(tienda)
      res.render('tiendas/detalle-tienda', tienda)
    }).catch(err => next(e))
})

//Editar tienda

router.get('/update/:id', (req, res, next) => {
  const { id } = req.params
  const action = `/tiendas/update/${id}`
  Tienda.findById(id)
    .then(tienda => {
      res.render('tiendas/crear-tienda', { tienda, action })
    }).catch(err => next(err))
})

router.post('/update/:id', (req, res, next) => {
  const { id } = req.params
  Tienda.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then(tienda => {
      res.redirect(`/tiendas/detail/${id}`)
    }).catch(err => {
      res.render('tiendas/crear-tienda', { tienda: req.body, err })
    })
})

//Eliminar tienda

router.get('/delete/:id', (req, res, next) => {
  const { id } = req.params
  Tienda.findById(id)
    .then(tienda => {
      res.render('tiendas/delete', tienda)
    }).catch(err => next(err))
})

router.post('/delete/:id', (req, res, next) => {
  const { id } = req.params
  Tienda.findByIdAndRemove(id)
    .then(tienda => {
      res.redirect('/tiendas')
    }).catch(err => next(err))
})
module.exports = router