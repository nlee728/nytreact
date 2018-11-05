import React from "react";
import { Container, Row, Col } from "../Grid";

// ListItem renders a bootstrap list item containing data from the NYT api call
export const ListItem = props => (
  <li className="list-group-item">
    <Container>
      <Row>
        <Col size="md-12">
          <h3>{props.title}</h3>
          <p>Summary: {props.summary}</p>
          <p>Published: {props.date}</p>
          <a rel="noreferrer noopener" target="_blank" href={props.url}>
            Go to Article!
          </a>
          <span onClick={props.saveArticle} className="btn">
              <i className="fa fa-heart"> Save</i>
            </span>
        </Col>
      </Row>
    </Container>
  </li>
);