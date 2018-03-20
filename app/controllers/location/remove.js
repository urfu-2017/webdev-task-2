import DB, { Location } from '../../models/Location'
import { NOT_FOUND, OK } from 'http-status-codes'

export default ({ params }, res) => DB.write(() => {
    const location = DB.objectForPrimaryKey(Location.NAME, Number(params.id))

    if (location) {
        DB.delete(location)

        res.sendStatus(OK)
    } else {
        res.sendStatus(NOT_FOUND)
    }
})
