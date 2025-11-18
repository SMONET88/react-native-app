import React, { useState, useEffect } from "react";
import { Button } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { FetchCalendar } from "./CalendarAPI";

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
      const { code, location } = response.params;
      setAuthCode(code);
      console.log("Authorization code:", code);
      console.log("Location:", location);
    }
  }, [response]);

  const getToken = async () => {
    if (!authCode) {
      console.log("No auth code yet!");
      return;
    }

    const body = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: "1000.5Z8HHXQP1QERNYHOXK8HGQY09UV70Q",
      client_secret: "03b36ba42012bd559c698ef19bc1457877e12e248e",
      redirect_uri: 'exp://192.168.0.71:8081/--/auth',
      code: authCode,
      code_verifier: request?.codeVerifier ?? "",
    });

    try {
      const response = await fetch(discovery.tokenEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      const data = await response.json();
      console.log("Token response:", data);
      setTokenResponse(data);
    } catch (err) {
      console.error("Error fetching token:", err);
    }
  };
  
  if (tokenResponse !== null) {
     FetchCalendar
    
  }

  return (
    <>
      <Button
        disabled={!request}
        title="Login (Get Code)"
        onPress={() => promptAsync()}
      />
      <Button
        disabled={!authCode}
        title="Exchange Code for Token"
        onPress={getToken}
      />
      {tokenResponse && (
        <FetchCalendar token={tokenResponse.access_token} />
      )}
    </>
  );
}
