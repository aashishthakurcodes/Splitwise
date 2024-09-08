import React from "react";
import Expense from "./Expense";
import { Container, Row, Col } from "react-bootstrap"; 
import "./index.css";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: "test1",
          paidPerson: "Dion",
          amt: 0,
          f1: 0,
          f2: 0,
          f3: 0,
          f4: 0,
          sp: 0,
          sm: 0,
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

  // Remove a bill from the state
  removeComment = (index) => {
    this.setState((prevState) => ({
      data: prevState.data.filter((_, idx) => idx !== index),
    }));
  };

  // Update a specific bill
  updateComment = (
    index,
    newText,
    newPP,
    newAmt,
    nf1,
    nf2,
    nf3,
    nf4,
    nsp,
    nsm
  ) => {
    const newData = [...this.state.data];
    newData[index] = {
      name: newText,
      paidPerson: newPP,
      amt: newAmt,
      f1: nf1,
      f2: nf2,
      f3: nf3,
      f4: nf4,
      sp: nsp,
      sm: nsm,
    };

    this.setState({
      data: newData,
    });
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
                    f1: 0,
                    f2: 0,
                    f3: 0,
                    f4: 0,
                    sp: 0,
                    sm: 0,
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
