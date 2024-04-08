import "./App.css";
import TableFooter from "./TableFooter";

// TODO: Replace with data from https://icanhazdadjoke.com/api
const theData = [
	{ id: 0, joke: "Dummy joke 0" },
	{ id: 1, joke: "Dummy joke 1" },
	{ id: 2, joke: "Dummy joke 2" },
];

function App() {
	function getQuotes() {
		// TODO
	}

	return (
		<>
			<button onClick={getQuotes}>Get Quotes</button>
			<table>
				<tbody>
					{theData.map((data) => (
						<tr key={data.id}>
							<td>{data.id}</td>
							<td>{data.joke}</td>
						</tr>
					))}
				</tbody>
			</table>

			<TableFooter />
		</>
	);
}

export default App;
