const getSearch = (req,res)=>{
    try {
        res.status(200).render('searchUser');
    } catch (error) {
        res.status(400).json({ message: `ERROR: ${error.stack}` });
    }
}

module.exports = {
    getSearch
}