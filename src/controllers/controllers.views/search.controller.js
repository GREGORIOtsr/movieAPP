const getSearch = (req,res)=>{
    try {
        res.status(200).render('search');
    } catch (error) {
        res.status(400).json({ message: `ERROR: ${error.stack}` });
    }
}

module.exports = {
    getSearch
}