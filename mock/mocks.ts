type Message = {
    username: string,
    message: string
}
const messagesMock: Message[] = [];
for (let i = 0; i < 100; i++) {
    messagesMock.push({
        username: 'user' + i,
        message: 'message' + i
    });
}
export {
    messagesMock
}