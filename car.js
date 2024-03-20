class Car {
    constructor(x, y, width, height, controlType = 'keyboard', maxSpeed = 3) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.angle = 0;

        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = maxSpeed;
        this.friction = 0.05;

        this.polygon = [];
        this.damaged = false;

        this.useNeuralNetwork = controlType === 'AI';

        if (controlType !== 'dummy') {
            this.sensor = new Sensor(this);
            this.brain = new NeuralNetwork([this.sensor.rayCount, 6, 4]);
            console.log(this.brain, "asdasdasdasdadasdasd");
        }
        this.controlls = new Controlls(controlType);
    }

    update(roadBorders, trafic = []) {
        if (!this.damaged) {
            this.#move();
            this.polygon = this.#createPolygon();
            this.damaged = this.#checkDamage(roadBorders, trafic);
        }
        if (this.sensor) {
            this.sensor.update(roadBorders, trafic);

            const offsets = this.sensor.readings.map(
                s => s === null ? 0 : s.offset
            );

            const outputs = NeuralNetwork.feedForward(offsets, this.brain);
            console.log(outputs);

            if (this.useNeuralNetwork) {
                this.controlls.forward = !!outputs[0];
                this.controlls.backward = !!outputs[1];
                this.controlls.left = !!outputs[2];
                this.controlls.right = !!outputs[3];
            }
        }
    }

    #move() {
        if(this.controlls.forward) {
            this.speed+= this.acceleration;
        }
        if(this.controlls.backward) {
            this.speed-= this.acceleration;
        }

        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        if (this.speed <- this.maxSpeed/2) {
            this.speed = -this.maxSpeed/2;
        }

        if (this.speed > 0) {
            this.speed -= this.friction;
        }
        if (this.speed < 0) {
            this.speed += this.friction;
        }

        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }
        if (this.speed != 0) {
            const flip = this.speed > 0 ? 1 : -1;

            if(this.controlls.left) {
                this.angle += 0.03 * flip;
            }
            if(this.controlls.right) {
                this.angle -= 0.03 * flip;
            }
        }
        
        this.x -= this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
    }

    #createPolygon() {
        const points = [];
        const rad = Math.hypot(this.width, this.height) / 2;
        const alpha = Math.atan2(this.width, this.height);

        points.push({
            x: this.x - Math.sin(this.angle - alpha) * rad,
            y: this.y - Math.cos(this.angle - alpha) * rad
        });

        points.push({
            x: this.x - Math.sin(this.angle + alpha) * rad,
            y: this.y - Math.cos(this.angle + alpha) * rad
        });

        points.push({
            x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad
        });

        points.push({
            x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad
        });

        return points;
    }

    #checkDamage(roadBorders, trafic) {
        for (let i = 0; i < roadBorders.length; i++) {
            if (polygonIntersect(this.polygon, roadBorders[i])) {
                return true;
            }
        }
        for (let i = 0; i < trafic.length; i++) {
            if (polygonIntersect(this.polygon, trafic[i].polygon)) {
                return true;
            }
        }
        return false;
    }

    draw(ctx) {
        if (this.damaged) {
            ctx.fillStyle = 'red';
        }

        ctx.beginPath();
        this.polygon.forEach(({ x, y }, i) => {
            if (i === 0) {
                ctx.moveTo(x, y);
                return;
            } else {}
            ctx.lineTo(x, y);
        })
        ctx.fill();

        if (this.sensor) {
            this.sensor.draw(ctx);
        }
    }
}