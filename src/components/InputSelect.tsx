// Node modules
import { ChangeEvent, useEffect } from "react";

// Project files
import iInputSelect from "interfaces/iInputSelect";

interface iProps {
  field: iInputSelect;
  state: [any, Function];
}

export default function Select({ field, state }: iProps) {
  const { label, key, options } = field;
  const [value, setValue] = state;

  // Properties
  const selectedOption = value[key] ?? 1;

  // Methods
  useEffect(() => {
    changeValue(selectedOption);
  }, []);

  function onChange(event: ChangeEvent<HTMLSelectElement>) {
    const userSelectedValue = Number(event.target.value);

    changeValue(userSelectedValue);
  }

  function changeValue(newValue: number) {
    const clonedItem = { ...value };

    clonedItem[key] = newValue;
    setValue(clonedItem);
  }

  // Components
  const Options = options.map((item: string, index: number) => (
    <option key={index} value={index + 1}>
      {item}
    </option>
  ));

  return (
    <label className="input input-select">
      <span>{label}</span>
      <select value={selectedOption} onChange={onChange}>
        {Options}
      </select>
    </label>
  );
}
