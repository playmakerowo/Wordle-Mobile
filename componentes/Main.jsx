import React, { useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyBoard } from "./KeyBoard";

export function Main() {
  const [currentWord, setCurrentWord] = useState("");
  const [attempts, setAttempts] = useState([]);
  const insets = useSafeAreaInsets();
  const correctWord = "CARTEL";
  const maxAttempts = 5;

  const onPressEnter = () => {
    if (
      currentWord.length === correctWord.length &&
      attempts.length < maxAttempts
    ) {
      const updatedAttempts = [...attempts, currentWord];
      setAttempts(updatedAttempts);
      setCurrentWord("");

      if (currentWord === correctWord) {
        alert("¡Has ganado!");
      } else {
        alert(`La palabra correcta era: ${correctWord}`);
      }
    }
  };

  const onPressLetter = (letter) => {
    if (currentWord.length >= correctWord.length) {
      return;
    } else {
      setCurrentWord(currentWord + letter);
    }
  };

  const onPressDeleteLetter = () => {
    if (currentWord.length === 0) {
      return;
    } else {
      setCurrentWord(currentWord.slice(0, -1));
    }
  };

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <View style={styles.container}>
        <Text style={styles.title}>Wordle App</Text>
        <Text style={styles.subtitle}>
          Intento: {attempts.length + 1}/{maxAttempts}
        </Text>
        <View style={styles.wordContainer}>
          {Array.from({ length: maxAttempts }).map((_, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {correctWord.split("").map((_, colIndex) => (
                <View key={colIndex} style={styles.letterContainer}>
                  <Text style={styles.letter}>
                    {attempts[rowIndex]?.[colIndex] ||
                      (rowIndex === attempts.length
                        ? currentWord[colIndex] || ""
                        : "")}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>
        <KeyBoard
          onPressLetter={onPressLetter}
          onPressDeleteLetter={onPressDeleteLetter}
          onPressEnter={onPressEnter}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    marginVertical: 10,
  },
  wordContainer: {
    backgroundColor: "#181818",
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  letterContainer: {
    width: 40,
    height: 40,
    margin: 5,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#bbb",
  },
  letter: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
