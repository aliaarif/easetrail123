import SubcategoryModel from "~~/server/models/Subcategory";

export default defineEventHandler(async event => {
    const body = await readBody(event)
    const res = {}
    try {
        if (body._id) {
            const filter = { _id: body._id }
            let result1 = SubcategoryModel.updateOne(filter, body).exec()
            res.status = 200
            res.message = 'Subcategory Saved!'
        } else {
            let result2 = SubcategoryModel.create(body)
            res.status = 200
            res.message = 'Subcategory Added!'
        }
        return res
    } catch (error) {
        // console.log(error)
    }
})