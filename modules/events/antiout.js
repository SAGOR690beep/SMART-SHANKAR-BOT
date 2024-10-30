module.exports.config = {
 name: "Shankar suman",
 eventType: ["log:unsubscribe"],
 version: "0.0.1",
 credits: "SHANKAR SUMAN",
 description: "Listen events"
};

module.exports.run = async({ event, api, Threads, Users }) => {
 let data = (await Threads.getData(event.threadID)).data || {};
 if (data.antiout == false) return;
 if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
 const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
 const type = (event.author == event.logMessageData.leftParticipantFbId) ? "self-separation" : "Koi Ase Pichware Mai Lath Marta Hai?";
 if (type == "self-separation") {
  api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
   if (error) {
    api.sendMessage(`𝐒𝐨𝐫𝐫𝐲 𝗠𝗮𝗶 𝗧𝘂𝗺𝗸𝗼 𝗔𝗱𝗱 𝗡𝗵𝗶 𝗸𝗿 𝗽𝗮𝘆𝗮 🙏 ${name} 𝗧𝘂𝗺𝗵𝗮𝗿𝗶 𝗶𝗱 𝗣𝗿 𝗸𝗼𝗶 𝗲𝗿𝗼𝗿𝗿 𝗵𝗮𝗶 𝗬𝗮𝗻 𝗧𝘂𝗺𝗻𝘆 𝗠𝘂𝗷𝘆 𝗕𝗹𝗼𝗰𝗸 𝗞𝗶𝘆𝗮 𝗛𝘂𝘄𝗮 𝗛𝗮𝗶`, event.threadID)
   } else api.sendMessage(`𝗠𝗮𝗿𝘆 𝗥𝗮𝗵𝘁𝘆 𝗧𝘂𝗺 𝗟𝗲𝗳𝘁 𝗡𝗮𝗵𝗶 𝗞𝗿 𝗦𝗸𝘁𝘆 ${name} 𝗕𝗮𝗯𝘆 ,𝗟𝗲𝗳𝘁 𝗛𝗼𝗻𝗮 𝗛𝗮𝗶 𝗧𝗼 𝗔𝗱𝗺𝗶𝗻 𝗔𝗺𝗶𝗿 𝗦𝘆 𝗥𝗮𝗯𝘁𝗮 𝗸𝗿𝗼 😁`, event.threadID);
  })
 }
}
