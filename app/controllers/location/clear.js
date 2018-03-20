import DB, { Location } from '../../models/Location'
import { OK } from 'http-status-codes'

export default (_, res) => DB.write(() => {
    DB.delete(DB.objects(Location.NAME))

    res.sendStatus(OK)
})
