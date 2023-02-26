type Message = {
    username: string,
    content: string
}
const messagesMock: Message[] = [];
for (let i = 0; i < 100; i++) {
    messagesMock.push({
        username: 'user' + i,
        content: 'content' + i
    });
}
export {
    messagesMock
}