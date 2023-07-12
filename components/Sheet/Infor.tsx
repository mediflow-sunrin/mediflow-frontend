import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Image } from "expo-image";
import { Props } from "../../@types/predefined";

type Props = {
  name: string;
  description: string;
  buildingState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  exit: string[];
  contact: string;
} & Props.Navigation;

export default function Infor({
  name,
  description,
  buildingState,
  navigation,
  exit,
  contact,
}: Props) {
  const [building, setBuilding] = buildingState;
  const [selected, setSelected] = useState(0);

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <>
      <View style={[topStyles.contianer]}>
        <View style={[topStyles.column]}>
          <Text style={topStyles.title}>{name}</Text>
          <Text style={topStyles.description}>{description}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("UserAlert")}>
          <Image
            style={[topStyles.button]}
            source={require("../../assets/icons/alert.png")}
          />
        </TouchableOpacity>
      </View>
      {building && (
        <View style={bottomStyles.column}>
          <View style={bottomStyles.container}>
            <View style={bottomStyles.row}>
              {exit &&
                exit.map((v, i) => (
                  <TouchableOpacity
                    style={[
                      bottomStyles.button,
                      selected === i && {
                        borderColor: "black",
                        borderBottomWidth: 1,
                        borderStyle: "solid",
                      },
                    ]}
                    key={i}
                    onPress={() => setSelected(i)}
                  >
                    <Text
                      style={[
                        bottomStyles.innerText,
                        selected === i && {
                          color: "black",
                        },
                      ]}
                    >
                      {i + 1}F
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
            <Image
              style={bottomStyles.mapImage}
              contentFit="cover"
              transition={100}
              source={exit[selected]}
            />
          </View>
          <TouchableOpacity
            style={bottomStyles.contactButtom}
            onPress={() =>
              Linking.openURL(`tel:${contact.split("-").join("")}`)
            }
          >
            <Text style={bottomStyles.buttonInnerText}>긴급전화</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const topStyles = StyleSheet.create({
  contianer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  title: {
    color: "#000",
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  description: {
    color: "#bebebe",
    fontSize: 16,
    fontWeight: "400",
    letterSpacing: -0.5,
  },
  button: {
    width: 46,
    height: 46,
  },
});

const bottomStyles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  row: {
    gap: 8,
    flexDirection: "row",
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 6,
  },
  innerText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#c2c2c2",
  },
  mapImage: {
    width: "100%",
    height: 220,
    resizeMode: "contain",
    marginTop: 8,
  },
  column: {
    flexDirection: "column",
    height: "100%",
    alignContent: "space-between",
  },
  contactButtom: {
    padding: 10,
    borderRadius: 16,
    backgroundColor: "#ED7070",
    marginTop: 30,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonInnerText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
  },
});
