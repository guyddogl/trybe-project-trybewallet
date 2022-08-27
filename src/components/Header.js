import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import wallet from '../assets/img/logo-trybewallet.png';

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
      <header className="container-fluid shadow-sm" style={ { background: '#ffffff' } }>
        <section className="row justify-content-around align-items-center">
          <div className="col-3 col-lg-2 text-center">
            <img
              src={ wallet }
              className="img-fluid"
              alt="Trybewallet"
              style={ { maxWidth: '180px' } }
            />
          </div>
          <div className="col-3 col-lg-2 text-start">
            <p className="mt-3">
              <i
                className="fa-solid fa-circle-user fa-xl me-2"
                style={ { color: '#2fc18c' } }
              />
              <span data-testid="email-field">{email}</span>
            </p>
            <p>
              Total: &nbsp;
              <span data-testid="total-field">{this.sumExpensesValues()}</span>
              &nbsp;
              <span data-testid="header-currency-field">BRL</span>
            </p>
          </div>
        </section>
      </header>
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
