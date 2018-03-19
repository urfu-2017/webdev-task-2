import DB, { Location } from '../../models/Location'
import { CREATED } from 'http-status-codes'

export default ({ body }, res) => DB.write(() => {
    let location

    try {
        const maxOrder = DB.objects(Location.NAME).max('order') || 0
        const entity = Location.create({ ...body, [Location.FIELDS.ORDER]: maxOrder + 1 })
        location = DB.create(Location.NAME, entity)
        res.status(CREATED).json(location)
    } catch (e) {
        throw new Error('The sent object does not match the schema.')
    }
})
