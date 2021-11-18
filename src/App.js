import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Main from "./components/Main"
import StuFrame from "./components/STUDENT/StuFrame";
import StudentCreate from "./components/STUDENT/StudentCreate";
import StudentSearch from "./components/STUDENT/StudentSearch";
import EditButton from "./components/STUDENT/EditButton";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from "react-bootstrap";
import ProFrame from "./components/PROFESSOR/ProFrame";
import EditButtonPro from "./components/PROFESSOR/EditButtonPro";
import ProCreate from "./components/PROFESSOR/ProCreate";
import ProSearch from "./components/PROFESSOR/ProSearch";
import SubFrame from "./components/SUBJECT/SubFrame";
import SubCreate from "./components/SUBJECT/SubCreate";
import EditButtonSub from "./components/SUBJECT/EditButtonSub";
import SubSearch from "./components/SUBJECT/SubSearch";
import EditStuAdd from "./components/STUDENT/EditStuAdd";
import EditProAdd from "./components/PROFESSOR/EditProAdd";
import EditCoordAdd from "./components/PROFESSOR/EditCoordAdd";
import FooterBase from "./components/FooterBase";
import GlobalStyle from "../src/components/GlobalStyle";
import styled from 'styled-components'


export default function App() {
  return (

    <div>

      <Router>
  
            <Navbar expand="lg" variant="light" bg="light">
    <Container>
    <Navbar.Brand href="/">Inicio</Navbar.Brand>
    <Nav  className="me-auto">
      <Nav.Link active href="/student">Estudiantes</Nav.Link>
      <Nav.Link active href="/subject">Asignaturas</Nav.Link>
      <Nav.Link active href="/professor">Profesor</Nav.Link>
    </Nav>
    </Container>
  </Navbar>

              <MainDiv>

        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/student' element={<StuFrame />} />
          <Route path='/student/registro' element={<StudentCreate />} />
          <Route path='/student/unidad' element={<StudentSearch />} />
          <Route path='/student/edit' element={<EditButton />} />
          <Route path='/student/edit/more' element={<EditStuAdd />} />
          <Route path='/professor' element={<ProFrame />} />
          <Route path='/professor/edit' element={<EditButtonPro />} />
          <Route path='/professor/edit/more' element={<EditProAdd />} />
          <Route path='/professor/edit/coordinator' element={<EditCoordAdd />} />
          <Route path='/professor/registro' element={<ProCreate />} />
          <Route path='/professor/unidad' element={<ProSearch />} />
          <Route path='/subject' element={<SubFrame />} />
          <Route path='/subject/edit' element={<EditButtonSub />} />
          <Route path='/subject/registro' element={<SubCreate />} />
          <Route path='/subject/unidad' element={<SubSearch />} />
        </Routes>

      </MainDiv>

      </Router>




      <GlobalStyle></GlobalStyle>

      <FooterBase></FooterBase>

    </div>

  );
}


const MainDiv = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
width: 80%;
margin: auto;

`

