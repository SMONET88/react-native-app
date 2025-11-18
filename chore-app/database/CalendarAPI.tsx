import { useEffect, useState } from "react";
import { View, Text } from "react-native";

type FetchCalendarProps = {
  token: string;
};

const FetchCalendar: React.FC<FetchCalendarProps> = ({ token }) => {
  console.log("FETCH RENDERED");

  const [calendarData, setCalendarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);

  const id =
    "zz080112304b0ecddfa42edf8d8ead813266ae3da06053af5a982a7e3ebb8ddd39bdaca11970cb6f6ddb45943eb8346ee2eefa8ea9";
  
  console.log("Starting calendar fetch with token:", token);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://calendar.zoho.com/api/v1/calendars/${id}`,
          {
            headers: {
              Authorization: `Zoho-oauthtoken ${token}`,
              Accept: "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log("Calendar API response:", result);
        setCalendarData(result);
      } catch (err) {
        if (err instanceof Error) {
          console.log("Error occurred:", err.message);
          setError(err);
        } else {
          const wrapped = new Error(String(err));
          console.log("Error occurred:", wrapped.message);
          setError(wrapped);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount

  console.log(`data here: ${calendarData}`);

  return (
    <View>
      <Text>{JSON.stringify(calendarData, null, 2)}</Text>
    </View>
  );
};

export { FetchCalendar };
