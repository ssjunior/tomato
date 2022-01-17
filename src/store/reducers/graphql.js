// import { createActions, handleActions } from "redux-actions";

// const options = { prefix: "graphql", namespace: "::" };

// const operationName = /(query|mutation)(\s*)(\w*)(\s*|\(|\{)/gm;

// const getGraphlBody = (query, variables) => {
//   const match = operationName.exec(query);
//   const operationType = match[1];
//   const operation = match[3];
//   operationName.lastIndex = 0;

//   const body = JSON.stringify({
//     operationName: operation,
//     query: query,
//     variables: variables
//   });

//   return [body, operation, operationType];
// };

// const transverse = (obj, normalized = {}, level = 1) => {
//   if (obj && obj.__typename) {
//     if (!normalized[obj.__typename]) normalized[obj.__typename] = {};

//     normalized[obj.__typename][obj.id] = { ...obj };
//     delete normalized[obj.__typename][obj.id].__typename;
//     for (let k in obj) {
//       if (typeof obj[k] === "object" && obj[k]) {
//         transverse(obj[k], normalized, level + 1);
//       }
//     }
//   } else if (Array.isArray(obj)) {
//     obj.forEach((value) => transverse(value, normalized, level + 1));
//   } else return;

//   return normalized;
// };

// export const actions = createActions(
//   {
//     SET: (response, module, action, operation, operationType) => ({
//       module,
//       response,
//       action,
//       operation,
//       operationType
//     }),

//     MUTATION: ({
//       query,
//       variables = {},
//       module,
//       action,
//       withCredentials = true
//     }) => {
//       const [body, operation, operationType] = getGraphlBody(query, variables);

//       return {
//         body,
//         action,
//         method: "POST",
//         module,
//         operation,
//         operationType,
//         url: "http://localhost:4000/graphql",
//         withCredentials
//       };
//     },

//     QUERY: ({
//       query,
//       variables = {},
//       module,
//       action,
//       update,
//       withCredentials = true
//     }) => {
//       const [body, operation, operationType] = getGraphlBody(query, variables);

//       return {
//         body,
//         action,
//         method: "POST",
//         module,
//         operation,
//         operationType,
//         url: "http://localhost:4000/graphql",
//         withCredentials
//       };
//     }
//   },
//   options
// );

// export const reducer = handleActions(
//   {
//     SET: (
//       state,
//       { payload: { response, action, operation, operationType } }
//     ) => {
//       action(
//         state,
//         operationType === "mutation"
//           ? response.data[operation]
//           : transverse(Object.values(response.data)[0])
//       );
//       return state;
//     }
//   },
//   {},
//   options
// );
