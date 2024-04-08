import { useState } from "react";

const countsPerPage = [10, 20, 50, 100, 150];

function TableFooter() {
	const [perPageOption, setPerPageOption] = useState();

	function changePerPageOption(e) {
		const newOption = Number(e.target.value);
		// TODO
	}

	return (
		<>
			<div>
				<button
					onClick={() => {
						// TODO
					}}
				>
					{"<-"}
				</button>
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
				<button
					onClick={() => {
						// TODO
					}}
				>
					{"->"}
				</button>
			</div>
			<p>Showing Page ?? of ?? {/*TODO*/}</p>
		</>
	);
}

export default TableFooter;
