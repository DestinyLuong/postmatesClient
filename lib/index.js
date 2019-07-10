const Postmates = require('./postmatesClient');

// SANDBOX KEY !!!
const pm = new Postmates('cus_MFUscM9IJb3S_-', 'bf915535-9a42-4511-a610-ca6a1fc06007');

quoteDetails = {
  'pickup_address': '701 Mission St. San Francisco, CA',
  'dropoff_address':'201 Third St., San Francisco, CA'
}
deliveryDetails = {
  'dropoff_address': '701 Mission St. San Francisco, CA',
  'dropoff_name':'Yerba Buena',
  'dropoff_phone_number':'4156029107',
  'pickup_address': '201 Third St. San Francisco, CA',
  'pickup_name': 'Postmates',
  'pickup_phone_number': '4155184536',
  'manifest': 'Things',
  'manifest_items': [
    {
      'name': 'Cardboard box',
      'quantity': 1,
      'size': 'large'
    },
  ],
  'quote_id': '',
  }

quoteOne = pm.CreateQuote(quoteDetails);


quoteOne.then(result => {
  return result.json();
}).then(data => {
  console.log(data);
  deliveryDetails.quote_id = data;
}).catch(function(error) {
  console.log('Request failed', error);
});

/*
deliveryOne = pm.CreateDelivery(deliveryDetails);

deliveryOne.then(result => {
  return result.json();
}).then(data => {
  console.log(data);
}).catch(function(error) {
  console.log('Request failed', error);
});

let delivery_id = deliveryOne.id;

*/
/*getDeliveryOne = pm.GetDelivery('del_MHCpkgEuqZm3mF');

getDeliveryOne.then(result => {
  return result.json();
}).then(data => {
  console.log(data);
}).catch(function(error) {
  console.log('Request failed', error);
});*/



/*listDetails = {
  'limit': 2
}

listDeliveries = pm.ListDeliveries(listDetails);

listDeliveries.then(result => {
  return result.json();
}).then(data => {
  console.log(data);
}).catch(function(error) {
  console.log('Request failed', error);
});

*/

/*cancelOne = pm.CancelDelivery('del_MHCpkgEuqZm3mF');

cancelOne.then(result => {
  return result.json();
}).then(data => {
  console.log(data);
}).catch(function(error) {
  console.log('Request failed', error);
});*/

/*updateDeliveryOne = pm.UpdateDelivery('del_MHD7nmhcZhOiGk', 100);

updateDeliveryOne.then(result => {
  return result.json();
}).then(data => {
  console.log(data);
}).catch(function(error) {
  console.log('Request failed', error);
});
*/