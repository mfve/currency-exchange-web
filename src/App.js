import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [inputs, setInputs] = useState({
    input: 'USD',
    output: 'USD',
    amount: 0,
  });
  const [currencies, setCurrencies] = useState([]);
  const [resultString, setResultString] = useState('Use the above fields to calculate the exchange rate');

  const handleSubmit = (event) => {
    event.preventDefault();
    var result = 0;

    const httpOptions = {
      method: 'POST',
    };
    fetch(`http://localhost:3001/exchange/convert?amount=${encodeURIComponent(inputs.amount)}&input_currency=${encodeURIComponent(inputs.input)}&output_currency=${encodeURIComponent(inputs.output)}`,
      httpOptions)
      .then(response => { 
        return response.json();
      }).then(data => {
        result = data.result;
        if (result === 'failed') {
          setResultString('An unknown error occurred');
        } else {
          setResultString(inputs.amount + ' ' + inputs.input + ' is equal to ' + result + ' ' + inputs.output);
        }
      });
  }

  const handleChange = (event) => {
    setInputs({...inputs, [event.target.name]: event.target.value});
  }

  useEffect(() => {
    // Call on component mount but only once
    if (currencies.length === 0) {
      var newCurrencies = [];
      fetch('http://localhost:3001/exchange/currency_codes')
        .then(response => {
          return response.json();
        }).then(data => {
          newCurrencies = data.data.map((currency) => {
            return currency;
          });
          setCurrencies(newCurrencies);
        }); 
    }
  });

  return (
    <div className="App">
      <p>
        Currency Converter
      </p>
      <header className="App-header">
        <form onSubmit={handleSubmit} data-testid='currency-widget'>
          <label>Convert from: </label>
          <select name="input" defaultValue={inputs.input} onChange={handleChange}>
            {currencies.map( (x) => 
              <option>{x}</option>)}
          </select><br/>
          <label>Convert to: </label>
          <select name="output" defaultValue={inputs.output} onChange={handleChange}>
            {currencies.map( (x) => 
              <option>{x}</option>)}
          </select><br/>
          <label>Amount: </label>
          <input name="amount" name='amount' type='number' value={inputs.amount} onChange={handleChange} /><br/>
          <input type="submit" /><br/>
          {resultString}
        </form>
      </header>
    </div>
  );
}

export default App;
