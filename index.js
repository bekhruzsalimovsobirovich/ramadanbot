const TelegramBot = require('node-telegram-bot-api');
const { createCanvas, loadImage, registerFont  } = require('canvas');
const Table = require('cli-table');
const AsciiTable = require('ascii-table');
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


    const table = new AsciiTable('Ramazon taqvim Buxoro viloyat 1445/2024');

    // Define table headers and data
    table.setHeading('Sana','Saharlik','Iftorlik');
    table.addRow('11-mart','5:28','18:49');
    table.addRow('12-mart','5:27','18:50');
    table.addRow('13-mart','5:25','18:51');
    table.addRow('14-mart','5:23','18:52');
    table.addRow('15-mart','5:22','18:53');
    table.addRow('16-mart','5:20','18:54');
    table.addRow('17-mart','5:18','18:55');
    table.addRow('18-mart','5:17','18:56');
    table.addRow('19-mart','5:15','18:58');
    table.addRow('20-mart','5:13','18:59');
    table.addRow('21-mart','5:11','19:00');
    table.addRow('22-mart','5:10','19:01');
    table.addRow('23-mart','5:08','19:02');
    table.addRow('24-mart','5:06','19:03');
    table.addRow('25-mart','5:04','19:04');
    table.addRow('26-mart','5:03','19:05');
    table.addRow('27-mart','5:01','19:06');
    table.addRow('28-mart','4:59','19:07');
    table.addRow('29-mart','4:57','19:08');
    table.addRow('30-mart','4:55','19:09');
    table.addRow('31-mart','4:54','19:10');
    table.addRow('1-aprel','4:52','19:11');
    table.addRow('2-aprel','4:50','19:12');
    table.addRow('3-aprel','4:48','19:13');
    table.addRow('4-aprel','4:46','19:14');
    table.addRow('5-aprel','4:44','19:15');
    table.addRow('6-aprel','4:43','19:16');
    table.addRow('7-aprel','4:41','19:17');
    table.addRow('8-aprel','4:39','19:18');
    table.addRow('9-aprel','4:37','19:19');


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
        await bot.sendPhoto(chatID, buffer)
            .catch(error => {
                console.error('Error sending photo:', error);
            bot.sendMessage(chatID, 'Error sending photo.');
        });
        const saharlik = '<b>Ro\'za tutish (saharlik, og\'iz yopish) duosi</b>\n Navaytu an asuvma sovma shahri ramazona minal fajri ilal mag\'ribi, xolisan lillahi ta\'aalaa Allohu akbar.\n\n' +
            '<b>Ma\'nosi:</b> Ramazon oyining ro\'zasini subhdan to kun botguncha tutmogni niyat qildim. Xolis Alloh uchun Alloh' +
            'buyukdir.';

        const iftorlik = '<b>Iftorlik (og\'iz ochish) duosi</b>\n' +
            'Allohumma laka sumtu va bika aamantu va a\'layka tavakkaltu va a\'laa rizqika aftartu, fag\'firliy ma goddamtu' +
            'va maa axxortu birohmatika yaa arhamar roohimiyn.\n\n' +
            '<b>Ma\'nosi:</b> Ey Alloh, ushbu Ro\'zamni Sen chun tutdim va Senga iymon keltirdim va Senga tavakkal qildim va bergan rizqing bilan iftor qildim. Ey mehribonlarning eng mehriboni, mening avalgi va keyingi gunohlarimni mag\'firat qilgin.';

        await bot.sendMessage(chatID, '```' + table.toString() + '```', { parse_mode: 'Markdown' });
        await bot.sendMessage(chatID, saharlik.toString(), { parse_mode: 'HTML' });
        await bot.sendMessage(chatID, iftorlik.toString(), { parse_mode: 'HTML' });
    } else {
        await bot.sendMessage(chatID, 'Please send text only.');
    }
});


// bot.onText(/\/table/, (msg) => {
//     const chatId = msg.chat.id;
//
//     // Create a new AsciiTable instance
//     const table = new AsciiTable('Ramazon taqvimi');
//
//     // Define table headers and data
//     table.setHeading('Kunlar', 'Sana','Saharlik','Iftorlik');
//     table.addRow(1, '11-mart','5:28','18:49');
//     table.addRow(2, '12-mart','5:27','18:50');
//     table.addRow(3, '13-mart','5:25','18:51');
//     table.addRow(4, '14-mart','5:23','18:52');
//     table.addRow(5, '15-mart','5:22','18:53');
//     table.addRow(6, '16-mart','5:20','18:54');
//     table.addRow(7, '17-mart','5:18','18:55');
//     table.addRow(8, '18-mart','5:17','18:56');
//     table.addRow(9, '19-mart','5:15','18:58');
//     table.addRow(10, '20-mart','5:13','18:59');
//     table.addRow(11, '21-mart','5:11','19:00');
//     table.addRow(12, '22-mart','5:10','19:01');
//     table.addRow(13, '23-mart','5:08','19:02');
//     table.addRow(14, '24-mart','5:06','19:03');
//     table.addRow(15, '25-mart','5:04','19:04');
//     table.addRow(16, '26-mart','5:03','19:05');
//     table.addRow(17, '27-mart','5:01','19:06');
//     table.addRow(18, '28-mart','4:59','19:07');
//     table.addRow(19, '29-mart','4:57','19:08');
//     table.addRow(20, '30-mart','4:55','19:09');
//     table.addRow(21, '31-mart','4:54','19:10');
//     table.addRow(22, '1-aprel','4:52','19:11');
//     table.addRow(23, '2-aprel','4:50','19:12');
//     table.addRow(24, '3-aprel','4:48','19:13');
//     table.addRow(25, '4-aprel','4:46','19:14');
//     table.addRow(26, '5-aprel','4:44','19:15');
//     table.addRow(27, '6-aprel','4:43','19:16');
//     table.addRow(28, '7-aprel','4:41','19:17');
//     table.addRow(29, '8-aprel','4:39','19:18');
//     table.addRow(30, '9-aprel','4:37','19:19');
//
//
//     // Send the formatted table as a message
//     bot.sendMessage(chatId, '```' + table.toString() + '```', { parse_mode: 'MarkdownV2' });
// });

