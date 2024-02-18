exports.create = async (req, res) => {
    res.status(200).json({
        message: "Create Product",
        data: req.body
    })
}