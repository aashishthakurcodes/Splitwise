import React from "react";
import Comment from "./Comment";
import { Container, Row, Col } from "react-bootstrap"; // Using react-bootstrap for layout
import "./index.css";
//Rajneesh,Harshit,Nishta,Ankesh

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
      good: [],
      toGet: 0,
      bad: [],
      toGive: 0,
    };
  }

  add = (text) => {
    this.setState((prevState) => ({
      data: [...prevState.data, text],
    }));
  };

  removeComment = (newPP, newAmt, nf1, nf2, nf3, nf4, index) => {
    let updatedGood = [...this.state.good];
    let updatedBad = [...this.state.bad];

    if (newPP.toLowerCase() === "rajneesh") {
      const attempt =
        [nf2, nf3, nf4].filter((amount) => amount !== 0).length + 1;
      const variable1 = (newAmt / attempt) * (attempt - 1);
      updatedGood = updatedGood.filter((amount) => amount !== variable1);
    }

    if (nf1 !== 0) {
      updatedBad = updatedBad.filter((amount) => amount !== nf1);
    }

    this.setState((prevState) => ({
      good: updatedGood,
      toGet: updatedGood.reduce((sum, amount) => sum + amount, 0),
      bad: updatedBad,
      toGive: updatedBad.reduce((sum, amount) => sum + amount, 0),
      data: prevState.data.filter((_, idx) => idx !== index),
    }));
  };

  updateComment = (
    newText,
    newPP,
    newAmt,
    nf1,
    nf2,
    nf3,
    nf4,
    nsp,
    nsm,
    index
  ) => {
    const newData = [...this.state.data];
    const oldComment = newData[index];

    newData[index] = {
      ...newData[index],
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

    let updatedGood = [...this.state.good];
    let updatedBad = [...this.state.bad];

    // Remove old values
    if (oldComment.paidPerson.toLowerCase() === "rajneesh") {
      const oldAmount = oldComment.amt - oldComment.sm;
      updatedGood = updatedGood.filter((amount) => amount !== oldAmount);
    }

    if (oldComment.f1 === oldComment.sm) {
      updatedBad = updatedBad.filter((amount) => amount !== oldComment.f1);
    }

    // Update new values
    if (newPP.toLowerCase() === "rajneesh") {
      const newAmountToReceive = newAmt - nsm;
      updatedGood.push(newAmountToReceive);
    }

    if (nf1 === nsm) {
      updatedBad.push(nf1);
    }

    this.setState({
      good: updatedGood,
      toGet: updatedGood.reduce((sum, amount) => sum + amount, 0),
      bad: updatedBad,
      toGive: updatedBad.reduce((sum, amount) => sum + amount, 0),
      data: newData,
    });
  };

  eachComment = (comment, index) => (
    <Comment
      key={index}
      index={index}
      dd={comment}
      updateCommentText={this.updateComment}
      deleteFromBoard={this.removeComment}
    />
  );

  render() {
    return (
      <div className="container-table">
        <Container>
          <Row>
            <div className="table-heading">
              <h2 className="flipInX"> Divide Costs Fairly, Settle Easily</h2>
              {/* <div class="wrapper">
                <svg>
                  <text x="50%" y="50%" dy=".35em" text-anchor="middle">
                  Divide Costs Fairly, Settle Easily
                  </text>
                </svg>
              </div> */}
              
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
                className="addBillBtn"
              >
                Add Bill
              </button>
            </div>
          </Row>
          <Row>
            <Col>
              <table className="mainTable">
                <thead>
                  <div className="heading-2">
                    <div className="bill_data">
                      Amount to Receive: {this.state.toGet}
                    </div>
                    <div className="bill_data">
                      Amount to Pay: {this.state.toGive}
                    </div>
                  </div>
                </thead>
              </table>
            </Col>
          </Row>
        </Container>
        {this.state.data.map(this.eachComment)}
      </div>
    );
  }
}
