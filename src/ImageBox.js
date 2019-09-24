import React from 'react'
import './imagebox.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();


export default class ImageBox extends React.Component {

    render(){

        // console.log(this.props);
        const imgurl=`https://farm${this.props.farmid}.staticflickr.com/${this.props.server}/${this.props.id}_${this.props.secret}_z.jpg`
        return(
            <div>
                <div className='preview-box' >
                    <div className='img-container2'>
                        <div className='img-container'>
                            <img src={imgurl} alt="" />
                        </div>
                    </div>
                    {this.props.title===''
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