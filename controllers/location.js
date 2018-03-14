import { CREATED, BAD_REQUEST, NOT_FOUND, OK } from 'http-status-codes'
import DB, { Location } from '../models/Location'

const locations = DB.objects(Location.NAME)

export const all = (req, res) => {
    const { select, query = '""', sortBy, reverse, limit, offset = 0 } = req.query

    let results = DB.objects(Location.NAME)

    Object.keys(req.query).forEach(key => {
        switch (key) {
            case 'select':
                const operation = (Location.FIELD_TYPES.STRING.includes(select))
                    ? 'CONTAINS'
                    : '=='

                results = results.filtered(`${select} ${operation} ${query}`)
                break
            case 'sortBy':
                results = results.sorted(sortBy)
                break
            default:
                break
        }
    })

    results = results.map(x => x)

    if (limit) {
        results = results.slice(offset, offset + limit)
    }


    if (reverse === 'true') {
        results = results.reverse()
    }

    res.json(results)
}

export const get = ({ params }, res) => {
    const location = DB.objectForPrimaryKey(Location.NAME, params.uuid)

    if (location) {
        res.json(location)
    } else {
        res.sendStatus(NOT_FOUND)
    }
}

export const create = ({ body }, res) => DB.write(() => {
    let location;

    try {
        const results = locations.sorted(Location.FIELDS.ORDER, true)

        location = DB.create(Location.NAME,
            Location.create({ ...body, [Location.FIELDS.ORDER]: results.length + 1 })
        )

        res.status(CREATED).json(location)
    } catch (e) {
        DB.delete(location)
        throw new Error(e.message)
    }
})

export const update = ({ body, params }, res) => DB.write(() => {
    const location = DB.objectForPrimaryKey(Location.NAME, params.uuid)

    if (location) {
        const properties = Object.values(Location.FIELDS)

        Object.keys(body)
            .filter(key => properties.includes(key))
            .forEach(key => {
                switch (key) {
                    case Location.FIELDS.DATE:
                        location[key] = new Date(body[key])
                        break
                    case Location.FIELDS.TYPE:
                        location[key] = Location.PLACE_TYPE[body[key]]
                        break
                    case Location.FIELDS.ORDER:
                        throw new Error('The order can not be changed.')
                    default:
                        location[key] = body[key]
                }
            })

        res.json(location)
    } else {
        res.sendStatus(NOT_FOUND)
    }
})

export const swapOrder = ({ query }, res) => DB.write(() => {
    const { swap = '' } = query
    const [first, second] = swap.split(',').map(Number)

    if (first && second) {
        const firstLocation = locations.find(x => x[Location.FIELDS.ORDER] === first)
        const secondLocation = locations.find(x => x[Location.FIELDS.ORDER] === second)

        if (!firstLocation || !secondLocation) {
            throw new Error('Location with such order not found.')
        }

        const [orderA, orderB] = [
            firstLocation[Location.FIELDS.ORDER],
            secondLocation[Location.FIELDS.ORDER]
        ]

        firstLocation[Location.FIELDS.ORDER] = orderB
        secondLocation[Location.FIELDS.ORDER] = orderA

        res.status(OK).json([firstLocation, secondLocation])
    } else {
        res.sendStatus(BAD_REQUEST)
    }
})

export const remove = ({ params }, res) => DB.write(() => {
    const location = DB.objectForPrimaryKey(Location.NAME, params.uuid)

    if (location) {
        DB.delete(location)

        res.sendStatus(OK)
    } else {
        res.sendStatus(NOT_FOUND)
    }
})

export const clear = (_, res) => DB.write(() => {
    DB.delete(locations)

    res.sendStatus(OK)
})

export const options = (_, res) => res.send({
    schema: Location.schema,
    allowablePlaceTypes: Location.PLACE_TYPE,
    requiredFields: [Location.FIELDS.TITLE, Location.FIELDS.TYPE]
})
