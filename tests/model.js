/* eslint-env mocha */
'use strict';

const assert = require('assert');

const Place = require('../models/Place');

describe('Тест модели', () => {
    let place1 = new Place('place1', 'place1 description');
    let place2 = new Place('place2', 'place2 description');
    let place3 = new Place('place3', 'place3 description');

    place1.save();
    place2.save();
    place3.save();

    let query = Place.find();

    it('Содержит все места в порядке добавления', () => {
        let data = query.getData();

        assert.equal(data[0].name, 'place1');
        assert.equal(data[1].name, 'place2');
        assert.equal(data[2].name, 'place3');
    });

    it('Тест сортировки по имени', () => {
        let data = query.sort('name').getData();

        assert.deepEqual([place1, place2, place3], data);
    });

    it('Тест сортировки по имени в обратном порядке', () => {
        let data = query.sort('name', -1).getData();

        assert.deepEqual([place3, place2, place1], data);
    });

    it('skip && limit', () => {
        let data = query.sort('name')
            .skip(1)
            .limit(1)
            .getData();

        assert.deepEqual(data[0], place2);
    });

    it('Static add', () => {
        let place = Place.add('123', '456');

        assert.equal(place.name, '123');
    });

    it('Меняем местами', () => {
        Place.swap('place1', 'place2');

        let places = Place.find().getData();

        assert.equal(places[0].name, 'place2');
        assert.equal(places[1].name, 'place1');
    });

    it('Удаление элементов', () => {
        Place.find({
            name: '123'
        }).remove();

        Place.find({
            name: 'place1'
        }).remove();

        let places = Place.find().getData();

        assert.equal(places.length, 2);
    });

    after(() => Place.find().remove());
});
