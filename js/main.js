const fileInput = document.getElementById('fileInput');

fileInput.addEventListener('change', async (event) =>
{
    const file = event.target.files[0];
    
    if (!file) { console.log('No file selected'); return; }
    
    const buffer = await file.arrayBuffer();

    const reader = new BinaryReader(buffer, true);

    const magicStringLength = reader.readUint8(0);

    const magicString = reader.readString(magicStringLength);

    console.log('Magic String Length: ', magicStringLength);

    console.log('Magic String: ', magicString);
});
