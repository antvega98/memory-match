import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default Card = ({ dispatch, symbol, revealed, index, freezeBoard }) => {
  const View1 = revealed || freezeBoard ? View : TouchableOpacity;
  return (
    <View1
      style={styles.container}
      onPress={() => {
        dispatch({
          type: "make-a-guess",
          index: index,
          symbol: symbol,
          index: index,
        });
      }}
    >
      {revealed && <Text>{symbol}</Text>}
    </View1>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
