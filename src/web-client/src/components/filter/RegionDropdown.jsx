import { Menu, Dropdown } from 'antd';
import styled from 'styled-components';
import { DownOutlined } from '@ant-design/icons';
import { makeOptionsFromDictionary, regionDict } from './regionDict';

const DropdownAtag = styled.a`
  color: white;
`;

// export interface RegionDropdownProps {
//   onChange: (value: string) => void
//   selectedRegion: any
// }

export function RegionDropdown({ selectedRegion, onChange }) {
  const regions = makeOptionsFromDictionary(regionDict);
  const onClick = ({ key }) => {
    onChange(key);
  };

  const menu = (
    <Menu onClick={onClick}>
      {
        // TODO: set type
        regions.map((region) => {
          return <Menu.Item key={region.value}>{region.label}</Menu.Item>;
        })
      }
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <DropdownAtag
        href="#/"
        className="ant-dropdown-link"
        onClick={(e) => e.preventDefault()}
      >
        {selectedRegion.label} <DownOutlined />
      </DropdownAtag>
    </Dropdown>
  );
}
