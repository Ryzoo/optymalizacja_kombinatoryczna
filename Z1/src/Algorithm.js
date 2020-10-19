class Algorithm{
    constructor(){
        this.combinationBase = []
        this.toCheckCombinationBase = []
    }

    async prepareData(verticesWithEdges){
        this.verticesWithEdges = verticesWithEdges

        this.verticesWithEdges
            .forEach(async (verticle, index) => verticle.length ? this.toCheckCombinationBase.push(index) : this.combinationBase.push(index) )
    }

    async addNextToCombination(solution, combination){
        if(!combination.length) return solution
    
        const nextElement = combination[0]
        const nextElementConnectedVerticles = this.verticesWithEdges[combination[0]]
        const nextCombination = combination.filter((x) => !nextElementConnectedVerticles.includes(x) && x != nextElement)
    
        return await this.addNextToCombination([...solution, nextElement], nextCombination)
    }

    async prepareSolutions(){
        let listOfSolutions = []
    
        await Promise.all(this.toCheckCombinationBase.map(async (x) => {
            const nextElementConnectedVerticles = this.verticesWithEdges[x]
            const newCombination = this.toCheckCombinationBase.filter((x) => !nextElementConnectedVerticles.includes(x))
            const result = await this.addNextToCombination([...this.combinationBase, x], newCombination)
            listOfSolutions.push(result)
          }));
    
        this.solutions = listOfSolutions
            .map((x) => [...new Set(x)])
            .filter((x) => this.checkIsAnyConnected(x))
            .sort((a, b)=> b.length - a.length);
    }
    
    checkIsAnyConnected(result){
        const notInResult = this.toCheckCombinationBase.filter((x) => !result.includes(x))
        return result.some((x) => {
            return this.verticesWithEdges[x]
                .some((y) => notInResult.includes(y))
        })
    }

    presentSolutions(){
        const solutionLength = this.solutions.length

        if(!solutionLength) 
            console.info("No solution!");

        // this.solutions.forEach((x) => console.info("Solution:", x))
        console.info("Min solution:", this.solutions[solutionLength-1])
        console.info("Max solution:", this.solutions[0])
    }
}

exports.Algorithm = new Algorithm()