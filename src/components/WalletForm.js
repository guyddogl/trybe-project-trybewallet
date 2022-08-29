import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCurrenciesThunk,
  actionAddExpense,
  actionDeleteExpense,
  actionSetEditorFalse,
} from '../redux/actions';
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

  componentDidMount({ dispatch } = this.props) { dispatch(getCurrenciesThunk()); }

  componentDidUpdate(prevValue) { // https://stackoverflow.com/questions/52393172/comparing-prevprops-in-componentdidupdate
    const { editor } = this.props;
    if (editor !== prevValue.editor) this.handleEditExpense();
  }

  handleEditExpense = ({ editor, expenses, idToEdit } = this.props) => {
    if (editor) this.setState({ ...expenses.find((e) => e.id === idToEdit) });
    else {
      this.setState({
        id: 0,
        value: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: '',
        exchangeRates: {},
      });
    }
  };

  handleSaveExpense = async () => {
    const { dispatch, editor, expenses, idToEdit } = this.props;
    if (editor) {
      // https://stackoverflow.com/questions/49491393/using-spread-operator-to-update-an-object-value
      const editExpense = expenses
        .map((expense) => (expense.id === idToEdit
          ? { ...expense, ...this.state } : { ...expense }));
      dispatch(actionDeleteExpense(editExpense));
      this.setState({ value: '', description: '' });
    } else {
      const currencies = await getCurrencies();
      this.setState({
        id: expenses.length > 0 ? expenses.length : 0,
        exchangeRates: currencies,
      });
      dispatch(actionAddExpense(this.state));
      this.setState({ value: '', description: '' });
    }
  };

  handleChange = ({ target: { name, value } }) => { this.setState({ [name]: value }); };

  handleEditCancel = () => {
    const { dispatch } = this.props;
    dispatch(actionSetEditorFalse());
  };

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    const { currencies, editor } = this.props;

    return (
      <section className="container my-5">
        <div className="row justify-content-center align-items-center">
          <label htmlFor="value" className="col-4 col-lg-2 form-label my-2">
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
          <label htmlFor="description" className="col-8 col-lg-2 form-label my-2">
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
          <label htmlFor="currency" className="col-4 col-lg-1 form-label my-2">
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
          <label htmlFor="method" className="col-8 col-lg-2 form-label my-2">
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
          <label htmlFor="method" className="col-6 col-lg-2 form-label my-2">
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
          <div className="col-6 col-lg-3" style={ { maxWidth: '260px' } }>
            {editor ? (
              <>
                <button
                  type="button"
                  className="btn btn-md btn-primary mt-4 me-3"
                  onClick={ this.handleSaveExpense }
                  data-testid="btn-save-edit"
                >
                  Editar despesa
                </button>
                <button
                  type="button"
                  className="btn btn-md btn-secondary mt-4"
                  onClick={ this.handleEditCancel }
                >
                  Cancelar
                </button>
              </>)
              : (
                <button
                  type="button"
                  className="btn btn-md btn-success mt-4"
                  onClick={ this.handleSaveExpense }
                >
                  Adicionar despesa
                </button>)}

          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({ }).isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
