var mySong;
var analyzer;
var r = 50;

function preload() {
  mySong = loadSound("./assets/Alan.mp3");
  logo = loadImage("./assets/logo.png");

}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.mouseClicked(togglePlay);
  fft = new p5.FFT();
  mySong.amp(0.2);
  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);
}

function draw() {
  textSize(20);
  textAlign(CENTER);
  fill(255);

  var volume = 0;
  fft.analyze();
  volume = analyzer.getLevel();
  // console.log(volume);
  volume = floor(map(volume, 0, 0.2, 0, 360));
  var colore = 'hsl(' + volume + ', 100%, 32%)';
  //console.log(colore);
  background(colore);
  strokeWeight(2);
  line(0, height / 2, width, height / 2);

  fill(255);
  text('click to toggle the song', width / 2, 40);
  var trib = fft.getEnergy('bass');
  var trim = fft.getEnergy('mid');
  var trit = fft.getEnergy('treble');
  line(width / 4, height / 2 - trib - r / 2,width / 2, height / 2 - trim - r / 2);
  line(width / 2, height / 2 - trim - r / 2,width * 3 / 4, height / 2 - trit - r / 2);


  text('bass', width / 4, height / 2 + 25);
  ellipse(width / 4, height / 2 - trib - r / 2, r);

  text('mid', width / 2, height / 2 + 25);
  ellipse(width / 2, height / 2 - trim - r / 2, r);

  text('treble', width * 3 / 4, height / 2 + 25);
  ellipse(width * 3 / 4, height / 2 - trit - r / 2, r);



  var blur = floor(map(volume, 0, 0.2, 1, 5));
  push();
  imageMode(CENTER);
  translate(width / 2, height * 3 / 4);
  rotate((frameCount + volume) / 240);
  image(logo, 0, 0, logo.width / 3, logo.height / 3);
  pop();
}

function togglePlay() {
  if (mySong.isPlaying()) {
    mySong.pause();
  } else {
    mySong.loop();
  }
}
