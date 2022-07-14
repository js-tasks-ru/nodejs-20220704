import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class OAuth extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      token: null,
      error: null,
    };
  }

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    
    axios.post(`/api/oauth_callback?code=${params.get('code')}`, {
      provider: this.props.match.params.provider,
    }).then(response => {
      this.setState({
        token: response.data.token,
      });
    }).catch(error => {
      this.setState({
        error: error.response.data.error,
      });
    });
  }
  
  render() {
    const { token, error } = this.state;
    
    if (token) {
      return (
        <div className="signin-container">
          <img className="mb-4"
               src="https://getbootstrap.com/docs/4.4/assets/brand/bootstrap-solid.svg"
               alt="icon" width="72" height="72" />
          <h1 className="h3 mb-3 font-weight-normal">Добро пожаловать!</h1>
          <p className="lead">
            Токен: {token}
          </p>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="signin-container">
          <img className="mb-4"
               src="https://getbootstrap.com/docs/4.4/assets/brand/bootstrap-solid.svg"
               alt="icon" width="72" height="72" />
          <p className="lead">
            При выполнении аутентификации произошла ошибка
          </p>
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
          <Link to="/" className="btn btn-lg btn-primary btn-block">Вход</Link>
        </div>
      );
    }
    
    return (
      <div className="signin-container">
        <img className="mb-4"
             src="https://getbootstrap.com/docs/4.4/assets/brand/bootstrap-solid.svg"
             alt="icon" width="72" height="72" />
        <p className="lead">
          Пожалуйста, подождите — производится аутентификация через социальную сеть.
        </p>
      </div>
    );
  }
}
