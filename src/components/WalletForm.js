import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrenciesThunk } from '../redux/actions';
import getCurrencies from '../services';

class WalletForm extends Component {
  state = {
    valorDaDespesa: '',
    description: '',
    currencySelected: 'USD',
    paymentMethodSelected: 'Dinheiro',
    expenseCategorySelected: 'Alimentação',
    exchangeRates: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrenciesThunk());
  }

  handleSaveExpense = async () => {
    const currencies = await getCurrencies();
    this.setState({ exchangeRates: currencies });
    const {
      valorDaDespesa,
      description,
      currencySelected,
      paymentMethodSelected,
      expenseCategorySelected,
      exchangeRates,
    } = this.state;
    const newExpense = {
      id: 0,
      value: valorDaDespesa,
      description,
      currency: currencySelected,
      paymentMethod: paymentMethodSelected,
      expenseCategory: expenseCategorySelected,
      exchangeRates,
    };
    console.log(newExpense);
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      valorDaDespesa,
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
            name="valorDaDespesa"
            value={ valorDaDespesa }
            placeholder="Valor da despesa"
            className="form-control my-2"
            onChange={ this.handleChange }
            data-testid="value-input"
          />
          <input
            type="text"
            name="description"
            value={ description }
            placeholder="Descrição"
            className="form-control my-2"
            onChange={ this.handleChange }
            data-testid="description-input"
          />
          <select
            className="form-select my-2"
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
            className="form-select my-2"
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
            className="form-select my-2"
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
          <button
            type="button"
            className="btn btn-md btn-primary my-3"
            onClick={ this.handleSaveExpense }
          >
            Adicionar despesa
          </button>
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
