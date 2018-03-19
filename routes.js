'use strict';

const Note = require('./noteModel.js');

module.exports = app => {

    app
        .route('/notes')
        .post((req, res) => {

            // body передается в виде desc=Париж
            // query через ? и ==
            const note = new Note(req.body);
            note.save();

            res.redirect(302, '/notes');
        })
        .get((req, res) => {
            let notes = Note;
            if (req.query.sort) {
                if (req.query.sort === 'up') {
                    notes = Note.findAllByDateUp();
                } else if (req.query.sort === 'down') {
                    notes = Note.findAllByDateDown();
                } else if (req.query.sort === 'alph') {
                    notes = Note.findAllByAlph();
                } else {
                    notes = Note.findAll();
                }
            } else {
                notes = Note.findAll();
            }

            res.json(notes);
        })
        .delete((req, res) => {
            let notes = Note;
            if (req.query.index) {
                notes = Note.deleteOne(req.query.index);
            } else {
                notes = Note.deleteAll();
            }

            res.json(notes);
        })
        .patch((req, res) => {
            const note = Note.getByIndex(req.query.index);
            if (req.body.desc) {
                note.desc = req.body.desc;
            }
            if (req.body.status) {
                note.status = req.body.status;
            }

            res.json(note);
        });

    app
        .route('/notes/pages')
        .get((req, res) => {
            const notes = Note.findByPages(req.query.page, req.query.limit);

            res.json(notes);
        });


    app.all('*', (req, res) => res.sendStatus(404));
};
