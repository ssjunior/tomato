import color from "@styled-system/color";
import { css, get } from "@theme-ui/css";
import { useNavigate } from "react-router-dom";
import space from "@styled-system/space";
import styled from "@emotion/styled";

const sx = (props) => css(props.sx)(props.theme);
const base = (props) => css(props.__css)(props.theme);
const variant = ({ theme, variant, __themeKey = "variants" }) =>
  css(get(theme, __themeKey + "." + variant, get(theme, variant)));

import { Icon, Text } from "../";
import { formatDate } from "../../util";

export const Tb = styled("table")(
  {
    margin: "0",
    padding: "0",
    borderSpacing: "0",
    borderCollapse: "collapse",
  },
  (props) => {
    return { color: props.theme.colors.t1 };
  },
  base,
  variant,
  space,
  color,
  sx,
  (props) => props.css
);

export const Tr = styled("tr")(
  (props) => {
    return {
      "&:hover": {
        backgroundColor: props.theme.colors[props.hoverColor || "l1"],
      },
    };
  },
  base,
  variant,
  space,
  color,
  sx,
  (props) => props.css
);

export const Th = styled("th")(
  {
    height: "2rem",
    position: "sticky",
    top: 0,
    fontSize: "0.9375rem",
    fontWeight: 600,
  },
  base,
  variant,
  space,
  color,
  sx,
  (props) => props.css
);

export const Td = styled("td")(
  {
    height: "2rem",
    whiteSpace: "wrap",
    fontSize: "0.9375rem",
  },
  base,
  variant,
  space,
  color,
  sx,
  (props) => props.css
);

const FormatValue = ({ locale, timezone, type, value }) => {
  if (!value || typeof value === "undefined") {
    return <Text color="t5">——</Text>;
  }

  if (type === "DateTime") {
    value = formatDate(value, locale, timezone).distance();
  }

  return value;
};

const Head = ({ config }) => {
  return (
    <Tr>
      <Th bg="l3" style={{ width: "40px", textAlign: "center" }}>
        <input
          type="checkbox"
          // defaultChecked={
          // selection.type === "all" && selection.type !== "individual"
          //    }
          // onClick={selectAll}
        />
      </Th>

      {Object.values(config.fields).map((field, index) => (
        <Th
          bg="l3"
          key={index}
          style={{
            whiteSpace: "nowrap",
            width: field.width + "px",
            textAlign: field.alignment || "left",
          }}
        >
          {field.label}
          {field.ordenable && (
            <Icon.Arrow
              ml="0.125rem"
              size="0.875rem"
              // onClick={() => handleOrderBy(field)}
              style={{
                strokeWidth: "3px",
                cursor: "pointer",
                // transform:
                //   orderBy && field === orderBy.field
                //     ? orderBy.order === "desc"
                //       ? "rotate(180deg)"
                //       : ""
                //     : "",
              }}
              // stroke={orderBy && field === orderBy.field ? "red" : "#bfbfbf"}
            />
          )}
        </Th>
      ))}
      <Th bg="l3"></Th>
    </Tr>
  );
};

const Row = ({ index, object, config, route }) => {
  const navigate = useNavigate();

  const sx = {
    height: "2rem",
    cursor: "pointer",
    borderTop: index ? `1px solid #e6e6e6` : "",
  };

  return (
    <Tr
      hoverColor="lightBlue"
      onClick={() => navigate(`${route}/${object.id}`, { replace: true })}
      // onMouseEnter={() => setHide(true)}
      // onMouseLeave={() => setHide(false)}
      sx={sx}
      index={index}
    >
      <Td style={{ width: "40px", textAlign: "center" }}>
        <input
          type="checkbox"
          // defaultChecked={
          // selection.type === "all" && selection.type !== "individual"
          //    }
          // onClick={selectAll}
        />
      </Td>

      {Object.values(config.fields).map((field, index) => (
        <Td
          key={index}
          color="t2"
          style={{
            whiteSpace: "nowrap",
            width: field.width + "px",
            textAlign: field.alignment || "left",
          }}
        >
          <FormatValue type={field.type} value={object[field.name]} />
        </Td>
      ))}

      <Td style={{ width: "32px", textAlign: "center" }}>
        <Icon.MoreVertical />
      </Td>
    </Tr>
  );
};

export const Table = ({
  route,
  locale,
  timezone,
  config,
  objects,
  ...props
}) => {
  return (
    <Tb {...props}>
      <tbody>
        <Head config={config} />
        {objects.map((object, index) => (
          <Row
            key={index}
            index={index}
            object={object}
            config={config}
            locale={locale}
            timezone={timezone}
            route={route}
          />
        ))}
      </tbody>
    </Tb>
  );
};
