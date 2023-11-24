const editMovie = (req, res) => {
  try {
    res.status(200).render("editMovie");
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

module.exports = {
  editMovie,
};
