import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            loading: false
        }
    }

    async componentDidMount() {
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=2d1614559a9644baab09ab130b144088";
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({ articles: parsedData.articles});
    }

    render() {
        return (
            <div className="container my-5">
                <h2>Top Headlines</h2>
                <div className="row">
                    {this.state.articles.map((ele) => {
                        return <div className="col-md-4 my-4" key={ele.url}>
                            <NewsItem  title={ele.title?ele.title:""} description={ele.description?ele.description:""} imageUrl={ele.urlToImage} newsUrl={ele.url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button type="button" className="btn btn-primary">Previous</button>
                    <button type="button" className="btn btn-primary">Next</button>
                </div>
            </div>
        )
    }
}

export default News
