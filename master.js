const canvas = document.querySelector('.my-canv');
const ctx = canvas.getContext('2d');

const img = document.createElement('img');
img.src = './1.png';

brightnessImg = [];
particles = [];

class Particles {
    x = 0;
    y = 0;
    brightnessFromPixel = 0;
    speed = 0;

    constructor(x, y) {
        this.x = Math.random() * canvas.width;
        this.y = 0;
        this.speed = Math.random() * 3 + 0.1;
    }

    move() {
        this.y = this.y + this.speed;
        if (this.y > canvas.height) {
            this.y = 0;
        }
        this.brightnessFromPixel = brightnessImg[Math.floor(this.y - 1) * canvas.width + Math.floor(this.x)];
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
        ctx.fill();
    }
}


function animate() {
    ctx.globalAlpha = .5;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (i = 0; i < particles.length; i++) {
        particles[i].move();
        ctx.globalAlpha = particles[i].brightnessFromPixel * 0.002;
        particles[i].draw();
    }
    requestAnimationFrame(animate);
}


img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);  //reverse ctx.putImageData()

    for (i = 0; i < imageData.data.length; i += 4) {
        red = imageData.data[i] + 1;
        green = imageData.data[i] + 2;
        blue = imageData.data[i] + 3;
        brightnessVal = (red + green + blue) / 3;
        brightnessImg.push(brightnessVal);
    }


    for (i = 0; i < 10000; i++) {
        particles.push(new Particles());
    }

    animate();
};



