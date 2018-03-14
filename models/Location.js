import Realm from 'realm'
import generateUUID from 'uuid/v1'

export class Location {
    static NAME = 'Location'

    static FIELDS = {
        UUID: 'uuid',
        TYPE: 'type',
        TITLE: 'title',
        DESCRIPTION: 'description',
        VISITED: 'visited',
        DATE: 'date',
        ORDER: 'order'
    }

    static PLACE_TYPE = {
        0: 'city',
        1: 'country',
        2: 'sight'
    }

    static FIELD_TYPES = {
        BOOL: [Location.FIELDS.VISITED],
        STRING: [
            Location.FIELDS.UUID,
            Location.FIELDS.TITLE,
            Location.FIELDS.DESCRIPTION,
            Location.FIELDS.TYPE
        ],
        DATE: [Location.FIELDS.DATE],
        INT: [Location.FIELDS.ORDER]
    }

    static schema = {
        name: Location.NAME,
        primaryKey: Location.FIELDS.UUID,
        properties: {
            [Location.FIELDS.UUID]: 'string',
            [Location.FIELDS.TYPE]: 'string',
            [Location.FIELDS.TITLE]: 'string',
            [Location.FIELDS.DESCRIPTION]: 'string?',
            [Location.FIELDS.VISITED]: { type: 'bool', default: false },
            [Location.FIELDS.DATE]: 'date',
            [Location.FIELDS.ORDER]: 'int'
        }
    }

    static create = ({ type, title, description, visited = false, date = new Date(), order }) => ({
        [Location.FIELDS.UUID]: generateUUID(),
        [Location.FIELDS.TYPE]: Location.PLACE_TYPE[type],
        [Location.FIELDS.TITLE]: title,
        [Location.FIELDS.DESCRIPTION]: description,
        [Location.FIELDS.VISITED]: visited,
        [Location.FIELDS.DATE]: date,
        [Location.FIELDS.ORDER]: order
    })
}

export default new Realm({
    path: `${Location.NAME}.realm`,
    schema: [Location]
})
