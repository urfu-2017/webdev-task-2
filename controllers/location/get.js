import DB, { Location } from '../../models/Location'
import { NOT_FOUND } from 'http-status-codes/index'

export default ({ params }, res) => {
    const location = DB.objectForPrimaryKey(Location.NAME, params.uuid)

    if (location) {
        res.json(location)
    } else {
        res.sendStatus(NOT_FOUND)
    }
}
