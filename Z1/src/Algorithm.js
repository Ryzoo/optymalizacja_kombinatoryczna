class Algorithm{
    constructor(){
        this.combinationBase = []
        this.toCheckCombinationBase = []
    }

    async prepareData(verticesWithEdges){
        this.verticesWithEdges = verticesWithEdges

        this.verticesWithEdges
            .forEach(async (verticle, index) => (verticle.right.length || verticle.left.length) ? this.toCheckCombinationBase.push(index) : this.combinationBase.push(index) )
    }

    async addNextToCombination(solution, combination){
        if(!combination.length) return solution

        const nextElement = combination[0]
        const nextElementConnectedVerticles = this.verticesWithEdges[nextElement].right
        const nextSolution = [...solution, nextElement]
        const nextCombination = combination
            .filter((x) => !nextElementConnectedVerticles.includes(x) && x !== nextElement)
            .filter((y) => nextSolution.every((z) => !this.verticesWithEdges[y].right.includes(z)))
    
        return await this.addNextToCombination(nextSolution, nextCombination)
    }

    async prepareSolutions(){
        let listOfSolutions = []
    
        await Promise.all(this.toCheckCombinationBase.map(async (x) => {
            const nextElementConnectedVerticles = this.verticesWithEdges[x].right
            const baseSoulution = [...this.combinationBase, x]
            const newCombination = this.toCheckCombinationBase
                .filter((y) => !nextElementConnectedVerticles.includes(y) && x !== y)
                .filter((y) => !baseSoulution.some((z) => this.verticesWithEdges[y].right.includes(z)))
            const result = await this.addNextToCombination(baseSoulution, newCombination)
            listOfSolutions.push(result)
          }));
    
        this.solutions = listOfSolutions
            .map((x) => [...new Set(x)])
            .filter((x) => this.checkIsAnyConnected(x))
            .sort((a, b)=> b.length - a.length);
    }
    
    checkIsAnyConnected(result){
        const notInResult = this.toCheckCombinationBase.filter((x) => !result.includes(x))
        return notInResult.every((nr) => this.verticesWithEdges[nr].right.some((v) => result.includes(v)))
    }

    presentSolutions(){
        const solutionLength = this.solutions.length

        if(!solutionLength) 
            console.info("[SOLUTION] No solution!");
        else console.info("[SOLUTION]", this.solutions[0])
    }
}

exports.Algorithm = new Algorithm()