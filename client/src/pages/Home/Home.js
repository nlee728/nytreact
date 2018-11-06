import React, { Component } from "react";
import API from "../../utils/API";
import Card from "../../components/Card";
import SearchForm from "../../components/SearchForm";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem} from "../../components/List";
import Jumbotron from "../../components/Jumbotron";
import SaveBtn from "../../components/SaveBtn";
import DeleteBtn from "../../components/DeleteBtn";

class Home extends Component {
  state = {
    articles: {},
    saved: {},
    search: ""
  };

  // When this component mounts, search 
  componentDidMount() {
    this.searchArticles("local");
    this.getArticles();
  }

  searchArticles = query => {
    API.search(query)
      .then(res => this.setState({ articles: res.data.response.docs }))
      .catch(err => console.log(err));
  };

  saveArticle = (article) => {
    console.log(article);
    API.saveArticle({
      title: article.headline.main,
      summary: article.snippet,
      date: article.pub_date,
      url: article.web_url
    })
    .then(res => this.getArticles())
    .catch(err => console.log(err));
};

deleteArticle = (id) => {
  API.deleteArticle(id)
  .then(res => this.getArticles())
  .catch(err => console.log(err));
};

  getArticles = () => {
    API.getArticles()
    .then(res => this.setState({ saved: res.data }))
      .catch(err => console.log(err));
  }

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
                      <Container>
                      <ListItem
                      key={article._id}
                      title={article.headline.main}
                      summary={article.snippet}
                      date={article.pub_date}
                      url={article.web_url}
                      />
                      <SaveBtn onClick={() => this.saveArticle(article)} />
                      </Container>
                    );
                  })}
                </List>
              )}
            </Col>
            </Card>
            </Col>
          </Row>

          <Row>
        
        <Col size="md-12">
          <Card 
          heading="Saved Articles">
            <Col size="md-12">
              {!this.state.saved.length ? (
                <h1 className="text-center">No Articles to Display</h1>
              ) : (
                <List>
                  {this.state.saved.map(savedArticle => {
                    return (
                      <Container>
                      <ListItem
                      key={savedArticle._id}
                      title={savedArticle.title}
                      summary={savedArticle.summary}
                      date={savedArticle.date}
                      url={savedArticle.url}
                      />
                      <DeleteBtn onClick={() => this.deleteArticle(savedArticle._id)} />
                      </Container>
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
