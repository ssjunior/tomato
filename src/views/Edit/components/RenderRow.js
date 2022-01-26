// import { useSelector } from "react-redux";

// import { Box, Flex, FormatField } from "../../../components";

// import { PIPZ_API_ROOT } from "config";

// const FormatItem = ({ module, item, handleSubmit, rowIndex }) => {
//   const value = useSelector((state) => state[module.id].object[item.name]);

//   if (item.type === "separator") {
//     return (
//       <Flex
//         mt={rowIndex ? "1.5em" : 0}
//         mb="0.75em"
//         fontWeight="bold"
//         color="t2"
//       >
//         {item.title}
//       </Flex>
//     );
//   }

//   if (item.type === "space") {
//     return (
//       <Box border="1px solid red" width={item.width} height={item.height} />
//     );
//   }

//   const save = (fieldName, changedData) => {
//     // console.log(fieldName, changedData);
//     if (item.type === "ForeignKey") {
//       let data = {};
//       data[fieldName + "_id"] = changedData;
//       handleSubmit(data);
//     } else {
//       handleSubmit(fieldName, changedData);
//     }
//   };

//   return (
//     <FormatField
//       module={module}
//       item={item}
//       value={value}
//       rootUrl={PIPZ_API_ROOT}
//       handleSubmit={save}
//     />
//   );
// };

// const RenderRow = ({ module, row, rowIndex, saveData }) => {
//   const columnsTotal = row.length;
//   const columnSize = 1 / columnsTotal;

//   return (
//     <Flex flexWrap="wrap" flexGrow="1">
//       {row.map((item, index) => (
//         <Flex minWidth="12.5rem" key={index} width={columnSize} flexGrow="1">
//           <Flex flexGrow="1" ml={index ? "1.5rem" : "0rem"} mb="0.5em">
//             <FormatItem
//               module={module}
//               item={item}
//               handleSubmit={saveData}
//               component={row}
//               rowIndex={rowIndex}
//             />
//           </Flex>
//         </Flex>
//       ))}
//     </Flex>
//   );
// };

// export default RenderRow;
