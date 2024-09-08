import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: true,
      isChecked1: true,
      isChecked2: true,
      isChecked3: true,
      isChecked4: true,
      payer: 'Rajneesh'
    };
  }

  toggleChange1 = () => {
    this.setState({ isChecked1: !this.state.isChecked1 });
  }

  toggleChange2 = () => {
    this.setState({ isChecked2: !this.state.isChecked2 });
  }

  toggleChange3 = () => {
    this.setState({ isChecked3: !this.state.isChecked3 });
  }

  toggleChange4 = () => {
    this.setState({ isChecked4: !this.state.isChecked4 });
  }

  handlePayerChange = (event) => {
    this.setState({ payer: event.target.value });
  }

  remove = (index) => {
    this.props.deleteFromBoard(
      this.props.dd.paidPerson,
      this.props.dd.amt,
      this.props.dd.f1,
      this.props.dd.f2,
      this.props.dd.f3,
      this.props.dd.f4,
      this.props.index
    );
    toast.error('Bill Removed Successfully');
  }
//Save Billing Info
  save = () => {
    const billName = this.refs.newText.value.trim();
    const amount = parseFloat(this.refs.newText3.value);

    if (!billName) {
      toast.error('Please enter a bill name.');
      return;
    }

    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid amount.');
      return;
    }

    const checkedCount = [this.state.isChecked1, this.state.isChecked2, this.state.isChecked3, this.state.isChecked4].filter(Boolean).length;

    if (checkedCount === 0) {
      toast.error('Please select at least one member to split with.');
      return;
    }

    const splitMoney = (amount / checkedCount).toFixed(2);

    const money = {
      Rajneesh: 0,
      Harshit: 0,
      Ankesh: 0,
      Nistha: 0
    };

    if (this.state.isChecked1) money.Rajneesh = splitMoney;
    if (this.state.isChecked2) money.Harshit = splitMoney;
    if (this.state.isChecked3) money.Ankesh = splitMoney;
    if (this.state.isChecked4) money.Nistha = splitMoney;

    if (this.state.payer === 'Rajneesh') money.Rajneesh = 0;
    if (this.state.payer === 'Harshit') money.Harshit = 0;
    if (this.state.payer === 'Ankesh') money.Ankesh = 0;
    if (this.state.payer === 'Nistha') money.Nistha = 0;

    this.props.updateCommentText(
      billName,
      this.state.payer,
      amount.toFixed(2),
      money.Rajneesh,
      money.Harshit,
      money.Ankesh,
      money.Nistha,
      checkedCount,
      splitMoney,
      this.props.index
    );

    toast.success('Bill saved successfully!');
    this.setState({ temp: false });
  }

  renderNormal() {
    return (
      <div className='user-data'>
        
        <div>
          <h2>{this.props.dd.name}</h2>
        </div>
        
        <div>
          <table className="mainTable">
            <tbody>
              <tr>
                <th>Amount: {this.props.dd.amt}</th>
                <th>Paid by: {this.props.dd.paidPerson}</th>
              </tr>
            </tbody>
          </table>
        </div>
         {/* //Show amount */}
        <div className='rgt'>
         
          
          <table className="memberTable">
            <tbody>
              <tr>
                <th>Member</th>
                <th>Amount</th>
              </tr>
              <tr>
                <td>Rajneesh</td>
                <td>Rs. {this.props.dd.f1}</td>
              </tr>
              <tr>
                <td>Harshit</td>
                <td>Rs. {this.props.dd.f2}</td>
              </tr>
              <tr>
                <td>Ankesh</td>
                <td>Rs. {this.props.dd.f3}</td>
              </tr>
              <tr>
                <td>Nistha</td>
                <td>Rs. {this.props.dd.f4}</td>
              </tr>
            </tbody>
          </table>
        </div>
       
        <h3>{this.props.sum}</h3>
        <div>
          <button onClick={() => this.remove(this.props.index)} className="saveRemove">Completed</button>
        </div>

      </div>
    );
  }

  renderForm() {
    return (
      <div className='top'>
        <Container>
          <div className='container_inp'>
            <input ref="newText" placeholder={'Enter Bill Title'} className="billStyle" required></input>
          </div>
          <div className='container_sec'>
            <div className='cont_sub'>
              <span>Paid by: </span>
              <select
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

            <div  className='cont_sub'>
              <span>Amount: </span>
              <input ref="newText3" type="number" placeholder={'Rs.'} className="amtStyle" min="0"></input>
            </div>
          </div>
          <Row>
            <span className="splitWith">Split with: </span>
            <div className='split_cont'>
              <div className='split-sec'>
                <label className="split_data">Rajneesh
                  <input type="checkbox"
                    checked={this.state.isChecked1}
                    onChange={this.toggleChange1} />
                 
                </label>
              </div>
              <div className='split-sec'>
                <label className="split_data">Harshit
                  <input type="checkbox"
                    checked={this.state.isChecked2}
                    onChange={this.toggleChange2} />
                 
                </label>
              </div>
              <div className='split-sec'>
                <label className="split_data">Ankesh 
                  <input type="checkbox"
                    checked={this.state.isChecked3}
                    onChange={this.toggleChange3} />
                 
                </label>
              </div>
              <div className='split-sec'>
                <label className="split_data">Nistha
                  <input type="checkbox"
                    checked={this.state.isChecked4}
                    onChange={this.toggleChange4} />
                 
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
      <>
        {this.state.temp ? this.renderForm() : this.renderNormal()}
        <ToastContainer />
      </>
    );
  }
}
