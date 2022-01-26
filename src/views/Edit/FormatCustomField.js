import { Grid } from "../../components";
import { FormatField } from "./FormatField";

import { CUSTOM_FIELDS } from "./constants";

export const FormatCustomField = ({ data, fields, saveData }) => {
  const items = [];

  for (var i = 0; i < fields.length; i) {
    for (var j = 0; j < 2 && i < fields.length; j++) {
      const item = {
        customField: true,
        customFieldId: fields[i].id,
        customFieldChoices: {},
        editable: true,
        label: fields[i].presentation_name,
        maxLength: 191,
        name: fields[i].name,
        type: CUSTOM_FIELDS.ATTRIBUTES_PRESENTATIONS[fields[i].presentation_id],
        value: fields[i].value,
        required: fields[i].required || false,
      };

      if (typeof fields[i].config.values_list !== "undefined") {
        fields[i].config.values_list.forEach((value) => {
          item.customFieldChoices[value.label] = value.value;
        });
      }

      items.push(item);

      i++;
    }
  }

  return (
    <Grid
      px="2rem"
      style={{
        gridRowGap: "1rem",
        gridColumnGap: "2rem",
        width: "100%",
        gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))",
      }}
    >
      {items.map((item) => (
        <FormatField
          key={"C" + item.customFieldId}
          data={data}
          item={item}
          handleSubmit={saveData}
          value={item.value}
          width={1}
        />
      ))}
    </Grid>
  );
};
