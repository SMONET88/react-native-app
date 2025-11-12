import { useEffect, useState } from "react";

const FecthCalendar = () => {

    const [data, setData] = useState();

    useEffect(() => {
        axios
            .get("http://localhost:5001/api/products")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
}