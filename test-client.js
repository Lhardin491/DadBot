class MockMessage 
{
    constructor(text) 
    {
        this.content = text
        this.author = {}
        this.channel = {
            send: (msg) =>
            {
                console.log(`Message sent: ${msg}`)
            }
        }
    }
}


class TestClient
{

    constructor(username, id)
    {
        this.username = username
        this.id = id
        this.registered_events = {}
    }


    on(eventName, func) {
        if(!this.registered_events[eventName])
        {
            this.registered_events[eventName] = []
        }
        this.registered_events[eventName].push(func)
    }

    trigger(eventName, data) {
        if(this.registered_events[eventName])
        {
            this.registered_events[eventName].forEach(func =>
            {
                func(data)
            })
        }
    }

    login()
    {
        this.trigger('ready')
    }


    mockMessage(text)
    {
        let message = new MockMessage(text)
        this.trigger('message', message)
    }
}

module.exports = TestClient