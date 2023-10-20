




let service_uuid = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
let tx_uuid = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';
let rx_uuid = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';

let ancs_uuid = '7905f431-b5ce-4e99-a40f-4b1e122d00d0';

let filters = [{ services: [service_uuid, ancs_uuid] }];

var watchRX, watchTX;


let options = {
    acceptAllDevices: true,
    optionalServices: [service_uuid],
    // filters : filters
};


const fromHexString = hexString =>
    new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

const toHexString = bytes =>
    bytes.reduce((str, byte) => str + byte.toString(16).padStart(5, ' 0x0'), '');

const toHexStr = bytes =>
    bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');


async function scanDevice() {
    try {

        const device = await navigator.bluetooth.requestDevice(options);

        connectDevice(device);

    } catch (error) {
        console.log(error);
    }
}

function onDisconnected(event) {
    console.log('Disconnected');
}



async function connectDevice(device) {

    try {

        console.log("Connecting");

        device.addEventListener('gattserverdisconnected', onDisconnected);
        const server = await device.gatt.connect();
        const services = await server.getPrimaryServices();
        const main = await server.getPrimaryService(service_uuid);
        watchTX = await main.getCharacteristic(tx_uuid);
        watchRX = await main.getCharacteristic(rx_uuid);

        // disconnectButton.addEventListener('click', async (evt) => {
        //     console.log('Disconnecting...');
        //     await device.gatt.disconnect();
        // });

        watchRX.addEventListener('characteristicvaluechanged', handleNotifications);
        await watchRX.startNotifications();

        console.log("Watch connected");


    }
    catch (error) {
        console.log(error);
    }

}

function handleNotifications(event) {
    let value = event.target.value;
    //const hex = toHexString(value);
    var text = "";
    for (let i = 0; i < value.byteLength; i++) {
        text += ' ' + value.getUint8(i).toString(16);
    }
    text += "\n";

    console.log(text);

    // if (value.getUint8(0) == 0xAB){
    //   switch (value.getUint8(4)){
    //     case 0x91:
    //       var bat = value.getUint8(7);
    //       var state = value.getUint8(6);
    //       batteryBar.style.width = bat + "%";
    //       batteryBar.innerText = bat + "%";
    //     break;
    //   }
    // }
    // switch (value.getUint8(0)){
    //   case 0xBA: //
    //     var time = value.getUint8(1) + "\t" + value.getUint8(2) + ":" + value.getUint8(3);
    //     var data1 =  (value.getUint8(4) * 100) + value.getUint8(5);
    //     var data2 = (value.getUint8(6) * 100) + value.getUint8(7);
    //     dataLogs.innerText += time + "\t" + data1 + "\t" +data2 + "\n";

    //   break;  
    // }

}
