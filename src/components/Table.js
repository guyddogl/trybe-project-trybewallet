import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div className="table-responsive">
        <table
          className="table table-sm table-hover table-bordered"
          style={ { background: 'white' } }
        >
          <thead className="table-primary text-center">
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
                  <td>Editar/Excluir</td>
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
};

export default connect(mapStateToProps)(Table);
