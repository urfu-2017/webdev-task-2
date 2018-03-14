'use strict';

const messages = require('../assets/messages');
const { ValueError, ObjectNotFound } = require('../utils/exceptions');

let nextId = 1;
let storage = [];

class Place {
    constructor(id, description) {
        this.id = id;
        this.description = description;
        this.createdAt = new Date();
        this.isVisited = false;
    }
}

class PlaceManager {

    /**
     * Получение места по идентификатору
     * @param {number} id - Уникальный идентификатор места
     * @throws {ObjectNotFound} Место с указанным id не найдено
     * @returns {Place}
     */
    static get(id) {
        const place = storage.find(obj => obj.id === id);
        if (!place) {
            throw new ObjectNotFound(messages.placeNotFound);
        }

        return place;
    }

    /**
     * Создание места и добавление его в хранилище
     * @param {string} description - Описание места
     * @returns {Place} Созданное место
     */
    static create(description) {
        const newPlace = new Place(nextId, description);
        storage.push(newPlace);
        nextId++;

        return newPlace;
    }

    /**
     * Получение всех мест из хранилища
     * @returns {Place[]} Список всех мест
     */
    static all() {
        return storage;
    }

    /**
     * Обновление данных места
     * @param {Place} place - место
     * @param {Object} values - Новые значения полей места
     * @param {string} values.description - Новое описание места
     * @param {boolean} values.isVisited - Новое значение метки значащей посещено место или нет
     * @throws {ValueError} Передан аргумент неподдерживаемого типа
     */
    static update(place, values) {
        if (typeof values.isVisited !== 'boolean') {
            throw new ValueError(messages.invalidParameterType);
        }
        if (typeof values.description !== 'string') {
            throw new ValueError(messages.invalidParameterType);
        }

        place.isVisited = values.isVisited;
        place.description = values.description;
    }

    /**
     * Удаление места из хранилища
     * @param {Place} place - Удаляемый из хранилища объект
     * @returns {Place} Удалённый объект
     */
    static remove(place) {
        const placeIndex = storage.findIndex(storagePlace => storagePlace.id === place.id);
        if (placeIndex === -1) {
            throw new ObjectNotFound(messages.placeNotFound);
        }

        return storage.splice(placeIndex, 1)[0];
    }

    /**
     * Очистка хранилища, удаление всех мест из него
     */
    static clear() {
        storage.length = 0;
    }

    /**
     * Смена порядка мест в списке
     * @param {number[]} newOrder - Новый порядок мест
     * @throws {ValueError} Передан аргумент неподдерживаемого типа
     */
    static reorder(newOrder) {
        if (newOrder.constructor.name !== 'Array') {
            throw new ValueError(messages.invalidParameterType);
        }
        if (newOrder.length !== storage.length) {
            throw new ValueError(messages.invalidOrderArrayLength);
        }

        storage = newOrder.reduce((newStorage, id, i) => {
            newStorage[i] = this.get(id);

            return newStorage;
        }, []);
    }

    /**
     * Фильтрация мест по описанию
     * @param {Place[]} places
     * @param {string} query
     * @returns {Place[]} Места описание которых удовлетворяет шаблону поиска
     */
    static filterByQuery(places, query) {
        return places.filter(
            place => place.description.toLowerCase().includes(query.toLowerCase())
        );
    }

    /**
     * Сортировка мест
     * @param {Place[]} places - Список мест
     * @param {'createdAt'|'description'} field - Поле по которому будет проводиться сортировка
     * @param {'asc'|'desc'} order - Порядок сортировки (по возрастанию или убыванию)
     * @returns {Place[]} Отсортированный массив мест
     * @throws {ValueError} Заданы недопустимые значения параметров
     */
    static order(places, field = 'createdAt', order = 'asc') {
        let comparator;
        switch (field) {
            case 'createdAt':
                comparator = datePlaceComparator;
                break;
            case 'description':
                comparator = descriptionPlaceComparator;
                break;
            default:
                throw new ValueError(messages.invalidSortFieldValue);
        }

        switch (order) {
            case 'asc':
                return places.slice(0).sort(comparator);
            case 'desc':
                return places.slice(0).sort((first, second) => -comparator(first, second));
            default:
                throw new ValueError(messages.invalidSortFieldValue);
        }
    }
}

function datePlaceComparator(firstPlace, secondPlace) {
    return firstPlace.createdAt - secondPlace.createdAt;
}

function descriptionPlaceComparator(firstPlace, secondPlace) {
    return firstPlace.description.localeCompare(secondPlace.description);
}

module.exports = { Place, PlaceManager };
