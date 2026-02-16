import { Redirect } from "expo-router";
import React from "react";

export default function Index() {
    const isLogged = false  // virá do useAuth em atualizações futuras

    if (isLogged) {
        return <Redirect href="/(app)/home" />
    }

    return <Redirect href="/(auth)/login" />
}