class BinaryReader {
  constructor(buffer, littleEndian = true, encoding = "utf-8") {
    this.view = new DataView(buffer);
    this.position = 0;
    this.littleEndian = littleEndian;
    this.decoder = new TextDecoder(encoding);
  }

  seek(position) {
    this.position = position;
  }

  skip(count) {
    this.position += count;
  }

  remaining() {
    return this.view.byteLength - this.position;
  }

  eof() {
    return this.position >= this.view.byteLength;
  }

  readUint8() {
    const val = this.view.getUint8(this.position);
    this.position += 1;
    return val;
  }

  readUint16() {
    const val = this.view.getUint16(this.position, this.littleEndian);
    this.position += 2;
    return val;
  }

  readUint32() {
    const val = this.view.getUint32(this.position, this.littleEndian);
    this.position += 4;
    return val;
  }

  readInt8() {
    const value = this.view.getInt8(this.position);
    this.position += 1;
    return value;
  }

  readInt16() {
    const value = this.view.getInt16(this.position, this.littleEndian);
    this.position += 2;
    return value;
  }

  readInt32() {
    const value = this.view.getInt32(this.position, this.littleEndian);
    this.position += 4;
    return value;
  }

  readFloat32() {
    const value = this.view.getFloat32(this.position, this.littleEndian);
    this.position += 4;
    return value;
  }

  readFloat64() {
    const value = this.view.getFloat64(this.position, this.littleEndian);
    this.position += 8;
    return value;
  }

  readBytes(length) {
    const bytes = new Uint8Array(this.view.buffer, this.position, length);
    this.position += length;
    return bytes;
  }

  readString(length) {
    const bytes = this.readBytes(length);
    return this.decoder.decode(bytes);
  }

  readStringNullTerminated() {
    const start = this.position;
    while (!this.eof() && this.view.getUint8(this.position) !== 0) {
      this.position++;
    }
    const bytes = new Uint8Array(
      this.view.buffer,
      start,
      this.position - start,
    );
    this.position++; // skip null terminator
    return this.decoder.decode(bytes);
  }

  peekUint8() {
    const val = this.view.getUint8(this.position);
    return val;
  }

  peekUint16() {
    const val = this.view.getUint16(this.position, this.littleEndian);
    return val;
  }

  peekUint32() {
    const val = this.view.getUint32(this.position, this.littleEndian);
    return val;
  }

  peekInt8() {
    const value = this.view.getInt8(this.position);
    return value;
  }

  peekInt16() {
    const value = this.view.getInt16(this.position, this.littleEndian);
    return value;
  }

  peekInt32() {
    const value = this.view.getInt32(this.position, this.littleEndian);
    return value;
  }

  peekFloat32() {
    const value = this.view.getFloat32(this.position, this.littleEndian);
    return value;
  }

  peekFloat64() {
    const value = this.view.getFloat64(this.position, this.littleEndian);
    return value;
  }

  peekBytes(length) {
    const bytes = new Uint8Array(this.view.buffer, this.position, length);
    return bytes;
  }

  peekString(length) {
    const bytes = this.peekBytes(length);
    return this.decoder.decode(bytes);
  }

  peekStringNullTerminated() {
    const start = this.position;
    while (!this.eof() && this.view.getUint8(this.position) !== 0) {}
    const bytes = new Uint8Array(
      this.view.buffer,
      start,
      this.position - start,
    );
    return this.decoder.decode(bytes);
  }

  peekStringNullTerminated() {
    let pos = this.position;
    while (pos < this.view.byteLength && this.view.getUint8(pos) !== 0) {
      pos++;
    }
    const bytes = new Uint8Array(
      this.view.buffer,
      this.position,
      pos - this.position,
    );
    return this.decoder.decode(bytes);
  }
}
