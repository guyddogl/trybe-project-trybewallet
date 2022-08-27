import React, { Component } from 'react';

class Table extends Component {
  render() {
    return (
      <table className="table table-hover table-bordered">
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
      </table>
    );
  }
}

export default Table;
