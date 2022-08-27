import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrenciesThunk, actionAddExpense } from '../redux/actions';
import getCurrencies from '../services';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrenciesThunk());
  }

  handleSaveExpense = async () => {
    const currencies = await getCurrencies();
    const { dispatch, idExpense } = this.props;
    this.setState({
      id: idExpense.length > 0 ? idExpense.length : 0,
      exchangeRates: currencies,
    });
    dispatch(actionAddExpense(this.state));
    this.setState({
      value: '',
      description: '',
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    const { currencies } = this.props;

    return (
      <section className="container mt-3">
        <div className="row justify-content-center align-items-center">
          <label htmlFor="value" className="col-lg-2 form-label my-2">
            Valor
            <input
              type="text"
              name="value"
              value={ value }
              placeholder="Valor da despesa"
              className="form-control"
              onChange={ this.handleChange }
              data-testid="value-input"
            />
          </label>
          <label htmlFor="description" className="col-lg-2 form-label my-2">
            Descrição
            <input
              type="text"
              name="description"
              value={ description }
              placeholder="Descreva a despesa"
              className="form-control"
              onChange={ this.handleChange }
              data-testid="description-input"
            />
          </label>
          <label htmlFor="currency" className="col-lg-2 form-label my-2">
            Moeda
            <select
              className="form-select"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
              data-testid="currency-input"
            >
              {currencies.map((element, index) => (
                <option key={ index } value={ element }>{element}</option>
              ))}
            </select>
          </label>
          <label htmlFor="method" className="col-lg-2 form-label my-2">
            Forma de pagamento
            <select
              className="form-select"
              name="method"
              value={ method }
              onChange={ this.handleChange }
              data-testid="method-input"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="method" className="col-lg-2 form-label my-2">
            Categoria
            <select
              className="form-select"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
              data-testid="tag-input"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <div className="col-lg-2">
            <button
              type="button"
              className="btn btn-md btn-primary mt-4"
              onClick={ this.handleSaveExpense }
            >
              Adicionar despesa
            </button>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  idExpense: state.wallet.expenses,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  idExpense: PropTypes.arrayOf(PropTypes.shape({ }).isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
