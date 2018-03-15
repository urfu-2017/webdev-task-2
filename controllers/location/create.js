import DB, { Location } from '../../models/Location'
import { CREATED } from 'http-status-codes'

export default ({ body }, res) => DB.write(() => {
    let location;

    try {
        const nextOrder = DB.objects(Location.NAME)
            .sorted(Location.FIELDS.ORDER, true)
            .length + 1

        const entity = Location.create({ ...body, [Location.FIELDS.ORDER]: nextOrder })

        location = DB.create(Location.NAME, entity)

        res.status(CREATED).json(location)
    } catch (e) {
        DB.delete(location)
        throw new Error(e.message)
    }
})
