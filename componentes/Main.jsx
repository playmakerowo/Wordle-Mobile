import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyBoard } from "./KeyBoard";

export function Main() {
  const [currentWord, setCurrentWord] = useState("");
  const [attempts, setAttempts] = useState([]);
  const [colors, setColors] = useState([]);
  const insets = useSafeAreaInsets();
  const words = require("../words/words.json");
  const [correctWord, setcorrectWord] = useState("");
  const maxAttempts = 5;

  const [openModal, setOpenModal] = useState(false);
  const [ModalText, setModalText] = useState("");

  const [incorrectLetters, setIncorrectLetters] = useState([]);
  const getLetrasIncorrectas = (currentWord) => {
    return currentWord
      .split("")
      .filter((letra) => !correctWord.split("").includes(letra));
  };

  useEffect(() => {
    const word = words.words[Math.floor(Math.random() * words.words.length)];
    setcorrectWord(word.toUpperCase());
  }, []);

  const onPressEnter = () => {
    if (
      currentWord.length === correctWord.length &&
      attempts.length < maxAttempts
    ) {
      const updatedAttempts = [...attempts, currentWord];
      setAttempts(updatedAttempts);

      const incorrectLetters = getLetrasIncorrectas(currentWord);
      setIncorrectLetters((prevIncorrectLetters) => [
        ...prevIncorrectLetters,
        ...incorrectLetters,
      ]);

      const correctColors = currentWord.split("").map((letra, index) => {
        if (letra === correctWord[index]) {
          return "green";
        } else if (correctWord.split("").includes(letra)) {
          return "yellow";
        } else {
          return "";
        }
      });

      setColors([...colors, correctColors]);

      setCurrentWord("");

      if (currentWord === correctWord) {
        setOpenModal(true);
        setModalText("¡Has ganado!");
      } else if (attempts.length === maxAttempts - 1) {
        setModalText("¡Has perdido! La palabra era: " + correctWord);
        setOpenModal(true);
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

  const onPressReset = (letter) => {
    setAttempts([]);
    setColors([]);
    setIncorrectLetters([]);

    const word = words.words[Math.floor(Math.random() * words.words.length)];
    setcorrectWord(word.toUpperCase());
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
        <Text style={styles.title}>Palabras App</Text>
        <Text style={styles.subtitle}>
          <Button title="Reset" onPress={() => onPressReset()} />
        </Text>
        <View style={styles.wordContainer}>
          {Array.from({ length: maxAttempts }).map((_, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {correctWord.split("").map((_, colIndex) => {
                const color = colors[rowIndex]?.[colIndex];
                return (
                  <View
                    key={colIndex}
                    style={[
                      styles.letterContainer,
                      color === "green"
                        ? { backgroundColor: "green" }
                        : color === "yellow"
                          ? { backgroundColor: "yellow" }
                          : { backgroundColor: "#ddd" },
                    ]}
                  >
                    <Text style={[styles.letter]}>
                      {attempts[rowIndex]?.[colIndex] ||
                        (rowIndex === attempts.length
                          ? currentWord[colIndex] || ""
                          : "")}
                    </Text>
                  </View>
                );
              })}
            </View>
          ))}
        </View>
        <KeyBoard
          onPressLetter={onPressLetter}
          onPressDeleteLetter={onPressDeleteLetter}
          onPressEnter={onPressEnter}
          incorrectLetters={incorrectLetters}
        />
      </View>
      <Modal visible={openModal} transparent={true}>
        <View style={styles.Modal}>
          <View style={styles.ModalContent}>
            <Text style={[styles.title, { color: "#000" }]}>Resultado</Text>
            <Text style={styles.ModalText}>
              {ModalText}
            </Text>
            <TouchableOpacity style={styles.ModalButton} onPress={() => setOpenModal(false)}>
              <Text style={{fontSize: 18, color: "white"}}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  ModalButton: {
    width: "100%",
    marginTop: 24,
    backgroundColor: "gray",
    alignItems: "center",
    display: "flex",
    padding: 15,
    borderRadius: 8,
  },
  ModalText:{
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.8,
  },
  ModalContent: {
    width: "90%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 8,
  },
  Modal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    marginVertical: 10,
    marginBottom: 12,
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
