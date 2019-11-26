import React from "react";
import Events from "./events";
import Headers from "./headers";

class Response extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			result: {},
			tab: "body"
		}
		this.handleSelectTab = this.handleSelectTab.bind(this);
	}

	componentWillUnmount() {
		Events.removeListener("result", this.handleResult.bind(this));
	}

	componentDidMount() {
		Events.addListener("result", this.handleResult.bind(this));
	}

	handleResult(result) {
		this.setState({ result: result });
	}

	handleSelectTab(e) {
		var tab = e.target.dataset.tab;

		this.setState({ tab: tab });
	}

	render() {
		var result = this.state.result;
		var tabClasses = {
			body: this.state.tab === "body" ? "active" : null,
			erorrs: this.state.tab === "erorrs" ? "active" : null
		}
		var rawStyle = this.state.tab === "body" ? null : { display: "none" };
		var errorsStyle = this.state.tab === "errors" ? null : { display: "none" };

		return (
			<div className="response">
				<h1>Response <span id="response">{ result.response }</span></h1>
				<div className="content-container">
					<div className="content">
						<div id="headers">
							<table className="headers">
								<thead>
									<tr>
										<th className="name">Header name</th>
										<th className="value">Header value</th>
									</tr>
								</thead>
								<Headers headers={ result.headers } />
							</table>
						</div>
						<pre className="results">
							<ul className="nav">
								<li className={ tabClasses.body }>
									<a data-tab="body" href="#" onClick={ this.handleSelectTab }>Body</a>
								</li>
								<li className={ tabClasses.errors }>
									<a data-tab="errors" href="#" onClick={ this.handleSelectTab }>Errors</a>
								</li>
							</ul>
							<div className="raw" id="raw" style={ rawStyle }>{ result.raw }</div>
							<div className="raw" id="error" style={ errorsStyle }>{ result.error }</div>
						</pre>
					</div>
				</div>
			</div>
		)
	}
}

export default Response;