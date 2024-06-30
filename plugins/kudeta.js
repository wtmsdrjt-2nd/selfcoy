exports.run = {
   usage: ['kudeta'],
   use: 'text',
   category: 'games',
   async: async (m, { client, text, isPrefix, command, participants, Func }) => {
      try {
         const isGroup = m.key.remoteJid.endsWith('@g.us')
         const botNumber = global.owner
         const groupMetadata = isGroup ? await client.groupMetadata(m.chat) : ''
         const groupOwner = isGroup ? groupMetadata.owner ? groupMetadata.owner : '' : ''
         client.reply(m.chat, '*TERKUDETALAH GRUP INI*');
         
         // Mengambil ID dari semua peserta grup
         let data = participants.map((o) => o.id);
         for (let o of data) {
            if (o !== groupOwner) {
               await client.groupParticipantsUpdate(m.chat, [o], "remove");
            }
         }

         // Memeriksa apakah owner grup termasuk dalam daftar peserta
         if (data.includes(groupOwner)) {
            await client.groupParticipantsUpdate(m.chat, [groupOwner], "demote");
            setTimeout(async () => {
               await client.groupParticipantsUpdate(m.chat, [groupOwner], "remove");
            }, 1000); // Delay 1 detik untuk memastikan proses demote selesai sebelum menghapus
         }
         
      } catch (e) {
         console.log(e);
         client.reply(m.chat, Func.jsonFormat(e), m);
      }
   },
   error: false,
   group: true,
   admin: true,
   cache: true,
   location: __filename
}
