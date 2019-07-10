const fetch = require('node-fetch');
const { URLSearchParams } = require('url');


const apiURL = 'https://api.postmates.com'

module.exports = class Postmates {
    constructor(customerId, key){
        this.customerId = customerId;
        this.key = key;
        this.endpointPath = `/v1/customers/${this.customerId}`;
        this._api = {
            baseUrl : apiURL
        }
        this.delivery_id = this.delivery_id;
    }
    CreateQuote(quoteDetails){
        const url = `${this._api.baseUrl}${this.endpointPath}/delivery_quotes`;
        let params = new URLSearchParams();
        for(let key in quoteDetails){
            params.append(key, quoteDetails[key]);
        }
        return fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: ({
                'Authorization': `Basic ${Buffer.from(`${this.key}:`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: params
        });
    }
    CreateDelivery(deliveryDetails){
        const url = `${this._api.baseUrl + this.endpointPath}/deliveries`;
        let params = new URLSearchParams();
        let manifest_items = JSON.stringify(deliveryDetails.manifest_items);
        for(let key in deliveryDetails){
            params.append(key, deliveryDetails[key]);
        }
        params.append('manifest_items', manifest_items);
        return fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: ({
                'Authorization': `Basic ${Buffer.from(`${this.key}:`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: params
        });
    }
    GetDelivery(delivery_id){
        const url = `${this._api.baseUrl}${this.endpointPath}/deliveries/${delivery_id}`;
        return fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: ({
                'Authorization': `Basic ${Buffer.from(`${this.key}:`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
        });
    }
    UpdateDelivery(delivery_id, tip_by_customer){
        const url = `${this._api.baseUrl}${this.endpointPath}/deliveries/${delivery_id}`;
        let params = new URLSearchParams();
        params.append('tip_by_customer', tip_by_customer);
        return fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: ({
                'Authorization': `Basic ${Buffer.from(`${this.key}:`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: params
        });
    }
    CancelDelivery(delivery_id){
        const url = `${this._api.baseUrl}${this.endpointPath}/deliveries/${delivery_id}/cancel`;
        return fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: ({
                'Authorization': `Basic ${Buffer.from(`${this.key}:`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
        });
    }
    ListDeliveries(listDetails){
        let params = new URLSearchParams();
        for(let key in listDetails){
            params.append(key, listDetails[key]);
        }
       let query = params.toString();
        const url = `${this._api.baseUrl}${this.endpointPath}/deliveries?${query}`;
        return fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: ({
                'Authorization': `Basic ${Buffer.from(`${this.key}:`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
        });
    }
}