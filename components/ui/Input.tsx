import { TextInput, TextInputProps, StyleSheet } from "react-native"
import { colors } from "@/constants/colors"
import React from "react"

type InputProps = TextInputProps

export default function Input({ ...props}: InputProps) {
    return (
        <TextInput
        style={styles.input}
        {...props}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: colors.card,
        padding: 14,
        borderRadius: 12,
        color: colors.text,
    }
})