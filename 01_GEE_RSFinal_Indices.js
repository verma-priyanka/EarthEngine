/************************************************************************************************
Remote Sensing Final Project: Lake Wampanoag, MA
Date: 12/02/2019
Each function takes a list of distances and computes average of indices at various distances
Indices include: NDVI, EVI, NDWI, NDBI
--Need to figure out how to return a list instead of each printed output--
************************************************************************************************/

var point = geometry
var dataset = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR').filterDate('2002-04-01', '2002-05-31')
var dataset_med = dataset.median();

var distances = [500,1000,1500,2000,2500,3000]


//Function to calculate average NDVI at various distances
function avg_NDVI(buffer_distances) {
var arrayLength = buffer_distances.length;
for (var i = 0; i < arrayLength; i++) {
    console.log(buffer_distances[i])
    
    var bd = point.buffer(buffer_distances[i]);
    var clipped = dataset_med.clip(bd);
    var ndvi = clipped.normalizedDifference(['B4', 'B3']);
    var mean_buffer = ndvi.reduceRegion({
        reducer: ee.Reducer.mean(),
        geometry: bd,
        scale: 30,
        maxPixels: 1e9
      });
    print('NDVI '+ buffer_distances[i]+ ' Meters', mean_buffer)
}   
  }
  

//Function to calculate average NDWI at various distances
function avg_NDWI(buffer_distances) {
var arrayLength = buffer_distances.length;
for (var i = 0; i < arrayLength; i++) {
    console.log(buffer_distances[i])
    
    var bd = point.buffer(buffer_distances[i]);
    var clipped = dataset_med.clip(bd);
    var ndvi = clipped.normalizedDifference(['B5', 'B4']);
    var mean_buffer = ndvi.reduceRegion({
        reducer: ee.Reducer.mean(),
        geometry: bd,
        scale: 30,
        maxPixels: 1e9
      });
    print('NDWI '+ buffer_distances[i]+ ' Meters', mean_buffer)
}   
  }
  

//Function to calculate average EVI at various distances
function avg_EVI(buffer_distances) {
var arrayLength = buffer_distances.length;
for (var i = 0; i < arrayLength; i++) {
    console.log(buffer_distances[i])
    
    var bd = point.buffer(buffer_distances[i]);
    var clipped = dataset_med.clip(bd);
    var evi = clipped.expression(
    '2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))', {
      'NIR': clipped.select('B4'),
      'RED': clipped.select('B3'),
      'BLUE': clipped.select('B1')
});
    var mean_buffer = evi.reduceRegion({
        reducer: ee.Reducer.mean(),
        geometry: bd,
        scale: 30,
        maxPixels: 1e9
        });
    print('EVI '+ buffer_distances[i]+ ' Meters', mean_buffer)
}   
  }



//Function to compute area of study area
function studyarea_size(buffer_distances) {
var arrayLength = buffer_distances.length;
for (var i = 0; i < arrayLength; i++) {
      var bd = point.buffer(buffer_distances[i]);
    print('Study Area Size (Sq Meters): '+ buffer_distances[i], bd.area());

}   
  }


//Function Calls
avg_NDVI(distances)
avg_NDWI(distances)
avg_EVI(distances)
studyarea_size(distances)

