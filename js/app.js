var width = 960,
    height = 1160;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var projection = d3.geo.albers()
  .center([0, 41.83])
  .rotate([87.65, 0])
  .parallels([40, 45])
  .scale(90000)
  .translate([width / 2, height / 2])

var path = d3.geo.path()
    .projection(projection);

d3.json("js/chi_comm_areas_topo.json", function(error, chi) {
  if (error) return console.error(error);

  svg.selectAll(".community_area")
    .data(topojson.feature(chi, chi.objects.chi_community_areas).features)
    .enter().append("path")
     .attr("class", function(d){ return "community_area " + d.id})
     .attr("d", path);

  svg.append("path")
    .datum(topojson.mesh(chi, chi.objects.chi_community_areas, function(a, b) { return a !== b }))
    .attr("d", path)
    .attr("class", "community_area_boundary");
});


