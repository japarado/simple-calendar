import axios from "axios";

const instance = axios.create({
	baseURL: `${process.env.MIX_APP_URL}/api`,
	timeout: 1000,
	headers: {"X-Requested-With": "XMLHttpRequest"}
});

export default instance;
