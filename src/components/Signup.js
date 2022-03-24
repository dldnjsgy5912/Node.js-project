import { Form, Button, Container, Row, Col } from 'react-bootstrap';
export default function Signup() {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={5}>
          <h2 className="mt-4">회원가입</h2>
          <Form action="/signup" method="POST" className="mt-4">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="name" placeholder="Enter email" name="id" />
              <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="pw" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
