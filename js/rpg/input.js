const osRepeatWindow = 17

export default class InputHandler {
    constructor(keyList) {
        this.keys = {};
        
        for (const keyName of keyList) {
            this.keys[keyName] = new KeyState()
        }

        this.keyOrder = [];
        
        window.addEventListener("keydown", (e) =>  this.keyDownHandler(e))
        window.addEventListener("keyup", (e) =>  this.keyUpHandler(e))
    }

    keyDownHandler(e) {
        // console.log("keydown %s, time: %d", e.code, globalTimer)
        if (!this.keys[e.code].down && this.keys[e.code].lastEvent == null) {
            this.keys[e.code].down = true;
            this.keys[e.code].lastEvent = 0;
            this.keyOrder.push(e.code);
        } else if (this.keys[e.code].down && this.keys[e.code].lastEvent == 1) {
            this.keys[e.code].lastEvent = 0;
            this.keys[e.code].osRepeatTime = 0;
        }
    }
    
    keyUpHandler(e) {
        // console.log("keyup %s, time: %d", e.code, globalTimer)
        if (this.keys[e.code].down && this.keys[e.code].lastEvent == 0) {
            this.keys[e.code].lastEvent = 1;
        }
    }

    removeFromOrder(key) {
        const index = this.keyOrder.indexOf(key);
        if (index > -1){
            this.keyOrder.splice(index, 1);
        }
        //console.log("removed {key}");
        //console.log(this.keyOrder)
    }

    getLatestKey() {
        return this.keyOrder[keyOrder.length - 1];
    }

    update(dt) {
        for (let key in this.keys){
            let k = this.keys[key]
            if (k.lastEvent == 2) { k.lastEvent = null }
            k.update(dt);
            if (k.down) {
                // console.log("Key: %s, held: %d", key, k.holdTime)
                // reset key when released beyond os repeat window
                if (k.osRepeatTime > osRepeatWindow) {
                    this.removeFromOrder(key);
                    k.down = false;
                    k.holdTime = 0;
                    k.osRepeatTime = 0;
                    k.lastEvent = 2;
                }
            }
        }
    }
}

class KeyState {
    constructor() {
        this.down = false;
        this.holdTime = 0;
        this.holdTimeUpdate = 0;
        this.osRepeatTime = 0;
        this.lastEvent = null;
    }

    update(dt) {
        if (this.down) {
            this.holdTime += dt;
            this.holdTimeUpdate += 1;
        } else {
            this.holdTime = 0;
            this.holdTimeUpdate = 0;
        }
        if (this.lastEvent == 1){
            this.osRepeatTime += dt
        }
    }

    justPressed() {
        return this.down && this.holdTimeUpdate == 1;
    }
    
    justReleased() {
        return this.lastEvent == 2;
    }

    justPressedOrReleased() {
        return (this.down && this.holdTimeUpdate == 1) || this.lastEvent == 2;
    }
}
