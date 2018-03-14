import DB, { Location } from '../../models/Location'
import { BAD_REQUEST, OK } from 'http-status-codes/index'

export default ({ query }, res) => DB.write(() => {
    const { swap = '' } = query
    const [first, second] = swap.split(',').map(Number)

    if (first && second) {
        const locations = DB.objects(Location.NAME)
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
