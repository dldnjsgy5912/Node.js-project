import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import carrot from '../carrot.jpg';
export default function Header() {
  return (
    <Navbar bg="orange" expand="lg" className="header">
      <Container>
        <img src={carrot} alt="" width="10%" />
        <Navbar.Brand href="/" color="orange">
          홍당무
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/write">
              글쓰기
            </Nav.Link>
            <Nav.Link as={Link} to="/list">
              List
            </Nav.Link>
            {/* <Nav.Link as={Link} to="/login">
              로그인
            </Nav.Link> */}
            <Nav.Link as={Link} to="/mypage">
              나의 정보
            </Nav.Link>
            {/* <Nav.Link as={Link} to="/signup">
              SignUp
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
