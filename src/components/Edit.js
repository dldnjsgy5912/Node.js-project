import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';

export default function Edit() {
  const [todo, setTodo] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { id } = useParams();
  const history = useHistory();
  const getData = async () => {
    try {
      setError(null);
      setLoading(true);
      const { data } = await axios.get('http://localhost:8080/list');
      const 찾은상품 = data.find((data) => {
        return data._id == id;
      });
      console.log(찾은상품);
      setTodo(찾은상품);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <div>...로딩중</div>;
  if (error) return <div>에러</div>;
  if (!todo) return null;

  const up = (e) => {
    axios.put('/edit', {
      id: e.target.dataset.id,
      day: todo.day,
      title: todo.title,
      dete: todo.dete,
    });
    console.log(todo);
    history.push(`/detail/${todo._id}`);
  };

  const onChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={5}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>날짜</Form.Label>
              <Form.Control type="date" name="day" defaultValue={todo.day} onChange={onChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>오늘의 할일</Form.Label>
              <Form.Control type="text" placeholder="오늘의 할일" name="title" defaultValue={todo.title} onChange={onChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>세부내용</Form.Label>
              <Form.Control as="textarea" placeholder="세부내용" defaultValue={todo.dete} style={{ height: '100px' }} name="dete" onChange={onChange} />
            </Form.Group>

            <Button variant="primary" onClick={up} data-id={todo._id}>
              수정하기
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
