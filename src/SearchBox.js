import React from 'react';
import './style.css'
import axios from 'axios'
import ImageBox from './ImageBox'
import './imagebox.css'


class SearchBox extends React.Component {
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    state = {
        input:null,
        data:[],
        loading : false,
        resulttext : 'Here are some recent images...'
    }

    componentDidMount(){
        if(this.state.input===null||this.state.input===''){
            axios.get('https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=7eab7a0d9b8a6e68d192a607690bb0da&per_page=10&format=json&nojsoncallback=1')
            .then((res)=>{
                // console.log(res);
                this.setState({
                    loading:false,             
                    data:res.data.photos.photo
                })
            })
        }
        else{

        }

    }

fetchData(){
    this.setState({
        loading:true
    })
    // console.log(this.state);
    axios.get('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=7eab7a0d9b8a6e68d192a607690bb0da&format=json&nojsoncallback=1', {
        params:{
            tags:this.state.input,
            per_page:10,
            page:1
        }
    })
    .then((res)=>{
        console.log(res);
        this.setState({
            data:res.data.photos.photo,
            resulttext:'search results...',
            loading:false
        })
    })
}

handleSubmit(e){
    e.preventDefault();
    this.fetchData();
}

handleChange(e){
    this.setState({
        input: e.target.value
        }, ()=>{
        setTimeout(() => {
            if (this.state.input!=='') 
            this.fetchData()
            }, 1500)
        }

    );
}



render(){
    const list = this.state.data.map((data)=>{
        return <ImageBox 
                key={data.id}
                title={data.title} 
                id={data.id} 
                farmid={data.farm}
                secret={data.secret}
                server={data.server}
                />
            })
    return (
        <div ref='scroll'>
            <br/><br/><br/>
            <div className='search-container'>
                <form onSubmit={this.handleSubmit}>
                    <input 
                    type='Text' 
                    name='search' 
                    placeholder='search...' 
                    className='search-box' 
                    onChange={this.handleChange}
                    />
                    <input 
                    type='submit' 
                    className='search-btn' 
                    onClick={this.testfunction}
                    />
                </form>
                <h3>{this.state.resulttext}</h3>
            </div>
            
            { 
            this.state.loading===false
            ?
            <div className='main-container'>
                {list}
            </div>
            :
            <div className='main-container'>
                <div className="loader"></div>
            </div>
            }
        </div>
        );
    }
}

export default SearchBox;
