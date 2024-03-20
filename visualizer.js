class Visualizer {
    static drawNetwork(ctx, brain) {
        const margin = 50;
        const left = margin;
        const top = margin;
        const width = ctx.canvas.width - margin * 2;
        const height = ctx.canvas.height - margin * 2;

        Visualizer.drawLevels(ctx, brain.levels, left, top, width, height);
    }

    static drawLevels(ctx, levels, left, top, width, height) {
        const right = left + width;
        const bottom = top + height;

        const nodeRadius = 18;

        for (let i = 0; i < levels.length; i++) {
            if (i > 0) {
                break;
            }
            const { inputs, outputs, weights, biases } = levels[i];

            for (let j = 0; j < inputs.length; j++) {
                for (let k = 0; k < outputs.length; k++) {
                    ctx.beginPath();
                    ctx.moveTo(
                        Visualizer.#getNodeX(inputs, j, left, right),
                        bottom
                    );
                    ctx.lineTo(
                        Visualizer.#getNodeX(outputs, k, left, right),
                        top
                    );
                    
                    ctx.strokeStyle = getRGBA(weights[j][k]);
                    ctx.linewidth = 2;
                    ctx.stroke();
                }
            }

            for(let j = 0; j < inputs.length; j++) {
                const x = Visualizer.#getNodeX(inputs, j, left, right);
    
                ctx.beginPath();
                ctx.arc(x, bottom, nodeRadius, 0, Math.PI * 2);
                ctx.fillStyle = 'black';
                ctx.fill();

                ctx.beginPath();
                ctx.arc(x, bottom, nodeRadius * 0.6, 0, Math.PI * 2);
                ctx.fillStyle = getRGBA(inputs[j]);
                ctx.fill();
            }
            for(let j = 0; j < outputs.length; j++) {
                const x = Visualizer.#getNodeX(outputs, j, left, right);
    
                ctx.beginPath();
                ctx.arc(x, top, nodeRadius, 0, Math.PI * 2);
                ctx.fillStyle = 'black';
                ctx.fill();

                ctx.beginPath();
                ctx.arc(x, top, nodeRadius * 0.6, 0, Math.PI * 2);
                ctx.fillStyle = getRGBA(outputs[j]);
                ctx.fill();

                ctx.beginPath();
                ctx.lineWidth = 4;
                ctx.arc(x, top, nodeRadius * 0.8, 0, Math.PI * 2);
                ctx.strokeStyle = getRGBA(biases[j]);
                ctx.setLineDash([3, 3]);
                ctx.stroke();
                ctx.setLineDash([]);
            }
        }
    }

    static #getNodeX(nodes, index, left, right) {
        return linearInterpolation(
            left, right,
            nodes.length === 1 ? 0.5 : index / (nodes.length - 1)
        );
    }
}