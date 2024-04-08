import { useReducer, useState } from "react";
import "./App.css";
import TableFooter from "./TableFooter";

const RECEIVE_NEW_DATA = "RECEIVE_NEW_DATA";
const SET_PAGE_NUM = "SET_PAGE_NUM";
const SET_RESULTS_PER_PAGE = "SET_RESULTS_PER_PAGE";

function App() {
	const [tableData, dispatchTableData] = useReducer(
		(oldState, action) => {
			if (action.type === RECEIVE_NEW_DATA) {
				const numPages = Math.max(
					1,
					Math.ceil(action.theData.length / oldState.resultsPerPage)
				);
				return {
					theData: action.theData,
					pageNum: 0,
					numPages: numPages,
					resultsPerPage: oldState.resultsPerPage,
				};
			} else if (action.type === SET_PAGE_NUM) {
				if (action.pageNum < 0 || action.pageNum >= oldState.numPages)
					return oldState;
				return { ...oldState, pageNum: action.pageNum };
			} else if (action.type === SET_RESULTS_PER_PAGE) {
				console.log(oldState.theData, action.resultsPerPage);
				const numPages = Math.max(
					1,
					Math.ceil(oldState.theData.length / action.resultsPerPage)
				);
				return {
					...oldState,
					pageNum: 0,
					numPages: numPages,
					resultsPerPage: action.resultsPerPage,
				};
			} else {
				throw Error("We don't have a reducer action for that!");
			}
		},
		{
			theData: [],
			pageNum: 0,
			numPages: 1,
			resultsPerPage: 10,
		}
	);

	function setPageNum(newPageNum) {
		dispatchTableData({ type: SET_PAGE_NUM, pageNum: newPageNum });
	}

	function setResultsPerPage(newResultsPerPage) {
		dispatchTableData({
			type: SET_RESULTS_PER_PAGE,
			resultsPerPage: newResultsPerPage,
		});
	}

	async function getQuotes() {
		let newData = [];
		let page = 1;
		while (page <= 5) {
			page++;
			try {
				const res = await fetch(
					`https://icanhazdadjoke.com/search?limit=30&page=${page}`,
					{
						method: "GET",
						headers: {
							Accept: "application/json",
							"User-Agent": "CodeTheDream",
						},
					}
				);
				const data = await res.json();
				newData = [...newData, ...data.results];
			} catch (error) {
				console.error(error);
			}
		}
		dispatchTableData({
			type: RECEIVE_NEW_DATA,
			theData: newData,
		});
	}

	// TODO: useMemo to reduce the number of times we have to do this!
	const theData = [];
	let firstIndex = tableData.pageNum * tableData.resultsPerPage;
	let endIndex = Math.min(
		firstIndex + tableData.resultsPerPage,
		tableData.theData.length
	);

	for (let i = firstIndex; i < endIndex; i++) {
		theData.push(tableData.theData[i]);
	}

	console.log(firstIndex, endIndex, tableData, theData);

	return (
		<>
			<button onClick={getQuotes}>Get Quotes</button>
			{theData && theData.length > 0 ? (
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
			) : (
				<p>There's nothing here. Click "Get Quotes" to start!</p>
			)}

			<TableFooter
				numPages={tableData.numPages}
				pageNum={tableData.pageNum}
				setPageNum={setPageNum}
				setResultsPerPage={setResultsPerPage}
			/>
		</>
	);
}

export default App;

// Here's how you could write the same getQuotes function using .then/.catch
// function getQuotes() {
// 	fetch(`https://icanhazdadjoke.com/search?limit=30&page=1`, {
// 		method: "GET",
// 		headers: {
// 			Accept: "application/json",
// 			"User-Agent": "CodeTheDream",
// 		},
// 	})
// 		.then((res) => res.json())
// 		.then((data) => {
// 			console.log(data);
// 			setTheData(data.results);
// 		})
// 		.catch((err) => console.error(err));
// }
