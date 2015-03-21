(function() {
  "use strict";

  require("../bootstrap");

  describe("AudioBuffer.prototype.copyToChannel", function() {
    var context;
    if (!/\[native code\]/.test(global.AudioBuffer.prototype.copyToChannel)) {
      context = "shim";
    } else {
      context = "native";
    }
    describe(context, function() {
      function writeNoise(destination) {
        for (var i = 0; i < destination.length; i++) {
          destination[i] = Math.random() - 0.5;
        }
      }
      describe("(source: Float32Array, channelNumber: number, startInChannel: number): void", function() {
        it("works", function() {
          var source = [ new Float32Array(50), new Float32Array(50) ];

          writeNoise(source[0]);
          writeNoise(source[1]);

          var buffer = audioContext.createBuffer(2, 100, audioContext.sampleRate);

          buffer.copyToChannel(source[0], 0);
          buffer.copyToChannel(source[1], 1, 50);

          var channelData = [ buffer.getChannelData(0), buffer.getChannelData(1) ];

          for (var i = 0; i < 50; i++) {
            assert(source[0][i] === channelData[0][i +  0], "equal [0][" + i + "]");
            assert(source[1][i] === channelData[1][i + 50], "equal [1][" + i + "]");
          }
        });
      });
    });
  });

})();