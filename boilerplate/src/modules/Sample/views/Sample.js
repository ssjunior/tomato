import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Flex, Image } from "@tomato/components";
import { crud } from "@tomato/core";

export const Edit = () => {
  return <div>Edit</div>;
};

const Sprites = () => {
  const { t } = useTranslation();
  const obj = useSelector((state) => state["sample"]).obj;

  return (
    <Flex sx={{ flexDirection: "column" }}>
      <div sx={{ my: 3 }}>{t("Sprites")}</div>
      {obj &&
        Object.values(
          obj.sprites.versions["generation-i"]["red-blue"]
        ).map((sprite, index) => (
          <Image key={index} src={sprite} sx={{ maxWidth: "80px" }} />
        ))}
    </Flex>
  );
};

export const List = () => {
  const loader = ({ response }) => {
    return response;
  };

  useEffect(
    () =>
      crud.getOne({
        slice: "sample",
        url: "https://pokeapi.co/api/v2/pokemon",
        id: "bulbasaur",
        loader,
      }),
    []
  );

  return <Sprites />;
};
