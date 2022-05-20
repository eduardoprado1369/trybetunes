import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: {},
    };
    this.getNameFunction = this.getNameFunction.bind(this);
  }

  componentDidMount() {
    this.getNameFunction();
  }

  async getNameFunction() {
    this.setState({ loading: true });
    const userName = await getUser();
    // console.log(userName);
    this.setState({ user: userName, loading: false });
    // const userNameJSON = await userName.json();
    // console.log(userNameJSON);
    // return userNameJSON;
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{user.name}</p>
        {loading && <Loading />}
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        <Link data-testid="link-to-profile" to="/profile">Profile</Link>
      </header>
    );
  }
}

export default Header;
