import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Props } from "../../@types/predefined";
import { useEffect, useState } from "react";
import getAlert from "../../api/alert";
import checkUser from "../../api/auth";

enum AlertType {
  DANGER,
  INFO,
}

type AlertItem = {
  id: string;
  type: AlertType;
  title: string;
  message: string;
};

type AlertProp = {
  type: AlertType;
  title: string;
  message: string;
};

const AlertItem = ({ type, title, message }: AlertProp) => {
  return (
    <>
      <View
        style={[
          itemStyles.container,
          {
            backgroundColor: type === AlertType.DANGER ? "#FFF3F3" : "#ffffff",
            marginBottom: 16,
          },
        ]}
      >
        <Image
          style={{
            width: 20,
            height: 20,
            marginRight: 4,
          }}
          source={
            type === AlertType.DANGER
              ? require(`../../assets/icons/warning.png`)
              : require(`../../assets/icons/light.png`)
          }
        />
        <View style={itemStyles.column}>
          <View style={itemStyles.row}>
            <Text
              style={[
                itemStyles.text,
                {
                  color: type === AlertType.DANGER ? "#ED7070" : "#8e8e8e",
                },
              ]}
            >
              {title}
            </Text>
            <Text
              style={{
                color: "#8e8e8e",
                fontSize: 14,
              }}
            ></Text>
          </View>
          <Text>{message}</Text>
        </View>
      </View>
    </>
  );
};

const itemStyles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 12,

    flexDirection: "row",
    backgroundColorb: "black",
  },
  column: {
    flexDirection: "column",
    gap: 8,
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
    letterSpacing: -0.5,
  },
});

export default function Alert({ navigation }: Props.Navigation) {
  const [alert, setAlert] = useState([]);

  useEffect(() => {
    checkUser().then((data) => {
      getAlert(data?.building?.id).then((res) => {
        setAlert(res);
      });
    });
  }, [alert]);

  return (
    <>
      <SafeAreaView style={[styles.container]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.backImage}
            source={require("../../assets/icons/back.png")}
          />
        </TouchableOpacity>
        <Text style={styles.title}>알람</Text>
        <ScrollView>
          {alert &&
            alert.map((v: AlertItem, i) => (
              <AlertItem
                title={v.title}
                key={i}
                type={v.type}
                message={v.message}
              />
            ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 12,
    paddingVertical: 16,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    letterSpacing: -0.5,
    paddingHorizontal: 12,
  },
  backImage: {
    width: 24,
    height: 24,
    marginLeft: 12,
    marginTop: 4,
  },
});
