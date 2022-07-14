import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Home extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isLoading: true,
      error: null,
      profile: null,
    };
  }
  
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.setState({
        isLoading: false,
        error: 'Token не найден, для получения профиля, пожалуйста, аутентифицируйтесь.'
      });
      return;
    }
    
    axios.get('/api/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }).then(response => {
      this.setState({
        isLoading: false,
        profile: response.data,
      });
    }).catch(error => {
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        this.setState({
          isLoading: false,
          error: 'Неверный токен для получения профиля, пожалуйста, аутентифицируйтесь заново.'
        });
        return;
      }
      
      this.setState({
        isLoading: false,
        error: error.response.data.error,
      });
    });
  }
  
  render() {
    const { isLoading, error, profile } = this.state;
    
    if (isLoading) {
      return (
        <div className="signin-container">
          <img className="mb-4"
               src="https://getbootstrap.com/docs/4.4/assets/brand/bootstrap-solid.svg"
               alt="icon" width="72" height="72" />
          <p className="lead">
            Пожалуйста, подождите, ваш профиль загружается.
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
            При загрузке профиля произошла ошибка
          </p>
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
          <Link to="/login" className="btn btn-lg btn-primary btn-block">Вход</Link>
        </div>
      );
    }
    
    return (
      <div className="signin-container">
        <img className="mb-4"
             src="https://getbootstrap.com/docs/4.4/assets/brand/bootstrap-solid.svg"
             alt="icon" width="72" height="72" />
        <h1 className="h3 mb-3 font-weight-normal">Добро пожаловать!</h1>
        <p className="lead">
          email: {profile.email}
        </p>
        <p className="lead">
          displayName: {profile.displayName}
        </p>
        <Link to="/chat" className="btn btn-lg btn-primary btn-block">Чат</Link>
        <button onClick={this.onLogout} className="btn btn-lg btn-primary btn-block">
          Выход
        </button>
      </div>
    );
  }
  
  onLogout() {
    localStorage.removeItem('token');
    window.location.reload();
  }
}
