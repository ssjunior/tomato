import { Flex, Icon, Image } from "./";
import { SIZES } from "../constants";

export const Avatar = ({ online, size, src, showOnline = false, ...props }) => {
  const sizeAvatar = size ? SIZES[size] : SIZES.medium;

  if (!src)
    return (
      <Icon.User
        style={{
          borderRadius: "50%",
          border: "1px solid lightGrey",
          ...sizeAvatar,
        }}
      />
    );

  return (
    <Flex
      style={{
        width: "fit-content",
        height: "fit-content",
        position: "relative",
        ...sizeAvatar,
      }}
      m={props.m}
      p={props.p}
      ml={props.ml}
      mr={props.mr}
      mt={props.mt}
    >
      {showOnline && (
        <Flex
          style={{
            position: "absolute",
            right: "-15%",
            bottom: -2,
            width: "40%",
            height: "40%",
            bg: online ? "green" : "l4",
            borderRadius: "50%",
            border: "2px solid white",
          }}
        />
      )}

      <Image
        style={{
          border: props.border ? props.border : "",
          borderRadius: "50%",
          width: "100%",
          height: "100%",
          ...size,
        }}
        src={src}
      />
    </Flex>
  );
};
