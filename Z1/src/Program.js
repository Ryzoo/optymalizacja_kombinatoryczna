const { Console } = require("console")

class Program{
    getFilePath(){
        const filePath = process.argv[2]

        if(!filePath)
            throw "Run with file path argument!"

        return filePath
    }
}

exports.Program = new Program()