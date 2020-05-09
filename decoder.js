var toWav = require('audiobuffer-to-wav')
var fs = require('fs');
var AudioContext = require('web-audio-api').AudioContext
  , context = new AudioContext

var source1
var source2
var source1_array = []
var source2_array = []

//reading args
if(process.argv.length < 5){
  console.log("Not enough parameters. Should be node decoder.js {source1.json} {source2.json} {length} {output}")
  process.exit()
}

console.log("Creating the context and the audio buffer...")
var myArrayBuffer = context.createBuffer(2, process.argv[4], 48000);


console.log("Loading the sources...")



fs.readFile(process.argv[2], 'utf-8', function (err, data) {
  if (err) {
    console.log("Error when loading source 1")
    throw err;
  }
  source1 = JSON.parse(data);
  console.log("Source 1 loaded")
  fs.readFile(process.argv[3], function (err, data) {
    if (err) {
      console.log("Error when loading source 2")
      throw err;
    }
    source2 = JSON.parse(data);
    console.log("Source 2 loaded")

    console.log("Conversion to Float32Array in a buffer...")
    for(var i in source1)
      source1_array.push(source1[i])

    for(var i in source2)
      source2_array.push(source2[i])

    myArrayBuffer._data[0] = Float32Array.from(source1_array)
    myArrayBuffer._data[1] = Float32Array.from(source2_array)

    console.log("Conversion to Wav...")
    var wav = toWav(myArrayBuffer)

    console.log("Writing the file...")
    fs.writeFileSync(process.argv[5], Buffer.from(new Uint8Array(wav)));

  });
});
