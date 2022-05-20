import React from 'react';
import { Redirect } from 'react-router-dom';
// import { createBrowserHistory } from 'history';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
// import { getUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      login: '',
      loading: false,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.loadingCreateUser = this.loadingCreateUser.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  loadingCreateUser() {
    // const history = createBrowserHistory();
    const { login } = this.state;
    return this.setState({ loading: true },
      async () => {
        await createUser({ name: login });
        this.setState({ loading: false, redirect: true });
        // history.push('/search');
      });
  }

  render() {
    const { login, loading, redirect } = this.state;
    const minCharacters = 2;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="name-input">
            Nome
            <input
              data-testid="login-name-input"
              onChange={ this.handleChange }
              value={ login }
              type="text"
              name="login"
              id="name-input"
            />
          </label>
          <button
            disabled={ login.length <= minCharacters }
            onClick={ this.loadingCreateUser }
            data-testid="login-submit-button"
            type="button"
          >
            Entrar
          </button>
        </form>
        {loading && <Loading />}
        {redirect && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
