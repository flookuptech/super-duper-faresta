function manipulateData(array) {
  let data = array;
  for (var i in data) {
    if (
      data[i].category == 0 ||
      data[i].category == null ||
      data[i].category == ""
    ) {
      data[i].category = "Other";
    }
    data[i].element = data[i].category.toLowerCase().replace(/\W/g, "_");
  }
  return data;
}

module.exports = { manipulateData };
