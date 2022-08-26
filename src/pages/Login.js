import React from 'react';

class Login extends React.Component {
  state = {
    email: '',
    senha: '',
    isButtonDisabled: true,
  };

  handleChange = () => {
    console.log('change');
  };

  handleSubmit = () => {
    console.log('Entrou');
  };

  render() {
    const { isButtonDisabled, email, senha } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <input
          type="email"
          name={ email }
          placeholder="E-mail"
          onChange={ this.handleChange }
          data-testid="email-input"
        />
        <input
          type="password"
          name={ senha }
          placeholder="Senha"
          onChange={ this.handleChange }
          data-testid="password-input"
        />
        <button type="submit" disabled={ isButtonDisabled }>Entrar</button>
      </form>
    );
  }
}

export default Login;
