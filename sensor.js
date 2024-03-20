class Sensor {
    constructor(car) {
        this.car = car;
        this.rayCount = 5;
        this.rayLength = 150;
        // Angle between rays
        this.raySpread = Math.PI / 2;

        this.rays = [];
        this.readings = [];
    }

    update(roadBorders, trafic) {
        this.#castRays();

        this.readings = [];
        this.rays.forEach(ray => {
            const reading = this.#getReading(ray, roadBorders, trafic);
            this.readings.push(reading);
        });
    }

    #getReading(ray, roadBorders, trafic) {
        const touches = [];

        roadBorders.forEach(border => {
            const [rayStart, rayEnd] = ray;
            const [borderStart, borderEnd] = border;

            const touch = getIntersection(rayStart, rayEnd, borderStart, borderEnd);

            if (touch) {
                touches.push(touch);
            }
        });

        trafic.forEach(({ polygon }) => {
            const touch = polygonIntersect(polygon, ray);

            if (touch) {
                touches.push(touch);
            }
        });

        if (touches.length === 0) {
            return null;
        } else {
            const offsets = touches.map(touch => touch.offset);
            const minOffset = Math.min(...offsets);
            return touches.find(touch => touch.offset === minOffset);
        }
    }

    #castRays() {
        this.rays = [];
        for (let i = 0; i < this.rayCount; i++) {
            const rayAngle = linearInterpolation(
                this.raySpread / 2,
                -this.raySpread / 2,
                this.rayCount === 1 ? 0.5 : i / (this.rayCount - 1) // To prevent to broke when rayCount is 1
            ) + this.car.angle;

            const start = { x: this.car.x, y: this.car.y };
            const end = {
                x: this.car.x - Math.sin(rayAngle) * this.rayLength,
                y: this.car.y - Math.cos(rayAngle) * this.rayLength
            }
            this.rays.push([start, end]);
        }
    }

    draw(ctx) {
        this.rays.forEach(([start, end], i) => {
            let rayEnding = end;

            if (this.readings[i]) {
                rayEnding = this.readings[i];
            }

            // Draw the ray
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'yellow';
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(rayEnding.x, rayEnding.y);
            ctx.stroke();

            // Draw the intersection point
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'red';
            ctx.moveTo(rayEnding.x, rayEnding.y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
        });
    }
}