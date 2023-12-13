import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { useReducer } from "react";

const SYMBOLS = ["a", "b", "c"];

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
      return createNewState;
  }
  return state;
}
function createNewState() {
  const board = [...SYMBOLS, ...SYMBOLS];
  shuffle(board);
  return {
    board,
    revealed: [],
    numberOfGuess: 0,
  };
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; --i) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    swap(arr, randomIndex, i);
  }
}
function swap(arr, randomIndex, i) {
  const randomValue = arr[randomIndex];
  arr[randomIndex] = arr[i];
  arr[i] = randomValue;
}
export default function App() {
  const [state, dispatch] = useReducer(reducer, undefined, createNewState);

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
