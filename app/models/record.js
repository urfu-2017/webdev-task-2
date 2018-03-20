const uuid = require('uuid/v4');
const move = require('array-move');

const { recordsPerPage, accessibleProperties } = require('../../config');

const storage = [];

class Record {
  constructor({
    place, description, isVisited = false, date,
  }) {
    this.place = place;
    this.description = description;
    this.isVisited = isVisited;
    this.id = uuid();

    if (date) {
      this.creationDate = date;
    } else {
      this.creationDate = new Date().toLocaleDateString('en-US');
    }
  }

  static getAll() {
    return storage;
  }

  static getSorted(sortType) {
    if (sortType === 'date') {
      return storage.concat().sort((a, b) => a.creationDate.localeCompare(b.creationDate));
    }

    if (sortType === 'alph' || sortType === 'alphabet') {
      return storage.concat().sort((a, b) => a.place.localeCompare(b.place));
    }
    return Record.getAll();
  }

  static getPage(page) {
    if ((page - 1) * recordsPerPage <= storage.length) {
      return storage.slice((page - 1) * recordsPerPage, page * recordsPerPage);
    }
    return storage.slice(
      (storage.length % recordsPerPage) * recordsPerPage,
      ((storage.length % recordsPerPage) + 1) * recordsPerPage,
    );
  }

  static searchByDescription({ substring }) {
    return storage.filter(record => record.description.indexOf(substring) !== -1);
  }

  static updateProperty({ id, property, update }) {
    const record = storage.find(element => element.id === id);
    if (!record) {
      return `Record ${id} doesn't exist`;
    }
    // eslint-disable-next-line no-prototype-builtins
    if (!record.hasOwnProperty(property)) {
      return `Record's ${id} property '${property}' doesn't exist`;
    }
    if (!accessibleProperties.includes(property)) {
      return `Record's ${id} property '${property}' is not accessible`;
    }

    if (property === 'isVisited') {
      record[property] = update === 'true';
    } else {
      record[property] = update;
    }
    return `Property '${property}' update successful`;
  }

  static delete(id) {
    const recordIndex = storage.findIndex(record => record.id === id);
    if (recordIndex === -1) {
      return `Record ${id} doesn't exist`;
    }

    storage.splice(recordIndex, 1);
    return `Record ${id} successfully deleted`;
  }

  static deleteAll() {
    storage.length = 0;
    return 'All records are deleted';
  }

  static move(id, direction) {
    const recordIndex = storage.findIndex(record => record.id === id);
    if (recordIndex === -1) {
      return `Record ${id} doesn't exist`;
    }
    if (direction === 'up') {
      move.mut(storage, recordIndex, recordIndex - 1);
      return `Record ${id} moved up in list`;
    }

    if (direction === 'down') {
      move.mut(storage, recordIndex, recordIndex + 1);
      return `Record ${id} moved down in list`;
    }
    return 'Wrong move parameter';
  }

  save() {
    storage.push(this);
  }
}

module.exports = Record;
