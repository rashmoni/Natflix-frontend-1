import iInputField from "types/iInputField";
import iInputImage from "types/iInputImage";
import iInputSelect from "types/iInputSelect";

interface DynamicObject {
  [key: string]: string | number | boolean;
}

export function generateFields(
  fields: Array<iInputField | iInputImage | iInputSelect>,
  data: any
) {
  let result: DynamicObject = {};

  fields.forEach((item) => {
    const key: string = item.key;

    result[key] = data[key];
  });

  return result;
}
