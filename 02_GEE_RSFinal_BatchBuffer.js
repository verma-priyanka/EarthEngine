/************************************************************************************************
Remote Sensing Final Project: Lake Wampanoag, MA
Date: 12/11/2019
Function computes buffers and adds to it to map
Batch processed through buffers function
Also adds clipped landsat layer
************************************************************************************************/

var dataset = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR').filterDate('2002-04-01', '2002-05-31')

var point = geometry
var distances = [500,1000,1500,2000,2500,3000]
var dataset_med = dataset.median();

var image_buffer = point.buffer(3000);
var clipped = dataset_med.clip(image_buffer);
    

var visParams = {
  bands: ['B3', 'B2', 'B1'],
  min: 0,
  max: 3000,
  gamma: 1.4,
};

Map.addLayer(clipped, visParams);

//function to add each buffer distance to map
//Creates buffer around point and adds resulting layer to map
function buffers(buffer_distances) {
  var arrayLength = distances.length;
  for (var i = 0; i < arrayLength; i++) {
    //print distance
    console.log(buffer_distances[i])
    //create buffer
    var bd = point.buffer(buffer_distances[i]);
    //Add layer to map with the following parameters:
    //1- Layer to add to map
    //2- Visual Parameters
    //3- Name of layer of map
    //4- Layer to be shown: True or False
    //5- Opacity
    Map.addLayer(bd, {color: 'd62ec1'}, 'planar polygon', true ,0.2);
}
  }

buffers(distances)

