import React, { Component } from "react";
import API from "../../utils/API";
import Card from "../../components/Card";
import SearchForm from "../../components/SearchForm";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem} from "../../components/List";
import Jumbotron from "../../components/Jumbotron";

class Home extends Component {
  state = {
    articles: {},
    search: ""
  };

  // When this component mounts, search 
  componentDidMount() {
    this.searchArticles("local");
  }

  searchArticles = query => {
    API.search(query)
      .then(res => this.setState({ articles: res.data.response.docs }))
      .catch(err => console.log(err));
  };

  saveArticle = articleData => {
       API.saveArticle(articleData)
      .then(res => console.log("Article saved"))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, search the NYT API for the value of `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    this.searchArticles(this.state.search);
  };

  render() {
    console.log("Articles");
    console.log(this.state.articles);
    return (
      <Container>
        <Jumbotron>
          <h1>
            <i className="fa fa-newspaper-o"></i>    New York Times Article Scrubber
          </h1>
            <h3>Search for and annotate articles of interest!</h3>
        </Jumbotron>
        <Row>
           <Col size="md-12">
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
        
        </Row>
        <Row>
        
        <Col size="md-12">
          <Card 
          heading="Search Results">
            <Col size="md-12">
              {!this.state.articles.length ? (
                <h1 className="text-center">No Articles to Display</h1>
              ) : (
                <List>
                  {this.state.articles.map(article => {
                    return (
                      <ListItem
                      key={article._id}
                      title={article.headline.main}
                      summary={article.snippet}
                      date={article.pub_date}
                      url={article.web_url}
                      />
                    );
                  })}
                </List>
              )}
            </Col>
            </Card>
            </Col>
          </Row>
        </Container>
    );
  }
}

export default Home;
