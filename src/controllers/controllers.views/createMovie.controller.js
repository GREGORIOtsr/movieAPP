const createMovie = async (req, res) => {
  try {
    res.status(200).render("createMovie");
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

module.exports = {
  createMovie,
};
