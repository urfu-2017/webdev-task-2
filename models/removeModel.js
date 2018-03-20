'use strict';


module.exports = class Remove {
    static get(db, details, id, res) {
        db.collection('notes').remove(details, (err) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        });
    }
};
