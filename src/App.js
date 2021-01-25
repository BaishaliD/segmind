import React from "react";
import Navbar from './Navbar';
import Gallery from "./Gallery";
import ImageDetector from "./ImageDetector";
import Homepage from './Homepage';
import './App.css';
import {Route, BrowserRouter as Router, Link} from 'react-router-dom';

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
  } 

  handleChange = (event) => {
    this.setState({ data: JSON.parse(event.target.value) });
  } 

  handleSubmit = (event) => {
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
            this.setState({ data: result, displayImages: true});
          });
          
          reader.readAsText(upload.files[0]); // Read the uploaded file
    }
  }

  // hideLabels = (annotations) => {
  //   this.renderCanvas(this.state.selectedImage,annotations);
  // }


  render() {
    const { data, displayImages, selectedImage, showCanvas, fileInput, demoDataInput } = this.state;
    return (
      <Router>
            <div>
            <Navbar/>
            {/* <Homepage
              fileInput={fileInput}
              demoDataInput={demoDataInput}
              displayImages={displayImages}
              data={data}
              handleSubmit={this.handleSubmit}
            /> */}
            <div style={{backgroundColor: 'lightGray', padding: '20px 0'}}>
                <h1>Object Detection</h1>
                <h2>
                  Upload a JSON file (in COCO JSON format), or use our <a href="https://api.jsonbin.io/b/600dc2edd4d77374a3f42c2d" target="_blank">demo dataset</a>. 
                </h2>
                <div className={'flex mb-20'}>
                    <button onClick={() => {this.setState({ fileInput: true, demoDataInput: false });}}>Upload JSON</button>
                    <button onClick={() => {this.setState({ demoDataInput: true, fileInput: false });}}>Use Demo Dataset</button>  
                </div>        
                <div>
                  {fileInput ? (
                    <div className={'flex mb-20'}>
                      <input type="file" id="fileInput"></input>
                    </div>            
                  ) : ('')}
                  {demoDataInput ? (
                    <h3>Demo file uploaded. Please press Submit.</h3>
                  ) : ('')}
                </div>
                <div className={'flex mb-20'}>
                  <button onClick={this.handleSubmit}>Submit</button>
                </div>
            </div>
    
            {displayImages ? (
              <Gallery dataRaw={data} images={data.images} />
            ) : (
              ""
            )}
            {/* {showCanvas ? (
              <ImageDetector
                selectedImage={selectedImage}
                annotations={data.annotations}
                renderCanvas={this.renderCanvas}
                showLabels={this.showLabels}
                hideLabels={this.hideLabels}
              />
            ) : (
              ""
            )} */}
          </div>
      <Route path="/canvas" component={ImageDetector}/>
      </Router>
    );
  }
}

export default App;
