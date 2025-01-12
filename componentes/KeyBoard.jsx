import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export function KeyBoard({ onPressLetter, onPressDeleteLetter, onPressEnter }) {
  const lettersRow1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const lettersRow2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"];
  const lettersRow3 = ["Z", "X", "C", "V", "B", "N", "M"];

  return (
    <View style={styles.keyboard}>
      <View style={styles.row}>
        {lettersRow1.map((letter, index) => (
          <TouchableOpacity
            key={`row1-${index}`}
            style={styles.button}
            onPress={() => onPressLetter(letter)}
          >
            <Text>{letter}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.row}>
        {lettersRow2.map((letter, index) => (
          <TouchableOpacity
            key={`row1-${index}`}
            style={styles.button}
            onPress={() => onPressLetter(letter)}
          >
            <Text>{letter}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.row}>
        {lettersRow3.map((letter, index) => (
          <TouchableOpacity
            key={`row1-${index}`}
            style={styles.button}
            onPress={() => onPressLetter(letter)}
          >
            <Text>{letter}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.buttonWide}
          onPress={() => onPressDeleteLetter()}
        >
          <Text>BACK</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonWide}
          onPress={() => onPressEnter()}
        >
          <Text>ENTER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    justifyContent: "center",
    width: 29,
    height: 40,
    margin: 3,
    borderRadius: 5,
  },
  keyboard: {
    marginTop: 20,
    backgroundColor: "#181818",
    padding: 3,
    borderRadius: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginBottom: 10,
  },
  buttonWide: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#BBBBBB",
    width: "45%",
    height: 50,
    borderRadius: 5,
  },
});
