class Algorithm{
    constructor(){
        this.combinationBase = []
        this.toCheckCombinationBase = []
        this.best = {}
    }

    async prepareData(verticesWithEdges){
        this.verticesWithEdges = verticesWithEdges

        this.verticesWithEdges
            .forEach(async (verticle, index) => (verticle.right.length || verticle.left.length) ? this.toCheckCombinationBase.push(index) : this.combinationBase.push(index) )
    }

    async addNextToCombination(solution, combination){
        if(!combination.length) return [solution]

        let results = []
        let beforeFirstFromCombination = null
        let beforeLastFromSolution = null

        await Promise.all(combination.map(async (c) => {
            const nextSolution = [...solution, c]
            const nextCombination = combination
                .filter((y) => y > c 
                    && !this.verticesWithEdges[y].right.some((z) => nextSolution.includes(z)) 
                    && nextSolution.every((z) => !this.verticesWithEdges[z].right.includes(y)) 
                    && y !== c)

            const reversed = [...nextCombination].reverse()
            const testedCombination = reversed
                .filter((y) => !nextCombination.length || !this.verticesWithEdges[y].left.some((z) => z === nextCombination[0]))
                .reverse()

            const firstFromCombination = testedCombination.length ? testedCombination[0] : null
            const lastFromSolution = nextSolution.length ? nextSolution[nextSolution.length-1] : null

            if(beforeFirstFromCombination && beforeLastFromSolution && firstFromCombination === beforeLastFromSolution && lastFromSolution === beforeFirstFromCombination){
                return;
            }

            beforeFirstFromCombination = firstFromCombination
            beforeLastFromSolution = lastFromSolution
            
            let requirements = []
            nextSolution.forEach((x) => requirements = [...requirements, ...this.verticesWithEdges[x].right])
            const requirementsChecker = [...nextSolution, ...testedCombination]
            const test2Passed = requirements
                .every((v) => this.verticesWithEdges[v].right.some((v) => requirementsChecker.includes(v)))

            if(test2Passed){
                const result = await this.addNextToCombination(nextSolution, nextCombination)
                results = [...results, ...result]
            } else results = [...results, nextSolution]
          }));

        return results
    }

    async prepareSolutions(){
        let listOfSolutions = [...await this.addNextToCombination(this.combinationBase, this.toCheckCombinationBase)]

        this.solutions = listOfSolutions
            .map((x) => [...new Set(x)])
            .filter((x) => this.checkIsAnyConnected(x))
            .sort((a, b)=> b.length - a.length);
    }
    
    checkIsAnyConnected(result){
        const notInResult = this.toCheckCombinationBase.filter((x) => !result.includes(x))
        // const real = [5, 11, 16, 25, 34, 44, 46, 54, 56, 94, 102, 109, 127, 134, 135, 143, 153]
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