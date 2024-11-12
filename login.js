const login = require('facebook-chat-api');
const fs = require('fs');

// یہاں اپنی ای میل اور پاس ورڈ ڈالیں
const credentials = {
    email: 'miaanamir586@gmail.com',    // اپنی فیس بک ای میل یہاں ڈالیں
    password: 'mian222#@'  // اپنا فیس بک پاس ورڈ یہاں ڈالیں
};

// فیس بک پر لاگ ان کرنے کا طریقہ
login(credentials, (err, api) => {
    if (err) return console.error('Login error:', err);
    
    console.log('Successfully logged in!');
    
    // یہاں پر config.json کو اپ ڈیٹ کریں گے تاکہ fb_id سیٹ ہو جائے
    const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
    config.fb_id = api.getCurrentUserID(); // فیس بک کی ID حاصل کریں
    
    // config.json کو دوبارہ اپ ڈیٹ کریں
    fs.writeFileSync('config.json', JSON.stringify(config, null, 2), 'utf8');
    
    console.log('config.json updated with the new Facebook ID');
    
    // اس کے بعد آپ کا بوٹ ایونٹس یا کمانڈز کے لیے تیار ہے
    api.listenMqtt((err, message) => {
        if (err) return console.error('Error listening:', err);
        console.log('Received message:', message);
        
        // یہاں آپ اپنے بوٹ کا جواب دے سکتے ہیں
        api.sendMessage('Hello! How can I help you?', message.threadID);
    });
});
