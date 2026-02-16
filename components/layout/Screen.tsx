import { ReactNode } from "react";
import { colors } from "@/constants/colors";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
    children: ReactNode
}

export default function Screen({ children }: Props) {
    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.container}>{children}</View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: colors.background,
    },
    container: {
        flex: 1,
        padding: 24,
    },
})