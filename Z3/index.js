const FileLoader = require('./src/FileLoader').FileLoader;
const Program = require('./src/Program').Program;

(async() => {
    const filePath = Program.getFilePath()
    const verticesWithEdges = FileLoader.loadDataFromFile(filePath)
    FileLoader.saveToDatFile("z.dat", verticesWithEdges)
})();

