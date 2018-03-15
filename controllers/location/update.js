import DB, { Location } from '../../models/Location'
import { NOT_FOUND } from 'http-status-codes'

const properties = Object.values(Location.FIELDS)

const mapKeyToValue = (key, value) => {
    switch (key) {
        case Location.FIELDS.DATE:
            return new Date(value)
        case Location.FIELDS.TYPE:
            return Location.PLACE_TYPE[value]
        case Location.FIELDS.ORDER:
            throw new Error('The order can not be changed.')
        default:
            return value
    }
}

export default ({ body, params }, res) => DB.write(() => {
    const location = DB.objectForPrimaryKey(Location.NAME, params.uuid)

    if (location) {
        Object.entries(body)
            .filter(([key]) => properties.includes(key))
            .forEach(([key, value]) => {
                location[key] = mapKeyToValue(key, value)
            })

        res.json(location)
    } else {
        res.sendStatus(NOT_FOUND)
    }
})

