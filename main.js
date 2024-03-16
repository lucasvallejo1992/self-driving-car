
canvas.width = 200;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

const road = new Road(canvas.width/2, canvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50);
const trafic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, 'dummy', 2),
]
car.draw(ctx);

animate();

function animate() {
    car.update(road.borders, trafic);
    trafic.forEach(traficCar => {
        traficCar.update(road.borders);
    });
    canvas.height = window.innerHeight;
    
    ctx.save();
    ctx.translate(0, -car.y + canvas.height * 0.8);

    road.draw(ctx);
    car.draw(ctx);
    trafic.forEach(traficCar => {
        traficCar.draw(ctx);
    });

    ctx.restore();
    requestAnimationFrame(animate);
}