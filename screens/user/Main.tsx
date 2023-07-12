import { View, StyleSheet } from "react-native";
import Map from "../../components/Map";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import checkUser from "../../api/auth";
import BottomSheet from "@gorhom/bottom-sheet";
import { User } from "../../constants/Users";
import Sheet from "../../components/Sheet";
import { Props } from "../../@types/predefined";
import getBuilding from "../../api/building";

export default function UserMain({ navigation }: Props.Navigation) {
  const [step, setStep] = useState<"unregistered" | "registered" | "">(
    "unregistered"
  );
  const [qr, setQR] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  const [user, setUser] = useState<User | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["15%", "70%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    setIndex(index);
    setQR(index === 1);
  }, []);

  useEffect(() => {
    setIndex(qr ? 1 : 0);
  }, [qr]);

  useEffect(() => {
    checkUser().then((data) => {
      if (!data) return;
      setUser(data);
      setStep(data.building ? "registered" : "unregistered");
    });
  }, [qr]);

  return (
    <View style={styles.container}>
      {user && <Map />}
      <BottomSheet
        ref={bottomSheetRef}
        index={index}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.sheetContainer}>
          {step === "unregistered" && <Sheet.QR qrState={[qr, setQR]} />}
          {step === "registered" && (
            <Sheet.Infor
              contact={user?.building.contact!}
              navigation={navigation}
              name={user?.building?.name!}
              description={user?.building?.address!}
              exit={user?.building.exit!}
              buildingState={[qr, setQR]}
            />
          )}
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  sheetContainer: {
    paddingHorizontal: 32,
    paddingVertical: 10,
  },
});
