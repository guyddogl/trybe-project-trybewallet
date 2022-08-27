import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  sumExpensesValues = ({ expenses } = this.props) => {
    let sumValues = 0;
    expenses.forEach((expense) => {
      const expenseValue = expense.value;
      const askValue = expense.exchangeRates[expense.currency].ask;
      sumValues += expenseValue * askValue;
    });
    return sumValues.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">{this.sumExpensesValues()}</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  // expenses: PropTypes.arrayOf(PropTypes.shape({ }).isRequired).isRequired,
};

export default connect(mapStateToProps)(Header);
