// eslint-disable-next-line no-extend-native
Array.prototype.findById = function(id) {
  return this.find(elem => elem.id === +id);
};
