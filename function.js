// predict Numbers
async function predict(cri , stat) {
  let State = stat;
  let Crime = cri;
  try {
    let response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ State, Crime }),
    });

    let data = await response.json();
    console.log("Numbers:", data.Numbers);
    console.log("reigion:", data.reigion);
    return data
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
// visual
// render #my_dataviz
async function visual(stat , cri , plt) {
  let State = stat;
  let Crime = cri;
  let plot = plt;

  try {
    let response = await fetch("http://127.0.0.1:5000/visual", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ State, Crime }),
    });

    let jsonData = await response.json();
    jsonData = jsonData.visual;
    console.log("data:", jsonData);

    let mini = jsonData.reduce((min, current) => {
      return min.value < current.value ? min : current;
    });

    let maxi = jsonData.reduce((max, current) => {
      return max.value > current.value ? max : current;
    });

    // Set the dimensions and margins of the graph
    var margin = { top: 20, right: 30, bottom: 50, left: 60 },
      width = 800 - margin.left - margin.right,
      height = 450 - margin.top - margin.bottom;

    // Select the div container
    var svg = d3
      .select("#my_dataviz") // Select the div container where you want to append the SVG
      .append("svg") // Append an SVG element
      .attr("width", width + margin.left + margin.right) // Set the width of the SVG
      .attr("height", height + margin.top + margin.bottom) // Set the height of the SVG
      .append("g") // Append a group element within the SVG to apply margins
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // Apply margins to the group element

    if (plot === "lineplot") {
      var x = d3
        .scaleLinear()
        .domain(
          d3.extent(jsonData, function (d) {
            return d.X;
          })
        )
        .range([0, width]);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.format("d")))
        .selectAll("text")
        .style("font-size", "15px");

      d = maxi.value - mini.value;
      let y = d3
        .scaleLinear()
        .domain([mini.value - d * 0.1, maxi.value + d * 0.1])
        .range([height, 0]);
      svg
        .append("g")
        .call(d3.axisLeft(y))
        .selectAll("text")
        .style("font-size", "15px");

      svg
        .append("path")
        .datum(jsonData)
        .attr("fill", "none")
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 1.5)
        .attr(
          "d",
          d3
            .line()
            .x(function (d) {
              return x(d.X);
            })
            .y(function (d) {
              return y(d.value);
            })
        );

      // Add the points
      svg
        .append("g")
        .selectAll("dot")
        .data(jsonData)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          return x(d.X);
        })
        .attr("cy", function (d) {
          return y(d.value);
        })
        .attr("r", 5)
        .attr("fill", "#69b3a2");
    }

    if (plot === "scatterplot") {
      var x = d3
        .scaleLinear()
        .domain(
          d3.extent(jsonData, function (d) {
            return d.X;
          })
        )
        .range([0, width]);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.format("d")))
        .selectAll("text")
        .style("font-size", "15px");

      var y = d3
        .scaleLinear()
        .domain(
          d3.extent(jsonData, function (d) {
            return d.value;
          })
        )
        .nice()
        .range([height, 0]);
      svg
        .append("g")
        .call(d3.axisLeft(y))
        .selectAll("text")
        .style("font-size", "15px");

      // Add the circles (scatter plot points)
      svg
        .selectAll("circle")
        .data(jsonData)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          return x(d.X);
        }) // Set the x-coordinate based on X value
        .attr("cy", function (d) {
          return y(d.value);
        }) // Set the y-coordinate based on value
        .attr("r", 5) // Set the radius of the circle
        .attr("fill", "#69b3a2"); // Set the fill color
    }

    if (plot === "barplot") {
      var x = d3
        .scaleBand()
        .domain(
          jsonData.map(function (d) {
            return d.X;
          })
        )
        .range([0, width])
        .padding(0.1);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.format("d")))
        .selectAll("text")
        .style("font-size", "15px");

      var y = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(jsonData, function (d) {
            return d.value;
          }),
        ])
        .nice()
        .range([height, 0]);
      svg
        .append("g")
        .call(d3.axisLeft(y))
        .selectAll("text")
        .style("font-size", "15px");

      // Add the bars
      svg
        .selectAll("rect")
        .data(jsonData)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.X);
        })
        .attr("y", function (d) {
          return y(d.value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.value);
        })
        .attr("fill", "#69b3a2");
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
// map
//render #map
async function map1(cri) {
  let no = 0;
  let Crime = cri;
  try {
    let response = await fetch("http://127.0.0.1:5000/map", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ Crime }),
    });

    let jsonData = await response.json();
    jsonData = jsonData.map_data;
    console.log("data:", jsonData);

    var mapContainer = document.getElementById("map");
    if (mapContainer) {
      // Remove existing map instance if it exists
      mapContainer._leaflet_id = null;
    }

     
    console.log("Initializing map...");
    map = L.map("map");
    console.log("tinker the map");
    map.setView([20.5937, 78.9629], 4.8);
    console.log("*********************************");

    function getColors(numColors) {
      var scale = chroma.scale(["green", "red"]).mode("lab").colors(numColors);
      return scale;
    }
    var colors = getColors(36);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    $.getJSON("states_india.geojson", function (data) {
      L.geoJSON(data, {
        style: function (feature) {
          let index = 0;
          if (feature.properties.st_nm in jsonData) {
            // console.log("present", feature.properties.st_nm);
            index = jsonData[feature.properties.st_nm][2];
          } else {
            console.log("!!!!!!!!!!!!!!present", feature.properties.st_nm);
          }

          return {
            fillColor: colors[index], // Random color for each feature
            weight: 1.5,
            opacity: 2,
            color: "black",
            dashArray: "3",
            fillOpacity: 1.5,
          };
        },

        onEachFeature: function (feature, layer) {
          var centroid = turf.centroid(feature);
          str = feature.properties.st_nm;
          str += " ";

          if (feature.properties.st_nm in jsonData) {
            str += "crime no: ";
            str += Math.trunc(jsonData[feature.properties.st_nm][1]).toString();
            L.marker([
              centroid.geometry.coordinates[1],
              centroid.geometry.coordinates[0],
            ])
              .bindPopup(str)
              .addTo(map);
          }
        },
      }).addTo(map);
    });
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
//comment
async function comment( name , emai , comm) {

  let user = name
  let email = emai
  let comment = comm

  try {
    let response = await fetch("http://127.0.0.1:5000/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ user, email, comment }),
    });

    let jsonData = await response.json();

    if(jsonData.ok){
      alert("thanks for the response your response is noted")

    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
