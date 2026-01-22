class CalendarApi {
	constructor(endpoint = 'meetings') {
		this.endpoint = endpoint;
		this.port = '3005';
		this.url = `http://localhost:${this.port}/${this.endpoint}`;
	}

	get(id = null) {
		let parameters = '';
		if (id) {
			parameters = '/' + id;
		}
		return this.query('GET', this.url + parameters);
	}

	add(data) {
		return this.query('POST', this.url, data);
	}

	delete(id) {
		let parameters = '';
		if (id) {
			parameters = '/' + id;
			return this.query('DELETE', this.url + parameters);
		}
		const err = new Error('Id is incorrect');
		return Promise.reject(err);
	}

	update(id, data) {
		let parameters = '';
		if (id) {
			parameters = '/' + id;
			return this.query('PATCH', this.url + parameters, data);
		}
		const err = new Error('Id is incorrect');
		return Promise.reject(err);
	}

	query(method, url, data = null) {
		let body;
		if (data) {
			body = JSON.stringify(data);
		}
		const options = {
			method,
			body,
			headers: { 'Content-Type': 'application/json' },
		};

		return fetch(url, options).then((resp) => {
			if (!resp.ok) {
				throw new Error('Error, status:' + resp.status);
			}
			if (method === 'DELETE') {
				return true;
			}
			return resp.json();
		});
	}
}

export default CalendarApi;
