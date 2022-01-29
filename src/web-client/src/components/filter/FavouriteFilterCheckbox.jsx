import { Checkbox } from 'antd';
import styled from 'styled-components';

const CheckboxCustom = styled(Checkbox)`
  color: white;
`;

// export interface FavouriteFilterCheckboxProps {
//   onChange: (value: boolean) => void
//   value: boolean
// }

export function FavouriteFilterCheckbox({
  value,
  onChange,
}: FavouriteFilterCheckboxProps) {
  // TODO: find the right type for this
  const onChangeUI = (e) => {
    onChange(e.target.checked);
  };

  return (
    <CheckboxCustom checked={value} onChange={onChangeUI}>
      Favourites
    </CheckboxCustom>
  );
}
