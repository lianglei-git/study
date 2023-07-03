const crypto = require('crypto')
/** 加密 */
const getSign = (jax) => {
    return crypto.createHash("md5").update(jax.toString()).digest("hex")
}

// ifanyiweb8hc9s98e
const sign = getSign("hello")
console.log(sign.substring(0, 16))