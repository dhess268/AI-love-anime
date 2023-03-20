// These are examples of what this file can be used for. I don't have to use these I will changea later

function getOffset(listPerPage, currentPage = 1) {
  return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

module.exports = {
  getOffset,
  emptyOrRows,
};
