export const randomVecOfLength = (length) => {
  let direction = Math.random() * Math.PI * 2;
  let xComponent = (Math.cos(direction) * length);
  let yComponent = (Math.sin(direction) * length);
  return [xComponent,yComponent];
};

export const initialSetupRandomPos = (x,y) => {
  let outputX = 450;
  let outputY = 250;
  while (outputX < 550 && outputX > 350 ) {
    outputX = Math.random()*x;
  }
  while (outputY < 350 && outputY > 150 ) {
    outputY = Math.random()*y;
  }
  return [outputX, outputY];
};

export const distanceBetweenPoints = (pos1, pos2) => {
  let a = Math.pow((pos1[0] - pos2[0]), 2);
  let b = Math.pow((pos1[1] - pos2[1]), 2);
  return (Math.sqrt(a + b));
};

export const vectorBetweenCenters = (pos1,pos2) => {
  let x1,x2,y1,y2;
  x1 = pos1[0];
  y1 = pos1[1];
  x2 = pos2[0];
  y2 = pos2[1];
  return [x2-x1,y2-y1];
};

export const rotateVector = (vector,degrees) => {
  let radians = (degrees/180)*Math.pi;
  let xNew = vector[0]*Math.cos(radians) - vector[1]*Math.sin(radians);
  let yNew = vector[0]*Math.sin(radians) + vector[1]*Math.cos(radians);
  return [xNew,yNew];
};

export const normalizedVector = (vector) => {
  let x = vector[0];
  let y = vector[1];
  let magnitude = Math.sqrt(x*x + y*y);
  return [x/magnitude, y/magnitude];
};

export const vectorMagnitude = (vector) => {
  let x = vector[0];
  let y = vector[1];
  return Math.sqrt(x*x + y*y);
};

export const dotProduct = (vector1,vector2) => {
  return (vector1[0]*vector2[0] + vector1[1]*vector2[1]);
};

export const coordFromObj = (obj) => {
  return [obj.x,obj.y];
};

export const vectorScale = (vector,scale) => {
  let x = vector[0];
  let y = vector[1];
  return ([x*scale,y*scale]);
};

export const stepInDirectionDegs = (point,radians,stepSize = 1) => {
  let x = point[0];
  let y = point[1];
  x += Math.cos(radians)*stepSize;
  y += Math.sin(radians)*stepSize;
  return ([x,y]);
};

export const setVectorMagnitude = (vector,magnitude) => {
  return vectorScale(vector,magnitude/vectorMagnitude(vector));
};

export const averageRGBAVector = (rgbaArray) => {
  let output = [0,0,0,0];
  let count = 0;
  for (var i = 0; i < rgbaArray.length; i+=4) {
    output[0] += rgbaArray[i];
    output[1] += rgbaArray[i+1];
    output[2] += rgbaArray[i+2];
    output[3] += rgbaArray[i+3];
    count++;
  }
  return output.map((el)=>{
    return el/count;
  });
}

export const hasBlack = (rgbaArray) => {
  let output = false;
  for (var i = 0; i < rgbaArray.length; i+=4) {
    if (rgbaArray[i] === 0 && rgbaArray[i+1] ===0 && rgbaArray[i+2] === 0) {
      output = true;
      break;
    }
  }
  return output;
};

export const arraySimilarityScalar = (measurement,array2) => {
  let output = 0;
  for (let i = 0; i < measurement.length; i++) {
    let measuredValue = measurement[i];
    let guessedValue = array2[i];
    let difference = Math.abs(measuredValue - guessedValue);
    difference = difference / measuredValue;
    difference = 1-difference;
    output += difference;
  }
  return output;
};

window.arraySimilarityScalar = arraySimilarityScalar;
window.a = [1,2,3,4,5,6];
window.b = [1,2,3,4,5,6];
window.c = [2,2,4,5,5,6];
