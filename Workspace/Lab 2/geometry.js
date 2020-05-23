//I pledge my honor that I have abided by the Stevens Honor System
//      Brandon Patton
const volumeOfRectangularPrism = function volumeOfRectangularPrism(length, width, height){
    if (length == null || width == null || height === null){
        throw 'Parameters cannot be null';
    } 
    if (typeof(length) != 'number' || typeof(width) != 'number' || typeof(height) != 'number'){
        throw 'Error: Parameter must be a number';
    } 
    if (!(length > 0) || !(width > 0) || !(height > 0)){
        throw 'Error: Length must be a non-negative number';
    } 
    return length*width*height;
}

const surfaceAreaOfRectangularPrism = function surfaceAreaOfRectangularPrism(length, width, height){
    if (length == null || width == null || height === null){
        throw 'Parameters cannot be null';
    } 
    if (typeof(length) != 'number' || typeof(width) != 'number' || typeof(height) != 'number'){
        throw 'Error: Parameter must be a number';
    } 
    if (!(length > 0) || !(width > 0) || !(height > 0)){
        throw 'Error: Length must be a non-negative number';
    }     
    return 2*(width*length + height*length + height*width); 
}

const volumeOfSphere = function volumeOfSphere(radius){
    if (radius == null){
        throw 'Error: Radius not provided';
    }
    if (typeof(radius) != 'number'){
        throw 'Error: Radius must be a number';
    }
    if (!(radius > 0)){
        throw 'Error: Radius must be a non-negative number';
    }
    const pi = Math.PI;
    const coeff = 4/3;
    return coeff*pi*(Math.pow(radius, 3));
}

const surfaceAreaOfSphere = function surfaceAreaOfSphere(radius){
    if (radius == null){
        throw 'Error: Radius not provided';
    }
    if (typeof(radius) != 'number'){
        throw 'Error: Radius must be a number';
    }
    if (!(radius > 0)){
        throw 'Error: Radius must be a non-negative number';
    }
    const pi = Math.PI;
    return 4*pi*(Math.pow(radius, 2));
}

module.exports = {volumeOfRectangularPrism, surfaceAreaOfRectangularPrism, volumeOfSphere, surfaceAreaOfSphere};