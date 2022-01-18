export const safeBase64Encode = (plain: string) =>
    Buffer.from(plain).toString("base64").replace('+', '-').replace('/', '_').replace(/=+$/, '')

export const safeBase64Decode = (encoded: string) => {
    encoded = encoded.replace('-', '+').replace('_', '/')

    while (encoded.length % 4)
        encoded += '=';

    return Buffer.from(encoded, "base64").toString("utf-8")
}
