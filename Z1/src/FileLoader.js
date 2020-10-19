const lineByLine = require('n-readlines');

class FileLoader{
    loadDataFromFile(path){
        const liner = new lineByLine(path);
        let line = liner.next();
        let verticesWithEdges = []
        let regexpForEdgeParse = /(\d+)\s.+\s(\d+)/g;
         
        console.info(`[LOAD FILE] ${path}`)
        while (line = liner.next()) {
            const lineText = line.toString('ascii').replace(';','');
            if(!lineText || lineText.includes('}')) continue;
        
            const textNumber = Number(lineText)
            
            if(isNaN(textNumber)){
                const edge = Array.from(lineText.matchAll(regexpForEdgeParse))
                const left = parseInt(edge[0][1])
                const right = parseInt(edge[0][2])
                verticesWithEdges[left] = [...verticesWithEdges[left], right]
                verticesWithEdges[right] = [...verticesWithEdges[right], left]
            } else verticesWithEdges.push([])
        }

        return verticesWithEdges
    }
}

exports.FileLoader = new FileLoader()
