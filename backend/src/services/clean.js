const cleanData = (req, res, next) => {
  try {
    const item = req.body;
    if (parseInt(item.is_seen, 10) === 0) {
      item.when_seen = null;
      item.rating = null;
    }
    if (parseInt(item.is_read, 10) === 0) {
      item.when_read = null;
      item.rating = null;
    }
    if (parseInt(item.is_listened, 10) === 0) {
      item.when_listened = null;
      item.rating = null;
    }
    if (parseInt(item.owned, 10) === 0) {
      item.is_lent = 0;
    }
    if (parseInt(item.is_lent, 10) === 0) {
      item.lent_to = null;
    }
    req.body = item;
    next();
  } catch (err) {
    console.error(err);
  }
};

module.exports = cleanData;
