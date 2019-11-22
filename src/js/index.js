import "../styles/index.scss";

if (process.env.NODE_ENV === "production") {
	console.log("Installing Offline-plugin");
	require("offline-plugin/runtime").install();
}
