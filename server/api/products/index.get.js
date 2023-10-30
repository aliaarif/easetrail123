import ProductModel from "~~/server/models/Product";

export default defineEventHandler(async (event) => {
    const params = getQuery(event)
    try {
            return ProductModel.find({status: 'Active'})
    } catch (error) {
        // // console.log(error)
    }
})