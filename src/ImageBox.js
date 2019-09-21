import React from 'react'
import './imagebox.css'

export default class ImageBox extends React.Component {
    constructor(props){
        super(props);
    }

    render(){

        console.log(this.props);
        const imgurl=`https://farm${this.props.farmid}.staticflickr.com/${this.props.server}/${this.props.id}_${this.props.secret}.jpg`
        return(
            <div>
                <div className='preview-box'>
                    <div className='img-container2'>
                        <div className='img-container'>
                            <img src={imgurl} alt="" />
                        </div>
                    </div>
                    {this.props.title==''
                    ? 
                    <h4> untitled</h4>
                    :
                    <h4> {this.props.title}</h4>
                }

                </div>
            </div>
        );
    }
}