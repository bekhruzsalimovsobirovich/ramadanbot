const TelegramBot = require('node-telegram-bot-api');
const { createCanvas, loadImage, registerFont  } = require('canvas');
const TOKEN = '6759036545:AAFTbuhm_LW7f_Xr5RJ5miOZAwNViJPatb8';

const bot = new TelegramBot(TOKEN, { polling: true });
registerFont('./fonts/Shrikhand-Regular.ttf', { family: 'sans-serif' });
bot.onText(/\/start/, async (msg) => {
    const chatID = msg.chat.id;
    const name = msg.from.first_name;

    await bot.sendMessage(chatID, `Ассалому алейкум <b>${name}</b> ботимизга хуш келибсиз! 😊`,{parse_mode:'HTML'});
    await bot.sendMessage(chatID, `Илтимос исмингизни ёки тахаллусингизни киритинг!`);
});

bot.on('message', async (msg) => {
    if (msg.text === '/start') return null;
    if (msg.text === '/info') return await bot.sendMessage(msg.chat.id, `Ушбу бот орқали сиз 2024 - йил Рамазон ойи тақвимини олишингиз мумкин ва дўстларингизни табриклашингиз мумкин бўлади 😇`);
    if (msg.text) {
        const chatID = msg.chat.id;
        const text = msg.text;

        // Load the image
        const image = await loadImage('./images/ramadan_eng.png').catch(error => {
            console.error('Error loading image:', error);
            bot.sendMessage(chatID, 'Error loading image.');
        });

        if (!image) return; // Exit if image loading failed

        // Create a canvas
        const canvas = createCanvas(image.width, image.height);
        const ctx = canvas.getContext('2d');

        // Draw the image
        ctx.drawImage(image, 0, 0, image.width, image.height);

        // Set font properties
        ctx.font = '45px Shrikhand'; // Use your font name and size
        ctx.fillStyle = 'white'; // Text color

        // Calculate text position
        const textWidth = ctx.measureText(text).width;
        const x = (canvas.width - textWidth) / 2;
        const y = 20 + canvas.height - 50; // Adjust the y position as needed

        // Draw text on the image
        ctx.fillText(text, x, y);

        // Convert the canvas to a buffer
        const buffer = canvas.toBuffer('image/png');

        // Send the image with text
        bot.sendPhoto(chatID, buffer).catch(error => {
            console.error('Error sending photo:', error);
            bot.sendMessage(chatID, 'Error sending photo.');
        });
    } else {
        bot.sendMessage(chatID, 'Please send text only.');
    }
});

