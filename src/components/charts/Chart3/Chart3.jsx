import React, { useEffect, useRef } from "react";
import "./chart3.scss";
import * as d3 from "d3";


const Chart3 = ({ data, title }) => {
  const chartRef = useRef();
  


useEffect(() => {
  if (data && chartRef.current) {
    const svg = d3.select(chartRef.current);

    const width = 500;
    const height = 500;
    const radius = Math.min(width, height) / 2;

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie().sort(null).value((d) => d.value);

    const arc = d3.arc().innerRadius(radius * 0.55).outerRadius(radius * 0.9);

    svg.attr("width", width).attr("height", height);

    const arcs = pie(data);

    const graph = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const path = graph.selectAll("path").data(arcs).enter().append("path");

    path
      .attr("d", arc)
      .attr("fill", (d, i) => colorScale(i))
      .on("mouseover", function (event, d) {
        d3.select(this).attr("opacity", 0.7);
      })
      .on("mouseout", function () {
        d3.select(this).attr("opacity", 1);
      })
      .append("title")
      .text((d) => `${d.data.label}: ${d.data.value}`);

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    path.on("mousemove", (event, d) => {
      tooltip
        .html(`<strong>${d.data.label}:</strong> ${d.data.value}`)
        .style("left", `${event.pageX}px`)
        .style("top", `${event.pageY - 28}px`)
        .style("opacity", 1);
    });

    path.on("mouseout", () => {
      tooltip.style("opacity", 0);
    });
  }
}, [data]);


  return (
    <div className="chart">
      <div className="title">{title}</div>
      <div className="chart-container3">
        <svg ref={chartRef} />
      </div>
    </div>
  );
};

export default Chart3;
