//html generators
const generateInventory = (item) => {
  let { title, description, image_url, price } = item;
  let cardContainer = $("<article class='inventory-card'></article>");
  let cardHTML = $(
    `<div class='card-info-container'>
      <div class='card-header-container'>
        <h3 class='bold'>${title}</h3>
      </div>
      <p>${description}</p>
      <div class='img-container' style="background-image: url(${image_url});"/>
      <p><div class='bold'>Price:</div> $${price}</p>
    </div>`)
  let cardButton = $(`
    <div class='card-button-container'>
      <button class='card-button' data-title='${title}' data-price='${price}'>Add to Cart</button>
    </div>
    `);
  cardButton.click(e => addItem(e));
  return cardContainer.append(cardHTML).append(cardButton)
}


//page actions
const sliderListeners = () => {
  $('.slider-button').on('click', (e) => {
    $(e.target).closest('.side-container').toggleClass('show');
    if ($(e.target).text() == '+') {
      $(e.target).text('-')
    } else $(e.target).text('+')
  })
}

const addItem = (e) => {
  let title = $(e.target).attr('data-title');
  let price = $(e.target).attr('data-price');
  let newTotal = parseFloat($('#cart-total').text()) + parseFloat(price);
  let newItem = $(`<article class='cart-item'><p class='item-title'>${title}</p><p class='item-price'>Price: $${price}</p></article>
    `)
  $('#cart-items-container').append(newItem);
  $('#cart-total').text(newTotal)
  // setLocalStorage(newTotal)
}

const placeOrderListener = () => {
  $('#cart-checkout-button').on('click', () => {
    let finalCost = parseFloat($('#cart-total').text());
    fetchAddOrder(finalCost)
    .then(date => createOrderHistory(finalCost, date.created_at));
    clearCart();
  })
}

const clearCart = () => {
  $('#cart-items-container').empty();
  $('#cart-total').text('0.00')
}

const createOrderHistory = (finalCost, date) => {
  let orderNumber = parseInt($('.order-item').last().attr('data-number')) + parseInt(1) || 1;
  let formattedDate = formatDate(date);
  let orderItem = $(`
    <article class='order-item' data-number=${orderNumber}>
      <h2 class='bold'>Order #${orderNumber}</h2>
      <p>Order Date: ${formattedDate}</p>
      <p>Total Price: $${finalCost}</p>
    </article>
    `);
  $('#order-items-container').append(orderItem);
}

const formatDate = (date) => {
  let newDate = new Date(date)
  return newDate.toDateString();
}

const loadOrderHistory = () => {
  fetchOrderHistory()
  .then(orders => {
    orders.forEach(order => createOrderHistory(order.cost, order.created_at))
  })
}

const loadInventory = () => {
  fetchInventory()
  .then(data => {
    data.forEach(item => {
      $('#card-container').append(generateInventory(item))
    });
  });
};

// const setLocalStorage = (total) => {
//   let items = [$('#cart-items-container').children()]
//   localStorage.setItem('amazon-bay', JSON.stringify({ items: items }));
// }

// const checkLocalStorage = () => {
//   let savedItems = localStorage.getItem('amazon-bay');
//   console.log(savedItems)
// }



$(document).ready(() => {
  sliderListeners();
  placeOrderListener();
  loadInventory();
  loadOrderHistory();
  // checkLocalStorage();
});
