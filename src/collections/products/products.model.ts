import { model, Schema } from "mongoose"

const productsSchema = new Schema({})

const Products = model('products', productsSchema)

export default Products