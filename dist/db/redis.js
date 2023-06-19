// bu joyda redis database qo'shiladi.
import redis from "redis";
export const client = redis.createClient({
    url: 'redis://default:B4JeLupwqLq3XcMD3pUK6NUhVWn0JbQD@redis-11891.c291.ap-southeast-2-1.ec2.cloud.redislabs.com:11891'
});
client.connect();
client.on("connect", function () {
    console.log("Redis serverga muvaffaqiyatli bog'landi");
});
// Xatolik yuz berib qolganida
client.on("error", function (error) {
    console.error("Redis serverga bog'lanishda xatolik yuz berdi:", error);
});
