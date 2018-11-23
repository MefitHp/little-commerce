const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productoSchema = new Schema({
  nombre: String,
  code: {
    type: String,
    unique: true
  },
  photoURL: String,
  price: Number,
  marca: String,
  tiendaID: {
    type: Schema.Types.ObjectId,
    ref: 'Tienda'
  }
},
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
    versionKey: false
  })

module.exports = mongoose.model('Producto', productoSchema)