import { useEffect } from "react";
import { useSelector } from "react-redux";

import { Card, crud, Flex, Image, Spinner } from "@tomato/components";

export const Edit = () => {
  return <div>Edit</div>;
};

const Sprites = () => {
  const obj = useSelector((state) => state["sample"]).obj;

  if (!obj) return <Spinner />;

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
