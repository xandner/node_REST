const myMiddalware=(req,res,next) => {
    // console.log("logging")
    next()
}

module.exports={
    myMiddalware
}