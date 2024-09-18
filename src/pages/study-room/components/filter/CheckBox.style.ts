import styled from "styled-components";

export const CheckBoxStyle = styled.div`
	display: flex;

	.checkbox-wrap {
    display: flex;
		position: relative;
    align-items: center;
		font-size: 20px;
		margin-left: 20px;

		input {
      position: relative;
			appearance: none;
			width: 20px;
      height: 20px;
      margin-right: 10px;
      border-radius: 4px;
      cursor: pointer;
			background-color: ${({ theme }) => theme.color.bgGray};
			border: 1px solid ${({ theme }) => theme.color.plannerGray};

      &:checked {
				background-color: ${({ theme }) => theme.color.mainStrong};
				border: 1px solid #2B81FF;
      }

			&:checked::after {
				position: absolute;
				content: "✔";
				color: white;
				font-size: 14px;
				left: 3px;
				top: 1px;
			}
		}
	}
`;