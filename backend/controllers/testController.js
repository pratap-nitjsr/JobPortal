const testPostController = (req, res) => {
    const {name} = req.body;
    res.status(200).send(name);
    console.log(name);
}

export default testPostController;