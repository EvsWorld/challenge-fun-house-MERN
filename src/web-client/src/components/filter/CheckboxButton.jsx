import styled from 'styled-components';

const CheckboxButtonLabel = styled.label`
  display: block;
  width: 120px;
  height: 40px;
  line-height: 40px;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  cursor: pointer;
  ${({ checkedCss }) =>
    checkedCss &&
    `
			border: 1px solid #0047be;
			box-shadow: 0 0 4px 0 rgba(0, 71, 190, 0.2);
			background: red;
  `}
`;

const CheckboxHidden = styled.input`
  width: 0;
  height: 0;
  opacity: 0;
`;

// interface CheckboxButtonProps {
// 	// onChange passes back an updated object with either check or unchecked
// 	onChange: (checked: boolean) => void
// 	value: string
// 	label: string
// 	checked: boolean
// }

export const CheckboxButton = ({ label, value, checked, onChange }) => {
  function handleChange(e) {
    onChange(e.target.checked);
  }

  return (
    <div>
      <CheckboxHidden
        type="checkbox"
        value={value}
        id={value}
        onChange={handleChange}
        checked={checked}
      />
      <CheckboxButtonLabel checkedCss={checked} htmlFor={value}>
        {label}
      </CheckboxButtonLabel>
    </div>
  );
};
