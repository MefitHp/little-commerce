const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tiendaSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true
  },
  giro: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Producto'
    }
  ],
}, {
    timestamps: {
      createdAt: true,
      updatedAt: true
    },
    versionKey: false
  })

module.exports = mongoose.model('Tienda', tiendaSchema)