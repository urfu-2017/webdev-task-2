const storage = [];

class Record {
  constructor({ place, description, isVisited }) {
    this.place = place;
    this.description = description;
    this.isVisited = isVisited;
  }

  save() {
    storage.push(this);
  }
}

module.exports = Record;
