import React, { useEffect, useRef } from "react";
import "./chart2.scss";
import * as d3 from "d3";
import d3Tip from "d3-tip";

const Chart2 = ({ data, title }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (data && chartRef.current) {
      const svg = d3.select(chartRef.current);

      const width = 300;
      const height = 300;
      const radius = Math.min(width, height) / 2;

      const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

      const pie = d3
        .pie()
        .sort(null)

        .value((d) => d.value);

      const arc = d3
        .arc()
        .innerRadius(0)
        .outerRadius(radius * 1.2);
      svg.attr("width", width).attr("height", height);

      const arcs = pie(data);

      const tip = d3Tip()
        .attr("class", "d3-tip")
        .offset([-10, 0])
        .html((d) => {
          return `<strong>${d.data.label}:</strong> ${d.data.value}`;
        });

      svg.call(tip);

      const arcGroups = svg
        .selectAll(".arc")
        .data(arcs)
        .enter()
        .append("g")
        .attr("class", "arc");

        arcGroups
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => colorScale(i))
        .on("mouseover", (event, d) => {
          d3.select(event.currentTarget).attr("opacity", 0.7);
          tip.show.call(event.currentTarget, d); // Use call to set the correct 'this' context
        })
        .on("mouseout", (event, d) => {
          d3.select(event.currentTarget).attr("opacity", 1);
          tip.hide.call(event.currentTarget, d);
        });
    }
  }, [data]);

      // arcGroups
      //   .append("text")
      //   .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      //   .attr("dy", ".35em")
      //   .style("text-anchor", "middle")
      //   .text((d) => `${d.data.label}: ${d.data.value}`);
 

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <div className="chart-container2">
        <svg ref={chartRef} />
      </div>
    </div>
  );
};

export default Chart2;
