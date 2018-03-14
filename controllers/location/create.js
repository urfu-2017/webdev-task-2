import DB, { Location } from '../../models/Location'
import { CREATED } from 'http-status-codes/index'

export default ({ body }, res) => DB.write(() => {
    let location;

    try {
        const results = DB.objects(Location.NAME).sorted(Location.FIELDS.ORDER, true)

        location = DB.create(Location.NAME,
            Location.create({ ...body, [Location.FIELDS.ORDER]: results.length + 1 })
        )

        res.status(CREATED).json(location)
    } catch (e) {
        DB.delete(location)
        throw new Error(e.message)
    }
})
