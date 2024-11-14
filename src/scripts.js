(function(){
    "use strict";
    
    var cvs, ctx;
    var waveHeight = 60;
    var colours = ["0099FF"]; 

    function init() {
      cvs = document.getElementById("canvas");
      ctx = cvs.getContext("2d");
      resizeCanvas(cvs);
      
      var singleWave = new wave(colours[0], 1, 6); 
      update(singleWave);
    }
  
    function update(singleWave) {
      var fill = window.getComputedStyle(document.querySelector("header"), null).getPropertyValue("background-color");
      ctx.fillStyle = fill;
      ctx.globalCompositeOperation = "source-over";
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      ctx.globalCompositeOperation = "screen";
  
      for (var j = 0; j < singleWave.nodes.length; j++) {
        bounce(singleWave.nodes[j]);
      }
      drawWave(singleWave);
  
      ctx.fillStyle = fill;
      requestAnimationFrame(function() {
        update(singleWave);
      });
    }
  
    function wave(colour, lambda, nodes) {
      this.colour = colour;
      this.lambda = lambda;
      this.nodes = [];
      
      for (var i = 0; i <= nodes + 2; i++) {
        var temp = [(i - 1) * cvs.width / nodes, 0, Math.random() * 200, .3];
        this.nodes.push(temp);
      }
    }
  
    function bounce(nodeArr) {
      nodeArr[1] = waveHeight / 2 * Math.sin(nodeArr[2] / 20) + cvs.height / 2;
      nodeArr[2] = nodeArr[2] + nodeArr[3];
    }
  
    function drawWave(obj) {
      var diff = function(a, b) {
        return (b - a) / 2 + a;
      }
  
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.moveTo(0, cvs.height);
      ctx.lineTo(obj.nodes[0][0], obj.nodes[0][1]);
  
      for (var i = 0; i < obj.nodes.length; i++) {
        if (obj.nodes[i + 1]) {
          ctx.quadraticCurveTo(
            obj.nodes[i][0], obj.nodes[i][1],
            diff(obj.nodes[i][0], obj.nodes[i + 1][0]), diff(obj.nodes[i][1], obj.nodes[i + 1][1])
          );
        }
        else {
          ctx.lineTo(obj.nodes[i][0], obj.nodes[i][1]);
          ctx.lineTo(cvs.width, cvs.height);
        }
      }
      ctx.closePath();
      ctx.fill();
    }
  
    function resizeCanvas(canvas, width, height) {
      if (width && height) {
        canvas.width = width;
        canvas.height = height;
      }
      else {
        if (window.innerWidth > 1920) {
          canvas.width = window.innerWidth;
        }
        else {
          canvas.width = 1920;
        }
        canvas.height = waveHeight;
      }
    }
  
    document.addEventListener("DOMContentLoaded", init, false);
  })();
