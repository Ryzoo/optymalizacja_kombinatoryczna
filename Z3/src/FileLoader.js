const lineByLine = require('n-readlines');

class FileLoader{
    loadDataFromFile(path){
        const liner = new lineByLine(path);
        let max = -1;
        let edges = "";
        let line = liner.next();
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
                edges += `${left} ${right} `
            } else if(textNumber > max) max = textNumber
        }

        return {
            max: max+1,
            edges
        }
    }

    saveToDatFile(path, data){
        const fs = require('fs');

        fs.writeFile(path, `data; param maxX := ${data.max}; set edges := ${data.edges}; end;`, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        }); 
    }
}

exports.FileLoader = new FileLoader()