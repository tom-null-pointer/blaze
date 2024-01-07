import {ChangeEventHandler} from "react";
import './select-input.scss';
export function SelectInput(
  {
    options,
    noOptionsMessage = 'No options available.',
    onChange,
    selected,
    selectMessage,
  }: {
    options: {
      value: string,
      label: string
    }[],
    noOptionsMessage?: string;
    onChange: ChangeEventHandler,
    selectMessage?: string,
    selected: string,
  },
) {

  const buildOptions = () => {
    let optionArray = options.map(option => <option key={option.value}  value={option.value}>{option.label}</option>);
    if (optionArray.length === 0) {
      return <option disabled={true} key="noItems" value="noItems">{noOptionsMessage}</option>
    }
    optionArray = [<option disabled={true} key="availableItems" value="availableItems">{selectMessage ? selectMessage : 'Select an item'}</option>].concat(optionArray);
    return optionArray;
  }

  const buildDefaultValue = () => {
    if (options.length === 0) {
      return 'noItems';
    }
    if (!selected) {
      return 'availableItems';
    }
    return selected;
  }

  return (
    <select
      className="SelectInput"
      value={buildDefaultValue()}
      onChange={onChange}>
      {buildOptions()}
    </select>
  );
}