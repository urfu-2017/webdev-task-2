import DB, { Location } from '../../models/Location'

export default (req, res) => {
    const { select, query, sortBy, reverse, limit, offset = 0 } = req.query

    let results = DB.objects(Location.NAME)

    if (sortBy) {
        results = results.sorted(sortBy)
    }

    if (limit) {
        results = results.slice(offset, offset + limit)
    }

    if (select) {
        results = results.filter(x => x[select] &&
            (query ? String(x[select]).toLowerCase().includes(query.toLowerCase()) : true)
        )
    }

    if (typeof results === 'object') {
        results = Array.from(results)
    }

    if (reverse === 'true') {
        results = results.reverse()
    }

    res.json(results)
}
