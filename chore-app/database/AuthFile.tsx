import React, { useState, useEffect } from "react";
import { Button } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";

import * as SecureStore from "expo-secure-store";

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "https://accounts.zoho.com/oauth/v2/auth",
  tokenEndpoint: "https://accounts.zoho.com/oauth/v2/token",
};

export default function OAuthFlow() {
  const [authCode, setAuthCode] = useState("");
  const [tokenResponse, setTokenResponse] = useState<any>(null);

  const redirectUri = makeRedirectUri({
    scheme: "choreclient",
    path: "auth",
  });

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "1000.5Z8HHXQP1QERNYHOXK8HGQY09UV70Q",
      scopes: ["ZohoCalendar.calendar.ALL", "ZohoCalendar.event.ALL"],
      redirectUri: 'exp://192.168.0.71:8081/--/auth',
      usePKCE: true,
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      setAuthCode(code);
      console.log("Authorization code:", code);
    }
  }, [response]);

  const getToken = async () => {
    if (!authCode) {
      console.log("No auth code yet!");
      return;
    }
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.EXPO_PUBLIC_CLIENT_ID,
      client_secret: process.env.EXPO_PUBLIC_CLIENT_SECRET,
      redirect_uri: 'exp://192.168.0.71:8081/--/auth',
      code: authCode,
      code_verifier: request?.codeVerifier ?? "",
    });

    try {
      console.log("Client ID:", process.env.EXPO_PUBLIC_CLIENT_ID);
      console.log("Client Secret:", process.env.EXPO_PUBLIC_CLIENT_SECRET);

      const response = await fetch(discovery.tokenEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      const data = await response.json();
      console.log("Token response:", data);
      setTokenResponse(data);
      await SecureStore.setItemAsync("zohoToken", JSON.stringify(data.access_token));
    } catch (err) {
      console.error("Error fetching token:", err);
    }
  };
 

  return (
    <>
      <Button
        disabled={!request}
        title="Login to Zoho"
        onPress={() => promptAsync()}
      />
      <Button
        disabled={!authCode}
        title="Get Token"
        onPress={getToken}
      />
      {/*{tokenResponse && (
        <FetchEvent token={tokenResponse.access_token} />
      )}*/}
    </>
  );
}
