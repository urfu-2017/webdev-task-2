import { Location } from '../../models/Location'

export default (_, res) => res.send({
    schema: Location.schema,
    allowablePlaceTypes: Location.PLACE_TYPE,
    requiredFields: [Location.FIELDS.TITLE, Location.FIELDS.TYPE]
})
