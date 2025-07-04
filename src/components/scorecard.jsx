import React from "react";

export default function ScoreCard({ score, total, comment }) {
	return (
		<div>
			<h2>Quiz Score</h2>
			<div>
				{score} / {total}
			</div>
			<div>{comment}</div>
		</div>
	);
}
