//Fetch functions

const handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

const fetchInventory = () => {
  return fetch('/api/v1/inventory')
    .then(response => handleErrors(response))
    .then(response => response.json())
    .catch(error => {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
};

const fetchOrderHistory = () => {
  return fetch(`/api/v1/order_history`)
    .then(response => handleErrors(response))
    .then(response => response.json())
    .catch(error => {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
};


const fetchAddOrder = (cost) => {
  return fetch('/api/v1/order_history', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ cost })
  })
    .then(response => handleErrors(response))
    .then(response => response.json())
    .catch(error => {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
};
