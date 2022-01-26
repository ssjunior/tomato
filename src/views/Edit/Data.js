import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { ACTIONS, Column, Flex, orderObjectsList, Text, uuidv4 } from "../../";

// import { PIPZ_API_ROOT } from "config";
//
import { FormatCustomField } from "./FormatCustomField";
import { RenderRow } from "./RenderRow";

const RenderRows = ({ sections, module, saveData }) => {
  const { t } = useTranslation();

  return (
    <Column
      pb="3rem"
      style={{ width: "100%", height: "100%", overflow: "auto" }}
    >
      {sections.map((section, index) => (
        <Fragment key={index}>
          <Text
            mx="2rem"
            mt={index ? "2rem" : "1rem"}
            sx={{
              width: "100%",
              fontWeight: "semibold",
              fontSize: "1.25rem",
            }}
          >
            {t(section.title)}
          </Text>

          {section.rows.map((row, index) => (
            <Flex key={index} mt="1.125rem" style={{ width: "100%" }}>
              <RenderRow
                key={uuidv4()}
                module={module}
                // rootUrl={PIPZ_API_ROOT}
                row={row}
                rowIndex={index}
                saveData={saveData}
              />
            </Flex>
          ))}
        </Fragment>
      ))}
    </Column>
  );
};

export const Data = ({ config, module }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const activeOption = useSelector((state) => state[module.id].filter);
  const object = useSelector((state) => state[module.id].object);

  useEffect(() => {
    if (!activeOption.id && config.filters)
      dispatch(ACTIONS[module.id].changeState({ filter: config.filters[0] }));
  }, [activeOption, config.filters, dispatch, module]);

  const saveData = (changedData) => {
    dispatch(
      ACTIONS.toast.add({
        message: t("Saving"),
        type: "success",
        autoClose: 2000,
      })
    );

    // dispatch(
    //   ACTIONS.fetch.patch(
    //     module.id,
    //     `${PIPZ_API_ROOT}${module.endpoint}/${object.id}`,
    //     ACTIONS.state.loadObject,
    //     changedData,
    //     (state, response) => {
    //       state.object = response;
    //       return state;
    //     }
    //   )
    // );
  };

  if (!activeOption || !activeOption.id) return null;

  const fieldSet = activeOption.fieldSet;

  return (
    <>
      {!fieldSet ? (
        <RenderRows
          module={module}
          sections={activeOption.data.sections}
          saveData={saveData}
        />
      ) : (
        <>
          <Text
            mx="2rem"
            mt="1rem"
            mb="1.125rem"
            sx={{
              width: "100%",
              fontWeight: "semibold",
              fontSize: "1.25rem",
            }}
          >
            {t(fieldSet.name) || t("Not assigned to fieldsets")}
          </Text>

          <FormatCustomField
            data={object}
            fields={orderObjectsList(fieldSet.fields, "order")}
            module={module}
            saveData={saveData}
          />
        </>
      )}
    </>
  );
};
