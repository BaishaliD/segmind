import React, { useEffect } from "react";
import paper from "paper";

const ImageDetector = (props) => {

  const { selectedImage, annotations, categories } = props.location.state;
  const imageId = selectedImage.id;
  const imageUrl = selectedImage.coco_url;
  const width = selectedImage.width;
  const height = selectedImage.height;
  const annotationsArray = [];
  const colors = [];

  
  function generateColorList(){
    while (colors.length < 100) {
      do {
          var color = Math.floor((Math.random()*1000000)+1);
      } while (colors.indexOf(color) >= 0);
      colors.push("#" + ("000000" + color.toString(16)).slice(-6));
    }
  }

  function renderCanvas() {
    paper.setup("paper-canvas");
    var raster = new paper.Raster({
      source: selectedImage.coco_url,
      position: paper.view.center,
    });

    annotations.forEach((element) => {
      if (element.image_id == imageId) {
        const arr = element.bbox;

        const x = arr[0];
        const y = arr[1];
        const width = arr[2];
        const height = arr[3];

        var rectangle = new paper.Rectangle(x, y, width, height);
        var path = new paper.Path.Rectangle(rectangle);
        path.hasStroke = true;
        path.strokeWidth = 2;
        path.strokeColor = colors[element.category_id];

        annotationsArray.push(element);
      }
    });
  }

  function showLabels(e) {
    // e.preventDefault();
    annotationsArray.forEach((element) => {

      const label = categories.find(x => x.id === element.category_id).name;
      
      const x = element.bbox[0];
      const y = element.bbox[1];

      var text = new paper.PointText({
        point: new paper.Point(x, y),
        content: label,
        justification: "center",
        fontFamily: "Noto Sans",
        fillColor: "white",
      });
      var rect = new paper.Path.Rectangle(text.bounds);
      rect.fillColor = "black";
      rect.strokeColor = "black";
      text.insertAbove(rect);
    });
  }

  function clearCanvas(){
    let canvas = document.getElementById("paper-canvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }


  function hideLabels(e) {
    // e.preventDefault();
    clearCanvas();

    var raster = new paper.Raster({
      source: selectedImage.coco_url,
      position: paper.view.center,
    });

    annotationsArray.forEach((element) => {
      if (element.image_id == imageId) {
        const arr = element.bbox;

        const x = arr[0];
        const y = arr[1];
        const width = arr[2];
        const height = arr[3];

        var rectangle = new paper.Rectangle(x, y, width, height);
        var path = new paper.Path.Rectangle(rectangle);
        path.hasStroke = true;
        path.strokeWidth = 2;
        path.strokeColor = colors[element.category_id];
      }
    });
  }

  useEffect(() => {
    generateColorList();
    renderCanvas();
  });

  return (
    <div className="flex">
      <canvas
        id="paper-canvas"
        height={height}
        width={width}
        resize="true"
        onMouseEnter={(e) => {
          showLabels(e);
        }}
        onMouseLeave={(e) => {
          hideLabels(e);
        }}
      ></canvas>
    </div>
  );
};

export default ImageDetector;
