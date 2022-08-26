const GET_CURRENCY = 'https://economia.awesomeapi.com.br/json/all';

async function getCurrency() {
  const response = await fetch(GET_CURRENCY);
  const currency = await response.json();
  return Object.entries(currency);
}

export default getCurrency;
