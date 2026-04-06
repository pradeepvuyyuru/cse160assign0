function main() {
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return false;
    }

    var ctx = canvas.getContext('2d');

    // Draw initial red vector
    var v1 = new Vector3([2.25, 2.25, 0]);
    drawVector(v1, "red");
}

function drawVector(v, color) {
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');

    var cx = canvas.width / 2;   // center x = 200
    var cy = canvas.height / 2;  // center y = 200
    var scale = 20;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(cx, cy);
    // Y is flipped because canvas Y increases downward
    ctx.lineTo(cx + v.elements[0] * scale, cy - v.elements[1] * scale);
    ctx.stroke();
}

function handleDrawEvent() {
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var v1x = parseFloat(document.getElementById('v1x').value);
    var v1y = parseFloat(document.getElementById('v1y').value);
    var v1 = new Vector3([v1x, v1y, 0]);
    drawVector(v1, "red");

    var v2x = parseFloat(document.getElementById('v2x').value);
    var v2y = parseFloat(document.getElementById('v2y').value);
    var v2 = new Vector3([v2x, v2y, 0]);
    drawVector(v2, "blue");
}

function handleDrawOperationEvent() {
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Read v1 and v2
    var v1x = parseFloat(document.getElementById('v1x').value);
    var v1y = parseFloat(document.getElementById('v1y').value);
    var v1 = new Vector3([v1x, v1y, 0]);

    var v2x = parseFloat(document.getElementById('v2x').value);
    var v2y = parseFloat(document.getElementById('v2y').value);
    var v2 = new Vector3([v2x, v2y, 0]);

    drawVector(v1, "red");
    drawVector(v2, "blue");

    var op = document.getElementById('operation').value;
    var scalar = parseFloat(document.getElementById('scalar').value);

    if (op === "add") {
        var v3 = new Vector3([v1x, v1y, 0]);
        v3.add(v2);
        drawVector(v3, "green");

    } else if (op === "sub") {
        var v3 = new Vector3([v1x, v1y, 0]);
        v3.sub(v2);
        drawVector(v3, "green");

    } else if (op === "mul") {
        var v3 = new Vector3([v1x, v1y, 0]);
        v3.mul(scalar);
        drawVector(v3, "green");

        var v4 = new Vector3([v2x, v2y, 0]);
        v4.mul(scalar);
        drawVector(v4, "green");

    } else if (op === "div") {
        var v3 = new Vector3([v1x, v1y, 0]);
        v3.div(scalar);
        drawVector(v3, "green");

        var v4 = new Vector3([v2x, v2y, 0]);
        v4.div(scalar);
        drawVector(v4, "green");

    } else if (op === "magnitude") {
        console.log("Magnitude of v1:", v1.magnitude());
        console.log("Magnitude of v2:", v2.magnitude());

        var v3 = new Vector3([v1x, v1y, 0]);
        v3.normalize();
        drawVector(v3, "green");

        var v4 = new Vector3([v2x, v2y, 0]);
        v4.normalize();
        drawVector(v4, "green");

    } else if (op === "normalize") {
        var v3 = new Vector3([v1x, v1y, 0]);
        v3.normalize();
        drawVector(v3, "green");

        var v4 = new Vector3([v2x, v2y, 0]);
        v4.normalize();
        drawVector(v4, "green");

    } else if (op === "angle") {
        var angle = angleBetween(v1, v2);
        console.log("Angle between v1 and v2:", angle, "degrees");

    } else if (op === "area") {
        var area = areaTriangle(v1, v2);
        console.log("Area of triangle formed by v1 and v2:", area);
    }
}

function angleBetween(v1, v2) {
    var dot = Vector3.dot(v1, v2);
    var mag1 = v1.magnitude();
    var mag2 = v2.magnitude();
    var cosAngle = dot / (mag1 * mag2);
    // Clamp to [-1, 1] to avoid NaN from floating point errors
    cosAngle = Math.max(-1, Math.min(1, cosAngle));
    var angleRad = Math.acos(cosAngle);
    return angleRad * (180 / Math.PI); // convert to degrees
}

function areaTriangle(v1, v2) {
    var cross = Vector3.cross(v1, v2);
    // Area of triangle = half the magnitude of the cross product
    return cross.magnitude() / 2;
}