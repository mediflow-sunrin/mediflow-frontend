import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/Login";
import UserMain from "./screens/user/Main";
import Alert from "./screens/user/Alert";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { useState, useRef, useEffect } from "react";
import { Platform } from "react-native";
import io, { Socket } from "socket.io-client";

const Stack = createStackNavigator<RootStackParams>();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldShowAlert: true,
    shouldSetBadge: false,
  }),
});
export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<
    Notifications.Notification | boolean
  >(false);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  const ws = useRef<Socket>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token!)
    );

    if (
      notificationListener.current === undefined &&
      responseListener.current === undefined
    )
      return;

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current!
      );
      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, []);

  useEffect(() => {
    ws.current = io("http://ssh.plebea.com:4545");

    ws.current.on("alert", (data) => {
      Notifications.scheduleNotificationAsync({
        content: {
          title: data?.title,
          body: data?.message,
        },
        trigger: null,
      });
    });

    return () => {
      ws.current?.close();
    };
  }, []);

  // useEffect(() => {
  //   Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: "asdf",
  //       body: "test",
  //     },
  //     trigger: null,
  //   });
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="UserMain" component={UserMain} />
        <Stack.Screen name="UserAlert" component={Alert} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // token = (await Notifications.getExpoPushTokenAsync()).data;
    // console.log(token);
  } else {
    // alert("Must use physical device for Push Notifications");
  }

  return token;
}
