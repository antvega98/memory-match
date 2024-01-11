import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useReducer } from "react";

import Card from "./Card.js";

const SYMBOLS = ["a", "b", "c", "d", "e", "f"];

function reducer(state, action) {
  switch (action.type) {
    case "make-a-guess":
      state.revealed[action.index] = true;

      // if user has never guessed
      if (state.previousGuess == null) {
        return {
          ...state,
          previousGuess: action.symbol,
        };
      }

      // if guess does not equal previous guess
      if (state.previousGuess !== action.symbol) {
        return {
          ...state,
          freezeBoard: true,
          tryAgain: true,
        };
      }

      // prev guess equals current guess
      const gameOver =
        state.revealed.filter(Boolean).length === state.revealed.length;
      return {
        ...state,
        previousGuess: null,
        prevRevealedState: [...state.revealed],
        gameOver,
      };

    case "reset-guess":
      return {
        ...state,
        revealed: [...state.prevRevealedState],
        previousGuess: null,
        freezeBoard: false,
        tryAgain: false,
      };
    case "reset-game":
      return createNewState();
  }
  return state;
}

function createNewState() {
  const board = [...SYMBOLS, ...SYMBOLS];
  const revealed = new Array(board.length).fill(false);
  shuffle(board);
  return {
    board,
    revealed,
    numberOfGuess: 0,
    previousGuess: null,
    prevRevealedState: [...revealed],
    freezeBoard: false,
    gameOver: false,
    tryAgain: false,
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
      <View style={styles.board}>
        {state.board.map((val, index) => {
          return (
            <Card
              key={index}
              dispatch={dispatch}
              symbol={val}
              revealed={state.revealed[index]}
              index={index}
              freezeBoard={state.freezeBoard}
            />
          );
        })}
      </View>

      {state.tryAgain && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            dispatch({ type: "reset-guess" });
          }}
        >
          <Text style={styles.buttonText}>Try again</Text>
        </TouchableOpacity>
      )}
      {state.gameOver && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            dispatch({ type: "reset-game" });
          }}
        >
          <Text style={styles.buttonText}>Reset Game</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  board: {
    gap: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    position: "absolute",
    bottom: 50,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "blue",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
