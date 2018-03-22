'use strict';

const { saveNote,
    editNote,
    getNote,
    deleteNote,
    changeNoteState,
    findNotes } = require('./controllers/note');

const { getList, clearList, editList } = require('./controllers/list');

module.exports = app => {
    app.get('/find', findNotes);

    app.route('/list')
        .patch(editList)
        .get(getList)
        .delete(clearList);

    app.route('/:name')
        .post(saveNote)
        .patch(editNote)
        .get(getNote)
        .delete(deleteNote);

    app.patch('/:name/:state(visit|unvisit)', changeNoteState);

    app.delete('/', clearList);
    app.all('*', (req, res) => {
        res.sendStatus(404);
    });
};
