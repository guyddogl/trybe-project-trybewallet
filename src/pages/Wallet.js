import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <WalletForm />
        <section className="container">
          <div className="row justify-content-center align-items-center">
            <Table />
          </div>
        </section>
      </>
    );
  }
}

export default Wallet;
