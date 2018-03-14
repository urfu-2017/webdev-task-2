import DB, { Location } from '../../models/Location'
import { NOT_FOUND, OK } from 'http-status-codes/index'

export default ({ params }, res) => DB.write(() => {
    const location = DB.objectForPrimaryKey(Location.NAME, params.uuid)

    if (location) {
        DB.delete(location)

        res.sendStatus(OK)
    } else {
        res.sendStatus(NOT_FOUND)
    }
})
