import { StyleProp, Text, TextStyle, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

type Props = {
  text: string;
  style?: StyleProp<TextStyle>;
};

export default function GradientText({ text, style }: Props) {
  return (
    <MaskedView
      maskElement={
        <Text style={[style, { backgroundColor: "transparent" }]}>{text}</Text>
      }
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#FF442B", "#FF7733"]}
      >
        <Text style={[style, { opacity: 0 }]}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );
}
