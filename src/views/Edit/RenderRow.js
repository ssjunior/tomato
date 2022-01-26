import { useSelector } from "react-redux";

import { Box, Flex, Grid } from "../../";
import { FormatField } from "./FormatField";

import { API_ENDPOINT } from "@/constants";

const FormatItem = ({ module, item, handleSubmit, rowIndex }) => {
  const value = useSelector((state) => state[module.id].object[item.name]);

  if (item.type === "separator") {
    return (
      <Flex
        mt={rowIndex ? "1.5em" : 0}
        mb="0.75em"
        fontWeight="bold"
        color="t2"
      >
        {item.title}
      </Flex>
    );
  }

  if (item.type === "space") {
    return (
      <Box border="1px solid red" width={item.width} height={item.height} />
    );
  }

  const save = (fieldName, changedData) => {
    if (item.type === "ForeignKey") {
      const data = {};
      data[fieldName + "_id"] = changedData;
      handleSubmit(data);
    } else {
      handleSubmit(fieldName, changedData);
    }
  };

  return (
    <FormatField
      module={module}
      item={item}
      value={value}
      rootUrl={API_ENDPOINT}
      handleSubmit={save}
    />
  );
};

export const RenderRow = ({ module, row, rowIndex, saveData }) => {
  return (
    <Grid
      mx="2rem"
      style={{
        gridRowGap: "1rem",
        gridColumnGap: "2rem",
        width: "100%",
        gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))",
      }}
    >
      {row.map((item, index) => (
        <FormatItem
          key={index}
          module={module}
          item={item}
          handleSubmit={saveData}
          component={row}
          rowIndex={rowIndex}
        />
      ))}
    </Grid>
  );
};
