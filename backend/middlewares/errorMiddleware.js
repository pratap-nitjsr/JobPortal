const errorMiddleware = (err, req, res, next) => { 
    // console.log(err);
    res.status(500).send({
        message: 'Something Went wrong',
        success: false,
        error: err
    })
}

export default errorMiddleware; 