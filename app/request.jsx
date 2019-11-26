import React from "react";
import Events from "./events";

var request = remote.require("request");

class Request extends React.Component {
	constructor(props) {
		super(props);


		this.state = {
			url: "http://example.com/",
			method: "GET"
		}
		this.handleChange = this.handleChange.bind(this);
		this.makeRequest = this.makeRequest.bind(this);
	}

	handleChange(e) {
		var state = {};
		state[e.target.name] = e.target.value;
		this.setState(state);
	}

	makeRequest() {
		request(this.state, (err, res, body) => {
			var statusCode = res ? res.statusCode : "No response";
			var result = {
				response: `(${statusCode})`,
				raw: body ? body : "",
				headers: res ? res.headers : [],
				error: err ? JSON.stringify(err, null, 2) : ""
			}
			
			Events.emit("result", result);
			new Notification(`HTTP response finished: ${statusCode}`);
		})
	}

	render() {
		return (
			<div className="request">
				<h1>Request</h1>
				<div className="request-options">
					<div className="form-row">
						<label>URL</label>
						<input name="url" type="url" value={ this.state.url } onChange={ this.handleChange } />
					</div>
					<div className="form-row">
						<label>Method</label>
						<input name="method" type="text" value={ this.state.method } placeholder="GET, POST, PATCH, PUT, DELETE" onChange={ this.handleChange } />
					</div>
					<div className="form-row">
						<a className="btn" href="#" onClick={ this.makeRequest }>Make request</a>
					</div>
				</div>
			</div>
		)
	}
}

export default Request;