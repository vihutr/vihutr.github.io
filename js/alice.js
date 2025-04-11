let cipher = {"\n": "%", " ": "@", ".": "K", "!": "Z", "?": "o", "'": "}", "(": "M", ")": "]", ",": "k", "-": "`", "~": "\u00b7C\u2551\u00b7", "\u266a": "\u00b7Cv\u00b7", "a": "b", "b": "c", "c": "d", "d": "e", "e": "f", "f": "g", "g": "h", "h": "i", "i": "q", "j": "r", "k": "s", "l": "t", "m": "u", "n": "v", "o": "w", "p": "x", "q": "\u2580", "r": "\u00b7", "s": "\u255a", "t": "\u0401", "u": "\u2562", "v": "\u2563", "w": "\u2564", "x": "\u2565", "y": "\u2566", "z": "\u2567", "A": "\u0430", "B": "\u0431", "C": "\u0446", "D": "\u0434", "E": "\u0435", "F": "\u0444", "G": "\u0433", "H": "\u0445", "I": "\u0438", "J": "\u044f", "K": "\u0440", "L": "\u0441", "M": "\u0442", "N": "\u0443", "O": "\u0436", "P": "\u0432", "Q": "\u044c", "R": "\u044b", "S": "\u0411", "T": "\u0426", "U": "\u0414", "V": "\u0415", "W": "\u0424", "X": "\u0413", "Y": "\u0425", "Z": "\u0418", "5": "\u0423", "0": "\u041f"}
let dcipher = {"%": "\n", "@": " ", "K": ".", "Z": "!", "o": "?", "}": "'", "M": "(", "]": ")", "k": ",", "`": "-", "\u00b7C\u2551\u00b7": "~", "\u00b7Cv\u00b7": "\u266a", "b": "a", "c": "b", "d": "c", "e": "d", "f": "e", "g": "f", "h": "g", "i": "h", "q": "i", "r": "j", "s": "k", "t": "l", "u": "m", "v": "n", "w": "o", "x": "p", "\u2580": "q", "\u2321": "r", "\u00b7": "r", "\u255a": "s", "\u0401": "t", "\u2562": "u", "\u2563": "v", "\u2564": "w", "\u2565": "x", "\u2566": "y", "\u2567": "z", "a": "A", "\u0430": "A", "\u0431": "B", "\u0446": "C", "\u0434": "D", "\u0435": "E", "\u0444": "F", "\u0433": "G", "\u0445": "H", "\u0438": "I", "\u044f": "J", "\u0440": "K", "\u0441": "L", "\u0442": "M", "\u0443": "N", "\u0436": "O", "\u0432": "P", "\u044c": "Q", "\u044b": "R", "\u0411": "S", "\u0426": "T", "\u0414": "U", "\u0415": "V", "\u0424": "W", "\u0413": "X", "X": "Y", "\u0425": "Y", "\u0418": "Z", "\u0423": "5", "\u041f": "0"}

function convert(single_character, cipher_obj){
    if (single_character in cipher_obj){
        return cipher_obj[single_character];
    }
    return single_character;
}

function encrypt(){
    let word = document.getElementById('input').value;
    let output = "";
    for (let i = 0; i < word.length; i++){
        output += convert(word[i], cipher);
    }
    document.getElementById('output').value = output;
}

function decipher(){
    let word = document.getElementById('input').value;
    let output = "";
    for (let i = 0; i < word.length; i++){
        output += convert(word[i], dcipher);
    }
    document.getElementById('output').value = output;
}
document.getElementById("encrypt").addEventListener("click", encrypt)
document.getElementById("decipher").addEventListener("click", decipher)
