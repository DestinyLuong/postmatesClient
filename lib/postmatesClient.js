const fetch = require('node-fetch');
const { URLSearchParams } = require('url');

//STAGE!!!!
const apiURL = 'https://api-stage.postmates.com'

module.exports = class Postmates {
    constructor(customerId, key){
        this.customerId = customerId;
        this.key = key;
        this.endpointPath = `/v1/customers/${this.customerId}`;
        this._api = {
            baseUrl : apiURL
        }
        this.delivery_id = this.delivery_id;
        this.params = new URLSearchParams();
        this.postDetails = {
            method: 'POST',
            credentials: 'include',
            headers: ({
                'Authorization': `Basic ${Buffer.from(`${this.key}:`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: this.params
        }
        this.getDetails = {
            method: 'GET',
            credentials: 'include',
            headers: ({
                'Authorization': `Basic ${Buffer.from(`${this.key}:`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
        }
    }
    CreateQuote(quoteDetails){
        const url = `${this._api.baseUrl}${this.endpointPath}/delivery_quotes`;

        for(let key in quoteDetails){
            this.params.append(key, quoteDetails[key]);
        }
        return fetch(url, this.postDetails);
    }
    CreateDelivery(deliveryDetails){
        const url = `${this._api.baseUrl + this.endpointPath}/deliveries`;
        let manifest_items = JSON.stringify(deliveryDetails.manifest_items);
        for(let key in deliveryDetails){
            this.params.append(key, deliveryDetails[key]);
        }
        this.params.append('manifest_items', manifest_items);
        return fetch(url, this.postDetails);
    }
    GetDelivery(delivery_id){
        const url = `${this._api.baseUrl}${this.endpointPath}/deliveries/${delivery_id}`;
        return fetch(url, this.getDetails);
    }
    UpdateDelivery(delivery_id, tip_by_customer){
        const url = `${this._api.baseUrl}${this.endpointPath}/deliveries/${delivery_id}`;
        this.params.append('tip_by_customer', tip_by_customer);
        return fetch(url, this.postDetails);
    }
    CancelDelivery(delivery_id){
        const url = `${this._api.baseUrl}${this.endpointPath}/deliveries/${delivery_id}/cancel`;
        return fetch(url, this.postDetails);
    }
    ListDeliveries(listDetails){
        for(let key in listDetails){
            this.params.append(key, listDetails[key]);
        }
       let query = this.params.toString();
        const url = `${this._api.baseUrl}${this.endpointPath}/deliveries?${query}`;
        return fetch(url, this.getDetails);
    }
}