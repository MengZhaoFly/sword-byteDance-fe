## 题目 
实现一个发布订阅的 on emit once off

## 题解

```js
class Event {
    constructor() {
        this.listeners = {

        }
    }
    on(name, fn, once = false) {
        if (!this.listeners[name]) {
            this.listeners[name] = [];
        }
        this.listeners[name].push({
            name, fn, once
        })
    }
    once(name, fn) {
        this.on(name, fn, true)
    }
    off(name, fn) {
     this.listeners[name] = this.listeners[name].filter(events => {
       return events.fn !== fn
     })
    }
    emit(name, ...args) {
        for (let listen of Object.keys(this.listeners)) {
          let events = this.listeners[listen];
          let notOnceEvents = [];
          for(let event of events) {
              let {fn, once} = event;
              fn(...args);
              if (!once) notOnceEvents.push(event);
          }
          this.listeners[listen] = notOnceEvents;
        }
    }
}
let event = new Event();
var listen1 = (some) => {
    console.log(1, some);
}
event.on('price', listen1)
event.once('price', (some) => {
    console.log(2, some);
})
event.emit('price', '肉类');
event.emit('price', '肉')
event.off('price', listen1);
event.emit('price', '肉')
```