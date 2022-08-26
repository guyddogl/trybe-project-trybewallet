import React from 'react';
import wallet from '../assets/img/wallet.png';

class Login extends React.Component {
  state = {
    email: '',
    senha: '',
    isButtonDisabled: true,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = () => {
    console.log('Entrou');
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

export default Login;
