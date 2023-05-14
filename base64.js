const base64Table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

module.exports = {
    encode: function (arr) {
        const bytesInBinary = arr.map(byte => byte.toString(2).padStart(8, 0));
        const bytesInBinaryStr = bytesInBinary.join().replace(/,/g, '');
        
        let bitsInGroups = [];
        for (let i = 0; i < bytesInBinaryStr.length; i+=6) {
            let byte = bytesInBinaryStr.substring(i, i + 6);
        
            if (byte.length < 6) {
                byte = byte.padEnd(6, '0');
            }
        
            bitsInGroups.push(byte);
        }
        bitsInGroups = bitsInGroups.map(byte => byte.padStart(8, 0));
        
        const bytesToDecimal = bitsInGroups.map(byte => parseInt(byte, 2));
        
        const base64 = bytesToDecimal.map(value => base64Table[value]).join().replace(/,/g, '');

        let padding = '=';

        const res = arr.length % 3;
        const padd = res == 2 ? 1 : (res == 1 ? 2 : 0);
    
        return base64 + padding.repeat(padd);
    },
    decode: function(base64 = '', isFile = false) {
        let binaryStr = base64.replace(/ /g, '').replace(/=/g, '').split('').map(letter => base64Table.indexOf(letter).toString(2).padStart(6, 0)).join().replace(/,/g, '');

        let bitsInGroups = [];
        for (let i = 0; i < binaryStr.length; i+=8) {
            let byte = binaryStr.substring(i, i + 8);
            bitsInGroups.push(byte);
        }
        bitsInGroups = bitsInGroups.map(byte => parseInt(byte.padStart(8, 0), 2));

        if (isFile) {
            return bitsInGroups;
        }

        return String.fromCharCode(...bitsInGroups);
    }
}