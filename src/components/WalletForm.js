import React, { Component } from 'react';
import getCurrency from '../services';

class WalletForm extends Component {
  state = {
    despesa: '',
    currencies: [],
  };

  async componentDidMount() {
    const api = await getCurrency();
    this.setState({
      currencies: api,
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { despesa } = this.state;
    const { currencies } = this.state;
    return (
      <section className="container-fluid">
        <div className="row justify-content-center align-items-center">
          <input
            type="text"
            name="despesa"
            value={ despesa }
            placeholder="Despesa"
            className="form-control my-3"
            onChange={ this.handleChange }
            data-testid="value-input"
          />
          <select
            className="form-select"
            data-testid="currency-input"
          >
            {currencies.map((currency) => (
              currency[0] !== 'USDT'
              && <option key={ currency[0] } value={ currency[0] }>{currency[0]}</option>
            ))}
          </select>
        </div>
      </section>
    );
  }
}

export default WalletForm;
