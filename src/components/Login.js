import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
export default function Login() {
  const history = useHistory();
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={5}>
          <h2 className="mt-4">로그인</h2>
          <Form action="/login" method="POST" className="mt-4">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="name" placeholder="Enter email" name="id" />
              <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="pw" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              로그인
            </Button>
            <br />
            <br />
            <Button
              variant="primary"
              onClick={() => {
                history.push('/signup');
              }}
            >
              회원가입
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
