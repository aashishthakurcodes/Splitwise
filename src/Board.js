import React from "react";
import Expense from "./Expense";
import { Container, Row,  } from "react-bootstrap"; 
import "./index.css";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          amt: 0,
          money: 0,
        },
      ],
    };
  }

  // Add a new bill to the state
  add = (text) => {
    this.setState((prevState) => ({
      data: [...prevState.data, text],
    }));
  };

 

  // Render each comment using the Expense component
  eachComment = (comment, index) => (
    <Expense
      key={index}
      index={index}
      dd={comment}
      updateCommentText={this.updateComment}
      deleteFromBoard={() => this.removeComment(index)}
    />
  );

  render() {
    return (
      <div className="container-table">
        <Container>
          <Row>
            <div className="table-heading">
              <h2 className="flipInX">Divide Costs Fairly, Settle Easily</h2>
            </div>
            <div className="addbtn">
              <button
                onClick={() =>
                  this.add({
                    name: "New Bill",
                    paidPerson: "Rajneesh",
                    amt: 0,
                    
                    money: 0,
                  })
                }
                className="saveRemove"
              >
                Add Bill
              </button>
            </div>
          </Row>
        </Container>
        {this.state.data.map(this.eachComment)}
      </div>
    );
  }
}
