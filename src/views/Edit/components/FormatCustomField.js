// import { Flex, FormatField } from "../../../components";

// import { CUSTOM_FIELDS } from "constant";

// const FormatCustomField = ({ data, fields, module, saveData }) => {
//   let rows = [];
//   let rowsCount = 0;

//   for (var i = 0; i < fields.length; i) {
//     let columns = [];

//     for (var j = 0; j < 2 && i < fields.length; j++) {
//       const item = {
//         customField: true,
//         customFieldId: fields[i].id,
//         customFieldChoices: {},
//         editable: true,
//         label: fields[i].presentation_name,
//         maxLength: 191,
//         name: fields[i].name,
//         type: CUSTOM_FIELDS.ATTRIBUTES_PRESENTATIONS[fields[i].presentation_id],
//         value: fields[i].value,
//         required: fields[i].required || false,
//       };

//       if (typeof fields[i].config.values_list !== "undefined") {
//         fields[i].config.values_list.forEach((value) => {
//           item.customFieldChoices[value.label] = value.value;
//         });
//       }

//       columns.push(
//         <Flex key={"field_" + j} minWidth="12.5rem" width={0.5} flexGrow="1">
//           <Flex flexGrow="1" ml={j ? "1.5rem" : "0rem"} mb="0.5rem">
//             <FormatField
//               key={item.id}
//               data={data}
//               item={item}
//               handleSubmit={saveData}
//               value={item.value}
//               width={1}
//             />
//           </Flex>
//         </Flex>
//       );
//       i++;
//     }

//     rows.push(
//       <Flex
//         key={"row_" + i}
//         flexWrap="wrap"
//         width={1}
//         mt={rowsCount ? "1rem" : ""}
//       >
//         {columns}
//       </Flex>
//     );
//     rowsCount += 1;
//   }

//   return rows;
// };

// export default FormatCustomField;
