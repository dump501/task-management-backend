class Logger{
    static log(data=""){
        console.log("LOG :: ",data);
    }
    static error(data=""){
        console.error("ERROR :: ", data);
    }
}

module.exports = Logger;