import Products, { productSchema } from '../models/Products'

export const createProduct = (req, res) => {
    console.log(req.body)

    const {name, category, price, imgUrl} = req.body

    const newProduct = new Products({name, category, price, imgUrl})

    newProduct.save().then((productSave) => res.status(201).json(productSave));    
    
}

export const getProducts = (req, res) => {
    Products.find().then((productList) => res.json(productList))    
}

export const getProductById = (req, res) => {
    Products.findById(req.params.productId).then((product) => res.status().json(product))    
}

export const updateProductById = (req, res) => {
    Products.findByIdAndUpdate(req.params.productId, req.body, {new:true}).then((updatedProduct) => res.status(204).json(updatedProduct))
}

export const deleteProductById = (req, res) => {
    const {productId} = req.params;
    Products.findByIdAndDelete(productId).then(() => res.status(204).json());    

}