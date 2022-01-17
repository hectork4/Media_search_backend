import Products, { productSchema } from '../models/Products'

export const createProduct = async(req, res) => {
    console.log(req.body)

    const {name, category, price, imgUrl} = req.body

    const newProduct = new Products({name, category, price, imgUrl})

    const productSave = await newProduct.save()  
    
    res.status(201).json(productSave)
}

export const getProducts = async(req, res) => {
    const productList = await Products.find() 
    res.json(productList)
}

export const getProductById = async(req, res) => {
    const product = await Products.findById(req.params.productId) 
    res.status().json(product)
}

export const updateProductById = async(req, res) => {
    const updatedProduct = await Products.findByIdAndUpdate(req.params.productId, req.body, {new:true}) 
    res.status(204).json(updatedProduct)
}

export const deleteProductById = async(req, res) => {
    const {productId} = req.params;
    await Products.findByIdAndDelete(productId);
    res.status(204).json();

}