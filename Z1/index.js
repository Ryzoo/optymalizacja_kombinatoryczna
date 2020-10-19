const FileLoader = require('./src/FileLoader').FileLoader;
const Program = require('./src/Program').Program;
const Algorithm = require('./src/Algorithm').Algorithm;

const TIMER_FULL_TIME = '[TIME] Full time';
const TIMER_LOAD_DATA = '[TIME] Load data from file';
const TIMER_PREPARE_SOLUTIONS = '[TIME] Prepare solutions';

(async() => {
    console.time(TIMER_FULL_TIME)
    console.time(TIMER_LOAD_DATA)

    const filePath = Program.getFilePath()
    const verticesWithEdges = FileLoader.loadDataFromFile(filePath)

    console.timeEnd(TIMER_LOAD_DATA)
    console.time(TIMER_PREPARE_SOLUTIONS)

    await Algorithm.prepareData(verticesWithEdges)
    await Algorithm.prepareSolutions()

    console.timeEnd(TIMER_PREPARE_SOLUTIONS)
    console.timeEnd(TIMER_FULL_TIME)

    Algorithm.presentSolutions()
})();

