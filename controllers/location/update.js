import DB, { Location } from '../../models/Location'
import { NOT_FOUND } from 'http-status-codes/index'

const properties = Object.values(Location.FIELDS)

const mapKeyToValue = (key, data) => {
    switch (key) {
        case Location.FIELDS.DATE:
            return new Date(data[key])
        case Location.FIELDS.TYPE:
            return Location.PLACE_TYPE[data[key]]
        case Location.FIELDS.ORDER:
            throw new Error('The order can not be changed.')
        default:
            return data[key]
    }
}

export default ({ body, params }, res) => DB.write(() => {
    const location = DB.objectForPrimaryKey(Location.NAME, params.uuid)

    if (location) {
        Object.keys(body)
            .filter(key => properties.includes(key))
            .forEach(key => {
                location[key] = mapKeyToValue(key, body)
            })

        res.json(location)
    } else {
        res.sendStatus(NOT_FOUND)
    }
})
