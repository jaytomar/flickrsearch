import React from 'react';
import './style.css'
import axios from 'axios'
import ImageBox from './ImageBox'
import './imagebox.css'
import { Route, Switch } from "react-router";
const queryString = require('query-string');


class SearchBox extends React.Component {
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    state = {
        input:queryString.parse(this.props.location.search).search,
        data:[],
        loading : false,
        resulttext : 'Here are some recent images...',
        pastSearches : []
    }

    componentDidMount(){
        if(this.state.input===null||this.state.input===''){
            this.fetchRecent();
        }
        else{
            this.fetchData();
        }
        

    }

fetchRecent(){
    axios.get('https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=7eab7a0d9b8a6e68d192a607690bb0da&per_page=12&format=json&nojsoncallback=1')
    .then((res)=>{
        // console.log(res);
        this.setState({
            loading:false,             
            data:res.data.photos.photo
        })
    })
}

fetchData(){
    this.setState({
        loading:true
    })
    // console.log(this.state);
    if (this.state.input===undefined || this.state.input==='')
        this.fetchRecent();
    else{
        axios.get('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=7eab7a0d9b8a6e68d192a607690bb0da&format=json&nojsoncallback=1', {
            params:{
                tags:this.state.input,
                per_page:12,
                page:1
            }
        })
        .then((res)=>{
            // console.log(res);
            this.setState({
                data:res.data.photos.photo,
                resulttext:'showing search results for ' + this.state.input,
                loading:false
            })
        })
    }
}

handleSubmit(e){
    e.preventDefault();
    this.fetchData();
    this.searchGrabber(e.target.search.value)
}

handleChange(e){
    // this.setState({
    //     input: this.props.
    //     }, ()=>{
    //     setTimeout(() => {
    //         if (this.state.input!=='') 
    //         this.fetchData()
    //         }, 1500)
    //     }

    // );
    this.props.history.push({
        pathname: '/',
        search : 'search='+e.target.value
      })
    this.setState({
        input:e.target.value
        },()=>{
            if (this.state.input!=='') {            
                setTimeout(() =>
                this.fetchData(),1500)
            }
        }
    )
}


searchGrabber(e){
    const searches = this.state.pastSearches
    if (searches.length>=5) {
        searches.pop();
    }
    searches.unshift(e);
    this.setState({
        pastSearches : searches
    })
}


render(){
    // console.log(this.state.input);
    
    // console.log(this.props.history);
    // console.log(this.state);

    const pastSearches = this.state.pastSearches.map((search)=>{
        return <a key={search} href={"/?search="+search}>{search}</a> 
    })
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
            </div>
            <div className='past-searches'>
                {pastSearches}
            </div>
            <h3>{this.state.resulttext}</h3>
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
