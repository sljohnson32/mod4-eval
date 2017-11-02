console.log("its working!")

const runConsoles = () => {
  console.log('RUNNING FETCHES!')
  console.log(fetchInventory())
  console.log(fetchOrderHistory())
  console.log(fetchAddOrder('6.95'))
}





$(document).ready(() => {
  runConsoles()
});
