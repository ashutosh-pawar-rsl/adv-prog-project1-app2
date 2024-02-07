require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/widgets/Legend"
], function(Map, MapView, FeatureLayer, Legend) {
  
  const map = new Map({
    basemap: "gray-vector" 
  });

  const view = new MapView({
    container: "viewDiv", 
    map: map,
    center: [-90.1994, 38.6270], 
    zoom: 11 
  });

  // Define the parks layer
  const parksLayer = new FeatureLayer({
    url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/Project1_STL_Parks_Classified/FeatureServer",
    outFields: ["*"], // Retrieve all fields for popups
    popupTemplate: {
      title: "{TEXT_}",
      content: [{
        type: "fields",
        fieldInfos: [
          {
            fieldName: "NEW_CLASS",
            label: "Park Class",
            visible: true
          },
          {
            fieldName: "ACRES",
            label: "Area in Acres",
            visible: true
          }
        ]
      }]
    }
  });
  
  view.when(() => {
    const legend = new Legend({
      view: view,
      layerInfos: [
        {
          layer: parksLayer,
          title: "STL Park Classifications" 
        }
        // Add the roadsLayer to the legend
      ]
    });

    view.ui.add(legend, "bottom-right");
  });

  // Define the roads layer
  const roadsLayer = new FeatureLayer({
    url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/Project1_STL_Parks_Pathway/FeatureServer/0",
    outFields: ["STREETNAME"], // only the STREETNAME field for popups
    popupTemplate: {
      title: "Road Information", 
      content: "{STREETNAME}"
    }
  });
  
// Define the STL Boundary layer
const boundaryLayer = new FeatureLayer({
  url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/Project1_STL_Boundary/FeatureServer",
  renderer: { 
    type: "simple", 
    symbol: { 
      type: "simple-line",
      color: "darkblue",
      width: "2px"
    }
  },
  outFields: ["*"],
  popupTemplate: {
    title: "Boundary Information", 
    content: "This boundary defines the limits of Saint Louis." 
  }
});
  
map.add(boundaryLayer);
  const sluOutlineLayer = new FeatureLayer({
    url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/SLU_Campus_Seating_Hammocks_WFL1/FeatureServer/4",
    outFields: ["*"],
    popupTemplate: {
      title: "SLU Campus Outline",
      content: "This is the boundary of the Saint Louis University campus."
    }
  });

  // Defining the SLU Outdoor Seating layer
  const sluSeatingLayer = new FeatureLayer({
    url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/SLU_Campus_Seating_Hammocks_WFL1/FeatureServer/0",
    outFields: ["*"],
    popupTemplate: {
      title: "SLU Outdoor Seating",
      content: "Seating Area for Students! (Check Legend for Type)"
    }
  });

  // Defining the SLU Hammocks layer
  const sluHammocksLayer = new FeatureLayer({
    url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/SLU_Campus_Seating_Hammocks_WFL1/FeatureServer/2",
    outFields: ["*"],
    popupTemplate: {
      title: "SLU Hammocks",
      content: "Come and relax in our comfortable hammocks!"
    }
  });

// Adding all layers to the map
map.addMany([parksLayer, roadsLayer, sluOutlineLayer, sluSeatingLayer, sluHammocksLayer]);

// Configure and add the legend to the map once
const legend = new Legend({
  view: view,
  layerInfos: [
    { layer: sluSeatingLayer, title: "SLU Outdoor Seating" },
    { layer: sluHammocksLayer, title: "SLU Hammocks" }
  ]
});
view.ui.add(legend, "bottom-right");

// Dynamic map description

view.when(() => {
  const mapDescription = document.createElement("div");
  mapDescription.id = "mapDescription"; // ID for CSS
  mapDescription.innerHTML = `
    <h2>STL Parks & SLU Comfort Spaces</h2>
    <p>Dive into the heart of Saint Louis with 'STL Parks & SLU Comfort Spaces,' an interactive map designed to guide you through the scenic beauty of STL city parks and the cozy, welcoming seating areas across Saint Louis University. Explore, unwind, and study in the unique settings that these two realms of Saint Louis have to offer.</p>
  `;

  view.ui.add(mapDescription, "top-left");
});

});
