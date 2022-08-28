import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { actionDeleteExpense, actionEditExpense } from '../redux/actions';

class Table extends Component {
  showNotification = (type, message) => {
    toastr.options = {
      closeButton: false,
      debug: false,
      newestOnTop: false,
      progressBar: false,
      positionClass: 'toast-top-center',
      preventDuplicates: false,
      onclick: null,
      showDuration: '300',
      hideDuration: '1000',
      timeOut: '3000',
      extendedTimeOut: '1000',
      showEasing: 'swing',
      hideEasing: 'linear',
      showMethod: 'fadeIn',
      hideMethod: 'fadeOut',
    };
    toastr[type](message);
  };

  deleteExpense = ({ target }) => {
    const { expenses, dispatch } = this.props;
    const filterExpense = expenses.filter((expense) => expense.id !== Number(target.id));
    dispatch(actionDeleteExpense(filterExpense));
    this.showNotification('warning', 'Despesa excluída');
  };

  editExpense = ({ target }) => {
    const { dispatch } = this.props;
    dispatch(actionEditExpense(Number(target.id)));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div className="table-responsive">
        <table
          className="table table-sm table-hover table-bordered align-middle"
          style={ { background: 'white' } }
        >
          <thead className="table-success text-center">
            <tr>
              <th scope="col">Descrição</th>
              <th scope="col">Tag</th>
              <th scope="col">Método de pagamento</th>
              <th scope="col">Valor</th>
              <th scope="col">Moeda</th>
              <th scope="col">Câmbio utilizado</th>
              <th scope="col">Valor convertido</th>
              <th scope="col">Moeda de conversão</th>
              <th scope="col">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody className="">
            {expenses.map((expense) => {
              const askValue = Number(expense.exchangeRates[expense.currency].ask);
              return (
                <tr key={ expense.id }>
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>{Number(expense.value).toFixed(2)}</td>
                  <td>{expense.exchangeRates[expense.currency].name}</td>
                  <td>{askValue.toFixed(2)}</td>
                  <td>{(expense.value * Number(askValue)).toFixed(2)}</td>
                  <td>Real</td>
                  <td className="text-center">
                    <button
                      type="button"
                      id={ expense.id }
                      className="btn btn-sm btn-secondary mx-1"
                      data-testid="edit-btn"
                      onClick={ this.editExpense }
                    >
                      <i className="fa-regular fa-edit me-2" />
                      Editar despesa
                    </button>
                    <button
                      type="button"
                      id={ expense.id }
                      className="btn btn-sm btn-danger mx-1"
                      data-testid="delete-btn"
                      onClick={ this.deleteExpense }
                    >
                      <i className="fa-regular fa-trash-can me-2" />
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({ }).isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
