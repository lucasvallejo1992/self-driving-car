
const roadCanvas = document.getElementById('roadCanvas');
roadCanvas.width = 200;
const cartCtx = roadCanvas.getContext('2d');

const networkCanvas = document.getElementById('networkCanvas');
networkCanvas.width = 800;
const networkCtx = networkCanvas.getContext('2d');

const road = new Road(roadCanvas.width/2, roadCanvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50, 'keyboard');
const trafic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, 'dummy', 2),
]
car.draw(cartCtx);

animate();

function animate() {
    car.update(road.borders, trafic);
    trafic.forEach(traficCar => {
        traficCar.update(road.borders);
    });

    roadCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;
    
    cartCtx.save();
    cartCtx.translate(0, -car.y + roadCanvas.height * 0.8);

    road.draw(cartCtx);
    car.draw(cartCtx);
    trafic.forEach(traficCar => {
        traficCar.draw(cartCtx);
    });

    cartCtx.restore();

    Visualizer.drawNetwork(networkCtx, car.brain);

    requestAnimationFrame(animate);
}