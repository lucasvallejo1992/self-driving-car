class NeuralNetwork {
    constructor(neuronCounts) {
        this.levels = [];

        for (let i = 0; i < neuronCounts.length; i++) {
            this.levels.push(new Level(
                neuronCounts[i],
                neuronCounts[i + 1]
            ));
        }
    }

    static feedForward(inputs, network) {
        let output = Level.feedForward(inputs, network.levels[0]);
        for (let i = 1; i < network.levels.length; i++) {
            output = Level.feedForward(output, network.levels[i]);
        }
        return output;
    }
}

class Level {
    constructor(inputCount, outputCount) {
        this.inputs = new Array(inputCount);
        this.outputs = new Array(outputCount);
        this.biases = new Array(outputCount);

        this.weights = [];

        for (let i = 0; i < inputCount i++) {
            this.weights[i] = new Array(outputCount);
        }

        Level.#randomize(this);
    }

    static #randomize(level) {
        for (let i = 0; i < level.outputs.length; i++) {
            for (let j = 0; j < level.outputs.length; j++) {
                level.weights[j][i] = Math.random() * 2 - 1;
            }
        }

        for (let i = 0; i < level.biases.length; i++) {
            level.biases[i] = Math.random() * 2 - 1;
        }
    }
}