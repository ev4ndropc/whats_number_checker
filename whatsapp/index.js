const {
  WAConnection,
  MessageType,
  MessageOptions,
  Mimetype
} = require("@adiwajshing/baileys");
const fs = require("fs");
const path = require("path");

const { redisGet, redisSet } = require("../redis");

const whatsapp = new WAConnection();

async function connectToWhatsApp() {
  whatsapp.autoReconnect = true;
  var authInfo = null;

  try {
    authInfo = path.join(__dirname, "/session/auth_info.json");
    whatsapp.loadAuthInfo(authInfo);
  } catch {}

  whatsapp.on("open", () => {
    console.log(`credentials updated!`);
    const authInfo = whatsapp.base64EncodedAuthInfo();
    fs.writeFileSync(
      path.join(__dirname, "/session/auth_info.json"),
      JSON.stringify(authInfo, null, "\t")
    );
  });

  whatsapp.on("close", async (reason, isReconnecting) => {
    if (reason.reason == "replaced") {
      setTimeout(() => {
        whatsapp.close();
        whatsapp.loadAuthInfo(whatsapp.base64EncodedAuthInfo());
        whatsapp.connect();
      }, 30000);
    } else {
      whatsapp.loadAuthInfo(whatsapp.base64EncodedAuthInfo());
      whatsapp.connect();
    }
  });

  whatsapp.on("qr", (qr) => {
    console.log(qr);
  });

  whatsapp.on("chat-update", async (chat) => {});
}

// connectToWhatsApp();

export default whatsapp;
