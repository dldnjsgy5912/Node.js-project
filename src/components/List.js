import { FormControl, InputGroup, Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
export default function List() {
  const [todo, setTodo] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const history = useHistory();

  const [url, setUrl] = useState();

  const getData = async () => {
    try {
      setError(null);
      setLoading(true);
      const { data } = await axios.get('http://localhost:8080/list');

      console.log(data);
      setTodo(data.reverse());
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

  return (
    <>
      <Container>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="검색할 값을 입력하시오."
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />

          <Button
            variant="outline-secondary"
            id="search"
            onClick={() => {
              // url 을 바꿔주는 코드(get 요청과 똑같음) `/search?이름=값`
              window.location.replace(`/search?value=${url}`);
            }}
          >
            검색
          </Button>
        </InputGroup>
        <Row>
          {todo &&
            todo.map((to, i) => {
              return (
                <Col
                  md={12}
                  key={i}
                  className=" col mt-4"
                  onClick={() => {
                    history.push(`/detail/${todo[i]._id}`);
                  }}
                >
                  <h3 className="mt-3 title ">{to.title}</h3>
                  <p className="mt-1 day">{to.day}</p>
                  <p className="mt-1 day">{to.price} 원</p>
                  <p className="mt-1 mb-1 dete">{to.dete}</p>

                  {/* <Button variant="outline-danger" className="mb-1" data-id={todo[i]._id} onClick={delData}>
                    삭제
                  </Button> */}
                </Col>
              );
            })}
        </Row>
      </Container>
    </>
  );
}
