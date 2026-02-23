import { Link, Href } from "expo-router"
import { Text, Pressable, StyleSheet } from "react-native"
import { colors } from "@/constants/colors"
import React from "react"

type Props = {
    href: Href
    children: React.ReactNode
}

export default function TextLink({ href, children }: Props) {
    return (
        <Link href={href} asChild>
            <Pressable>
                <Text style={styles.link}>{children}</Text>
            </Pressable>
        </Link>
    )
}

const styles = StyleSheet.create({
    link: {
        color: colors.primary,
        textAlign: "center",
        fontWeight: "500",
    }
})