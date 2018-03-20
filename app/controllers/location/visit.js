import DB, { Location } from '../../models/Location'
import { NOT_FOUND } from 'http-status-codes'

export default ({ params }, res) => DB.write(() => {
    const location = DB.objectForPrimaryKey(Location.NAME, Number(params.id))

    if (location) {
        location[Location.FIELDS.VISITED] = true

        res.json(location)
    } else {
        res.sendStatus(NOT_FOUND)
    }
})
