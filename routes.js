'use strict';

const Note = require('./note.js');

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
            }

            res.send(notes);
        })
        .delete((req, res) => {
            let notes = Note;
            if (req.query.index) {
                notes = Note.deleteOne(req.query.index);
            } else {
                notes = Note.deleteAll();
            }

            res.send(notes);
        })
        .patch((req, res) => {
            const note = Note.changeInfo(req.query.index, req.body.status, req.body.desc);

            res.send(note);
        });

    app
        .route('/notes/pages')
        .get((req, res) => {
            const notes = Note.findByPages(req.query.page, req.query.limit);

            res.send(notes);
        });


    app.all('*', (req, res) => res.sendStatus(404));
};
