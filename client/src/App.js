import './App.css';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Home from './components/Home.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import Header from './components/Header.jsx';
import { useSelector } from 'react-redux';
import Footer from './components/Footer.jsx';
import AddTask from './components/AddTask.jsx';
import Calendar from './components/Calender.jsx';

function App() {
  // Fix: Add ?. before email to handle when user is null
  const email = useSelector((state) => state.users.user?.email);

  return (
    <Container fluid>
      <Router>
        <Row>
          {/* Header shows only if email exists */}
          {email ? <Header /> : null}
        </Row>
        <Row>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/add-task" element={<AddTask />} />
            <Route path="/add-task/:id" element={<AddTask />} />
            <Route path="/calendar" element={<Calendar />} />

          </Routes>
        </Row>
        <Row>
          <Footer />
        </Row>
      </Router>
    </Container>
  );
}

export default App;


