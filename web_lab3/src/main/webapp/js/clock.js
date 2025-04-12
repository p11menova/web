window.onload = function() {
    const canvas = document.getElementById("clockCanvas");
    const ctx = canvas.getContext("2d");

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2 - 10;


    ctx.font = "20px Impact";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    function drawClock() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Очистить канвас

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = "#b5c7e0";
        ctx.lineWidth = 8;
        ctx.stroke();
        ctx.closePath();

        for (let i = 0; i < 12; i++) {
            const angle = (i * 30) * Math.PI  / 180 - Math.PI / 3;
            const x = centerX + (radius - 20) * Math.cos(angle);
            const y = centerY + (radius - 20) * Math.sin(angle);
            ctx.fillText(i + 1, x, y);
        }

        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const second = now.getSeconds();

        drawHand(centerX, centerY, (hour % 12) * 30 + (minute / 2), radius - 50, 6, "#000");  // Часовая стрелка
        drawHand(centerX, centerY, minute * 6, radius - 30, 4, "#000");  // Минутная стрелка
        drawHand(centerX, centerY, second * 6, radius - 10, 2, "#b5c7e0");  // Секундная стрелка
    }

    function drawHand(x, y, angle, length, width, color) {
        const radian = (angle)* Math.PI / 180 -  Math.PI /2;
        const endX = x + length * Math.cos(radian);
        const endY = y + length * Math.sin(radian);

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
        ctx.closePath();
    }

    setInterval(drawClock, 5000);

    drawClock();
};
