import React from 'react';
import ReactDOM from 'react-dom';
import {FacebookShareButton} from 'react-share';
import './index.css';
class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            apiResult: null,
            author:'',
            text: '',
            isLoaded: false,
            bgColor:'#f99192'
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.generateQuote();
        this.changeColor();
    }
    
    componentDidMount(){
        fetch('https://gist.githubusercontent.com/hungnguyen7/1ff793a446fe8efad86edca2506f4743/raw/ed1c8bcd9f27c2bc9a69edb43f25afde2a4a48eb/quote.json').then(response=>response.json()).then((responseData)=>{
            this.setState({
                apiResult: responseData.quotes,
                isLoaded: true,
                author: responseData.quotes[0].quoteAuthor,
                text: responseData.quotes[0].quoteText
            })
        }).catch(error=>this.setState({
            error
        }))
    }

    generateQuote=()=>{
        const chosenQuote = [];
        const quotes = this.state.apiResult;
        let randomNumber = Math.floor((Math.random() * this.state.apiResult.length)+1);
        quotes.forEach((element, index)=>{
            if(index === randomNumber){
                chosenQuote.push(element);
            }
        })
        this.setState({
            text: chosenQuote[0].quoteText, //vi moi lan ham generateQuote duoc goi se tao ra mot mang chosenQuote() moi
            author: chosenQuote[0].quoteAuthor
        })
    }

    changeColor=()=>{
        this.setState({
            bgColor: this.getRandomColor()
        })
    }

    getRandomColor=()=>{
        let letters = '0123456789ABCDEF';
        let color = '#';
        for(let i = 0; i < 6; i++){
            color+=letters[Math.floor(Math.random()*16)];
        }
        return color;
    }
    
    shareOnTwitter = () => {
        //found on https://gist.github.com/McKinneyDigital/2884508#file-share-twitter-js
        let url = "twitter.com";
        let text = `${this.state.author} - ${this.state.text}`
        window.open('http://twitter.com/share?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(text), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
      }
    render(){
        let status = this.state.text + '\n<' + this.state.author + '>';
        return(
            <div id="main">
            <style>
                {   //Tat ca trong dau ngoac la Js
                    `:root{
                        --main-bg-color:${this.state.bgColor};
                        --main-txt-color:${this.state.bgColor};
                    }
                    `
                    //Tra ve mot string voi cac bien css duoc khoi tao
                }
            </style>
                <h1 id="title">Random Quote Machine</h1>
                <div className="container" id="quote-box">
                    <div className="text-element">
                        <p id="text">{this.state.text}</p>
                    </div>
                    <div className="author-element">
                        <p id="author">{this.state.author}</p>
                    </div>
                    <div className ="buttons-element" id="buttons">
                        <div className="fb-share">
                            <FacebookShareButton url="https://hungnguyen7.github.io/random-quote-machine" quote={status} title="Share on Facebook"><button id="fb-button">Share</button></FacebookShareButton>
                        </div>
                        <div className="tweet">
                            <a id="tweet-quote" a href="http://twitter.com/intent/tweet" target="_blank" title="Tweet on Twitter"><button id ="tweet-button" onClick={this.shareOnTwitter}>Tweet</button></a>
                        </div>
                        <div className="new-quote">
                            <button id="new-quote" onClick={this.handleClick}>New Quote</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('root'));