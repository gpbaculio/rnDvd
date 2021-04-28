import React, { useCallback, useEffect } from "react";
import { View, StyleSheet, Dimensions, processColor } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Logo, { LOGO_HEIGHT, LOGO_WIDTH } from "./Logo";
import { withBouncing } from "./withBouncing";

const VELOCITY = 200;
const COLORS = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#00FFFF",
  "#FF00FF",
].map((color) => processColor(color) as number);

const { width, height } = Dimensions.get("window");

const DVDLogo = () => {
  const color = useSharedValue(COLORS[0]);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const onBounce = useCallback(() => {
    "worklet";
    const colorsLeft = [...COLORS];
    colorsLeft.slice(colorsLeft.indexOf(color.value), 1);
    color.value =
      colorsLeft[Math.round(Math.random() * (colorsLeft.length - 1))];
  }, []);
  useEffect(() => {
    translateX.value = withBouncing(VELOCITY, 0, width - LOGO_WIDTH, onBounce);
    translateY.value = withBouncing(
      VELOCITY,
      0,
      height - LOGO_HEIGHT,
      onBounce
    );
  });
  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));
  return (
    <View style={styles.container}>
      <Animated.View style={style}>
        <Logo color={color} />
      </Animated.View>
    </View>
  );
};

export default DVDLogo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
