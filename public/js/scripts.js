console.log("its working!")

// const runConsoles = () => {
//   console.log('RUNNING FETCHES!')
//   console.log(fetchInventory())
//   console.log(fetchOrderHistory())
//   console.log(fetchAddOrder(6.95))
// }

//html generators
const generateInventory = (item) => {
  let { title, description, image_url, price } = item;
  let cardContainer = $("<article class='inventory-card'></article>");
  let cardHTML = $(
    `<div class='card-info-container'>
      <h3>${title}</h3>
      <p>${description}</p>
      <div class='img-container' style="background-image: url(${image_url});"/>
      <p><div class='bold'>Price:</div> $${price}</p>
    </div>`)
  let cardButton = $(`
    <div class='card-button-container'>
      <button class='card-button' data-title= ${title} data-price=${price}>Add to Cart</button>
    </div>
    `)
  return cardContainer.append(cardHTML).append(cardButton)
}


//page actions

const loadInventory = () => {
  fetchInventory()
  .then(data => {
    data.forEach(item => {
      $('#card-container').append(generateInventory(item))
    });
  });
};



$(document).ready(() => {
  // runConsoles()
  loadInventory()
});
