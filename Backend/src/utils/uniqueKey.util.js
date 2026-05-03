import crypto from "crypto";

const generateUniqueKey = ({
  serverIP,
  cve,
  pluginId,
  vulnerabilityName,
  port
}) => {

  let baseString = "";

  if (cve) {
    baseString = `${serverIP}-${cve}`;
  } else if (pluginId) {
    baseString = `${serverIP}-${pluginId}`;
  } else {
    const normalized = vulnerabilityName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");

    baseString = `${serverIP}-${normalized}-${port || ""}`;
  }

  return crypto.createHash("sha256").update(baseString).digest("hex");
};

export {
  generateUniqueKey
}