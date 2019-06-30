const formatDate = date => {
  return (
    ("0000" + date.getFullYear()).slice(-4) +
    "-" +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("00" + date.getDate()).slice(-2)
  );
};

module.exports = { formatDate };
