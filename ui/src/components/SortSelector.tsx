import { Select } from 'antd';

const { Option } = Select;

interface SortSelectorProps {
    className: string;
    onSortChange: (value: string, option: any) => void;
}


const SortSelector = ( props: SortSelectorProps ) => {
  return (
    <Select className={props.className} defaultValue="asc" style={{ width: 120 }} onChange={props.onSortChange
    }>
      <Option value="asc">Ascending</Option>
      <Option value="desc">Descending</Option>
    </Select>
  );
};

export default SortSelector;