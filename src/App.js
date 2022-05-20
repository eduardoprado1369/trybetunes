import React from 'react';
// import { Redirect } from 'react-router-dom';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
// import { createBrowserHistory } from 'history';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
// import { createUser } from './services/userAPI';

class App extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     login: '',
  //     loading: false,
  //   };
  //   this.handleChange = this.handleChange.bind(this);
  //   this.loadingCreateUser = this.loadingCreateUser.bind(this);
  //   this.loadingGetUser = this.loadingGetUser.bind(this);
  // }

  // componentDidMount() {
  //   console.log('teste');
  // }

  // handleChange({ target }) {
  //   const { name } = target;
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   this.setState({
  //     [name]: value,
  //   });
  // }

  // loadingCreateUser() {
  //   const history = createBrowserHistory();
  //   const { login } = this.state;
  //   return this.setState({ loading: true },
  //     async () => {
  //       await createUser({ name: login });
  //       this.setState({ loading: false });
  //       history.push('/search');
  //     });
  // }

  // loadingGetUser() {
  //   return this.setState({ loading: true },
  //     async () => {
  //       await getUser();
  //       this.setState({ loading: false });
  //     });
  // }

  render() {
    // const { login, loading } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" render={ (props) => <Album { ...props } /> } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route exact path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

// { /* <Route */ }
// exact
// path="/"
// render=
// { /* // { () => (<Login */ }
//   handleChange={ this.handleChange }
//   login={ login }
//   loading={ loading }
//   loadingCreateUser={ this.loadingCreateUser }
// />)
// }
// />

export default App;
