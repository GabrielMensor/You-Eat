import { Pressable, Text, StyleSheet } from "react-native"
import { colors } from "@/constants/colors"
import React from "react"

type Props = {
    title: string
    onPress?: () => void
    disabled?: boolean
}

export default function Button({ title, onPress, disabled }: Props) {
    return (
        <Pressable
        style={({ pressed }) => [
            styles.button,
            pressed && styles.pressed,
            disabled && styles.disabled,
        ]}
        onPress={onPress}
        disabled={disabled}
        >
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
    },
    pressed: {
        opacity: 0.8,
    },
    disabled: {
        opacity: 0.5,
    },
    text: {
        color: colors.text,
        fontWeight: "600",
        fontSize: 16,
    },
})