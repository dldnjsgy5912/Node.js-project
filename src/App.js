import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { Switch, Route } from 'react-router-dom';
import Write from './components/Write';
import List from './components/List';
import Main from './components/Main';
import Detail from './components/Detail';
import Edit from './components/Edit';
import Login from './components/Login';
import Mypage from './components/Mypage';
import Signup from './components/Signup';
import Search from './components/Search';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/write" component={Write} />
        <Route path="/list" component={List} />
        <Route path="/detail/:id" component={Detail} />
        <Route path="/edit/:id" component={Edit} />
        <Route path="/login" component={Login} />
        <Route path="/mypage" component={Mypage} />
        <Route path="/signup" component={Signup} />
        <Route path="/search" component={Search} />
      </Switch>
    </div>
  );
}

export default App;
