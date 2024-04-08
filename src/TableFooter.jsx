import { useState } from "react";

const countsPerPage = [10, 20, 50, 100, 150];

function TableFooter({ numPages, pageNum = 1, setPageNum, setResultsPerPage }) {
	const [perPageOption, setPerPageOption] = useState();

	function changePerPageOption(e) {
		const newValue = Number(e.target.value);
		console.log(newValue);
		setPerPageOption(newValue);
		setResultsPerPage(newValue);
	}

	return (
		<>
			<div>
				<button onClick={() => setPageNum(pageNum - 1)}>{"<-"}</button>
				<select
					name="resultsPerPage"
					id="resultsPerPageSelector"
					value={perPageOption}
					onChange={changePerPageOption}
				>
					{countsPerPage.map((count, index) => (
						<option key={index} value={count}>
							{count}
						</option>
					))}
				</select>
				<button onClick={() => setPageNum(pageNum + 1)}>{"->"}</button>
			</div>
			<p>
				Showing Page {pageNum + 1} of {numPages}
			</p>
		</>
	);
}

export default TableFooter;
