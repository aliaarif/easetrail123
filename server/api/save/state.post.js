import StateModel from "~~/server/models/State";
export default defineEventHandler(async event => {
    const body = await readBody(event)
    const res = {}
    try {
        if (body._id) {
            const filter = { _id: body._id }
            StateModel.updateOne(filter, body).exec()
            res.message = 'State Saved!'
        } else {
            StateModel.create(body)
            res.message = 'State Added!'
        }
        return res
    } catch (error) {
        // console.log(error)
    }
})