import React from 'react';
import ReactDOM from 'react-dom';
import {FacebookShareButton, FacebookIcon} from 'react-share';
class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            apiResult: null,
            author:'',
            text: '',
            isLoaded: false,
            //bgColor:'f99192',
            //clickCount:0
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.generateQuote();
        //this.changeColor();
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

    render(){
        let status = this.state.text + '\n-' + this.state.author + '-';
        return(
            <div id="main">
                <h1 id="tittle">Random Quote Machine</h1>
                <div id="quote-box">
                    <p id="text">{this.state.text}</p>
                    <p id="author">{this.state.author}</p>
                    <FacebookShareButton url="https://hungnguyen7.github.io/myblog/" quote={status}><FacebookIcon className="share-button" size={32} round={true}/></FacebookShareButton>
                    <button id="new-quote" onClick={this.handleClick}>New Quote</button>
                </div>
            </div>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('root'));