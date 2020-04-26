import {VM, VMScript} from 'vm2';
import {Client, Message} from 'discord.js'
import * as lodash from 'lodash';
import * as Discord from 'discord.js';

export default class DiscordInterpreter {
    private vm: VM;

    constructor(discordClient: Client, message: Message) {
        this.vm = new VM({
            sandbox: {

                _: lodash,

                Discord: Discord,
                message: message,
                attachments: message.attachments,
                author: message.author,
                channel: message.channel,
                cleanContent: message.cleanContent,
                client: message.client,
                content: message.content,
                createdAt: message.createdAt,
                createdTimestamp: message.createdTimestamp,
                deletable: message.deletable,
                editable: message.editable,
                editedAt: message.editedAt,
                editedTimestamp: message.editedTimestamp,
                edits: message.edits,
                embeds: message.embeds,
                guild: message.guild,
                hit: message.hit,
                id: message.id,
                member: message.member,
                mentions: message.mentions,
                nonce: message.nonce,
                pinnable: message.pinnable,
                pinned: message.pinned,
                reactions: message.reactions,
                system: message.system,
                tts: message.tts,
                type: message.type,
                url: message.url,
                webhookID: message.webhookID,
            }
        });
    }

    public async Run(script: any) {
        script = DiscordInterpreter.preProcessMessage(script);
        let result: any;
        try {
            result = await this.vm.run(script);
        } catch (e) {
            result = e.toString();
        }
        return result;

    }

    private static preProcessMessage(message: string) {
        if (message.startsWith('```js') && message.endsWith('```')) {
            message = message.slice(5).slice(0, -3)
        } else if (message.startsWith('```') && message.endsWith('```')) {
            message = message.slice(3).slice(0, -3)
        }
        return message;
    }
}
