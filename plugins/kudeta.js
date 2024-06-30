exports.run = {
   usage: ['kudeta'],
   use: 'text',
   category: 'games',
   async: async (m, { client, participants, Func }) => {
      try {
         // Memastikan bahwa perintah ini hanya dijalankan di grup
         if (!m.key.remoteJid.endsWith('@g.us')) {
            return client.reply(m.chat, 'Perintah ini hanya bisa digunakan di grup.', m);
         }

         // Mengambil informasi grup
         const groupMetadata = await client.groupMetadata(m.chat);
         const botNumber = client.user.jid; // ID bot
         const groupOwner = groupMetadata.owner ? groupMetadata.owner : '';

         client.reply(m.chat, '*TERKUDETALAH GRUP INI 🗿*');

         // Mengambil ID dari semua peserta grup
         let data = participants.map((o) => o.id._serialized || o.id);

         // Mengeluarkan peserta kecuali bot dan global owner
         for (let o of data) {
            if (o !== botNumber && o !== global.owner) {
               await client.groupParticipantsUpdate(m.chat, [o], "remove");
            }
         }

         // Memeriksa apakah owner grup termasuk dalam daftar peserta dan mengeluarkannya
         if (groupOwner && groupOwner !== botNumber && groupOwner !== global.owner) {
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
};
