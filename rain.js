// Only compatible with ES 6.0+
var canvasWindow = document.getElementById("rain");
var canvasContext = canvasWindow.getContext("2d");
canvasContext.globalAlpha = 0;

// Color class
class Color {
   constructor(r, g, b, a)
   {
     this.r = r;
     this.g = g;
     this.b = b;
     this.a = a;
   }

   Lerp(c, t)
   {
      return new Color(
        this.r + t * (c.r - this.r),
        this.g + t * (c.g - this.g),
        this.b + t * (c.b - this.b),
        this.z + t * (c.z - this.z)
      );
   }

   ReturnFillStyle(z)
   {
     canvasContext.fillStyle =
     "rgba(" +
     rainColor.r + "," +
     rainColor.g + "," +
     rainColor.b + "," +
     (z * 255) + ")";
   }

   SetFillStyle(z)
   {
     canvasContext.fillStyle =
     "rgba(" +
     rainColor.r + "," +
     rainColor.g + "," +
     rainColor.b + "," +
     (0.1 + z) + ")";
   }

   ToHex()
   {
      return "#" +
      ("0" + parseInt(this.r,10).toString(16)).slice(-2) +
      ("0" + parseInt(this.g,10).toString(16)).slice(-2) +
      ("0" + parseInt(this.b,10).toString(16)).slice(-2) +
      ("0" + parseInt(this.a,10).toString(16)).slice(-2);
   }
}

// Raindrop class
class Raindrop {
    constructor(x, y, z)
    {
      this.x = x;
      this.y = y;
      this.z = z;
      this.length = 100;
      this.yvel = 10;
    }

    Update()
    {
      this.y += this.yvel * this.z;
      this.yvel *= 1 + this.z / 100;

      if(this.y > window.innerHeight)
      {
        this.y = -10;
        this.yvel = 10;
        this.x = Random(0, window.innerWidth);
      }
    }

    Draw()
    {
      var grd = canvasContext.createLinearGradient
      (this.x, this.y, this.x + 2 * this.z, this.y + 12 * this.yvel * this.z);

      grd.addColorStop(0, 'rgba(200,240,255,0)');
      grd.addColorStop(1, 'rgba(' +
      Round(200 * this.z) + ',' +
      Round(240 * this.z) +  ','  +
      Round(255 * this.z) +  ',' +
      0.3 + ')');

      canvasContext.fillStyle = grd;

      canvasContext.fillRect(this.x, this.y,2 * this.z,12 * this.yvel * this.z);
    }
}

var canUpdate = true;

var angle = 1;

canvasContext.canvas.width  = window.innerWidth;
canvasContext.canvas.height = window.innerHeight;

var drops = [];
var dropAmount = 1250;

// Initialize all
for(var i = 0; i < dropAmount; i++)
{
  drops.push(
    new Raindrop(
      Random(0, canvasWindow.width),
      Random(0, canvasWindow.height),
      i / dropAmount
    )
  );
}

setInterval(Tick, 1);

function Tick()
{
  if(canUpdate)
  {
    canvasContext.canvas.width  = window.innerWidth;
    canvasContext.canvas.height = window.innerHeight;

    canvasContext.clearRect(0, 0, canvasWindow.width, canvasWindow.height);
    for(var i = 0; i < dropAmount; i++)
    {
      drops[i].Update();
      drops[i].Draw();
    }
  }
}

function Round(a) {
  return Math.round(a);
}
function Random(min, max) {
  return Math.random() * (max - min) + min;
}
