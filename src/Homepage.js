import React from 'react';
import Gallery from './Gallery';

class Homepage extends React.Component {
    constructor(props){
        super(props);
    }   

    render(){
        const {fileInput, demoDataInput, displayImages, data, handleSubmit} = this.props;
        return(
            <div>
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
        )
    }
}

export default Homepage;