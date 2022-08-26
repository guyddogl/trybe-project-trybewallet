const URL_API = 'https://economia.awesomeapi.com.br/json/all';

async function getCurrencies() {
  const response = await fetch(URL_API);
  const currency = await response.json();
  return currency;
}

export default getCurrencies;
