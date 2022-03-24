import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function Mypage() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const history = useHistory();

  const getId = async () => {
    try {
      setError(null);
      setLoading(true);
      const { data } = await axios.get('http://localhost:8080/mypage');

      console.log(data);
      setUser(data);
      if (typeof data == 'string') return history.push('/login');
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };
  useEffect(() => {
    getId();
  }, []);

  if (loading) return <div>...로딩중</div>;
  if (error) return <div>에러</div>;
  if (!user) return null;

  return <div>{user.id}님의 페이지 입니다.</div>;
}
