// import SubcategoryModel from "~~/server/models/Subcategory"
import BusinessModel from "~~/server/models/Business"

// import { useCommon } from "~~/composables/useCommon"

// const { auth } = useCommon()

// import saveAs from 'file-saver'
export default defineEventHandler(async (event) => {



    const body = await readBody(event)
    const res = {}
    try {

        // const meta = await SubcategoryModel.findOne({ name: body.business_category }, {})
        // body.page_title = meta.page_title

        if (body._id) {
            const filter = { _id: body._id }
            let result1 = await BusinessModel.updateOne(filter, body).exec()
            res.status = 200
            res.message = 'Business Saved!'
        } else {
            // return body
            let result2 = await BusinessModel.create(body)
            res.status = 200
            res.message = 'Business Added!'
        }
        return res
    } catch (error) {
        console.log(error)
    }
})