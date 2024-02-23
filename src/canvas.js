class Canvas {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
  }

  rect(x, y, w, h, color = "black", deg = 0) {
    const rad = (-deg * Math.PI) / 180;
    this.ctx.fillStyle = color;
    x -= w / 2;
    y -= h / 2;
    this.ctx.save();
    this.ctx.translate(x + w / 2, y + h / 2);
    this.ctx.rotate(rad);
    this.ctx.fillRect(-w / 2, -h / 2, w, h);
    this.ctx.restore();
    this.ctx.fillStyle = "black";
  }

  // Define a function called `img` that draws an image with the given parameters.
  img(x, y, w, h, color = "black", deg = 0) { // color is the image source
    // Convert the given degree value to radians.
    const rad = (-deg * Math.PI) / 180;
    // If the `color` parameter is a string, return immediately.
    if (typeof color == "string") {
      return;
    }

    // Calculate the x and y coordinates of the top left corner of the image.
    x -= w / 2;
    y -= h / 2;
    // Save the current state of the 2D context.
    this.ctx.save();
    // Translate the origin of the 2D context to the center of the image.
    this.ctx.translate(x + w / 2, y + h / 2);
    // Rotate the 2D context by the given angle.
    this.ctx.rotate(rad);
    // Draw the given image at the center of the 2D context.
    this.ctx.drawImage(color, -w / 2, -h / 2, w, h);
    // Restore the previous state of the 2D context.
    this.ctx.restore();
  }

  // Define a function named oval with five parameters: x, y, w, h, color, and deg.
  oval(x, y, w, h, color = "black", deg = 0, opacity = 1) {
    // Log the value of the color parameter to the console.
    // Calculate the value of the rad variable in radians using the deg parameter.
    const rad = (-deg * Math.PI) / 180;
    // Set the global alpha of the context to the opacity parameter.
    this.ctx.globalAlpha = opacity;
    // Set the fill style of the context to the color parameter.
    this.ctx.fillStyle = color;
    // Begin a new path on the canvas.
    this.ctx.beginPath();
    // Add an elliptical arc to the path with the specified parameters.
    this.ctx.ellipse(x, y, w / 2, h / 2, rad, 0, 2 * Math.PI);
    // Fill the path with the current fill style.
    this.ctx.fill();
    // Reset the global alpha of the context to 1.
    this.ctx.globalAlpha = 1;
    // Reset the fill style of the context to black.
    this.ctx.fillStyle = "black";
  }

  // Define a function named line with four parameters: points, color, w, and fillColor.
  line(points, color = "black", w = 2, fillColor = false) {
    // Set the stroke style of the context to the color parameter.
    this.ctx.strokeStyle = color;
    // Set the line width of the context to the w parameter.
    this.ctx.lineWidth = w;
    // Begin a new path on the canvas.
    this.ctx.beginPath();
    // Move the current point of the path to the first point in the points parameter.
    this.ctx.moveTo(points[0].x, points[0].y);
    // Loop through each point in the points parameter.
    for (let i in points) {
      // If the index of the point is greater than 0...
      if (i > 0) {
        // ...add a line segment to the path from the current point to the current point in the loop.
        this.ctx.lineTo(points[i].x, points[i].y);
      }
    }
    // If the fillColor parameter is truthy...
    if (fillColor) {
      // ...close the path of the shape.
      this.ctx.closePath();
      // Set the fill style of the context to the fillColor parameter.
      this.ctx.fillStyle = fillColor;
      // Fill the path with the current fill style.
      if (fillColor) {
        this.ctx.fill();
      }
    }
    // Draw the stroke of the path with the current stroke style and line width.
    this.ctx.stroke();
    // Reset the stroke style of the context to black.
    this.ctx.strokeStyle = "black";
    // Reset the line width of the context to 3.
    this.ctx.lineWidth = 3;
  }

  // Define a function named clear with no parameters.
  clear() {
    // Clear the entire canvas.
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // Define a function named text with five parameters: content, x, y, size, and color.
  text(content, x, y, size = 30, color = "black", bold = false, font = "Arial") {
    // Set the fill style of the context to the color parameter.
    this.ctx.fillStyle = color;
    // Set the font of the context to the size and font parameters.
    let str = ""
    if (bold) {
      str = 'bold '
    }
    this.ctx.font = `${str} ${size}px ${font}`;
    // Draw the specified text at the specified position.
    this.ctx.fillText(content, x, y);
  }
}
