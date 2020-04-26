import * as Discord from "discord.js"
import {token, channelID, allowedID} from '../config'
import DiscordInterpreter from "./DiscordInterpreter/DiscordInterpreter";


// import * as sqlite3 from 'sqlite3';

// const db = new sqlite3.Database('./database.sqlite', async function (err) {
//     if (err) {
//         console.log("Database initialisation failed :(");
//     } else {
//         await db.run('create table if not exists AllowedUsers (userID String)');
//         await db.run('create table if not exists AllowedChannels (channelID String)');
//         console.log("Database initialised successfully");
//         await client.login(token);
//     }
// });

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in using ${client.user.tag}`);
});

client.on('message', async message => {
    if ((channelID.includes(message.channel.id) || message.content.startsWith("dsc-run ")) && !message.author.bot && allowedID.includes(message.author.id)) {
        let script;
        script = message.content;
        if (message.content.startsWith("dsc-run ")) {
            script = message.content.slice(8);
        }
        let interpreter = new DiscordInterpreter(client, message);
        let result = await interpreter.Run(script);
        if (result == null) result = "Function didn't return anything";
        if (result.toString().length > 2000) result = "Response was too long";
        try {
            await message.channel.send(result);
        } catch (e) {
            await message.channel.send("Sending return value of your script failed because of `" + e.toString() + "`")
        }
    }
});


// client.on('disconnect', () => {
//     db.close();
// });

client.login(token);

