import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import carrot from '../carrot.jpg';
export default function Main() {
  const history = useHistory();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const getId = async () => {
    try {
      setError(null);
      setLoading(true);
      const { data } = await axios.get('http://localhost:8080/mypage');

      console.log(data);
      setUser(data);
      console.log('f', typeof data);
      if (typeof data == 'string') return history.push('/login');
    } catch (e) {
      setError(e);
    }
    setLoading(false);
    console.log('a', typeof user);
    // if (user != typeof Object) return history.push('/login');
  };
  useEffect(() => {
    getId();
    // setTimeout(() => {
    //   if (typeof user == 'undefined') return history.push('/login');
    //   console.log('b', typeof user);
    //   console.log('d');
    // }, 5000);
  }, []);

  if (loading) return <div>...로딩중</div>;
  if (error) return <div>에러</div>;

  return (
    <div>
      {/* 홈입니다
      <button
        onClick={() => {
          history.push('/list');
        }}
      >
        d
      </button> */}
      <img src={carrot} alt="" />
    </div>
  );
}
