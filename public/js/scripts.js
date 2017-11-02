console.log("its working!")

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
      <button class='card-button' data-title= ${title} data-price=${price}>Add to Cart</button>
    </div>
    `)
  return cardContainer.append(cardHTML).append(cardButton)
}


//page actions
const addSliderListeners = () => {
  $('.slider-button').on('click', (e) => {
    $(e.target).closest('.side-container').toggleClass('show');
    if ($(e.target).text() == '+') {
      $(e.target).text('-')
    } else $(e.target).text('+')
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



$(document).ready(() => {
  addSliderListeners();
  loadInventory();
});
