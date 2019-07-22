var socket = io.connect("http://35.187.228.1:3000");
var output = document.getElementById("output");
var backendUrl = "http://35.187.228.1:3000/api/v0";
// const web3 = new Web3(new Web3.providers.HttpProvider('http://35.187.228.1:8545'));
const web3 = new Web3("ws://35.187.228.1:8546");
var _privateKey = "";
var _publicKey = "";
var _name = "";
var _symKey =
  "d9e8811b1293eb56d0ad9beb076d876d35b48975968e86f3c5d07438bb7a8255";

web3.shh.newKeyPair().then(async result => {
  const privateKey = result;
  const publicKey = await web3.shh.getPublicKey(result);
  // const symKey = await web3.shh.newSymKey();
  const name = publicKey.substr(publicKey.length - 5);

  _privateKey = privateKey;
  _publicKey = publicKey;
  _name = name;
  // _symKey = symKey;

  console.log(`Public Key : ${publicKey}`);
  console.log(`Private Key : ${privateKey}`);
  // console.log(`Sym Key : ${_symKey}`);

  $("#publicKey").val(publicKey);
  $("#sampleName").val(name);

  web3.shh
    .subscribe("messages", {
      privateKeyId: privateKey,
      topics: [web3.utils.toHex("test")]
    })
    .on("data", data => {
      data = JSON.parse(web3.utils.toUtf8(data.payload));
      if (data.from === _name) data.from = "You";
      output.innerHTML +=
        "<p><strong>" + data.from + ":</strong>" + data.message + "</p>";
      console.log(message);
    });

  web3.shh
    .subscribe("messages", {
      symKeyID: _symKey,
      topics: [web3.utils.toHex("test")]
    })
    .on("data", data => {
      data = JSON.parse(web3.utils.toUtf8(data.payload));
      console.log(data);
      if (data.from === _name) data.from = "You";
      output.innerHTML +=
        "<p><strong>" + data.from + ":</strong>" + data.message + "</p>";
    });
});

// $.ajax({
//   url: backendUrl + "/createKey",
//   cache: false,
//   type: "GET",
//   success: function(result) {
//     var publicKey = result.public;
//     var name = result.name;
//     var privateKey = result.private;
//     $("#publicKey").val(publicKey);
//     $("#sampleName").val(name);
//   }
// });

$("#send").click(function() {
  var message = $("#message").val();
  var destinationAddress = $("#destinationAddress").val();

  if (!message) return alert("Message is required");

  let payload = {
    message,
    from: _name
  };

  if (destinationAddress) {
    sendPrivateMessage(payload, destinationAddress);
  } else {
    sendToPublic(payload);
  }
  //   console.log(
  //     socket.emit("chat", {
  //       message: message,
  //       address: $("publicKey").val(),
  //       name: $("#sampleName").val()
  //     })
  //   );
});

// socket.on("chat", data => {
//   output.innerHTML +=
//     "<p><strong>" + data.name + ":</strong>" + data.message + "</p>";
// });

async function sendPrivateMessage(message, destinationAddress) {
  await web3.shh.post({
    pubKey: destinationAddress,
    sig: _privateKey,
    ttl: 20,
    topic: web3.utils.toHex("test"),
    powTarget: 0.5,
    powTime: 3,
    payload: web3.utils.fromAscii(JSON.stringify(message))
  });
}

async function sendToPublic(message) {
  await web3.shh.post({
    symKeyID: _symKey,
    sig: _privateKey,
    ttl: 10,
    topic: web3.utils.toHex("test"),
    powTarget: 0.5,
    powTime: 3,
    payload: web3.utils.fromAscii(JSON.stringify(message))
  });
}
