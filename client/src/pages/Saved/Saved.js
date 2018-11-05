import React, { Component } from "react";
import Detail from "../../components/Detail";
import API from "../../utils/API";
import Card from "../../components/Card";
import { Col, Row, Container } from "../../components/Grid";

class Saved extends Component {
  state = {
    articles: {},
    search: ""
  };

  // When this component mounts, load saved articles
  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
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
            <i className="fa fa-newspaper-o"></i>Saved Articles
          </h1>
        </Jumbotron>
        <Row>
        <Col size="md-8">
            <Card
              heading={this.state.articles.headline || "You haven't saved any articles yet."}
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

export default Saved;
