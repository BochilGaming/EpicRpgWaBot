let handler = async (m, { conn, text }) => {
  if (conn.user.jid === global.conn.user.jid) {
    let users = [...new Set([...global.conns.filter(conn => conn.user && conn.state !== 'close').map(conn => conn.user.jid)])]
    let content = await conn.cMod(m.chat, m, /bc|broadcast/i.test(text) ? text : text + '\n' + readMore + '「 ' + conn.getName(conn.user.jid) + ' 𝘽𝙧𝙤𝙖𝙙𝙘𝙖𝙨𝙩 」')
    for (let id of users) conn.copyNForward(id, content)
    conn.reply(m.chat, `_Successfully broadcast to ${users.length} the bot number_
${users.map(v => 'wa.me/' + v.replace(/[^0-9]/g,'') + '?text=.menu').join('\n')}`.trim(), m)
  } else conn.reply(m.chat, 'This feature is only for bot hosts',  m)
}
handler.help = ['broadcastjadibot','bcbot'].map(v => v + ' <teks>')
handler.tags = ['host']
handler.command = /^(broadcast|bc)(jadi)?bot$/i
handler.owner = true
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

