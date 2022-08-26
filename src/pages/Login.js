import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveUser } from '../redux/actions';
import wallet from '../assets/img/wallet.png';

class Login extends React.Component {
  state = {
    email: '',
    senha: '',
    isButtonDisabled: true,
  };

  validateFormInputs = ({ email, senha } = this.state) => {
    const minimumPasswordLength = 5;
    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    return !isValidEmail || senha.length < minimumPasswordLength;
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
      isButtonDisabled: this.validateFormInputs(),
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    const { email } = this.state;
    dispatch(saveUser(email));
    const { history } = this.props;
    history.push('/carteira');
  };

  render() {
    const { isButtonDisabled, email, senha } = this.state;
    return (
      <section className="container-fluid">
        <div className="row justify-content-center align-items-center h100">
          <form
            onSubmit={ this.handleSubmit }
            className="col-10 col-md-6 col-lg-4 border rounded-3 p-4 shadow"
            style={ { maxWidth: '400px', background: 'white' } }
          >
            <img
              src={ wallet }
              className="img-fluid mx-auto d-block"
              alt="Trybewallet"
              style={ { maxWidth: '80px' } }
            />
            <input
              type="email"
              name="email"
              value={ email }
              placeholder="E-mail"
              className="form-control my-3"
              onChange={ this.handleChange }
              data-testid="email-input"
            />
            <input
              type="password"
              name="senha"
              value={ senha }
              placeholder="Senha"
              className="form-control my-3"
              onChange={ this.handleChange }
              data-testid="password-input"
            />
            <button
              type="submit"
              className={
                `btn btn-md btn-primary d-block mx-auto my-3
                ${isButtonDisabled && 'btn-secondary disabled'}`
              }
              disabled={ isButtonDisabled }
            >
              Entrar
            </button>
          </form>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
