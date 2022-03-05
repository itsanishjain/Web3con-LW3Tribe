export default function handler(req, res) {
  const metadataURL = req.qurery.metadataURL;
  try {
    const response = await fetch(metadataURL);
    const data = await response.json();
    console.log("DATA", data);
    return data;
  } catch (error) {
    console.log("ERROR", error);
  }
}
