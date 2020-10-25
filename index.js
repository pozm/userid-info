const { Plugin } = require('powercord/entities');

class UserIDInfo extends Plugin {
    startPlugin() {
        powercord.api.commands.registerCommand({
            command: 'userid',
            aliases: ['useridinfo', 'idinfo'],
            label: 'UserID Info',
            usage: '{c} <id>',
            description: 'Lookup user info from a user id',
            executor: (id) => {
                return this.getInfo(id)
            }
        })
    }

    async getInfo(id) {
        try {
            let userObject = await (await require('powercord/webpack').getModule(['acceptAgreements', 'getUser'])).getUser(String(id));
            let userName = userObject['username'] + '#' + userObject['discriminator'];
            let avatarURL = userObject['avatarURL'];
            let isBot = String(userObject['bot']);
            const embed = {
                type: 'rich',
                title: `UserID Lookup for ${userName}`,
                fields: [
                    {
                        name: 'ID',
                        value: `${id}`,
                        inline: true
                    }, {
                        name: 'Tag',
                        value: `<@${id}>`,
                        inline: true
                    }, {
                        name: 'Username',
                        value: userName,
                        inline: true
                    }, {
                        name: 'Bot',
                        value: `${isBot}`,
                        inline: true
                    }, {
                        name: 'Avatar',
                        value: avatarURL,
                        inline: true
                    }
                ]
            }
            return {
                result: embed,
                embed: true
            }
        }
        catch (err) {
            return { result: 'Incorrect UserID.' }
        }
    }

    pluginWillUnload() {
        powercord.api.commands.unregisterCommand('userid');
    }
}

module.exports = UserIDInfo;
