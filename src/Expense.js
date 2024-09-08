import React from 'react';
import { Container, Row, Modal, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Expense.css'; 

export default class Expense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: true,
      isChecked1: true,
      isChecked2: true,
      isChecked3: true,
      isChecked4: true,
      payer: 'Rajneesh',
      billName: '',
      amount: '',
      bills: [], 
      showPopup: false, 
      currentBill: null 
    };
  }

  handleCheckboxChange = (index) => {
    this.setState(prevState => {
      const isChecked = [prevState.isChecked1, prevState.isChecked2, prevState.isChecked3, prevState.isChecked4];
      isChecked[index - 1] = !isChecked[index - 1];
      return {
        [`isChecked${index}`]: isChecked[index - 1]
      };
    });
  }

  handlePayerChange = (event) => {
    this.setState({ payer: event.target.value });
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  save = () => {
    const { billName, amount, payer, isChecked1, isChecked2, isChecked3, isChecked4 } = this.state;
    let parsedAmount = parseFloat(amount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.error('Please enter a valid amount.');
      return;
    }

    if (!billName) {
      toast.error('Please enter a bill name.');
      return;
    }

    const checkedCount = [isChecked1, isChecked2, isChecked3, isChecked4].filter(Boolean).length;

    if (checkedCount === 0) {
      toast.error('Please select at least one member to split with.');
      return;
    }

    const splitMoney = (parsedAmount / checkedCount).toFixed(2);

    const money = {
      Rajneesh: isChecked1 ? splitMoney : 0,
      Harshit: isChecked2 ? splitMoney : 0,
      Ankesh: isChecked3 ? splitMoney : 0,
      Nistha: isChecked4 ? splitMoney : 0
    };

    money[payer] = 0; 

    const newBill = {
      id: Date.now(), 
      billName,
      payer,
      amount: parsedAmount.toFixed(2),
      money,
      splitMoney
    };

    this.setState(prevState => ({
      bills: [...prevState.bills, newBill],
      showForm: false,
      showPopup: true,
      currentBill: newBill
    }));
  }

  removeBill = (id) => {
    this.setState(prevState => ({
      bills: prevState.bills.filter(bill => bill.id !== id)
    }), () => {
      toast.success('Bill removed successfully');
    });
  }

  handleClosePopup = () => {
    this.setState({ showPopup: false });
  }

  renderNormal() {
    return this.state.bills.map(bill => (
      <div key={bill.id} className='user-data'>
        <div>
          <h2>{bill.billName}</h2>
        </div>
        <div>
          <table className="mainTable">
            <tbody>
              <tr>
                <th>Amount: {bill.amount}</th>
                <th>Paid by: {bill.payer}</th>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='rgt'>
          <table className="memberTable">
            <tbody>
              <tr>
                <th>Member</th>
                <th>Amount</th>
              </tr>
              <tr>
                <td>Rajneesh</td>
                <td>Rs. {bill.money.Rajneesh}</td>
              </tr>
              <tr>
                <td>Harshit</td>
                <td>Rs. {bill.money.Harshit}</td>
              </tr>
              <tr>
                <td>Ankesh</td>
                <td>Rs. {bill.money.Ankesh}</td>
              </tr>
              <tr>
                <td>Nistha</td>
                <td>Rs. {bill.money.Nistha}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3>Split Money: {bill.splitMoney}</h3>
        <div>
          <button onClick={() => this.removeBill(bill.id)} className="remove-btn">Remove</button>
        </div>
      </div>
    ));
  }

  renderForm() {
    return (
      <div className='top'>
        <Container>
          <div className='container_inp'>
            <input 
              name="billName"
              placeholder={'Enter Bill Title'} 
              className="billStyle" 
              value={this.state.billName} 
              onChange={this.handleInputChange} 
              required 
            />
          </div>
          <div className='container_sec'>
            <div className='cont_sub'>
              <span>Paid by: </span>
              <select
                name="payer"
                value={this.state.payer}
                onChange={this.handlePayerChange}
                className="paidStyle"
              >
                <option value="Rajneesh">Rajneesh</option>
                <option value="Harshit">Harshit</option>
                <option value="Ankesh">Ankesh</option>
                <option value="Nistha">Nistha</option>
              </select>
            </div>
            <div className='cont_sub'>
              <span>Amount: </span>
              <input 
                name="amount"
                type="number" 
                placeholder={'Rs.'} 
                className="amtStyle" 
                min="0" 
                value={this.state.amount} 
                onChange={this.handleInputChange} 
              />
            </div>
          </div>
          <Row>
            <span className="splitWith">Split with: </span>
            <div className='split_cont'>
              <div className='split-sec'>
                <label className="split_data">Rajneesh
                  <input 
                    type="checkbox"
                    checked={this.state.isChecked1}
                    onChange={() => this.handleCheckboxChange(1)} 
                  />
                </label>
              </div>
              <div className='split-sec'>
                <label className="split_data">Harshit
                  <input 
                    type="checkbox"
                    checked={this.state.isChecked2}
                    onChange={() => this.handleCheckboxChange(2)} 
                  />
                </label>
              </div>
              <div className='split-sec'>
                <label className="split_data">Ankesh
                  <input 
                    type="checkbox"
                    checked={this.state.isChecked3}
                    onChange={() => this.handleCheckboxChange(3)} 
                  />
                </label>
              </div>
              <div className='split-sec'>
                <label className="split_data">Nistha
                  <input 
                    type="checkbox"
                    checked={this.state.isChecked4}
                    onChange={() => this.handleCheckboxChange(4)} 
                  />
                </label>
              </div>
            </div>
          </Row>
        </Container>
        <div className='save_container'>
          <button onClick={this.save} className="saveRemove">Save</button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className='main-container'>
        <div className='scrollable-bill-section'>
          {this.state.showForm ? this.renderForm() : this.renderNormal()}
        </div>
        <ToastContainer />
        <Modal show={this.state.showPopup} onHide={this.handleClosePopup}>
          <Modal.Header closeButton>
            <Modal.Title>Bill Saved</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.currentBill && (
              <>
                <p><strong>Bill Name:</strong> {this.state.currentBill.billName}</p>
                <p><strong>Amount:</strong> Rs. {this.state.currentBill.amount}</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClosePopup}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
