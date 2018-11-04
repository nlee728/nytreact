import React, { Component } from "react";
import Detail from "../../components/Detail";
import API from "../../utils/API";
import Card from "../../components/Card";
import SearchForm from "../../components/SearchForm";
import { Col, Row, Container } from "../../components/Grid";

class Home extends Component {
  state = {
    articles: {},
    search: ""
  };

  // When this component mounts, search for the movie "The Matrix"
  componentDidMount() {
    this.searchArticles();
  }

  searchArticles = query => {
    API.search(query)
      .then(res => this.setState({ articles: res.data }))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, search the OMDB API for the value of `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    this.searchArticles(this.state.search);
  };

  render() {
    return (
      <Container>
        <Jumbotron>
          <h1>
            <i className="fa fa-newspaper-o"></i>New York Times Article Scrubber
          </h1>
            <h3>Search for and annotate articles of interest!</h3>
        </Jumbotron>
        <Row>
           <Col size="md-8">
            <Card heading="Search">
              <SearchForm
                value={this.state.search}
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
              />
              
            </Card>
          </Col>
        </Row>
        <Row>
        <Col size="md-8">
            <Card
              heading={this.state.articles.headline || "Search for Articles to Begin"}
            >
              {this.state.articles.headline ? (
                <Detail
                  title={this.state.articles.headline}
                  author={this.state.articles.byline}
                  date={this.state.articles.pub_date}
                  url={this.state.articles.web_url}
                />
              ) : (
                <h3>No Articles to Display</h3>
                <p>Try searching for some!</p>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
