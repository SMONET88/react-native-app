import { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";

type FetchCalendarProps = {
  token: string;
};

type EventType = {
  rrule?: string;
};

type EventResponseType = {
  events: EventType[];
};

const FetchEvent: React.FC<FetchCalendarProps> = ({ token }) => {
  const [events, setEventData] = useState<EventResponseType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);

  const id = process.env.EXPO_PUBLIC_CAL_ID;

  console.log("Starting calendar fetch with token:", token);

  const fetchCalendar = async () => {
    try {
      const response = await fetch(
        `https://calendar.zoho.com/api/v1/calendars/${id}/events`,
        {
          headers: {
            Authorization: `Zoho-oauthtoken ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();
      console.log("Token response:", data);
      setEventData(data);
    } catch (err) {
      console.error("Error fetching token:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const test = events?.events[0]?.rrule;

  console.log(`data here: ${test}`);

  return (
    <View>
      <Button title="get event details" onPress={fetchCalendar} />
    </View>
  );
};

export { FetchEvent };
