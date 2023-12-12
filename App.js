import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { useReducer } from "react";

function reducer(state, action) {
  // Actions a user can take:
  // Reveal a card
  // Reset guess
  // Reset game
  switch (action.type) {
    case "make-a-guess":
      return { ...state, numberOfGuess: state.numberOfGuess + 1 };
    case "reset-guess":
      return state;
    case "reset-game":
      return state;
  }
  return state;
}
function getInitialState() {
  return {
    board: ["a", "b", "a", "b"],
    revealed: [],
    numberOfGuess: 0,
  };
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, undefined, getInitialState);

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(state, null, 2)}</Text>
      <Button
        title="Guess"
        onPress={() => {
          dispatch({ type: "make-a-guess" });
        }}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
