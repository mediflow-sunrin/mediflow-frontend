import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TurboModuleRegistry,
} from "react-native";
import updateUser from "../../api/user";

type Props = {
  qrState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
};

export default function QR({ qrState }: Props) {
  const [qr, setQR] = qrState;

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(!!status);
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }: { data: any }) => {
    setQR(false);
    setScanned(true);
    updateUser(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      <View
        style={[
          topStyles.contianer,
          {
            justifyContent: qr ? "center" : "space-between",
          },
        ]}
      >
        <View
          style={[
            topStyles.column,
            {
              alignItems: qr ? "center" : "flex-start",
            },
          ]}
        >
          <Text style={topStyles.title}>건물 정보</Text>
          <Text style={topStyles.description}>등록된 건물이 없습니다.</Text>
        </View>
        <TouchableOpacity onPress={() => setQR(true)}>
          <Image
            style={[
              topStyles.button,
              {
                display: qr ? "none" : "flex",
              },
            ]}
            source={require("../../assets/icons/qr.png")}
          />
        </TouchableOpacity>
      </View>
      {qr && (
        <View style={bottomStyles.container}>
          <View style={bottomStyles.box}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{
                width: "100%",
                position: "absolute",
                top: 0,
                height: "132%",
              }}
              type={"back"}
            />
          </View>
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
    aspectRatio: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  box: {
    width: "100%",
    height: 300,
    borderColor: "#FF7733",
    borderWidth: 3,
    borderRadius: 16,
    overflow: "hidden",

    position: "relative",
  },
});
