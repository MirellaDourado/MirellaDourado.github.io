import React, { Component } from 'react';
import { BiHeart, BiSearchAlt } from 'react-icons/bi';
import { HiUserCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <header data-testid="header-component" id='header-component'>
        {user ? (
          <>
            <h1>TrybeTunes</h1>
            <nav>
              <ul>
                <Link to="/trybetunes/search">
                  <BiSearchAlt size="26px" />
                  <li data-testid="link-to-search">
                    Search
                  </li>
                </Link>
                <Link to={"/trybetunes/favorites"}>
                  <BiHeart size="26px" />
                  <li data-testid="link-to-favorites">Favorites</li>
                </Link>
                <Link to="/trybetunes/profile">
                  <HiUserCircle size="26px" />
                  <li data-testid="link-to-profile">Profile</li>
                </Link>
              </ul>
            </nav>
            <hr />
            <div id="profileInf">
              {user.image === '' ? <HiUserCircle className="userIcon" />
                : (
                  <img
                    alt={ `Imagem de ${user.name}` }
                    src={ user.image }
                    onError={ ({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = 'https://developers.google.com/static/maps/documentation/maps-static/images/error-image-generic.png';
                      currentTarget.alt = 'Imagem indefinida';
                    } }
                  />
                )}
              <p data-testid="header-user-name">
                { user.name }
              </p>
            </div>
          </>) : <Loading />}
      </header>
    );
  }
}

export default Header;
