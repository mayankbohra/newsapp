import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {
    constructor() {
        super()
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {
        console.log(this.state.page);
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=2d1614559a9644baab09ab130b144088&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({ 
            articles: parsedData.articles, 
            totalResults: parsedData.totalResults,
            loading: false
        });
    }

    handlePrev = async () => {
        // console.log(this.state.page-1);
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=2d1614559a9644baab09ab130b144088&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({ 
            page: this.state.page-1,
            articles: parsedData.articles,
            loading: false
        });
    }

    handleNext = async () => {
        // console.log(this.state.page+1);
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=2d1614559a9644baab09ab130b144088&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({ 
            page: this.state.page+1,
            articles: parsedData.articles,
            loading: false
        });
    }

    render() {
        return (
            <div className="container my-5">
                <h1 className='text-center'>Top Headlines</h1>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((ele) => {
                        return <div className="col-md-4 my-4" key={ele.url}>
                            <NewsItem  title={ele.title?ele.title:""} description={ele.description?ele.description:""} imageUrl={ele.urlToImage} newsUrl={ele.url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-outline-primary" onClick={this.handlePrev}>&larr; Previous</button>
                    <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-outline-primary" onClick={this.handleNext}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
