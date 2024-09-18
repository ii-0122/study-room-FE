import { useState } from "react";
import { CheckBoxStyle } from "./CheckBox.style";

function CheckBox() {
	const [isChecked, setIsChecked] = useState(false);

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
	}

	return (
		<CheckBoxStyle>
			<div className="checkbox-wrap">
				<input 
					type="checkbox" 
					id="checkboxInput" 
					checked={isChecked}
					onChange={handleCheckboxChange}
				/>
				<label htmlFor="checkboxInput">바로 참여 가능한 방</label>
			</div>
		</CheckBoxStyle>
	);
};

export default CheckBox;