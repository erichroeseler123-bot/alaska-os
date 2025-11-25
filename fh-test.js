import fs from "fs";

async function run() {
  try {
    const shortName = process.env.FH_SHORT_NAME;
    const appKey = process.env.FH_APP_KEY;
    const userKey = process.env.FH_USER_KEY;

    if (!shortName || !appKey || !userKey) {
      console.error("Missing FH_SHORT_NAME / FH_APP_KEY / FH_USER_KEY env vars.");
      return;
    }

    const url = `https://fareharbor.com/api/external/v1/companies/${shortName}/items/`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "X-FareHarbor-API-App": appKey,
        "X-FareHarbor-API-User": userKey,
        "Content-Type": "application/json",
      },
    });

    const text = await res.text();

    fs.writeFileSync("FH_RAW.json", text);
    console.log("Saved FH_RAW.json");

  } catch (err) {
    console.error("ERROR:", err);
  }
}

run();
