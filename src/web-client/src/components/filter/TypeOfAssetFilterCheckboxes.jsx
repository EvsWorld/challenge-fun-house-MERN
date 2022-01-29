import { Checkbox } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

import styled from 'styled-components';

const CheckboxGroupCustom = styled(Checkbox.Group)`
  color: white;
`;

// export interface TypeOfAssetFilterCheckboxesProps {
//   onChange: (value: CheckboxValueType[] | TypeOfAsset[]) => void;
//   value: CheckboxValueType[] | TypeOfAsset[];
//   options: TypeOfAsset[];
// }

export function TypeOfAssetFilterCheckboxes({ value, options, onChange }) {
  return (
    <CheckboxGroupCustom options={options} value={value} onChange={onChange} />
  );
}
