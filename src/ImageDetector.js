import React, {useEffect} from 'react';
import paper from "paper";

const ImageDetector = (props) => {
  const {selectedImage, annotations, renderCanvas, showLabels, hideLabels} = props;
  const imageId = selectedImage.id;
  const imageUrl= selectedImage.coco_url;
  const width = selectedImage.width;
  const height = selectedImage.height;
  const annotationsArray = [];
  
  useEffect(() => {
    renderCanvas(selectedImage, annotations);
  })

  return(
      <div className="cart">
            <canvas id='paper-canvas' height={height} width={width} resize="true" ></canvas> 
      </div>
    
  )
};

export default ImageDetector;




