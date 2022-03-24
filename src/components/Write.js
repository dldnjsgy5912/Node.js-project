import { Form, Button, Container, Row, Col } from 'react-bootstrap';

export default function Write() {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={5}>
          <Form action="/add" method="POST">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>날짜</Form.Label>
              <Form.Control type="date" name="day" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>제목</Form.Label>
              <Form.Control type="text" placeholder="오늘의 할일" name="title" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>가격</Form.Label>
              <Form.Control type="number" placeholder="가격" name="price" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>세부내용</Form.Label>
              <Form.Control as="textarea" placeholder="세부내용" style={{ height: '100px' }} name="dete" />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}

            <Button variant="primary" type="submit">
              저장하기
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
