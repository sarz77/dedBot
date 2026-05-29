const fs = require("node:fs/promises");
const path = require("node:path");
// Telegram Bot Campaign Preview Constructor
// Run with: node preview-bot.js

const BOT_TOKEN = "8660033355:AAEGL6xA13vHrBcf7qMxXHKnSESCoHJ2uBs";

// Telegram Bot Campaign Preview
// Run with: node preview-bot.js

if (!BOT_TOKEN || BOT_TOKEN === "PASTE_YOUR_BOT_TOKEN_HERE") {
  console.error("Please add your Telegram bot token first.");
  process.exit(1);
}

const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

const campaigns = {
  // Кампания 1 — первое вовлечение после открытия бота

  // Когда отправлять:
  // Через 5 минут после первого открытия Telegram-бота, если пользователь не сделал покупку.

  campaign1: {
    photo: "Campaign2.png",
    text: `
<tg-emoji emoji-id="5451927229506268442">🔔</tg-emoji><b> Подключение займёт 30 секунд!</b>

<b>[name]</b>, пока Ваш кофе готовится, Вы успеете подключить прокси! <tg-emoji emoji-id="5307845791283425776">🟣</tg-emoji>

Нажмите на кнопку ниже и выберите подходящий тариф <tg-emoji emoji-id="5197474438970363734">👇</tg-emoji>
    `.trim(),
    buttons: [
      [
        {
          text: "Подключить прокси",
          icon_custom_emoji_id: "5427009714745517609",
          callback_data: "buy_proxy",
        },
      ],
    ],
  },

  // Кампания 2
  // Когда отправлять:
  // Через 15 минут после открытия Telegram-бота, если пользователь всё ещё не сделал покупку.

  campaign2: {
    photo:
      "ChatGPT Image May 27, 2026, 11_11_16 PM.png",
    text: `
<tg-emoji emoji-id="5451927229506268442">🔔</tg-emoji><b>  Не знаете какой тариф выбрать или как подключить прокси?</b>

Служба поддержки <b>Дед Коннект</b> всегда готова помочь. <tg-emoji emoji-id="5352795355635276043">🟣</tg-emoji> 

Напишите нам, нажав на кнопку ниже <tg-emoji emoji-id="5197474438970363734">👇</tg-emoji>
    `.trim(),

    buttons: [
      [
        {
          text: "Поддержка",
          icon_custom_emoji_id: "5443038326535759644",
          callback_data: "support",
        },
      ],
    ],
  },

  // Кампания 3 — первый промокод для покупки

  // Когда отправлять:
  // Через 3 часа после открытия Telegram-бота, если пользователь не сделал покупку.

  campaign3: {
    photo: "Camp3.png",
    text: `

  <tg-emoji emoji-id="5451927229506268442">🔔</tg-emoji><b> Вы на пол шага от быстрого и стабильного интернета!</b>

С нашими прокси вы получаете:
<tg-emoji emoji-id="5188481279963715781">🚀</tg-emoji> Скорость, без ограничений по трафику
<tg-emoji emoji-id="5456140674028019486">⚡️</tg-emoji> Моментальную доставку сообщений и медиа
<tg-emoji emoji-id="5197288647275071607">⚡️</tg-emoji> Полную защиту и приватность

Нажмите на кнопку ниже, чтобы выбрать тариф <tg-emoji emoji-id="5197474438970363734">👇</tg-emoji>

    `.trim(),

    buttons: [
      [
        {
          text: "Подключить прокси",
          icon_custom_emoji_id: "5427009714745517609",
          callback_data: "buy_proxy",
        },
      ],
    ],
  },

  // Кампания 4 финальное первое вовлечение
  // Когда отправлять:
  // Через 24 часа после открытия Telegram-бота, если пользователь не сделал покупку.

  campaign4: {
    photo: "Camp4.png",
    text: `
<tg-emoji emoji-id="5451927229506268442">🔔</tg-emoji><b>А у Вас бонус на первый заказ!</b> <tg-emoji emoji-id="5452000149461024555">🎁</tg-emoji>

<b>[name]</b>, мы подготовили для Вас промокод, чтобы первое подключение было ещё выгоднее:

<i><a href="https://t.me/your_bot?start=BESTPROXY"><b>«BESTPROXY» (-35%)</b></a></i>

Нажмите на кнопку ниже, выберите тариф и примените промокод <tg-emoji emoji-id="5197474438970363734">👇</tg-emoji>
`.trim(),

    buttons: [
      [
        {
          text: "Активировать промокод",
          icon_custom_emoji_id: "5199749070830197566",
          callback_data: "buy_proxy",
        },
      ],
    ],
  },

  // Кампания 5 — партнёрская программа
  // 1. Пользователь открыл бота
  // 2. Пользователь получил onboarding/help/value/promo сообщения
  // 3. Пользователь сделал покупку
  // 4. Пользователь получил прокси и начал пользоваться
  // 5. Через 24–48 часов отправляется сообщение про партнёрскую программу

  campaign5: {
    photo: "Camp5.png",
    text: `
<tg-emoji emoji-id="5451927229506268442">🔔</tg-emoji><b> В Дед Коннект можно зарабатывать!</b>

[name], теперь Вы можете не только пользоваться быстрым прокси, но и зарабатывать с покупок Ваших друзей и знакомых.

Отправьте приглашение по реферальной ссылке и после их покупки Вы получите вознаграждения.<tg-emoji emoji-id="5188558967332152962">😍</tg-emoji>

Нажмите на кнопку ниже, чтобы получить ссылку <tg-emoji emoji-id="5197474438970363734">👇</tg-emoji>
    `.trim(),

    buttons: [
      [
        {
          text: "Партнёрская программа",
          icon_custom_emoji_id: "5215420556089776398",
          callback_data: "referral_program",
        },
      ],
    ],
  },

  // Кампания 8 — возвращение неактивного пользователя

  // Когда отправлять:
  // Если пользователь не взаимодействовал с ботом более 4 дней и не имеет активного прокси.

  campaign8: {
    photo: "Camp8.png",
    text: `
<tg-emoji emoji-id="5451927229506268442">🔔</tg-emoji><b> Лучший момент вернуться</b>

<b>[name]</b>, давно не пользовались Дед Коннект?

<tg-emoji emoji-id="5420315771991497307">🔥</tg-emoji> Мы подготовили для Вас специальный подарок.

Используйте промокод ниже и получите скидку на 35%!

<a href="https://t.me/your_bot?start=BESTPROXY"><b>«BESTPROXY» (-35%)</b></a>

Дед коннект - это быстрый доступ, удобные тарифы и стабильное подключение из любых регионов.
    `.trim(),

    buttons: [
      [
        {
          text: "Активировать промокод",
          icon_custom_emoji_id: "5199749070830197566",
          callback_data: "buy_proxy",
        },
      ],
    ],
  },
};

const callbackMessages = {
  buy_proxy: "Here should open the proxy purchase page.",
  view_tariffs: "Here should open the tariffs / purchase page.",
  support: "Here should open the support chat.",
  connect_proxy: "Here should open the proxy connection page.",
  renew_proxy: "Here should open the proxy renewal page.",
  partner_program: "Here should open the partner program page.",
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function personalizeText(text, user) {
  const displayName = user?.first_name || "пользователь";

  return text.replaceAll("[name]", escapeHtml(displayName));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function callTelegram(method, payload, retries = 5) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      if (method === "sendMessage" || method === "sendPhoto") {
        await sleep(1000);
      }

      const response = await fetch(`${API_URL}/${method}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!data.ok) {
        console.error("Telegram API error:", data);
        throw new Error(data.description || "Telegram API request failed");
      }

      return data.result;
    } catch (error) {
      console.error(
        `Telegram request failed. Attempt ${attempt}/${retries}:`,
        error.message,
      );

      if (attempt === retries) {
        throw error;
      }

      await sleep(3000);
    }
  }
}

function buildInlineKeyboard(buttons) {
  return {
    inline_keyboard: buttons,
  };
}

async function sendCampaign(chatId, user, campaignKey) {
  const campaign = campaigns[campaignKey];

  if (!campaign) {
    await callTelegram("sendMessage", {
      chat_id: chatId,
      text: "Campaign not found.",
    });
    return;
  }

  const messageText = personalizeText(campaign.text, user);

  if (campaign.photo) {
    const photoPath = path.isAbsolute(campaign.photo)
      ? campaign.photo
      : path.join(__dirname, campaign.photo);

    const photoBuffer = await fs.readFile(photoPath);
    const photoBlob = new Blob([photoBuffer]);

    const formData = new FormData();

    formData.append("chat_id", String(chatId));
    formData.append("photo", photoBlob, path.basename(photoPath));
    formData.append("caption", messageText);
    formData.append("parse_mode", "HTML");
    formData.append(
      "reply_markup",
      JSON.stringify(buildInlineKeyboard(campaign.buttons)),
    );

    await callTelegramForm("sendPhoto", formData);
    return;
  }

  await callTelegram("sendMessage", {
    chat_id: chatId,
    text: messageText,
    parse_mode: "HTML",
    reply_markup: buildInlineKeyboard(campaign.buttons),
  });
}

async function sendHelp(chatId) {
  await callTelegram("sendMessage", {
    chat_id: chatId,
    text: `
Available preview commands:

/campaign1 — show Campaign 1
/campaign2 — show Campaign 2
/campaign3 — show Campaign 3
/campaign4 — show Campaign 4
/campaign5 — show Campaign 5
/campaign6 — show Campaign 6
/campaign7 — show Campaign 7
/campaign8 — show Campaign 8
/campaign9 — show Campaign 9
    `.trim(),
  });
}

async function callTelegramForm(method, formData, retries = 5) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await sleep(1000);

      const response = await fetch(`${API_URL}/${method}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!data.ok) {
        console.error("Telegram API error:", data);
        throw new Error(data.description || "Telegram API request failed");
      }

      return data.result;
    } catch (error) {
      console.error(
        `Telegram form request failed. Attempt ${attempt}/${retries}:`,
        error.message,
      );

      if (attempt === retries) {
        throw error;
      }

      await sleep(3000);
    }
  }
}

async function handleButtonClick(callbackQuery) {
  const callbackData = callbackQuery.data;

  await callTelegram("answerCallbackQuery", {
    callback_query_id: callbackQuery.id,
    text: callbackMessages[callbackData] || "Button clicked.",
    show_alert: true,
  });
}

let offset = 0;

async function startPolling() {
  console.log("Bot is running.");
  console.log(
    "Open your bot in Telegram and send /campaign1, /campaign2, /campaign3, /campaign4, /campaign5, /campaign6, /campaign7, /campaign8, or /campaign9",
  );

  while (true) {
    try {
      const updates = await callTelegram("getUpdates", {
        offset,
        timeout: 30,
        allowed_updates: ["message", "callback_query"],
      });

      for (const update of updates) {
        offset = update.update_id + 1;

        if (update.message) {
          const chatId = update.message.chat.id;
          const text = update.message.text;
          const user = update.message.from;

          if (text === "/start" || text === "/help") {
            await sendHelp(chatId);
            continue;
          }

          if (text === "/campaign1") {
            await sendCampaign(chatId, user, "campaign1");
            continue;
          }

          if (text === "/campaign2") {
            await sendCampaign(chatId, user, "campaign2");
            continue;
          }

          if (text === "/campaign3") {
            await sendCampaign(chatId, user, "campaign3");
            continue;
          }

          if (text === "/campaign4") {
            await sendCampaign(chatId, user, "campaign4");
            continue;
          }

          if (text === "/campaign5") {
            await sendCampaign(chatId, user, "campaign5");
            continue;
          }

          if (text === "/campaign6") {
            await sendCampaign(chatId, user, "campaign6");
            continue;
          }

          if (text === "/campaign7") {
            await sendCampaign(chatId, user, "campaign7");
            continue;
          }

          if (text === "/campaign8") {
            await sendCampaign(chatId, user, "campaign8");
            continue;
          }

          if (text === "/campaign9") {
            await sendCampaign(chatId, user, "campaign9");
            continue;
          }
        }

        if (update.callback_query) {
          await handleButtonClick(update.callback_query);
        }
      }
    } catch (error) {
      console.error("Error:", error.message);
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
}

startPolling();
