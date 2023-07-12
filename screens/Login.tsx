import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import GradientText from "../components/GradientText";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Props } from "../@types/predefined";
import { RouteProp } from "@react-navigation/native";
import login from "../api/auth/login";
import { AxiosError } from "axios";
import checkUser from "../api/auth";

type Props = {
  route: RouteProp<RootStackParams, "Login">;
} & Props.Navigation;

export default function LoginScreen({ navigation }: Props) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const { navigate } = navigation;

  useEffect(() => {
    checkUser()
      .then((data) => {
        if (!data) return navigate("Login");
        navigate(data.isAdmin ? "AdminMain" : "UserMain");
      })
      .catch((err) => {
        console.log(err, 2);
      });
  }, []);

  const loginHandler = async () => {
    login({ id, password })
      .then((data) => {
        navigate(data.isAdmin ? "AdminMain" : "UserMain");
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.TitleContainer}>
        <GradientText text="MediFlow" style={styles.logoText} />
        <Text style={styles.logoSubText}>로그인</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={id}
          onChange={(e) => setId(e.nativeEvent.text)}
          style={styles.input}
          placeholder="아이디를 입력해주세요"
        />
        <TextInput
          value={password}
          onChange={(e) => setPassword(e.nativeEvent.text)}
          style={styles.input}
          placeholder="비밀번호를 입력해주세요"
          secureTextEntry
        />
      </View>
      <TouchableOpacity onPress={loginHandler} style={styles.loginButton}>
        <LinearGradient
          style={styles.loginButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={["#FF442B", "#FF7733"]}
        >
          <Text style={styles.loginText}>로그인하기</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    alignItems: "flex-start",
    justifyContent: "center",
    display: "flex",
    gap: 32,
  },
  TitleContainer: {
    display: "flex",
    alignItems: "flex-start",
    gap: 4,
  },
  logoText: {
    fontWeight: "900",
    fontSize: 48,
  },
  logoSubText: {
    fontSize: 20,
    color: "#3f3d3d",
    fontWeight: "700",
  },
  inputContainer: {
    display: "flex",
    width: "100%",
    gap: 8,
  },
  input: {
    width: "100%",
    height: 50,
    padding: 10,
    fontSize: 14,
    backgroundColor: "#E8E8E8",
    borderRadius: 4,
  },
  loginButton: {
    width: "100%",
    height: 50,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
  },
});
