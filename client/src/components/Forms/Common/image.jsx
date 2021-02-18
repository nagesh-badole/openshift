import React, { PureComponent } from "react";
import { connect } from 'react-redux'
import {setTutorialData} from '../../../store/actions/createEnvActions';

class imgBlock extends PureComponent {

  render() {
    const { src, coverData, tutorialData } = this.props;
    let imgAlt = this.props.alt
    let imgSrc = ''
    console.log(this.props)
    this.props.coverData.images.filter(function (image) {
      console.log("name of image", image.name)
      console.log("image alt", imgAlt)
        if (image.name === imgAlt) {
          imgSrc = image.selectedImgPreview
        }
    });
    this.props.tutorialData.images.filter(function (image) {
      console.log("name of image", image.name)
      console.log("image alt", imgAlt)
        if (image.name === imgAlt) {
          imgSrc = image.selectedImgPreview
        }
    });
    
      return (
        <img src={imgSrc} alt={imgAlt}></img>
      );
  }
}

const mapStateToProps = state => ({
  coverData: state.createEnvDetails.coverData,
  tutorialData: state.createEnvDetails.tutorialData
})


export default connect(mapStateToProps)(imgBlock);