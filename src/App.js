
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from "react-bootstrap";
import { Avatar } from '@mui/material'; // Import Avatar component from Material-UI
import Navbar from "./Components/Navbar/Navbar.js";
import Board from "./Board.js";
import avatar1 from './assets/images.jpg'
import avatar2 from './assets/Untitled.png'
import avatar3 from './assets/images1.jpg'
import avatar4 from './assets/images2.jpg'
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Sample data for members with image URLs
const members = [
  { name: 'Rajneesh', avatar: avatar1 },
  { name: 'Harshit', avatar:avatar2 },
  { name: 'Ankesh', avatar: avatar3 },
  { name: 'Nistha', avatar: avatar4} 
];

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="main-container">
        <Container>
          <Row>
            <Col xs={12} md={8}>
              <div className="ListDiv">
                <Board />
              </div>
            </Col>
            <Col xs={12} md={4}>
              <div className="members">
                <div className="name">
                  <h2 className="flipInX">Total Members</h2>
                </div>
                <table className="membersSidebar">
                  <div className="aheading">
                    <h5>Avatar</h5>
                    <h5>Name</h5>
                  </div>
                  <tbody>
                    {members.map((member, index) => (
                      <tr key={index}>
                        <div className="mem_cont"> 
                        <td>
                        <div className="mem_avt">
                          <Avatar src={member.avatar} alt={member.name} />
                          </div>
                        </td>
                      
                        <td>{member.name}</td>
                        </div> 
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      
    </div>
  );
}

export default App;
