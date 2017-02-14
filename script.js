'use strict';

const Script = require('smooch-bot').Script;

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say('Olá! O Meu nome é RobsonBot!')
                .then(() => 'askName');
        }
    },

    askName: {
        prompt: (bot) => bot.say('Qual o seu nome?'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say(`Legal! Então posso lhe chamar de ${name}
Tudo bem? %[Sim](postback:sim) %[Não](postback:nao)`))
                .then(() => 'finish');
        }
    },

    finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say(`Desculpe-me ${name}, meu criador ` +
                        'ainda não me ensinou muita coisa! Estou aprendendo!'))
                .then(() => 'finish');
        }
    }
});
