import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Card, Flex, Image } from "@tomato/components";
import { crud } from "@tomato/core";

export const Edit = () => {
  return <div>Edit</div>;
};

const Sprites = () => {
  const { t } = useTranslation();
  const obj = useSelector((state) => state["sample"]).obj;

  return (
    <>
      {obj &&
        Object.values(obj.sprites.versions["generation-i"]["red-blue"]).map(
          (sprite, index) => (
            <Card key={index} sx={{ mt: 3, width: "100%" }}>
              <Flex sx={{ alignItems: "center" }}>
                <Image
                  src={sprite}
                  sx={{ maxWidth: "80px", width: "80px", mr: 3 }}
                />
                <div>Name</div>
              </Flex>
            </Card>
          )
        )}
    </>
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
