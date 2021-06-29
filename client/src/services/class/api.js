import axios from "axios";

const getClassAPi = async () => {
    const data = await axios
        .get(`https://feasthero.herokuapp.com/classes`)
        .then((res) => {
            return res;
        });

    return data;
};

export { getClassAPi };