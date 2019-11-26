import  React from "react";

class Headers extends React.Component {
	render() {
		var headers = this.props.headers || {};
		var headerRows = Object.keys(headers).map((key, i) => {
			return (
				<tr key={ i }>
					<td className="name">{ key }</td>
					<td className="value">{ headers[key] }</td>
				</tr>
			)
		})

		return (
			<tbody className="header-body">{ headerRows }</tbody>
		)
	}
}

export default Headers;