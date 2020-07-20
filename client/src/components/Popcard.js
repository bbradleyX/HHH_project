import React from "react";

class Popcard extends React.Component {
    render() {
        return (
            <li className={this.props.type} onClick={this.props.onClick}>
                <div className="image-item">
                    <img
                        src={this.props.imageSrc}
                        width={this.props.imageWidth}
                        height={this.props.imageHeight}
                        className="d-inline-block align-top dashcardImage"
                        alt="Dashcard Image"
                    />
                </div>
                
                <h2 className="title-item">{this.props.title}</h2>
                <h6 className="description-item">{this.props.description}</h6>
            </li>
        );
    }
}
export default Popcard; 