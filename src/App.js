import React from "react";
import Gallery from "./Gallery";
import ImageDetector from "./ImageDetector";
import paper from "paper";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      data : null,
      displayImages: false,
      selectedImage: null,
      showCanvas: false,
      fileInput : false,
      demoDataInput : false,
    };
    this.colors = [];
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.openCanvas = this.openCanvas.bind(this);
    
  } 

  componentDidMount = () => {
    this.generateColorList();    
  }

  generateColorList = () => {
    while (this.colors.length < 100) {
      do {
          var color = Math.floor((Math.random()*1000000)+1);
      } while (this.colors.indexOf(color) >= 0);
      this.colors.push("#" + ("000000" + color.toString(16)).slice(-6));
    }
  }

  handleChange = (event) => {
    console.log("HANDLE CHANGE", event.target.value, this);
    this.setState({ data: JSON.parse(event.target.value) });
  } 

  handleSubmit = (event) => {

    console.log("HANDLE SUBMIT");
    event.preventDefault();

    if(this.state.fileInput==true)
      this.uploadFile();
    else if (this.state.demoDataInput==true){ 
      this.useDemoData();     
    }
    
  }

  useDemoData = async () => {
    const res = await fetch('https://api.jsonbin.io/b/600dc2edd4d77374a3f42c2d');
    const demoData = await res.json();
    console.log("DEMO DATA",demoData);
    this.setState({data : demoData, displayImages: true});
  } 

  uploadFile = () => {
    var upload = document.getElementById('fileInput');  
    // Make sure the DOM element exists and the file is uploaded
    if (upload && upload.files.length>0) 
    {
        // Make sure a file was selected
          var reader = new FileReader(); // File reader to read the file           
          // This event listener will happen when the reader has read the file
          reader.addEventListener('load', () => {
            var result = JSON.parse(reader.result); // Parse the result into an object 
            console.log("DATA IN UPLAD FILE FUNCTION",result);
            this.setState({ data: result, displayImages: true});
          });
          
          reader.readAsText(upload.files[0]); // Read the uploaded file
    }
  }

  openCanvas = (imageObj) => {
    console.log("SELECTED IMAGE", imageObj);
    this.setState({
      showCanvas: true,
      displayImages: false,
      selectedImage: imageObj,
    });
  }

  renderCanvas = (image, annotations) => {
    console.log("RENDER CANVAS",annotations);
    paper.setup("paper-canvas");
    var raster = new paper.Raster({
      source: image.coco_url,
      position: paper.view.center,
    });    

    annotations.forEach((element) => {
      const arr = element.bbox;

      const x = arr[0];
      const y = arr[1];
      const width = arr[2];
      const height = arr[3];

      var rectangle = new paper.Rectangle(x, y, width, height);
      var path = new paper.Path.Rectangle(rectangle);
      path.hasStroke = true;
      path.strokeColor = this.colors[element.category_id]; 
      
    //   path.onMouseEnter = function(event) {
    //   console.log("MOUSE ENTERSSS");
    //   this.fillColor = 'red';
    // }

    // path.onMouseLeave = function(event) {
    //   console.log("MOUSE Leavesss");
    //   this.fillColor = 'rgba(0,0,0,0)';
    // }
      
    });
  }

  showLabels = (annotations) => {
      annotations.forEach((element) => {
        const x = element.bbox[0];
        const y = element.bbox[1]; 
    
        var text = new paper.PointText({
          point: new paper.Point(x, y),
          content: "text",
          justification: "center",
          fontFamily: 'Noto Sans',
          fillColor: 'white'
        });
        var rect = new paper.Path.Rectangle(text.bounds);
        rect.fillColor = 'black';
        rect.strokeColor = 'black';
        text.insertAbove(rect);
        
      })            
  }

  hideLabels = (annotations) => {
    this.renderCanvas(this.state.selectedImage,annotations);
  }


  render() {
    const { data, displayImages, selectedImage, showCanvas, fileInput, demoDataInput } = this.state;
    return (
      <div>
        <h1>Object Detection</h1>
        <div>
          Upload a JSON file (in COCO JSON format), or use our <a href="https://api.jsonbin.io/b/600dc2edd4d77374a3f42c2d" target="_blank">demo dataset</a>. 
        </div>
        <button onClick={() => {this.setState({ fileInput: true });}}>Upload JSON</button>
        <button onClick={() => {this.setState({ demoDataInput: true });}}>Use Demo Dataset</button>
        <div>
          {fileInput ? (
            <input type="file" id="fileInput"></input>
          ) : ('')}
          {demoDataInput ? (
            <div>Demo file uploaded. Please press Submit.</div>
          ) : ('')}
        </div>
        <button onClick={this.handleSubmit}>Submit</button>
        {/* <form onSubmit={this.handleSubmit}>
          <br />
          <textarea
            id="input-area"
            name="input"
            rows="10"
            cols="50"
            value={JSON.stringify(data)}
            onChange={this.handleChange}
          />
          <input type="file" id="fileInput"></input>
          <input type="submit" value="Submit" />
        </form> */}
        {displayImages ? (
          <Gallery dataRaw={data} images={data.images} openCanvas={this.openCanvas} />
        ) : (
          ""
        )}
        {showCanvas ? (
          <ImageDetector
            selectedImage={selectedImage}
            annotations={data.annotations}
            renderCanvas={this.renderCanvas}
            showLabels={this.showLabels}
            hideLabels={this.hideLabels}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default App;
