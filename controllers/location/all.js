import DB, { Location } from '../../models/Location'

const transform = (object) => {
    const when = (condition) => {
        const result = () => object
        const then = (fn) => {
            object = condition ? fn(object) : object

            return { when, result }
        }

        return { then }
    }

    return { when }
}

export default (req, res) => {
    const { select, query, sortBy, reverse } = req.query
    const { limit = Number.MAX_SAFE_INTEGER, offset = 0 } = req.query
    const [lim, off] = [limit, offset].map(Number)

    res.json(transform(DB.objects(Location.NAME))
        .when(sortBy)
        .then(self => self.sorted(sortBy))
        .when(lim > 0 && off >= 0)
        .then(self => self.slice(off, off + lim))
        .when(select)
        .then(self => self.filter(x => x[select] && (query
            ? String(x[select])
                .toLowerCase()
                .includes(query.toLowerCase())
            : true))
        )
        .when(reverse === 'true')
        .then(self => self.reverse())
        .result()
    )
}
