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
        <section className="container-fluid" style={ { maxWidth: '1500px' } }>
          <Table />
        </section>
      </>
    );
  }
}

export default Wallet;
