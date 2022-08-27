import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrenciesThunk } from '../redux/actions';

class WalletForm extends Component {
  state = {
    despesa: '',
    description: '',
    currencySelected: '',
    paymentMethodSelected,
    expenseCategorySelected,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrenciesThunk());
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      despesa,
      description,
      currencySelected,
      paymentMethodSelected,
      expenseCategorySelected,
    } = this.state;

    const { currencies } = this.props;

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
          <input
            type="text"
            name="description"
            value={ description }
            placeholder="Descrição"
            className="form-control my-3"
            onChange={ this.handleChange }
            data-testid="description-input"
          />
          <select
            className="form-select"
            name="currencySelected"
            value={ currencySelected }
            onChange={ this.handleChange }
            data-testid="currency-input"
          >
            {currencies.map((currency, index) => (
              <option key={ index } value={ currency }>{currency}</option>
            ))}
          </select>
          <select
            className="form-select"
            name="paymentMethodSelected"
            value={ paymentMethodSelected }
            onChange={ this.handleChange }
            data-testid="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select
            className="form-select"
            name="expenseCategorySelected"
            value={ expenseCategorySelected }
            onChange={ this.handleChange }
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
