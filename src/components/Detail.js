import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Button, Container, Row, Col, Stack } from 'react-bootstrap';
export default function Detail() {
  const { id } = useParams();
  const [todo, setTodo] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const history = useHistory();
  const [delBtn, setDelBtn] = useState(false);
  const getData = async () => {
    try {
      setError(null);
      setLoading(true);
      const { data } = await axios.get('http://localhost:8080/list');
      const 찾은상품 = data.find((신발) => {
        return 신발._id == id;
      });
      console.log(찾은상품);
      setTodo(찾은상품);
      // if (todo.작성자) return setDelBtn(true);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const delData = async (e) => {
    if (window.confirm('정말 삭제합니까?')) {
      try {
        await axios.delete('/delete', {
          data: {
            _id: e.target.dataset.id,
          },
        });
        // window.location.replace('/list');
        // history.push('/write');
        console.log('성공');
      } catch (e) {
        setError(e);
      }
    } else {
      alert('취소합니다.');
    }
  };

  if (loading) return <div>...로딩중</div>;
  if (error) return <div>에러</div>;
  if (!todo) return null;

  return (
    <Container>
      <Row>
        <Col md={12} className=" detailarea light">
          <h2 className="mt-5 bg-light">{todo.title}</h2>
          <p className="day mt-2">{todo.day}</p>
          <p className="day mt-2">{todo.price} 원</p>
          <p className="mt-5 bg-light">{todo.dete}</p>

          <Stack direction="horizontal" gap={2}>
            <Button
              className="mt-5 ms-auto"
              variant="outline-primary"
              onClick={() => {
                history.push(`/edit/${todo._id}`);
              }}
            >
              수정
            </Button>
            {delBtn && (
              <Button variant="outline-danger" data-id={todo._id} onClick={delData} className="mt-5">
                삭제
              </Button>
            )}
            <Button variant="outline-danger" data-id={todo._id} onClick={delData} className="mt-5">
              삭제
            </Button>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}
