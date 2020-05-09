
export default class api {
    constructor(client) {
        this._patients = null;
        this._client = client;
        this._url = (process.env.NODE_ENV === "production") ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_DEV
    }

    async patients() {
        if(this._patients) {
            return this._patients;
        } else {
            return this._getSearchPatients()
        }
    }

    async searchPatients(query) {
        const token = await this._client.getTokenSilently(); 
        //TODO: Change to loaded employee

        const result = await fetch(`${this._url}/patients/search/${query}?staff=88d5ee45-6cf6-46d5-8227-52ddda3ea36e`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return result.json();

    }

    async _getSearchPatients() {
        const token = await this._client.getTokenSilently(); 
        //TODO: Change to loaded employee
        const result = await fetch(`${this._url}/patients/assigned/88d5ee45-6cf6-46d5-8227-52ddda3ea36e`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        this._patients = result.json();
        return this._patients;
        
    }
}