import Realm from 'realm'

export class Location {
    static NAME = 'Location'

    static FIELDS = {
        ID: 'id',
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

    static schema = {
        name: Location.NAME,
        primaryKey: Location.FIELDS.ID,
        properties: {
            [Location.FIELDS.ID]: 'int',
            [Location.FIELDS.TYPE]: 'string',
            [Location.FIELDS.TITLE]: 'string',
            [Location.FIELDS.DESCRIPTION]: 'string?',
            [Location.FIELDS.VISITED]: { type: 'bool', default: false },
            [Location.FIELDS.DATE]: 'date',
            [Location.FIELDS.ORDER]: 'int'
        }
    }

    static create = ({ id, type, title, description, visited = false, date, order }) => ({
        [Location.FIELDS.ID]: id,
        [Location.FIELDS.TYPE]: Location.PLACE_TYPE[type],
        [Location.FIELDS.TITLE]: title,
        [Location.FIELDS.DESCRIPTION]: description,
        [Location.FIELDS.VISITED]: visited,
        [Location.FIELDS.DATE]: date || new Date(),
        [Location.FIELDS.ORDER]: order
    })
}

export default new Realm({
    path: `/tmp/${Location.NAME}.realm`,
    schema: [Location],
    inMemory: true
})
