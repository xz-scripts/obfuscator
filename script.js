function processLua() {
    const source = document.getElementById('inputScript').value;
    const status = document.getElementById('statusMessage');

    if (!source.trim()) {
        status.innerText = "Error: Input script is empty.";
        return;
    }

    status.innerText = "Obfuscating...";

    try {
        const bytes = [];
        for (let i = 0; i < source.length; i++) {
            bytes.push(source.charCodeAt(i));
        }

        const encryptedBytes = [];
        for (let i = 0; i < bytes.length; i++) {
            const key = (65 + (i % 7)) % 256;
            encryptedBytes.push(bytes[i] ^ key);
        }

        const headerText = 
`-- [ Protected with itzfernandooo Obfuscator Tools, Protection ] --\n\n`;

        const byteTableString = encryptedBytes.join(',');

        const resultScript = headerText + 
`local _0xO0IOlIIl10 = {${byteTableString}}
return (function(...)
    local _0xlIlo11loIl = (getfenv and getfenv()) or _ENV or {}
    local _0xII1OlOO1I0 = 1
    local _0xooOlo1O1Ol = {}
    while _0xII1OlOO1I0 <= #_0xO0IOlIIl10 do
        local b = _0xO0IOlIIl10[_0xII1OlOO1I0]
        local k = (65 + ((_0xII1OlOO1I0 - 1) % 7)) % 256
        local bx = (bit and bit.bxor) or (bit32 and bit32.bxor) or function(a, b)
            local p, r = 1, 0
            while a > 0 and b > 0 do
                local rx, ry = a % 2, b % 2
                if rx ~= ry then r = r + p end
                a = math.floor(a / 2) b = math.floor(b / 2) p = p * 2
            end
            r = r + (a + b) * p return r
        end
        table.insert(_0xooOlo1O1Ol, string.char(bx(b, k)))
        _0xII1OlOO1I0 = _0xII1OlOO1I0 + 1
    end
    local _0xolOOl0101l = assert(loadstring or load)(table.concat(_0xooOlo1O1Ol))
    return _0xolOOl0101l(...)
end)(...)`;

        document.getElementById('outputScript').value = resultScript;
        status.innerText = "Obfuscation completed successfully.";

    } catch (err) {
        status.innerText = "Error processing script.";
    }
}

function copyOutput() {
    const output = document.getElementById('outputScript');
    const status = document.getElementById('statusMessage');

    if (!output.value) {
        status.innerText = "Nothing to copy.";
        return;
    }

    output.select();
    document.execCommand('copy');
    status.innerText = "Copied to clipboard.";
}

function clearAll() {
    document.getElementById('inputScript').value = '';
    document.getElementById('outputScript').value = '';
    document.getElementById('statusMessage').innerText = "Cleared.";
}
