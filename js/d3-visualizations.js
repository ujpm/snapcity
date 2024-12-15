// Initialize all visualizations
document.addEventListener('DOMContentLoaded', function() {
    initializeCityVisualization();
    initializeCharts();
    initializeHeatmap();
    initializeCategoriesChart();
    initializeProgressChart();
});

// 3D City Visualization (simplified version)
function initializeCityVisualization() {
    const width = document.getElementById('cityVisualization').clientWidth;
    const height = document.getElementById('cityVisualization').clientHeight;

    const svg = d3.select('#cityVisualization')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    // Create a grid of buildings
    const buildingData = Array.from({ length: 50 }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        height: 20 + Math.random() * 80
    }));

    // Add buildings with animation
    svg.selectAll('rect')
        .data(buildingData)
        .enter()
        .append('rect')
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('width', 20)
        .attr('height', 0)
        .attr('fill', 'white')
        .transition()
        .duration(1000)
        .attr('height', d => d.height)
        .attr('y', d => d.y - d.height);
}

// Initialize small charts in the dashboard
function initializeCharts() {
    // Issues Chart
    const issuesData = [5, 8, 12, 15, 10, 7];
    createLineChart('#issuesChart', issuesData, 'steelblue');

    // Engagement Chart
    const engagementData = [65, 70, 75, 80, 85, 87];
    createLineChart('#engagementChart', engagementData, '#10B981');

    // Resolved Chart
    const resolvedData = [2, 4, 8, 10, 11, 12];
    createLineChart('#resolvedChart', resolvedData, '#F59E0B');

    // Score Chart
    const scoreData = [4.2, 4.4, 4.5, 4.6, 4.7, 4.8];
    createLineChart('#scoreChart', scoreData, '#6366F1');
}

// Helper function to create line charts
function createLineChart(selector, data, color) {
    const width = document.querySelector(selector).clientWidth;
    const height = 50;
    const margin = { top: 5, right: 5, bottom: 5, left: 5 };

    const svg = d3.select(selector)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    const x = d3.scaleLinear()
        .domain([0, data.length - 1])
        .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
        .domain([d3.min(data) * 0.9, d3.max(data) * 1.1])
        .range([height - margin.bottom, margin.top]);

    const line = d3.line()
        .x((d, i) => x(i))
        .y(d => y(d))
        .curve(d3.curveMonotoneX);

    // Add the line path with animation
    const path = svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', 2)
        .attr('d', line);

    const totalLength = path.node().getTotalLength();

    path.attr('stroke-dasharray', totalLength + ' ' + totalLength)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(1000)
        .attr('stroke-dashoffset', 0);

    // Add dots
    svg.selectAll('.dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx', (d, i) => x(i))
        .attr('cy', d => y(d))
        .attr('r', 0)
        .attr('fill', color)
        .transition()
        .delay((d, i) => i * 150)
        .duration(500)
        .attr('r', 3);
}

// Initialize heatmap
function initializeHeatmap() {
    const width = document.querySelector('#heatmapChart').clientWidth;
    const height = document.querySelector('#heatmapChart').clientHeight;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const svg = d3.select('#heatmapChart')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    // Generate sample data
    const data = Array.from({ length: 100 }, () => ({
        x: Math.floor(Math.random() * 10),
        y: Math.floor(Math.random() * 10),
        value: Math.random()
    }));

    // Create color scale
    const color = d3.scaleSequential(d3.interpolateYlOrRd)
        .domain([0, 1]);

    // Create scales
    const x = d3.scaleBand()
        .range([margin.left, width - margin.right])
        .domain(d3.range(10));

    const y = d3.scaleBand()
        .range([height - margin.bottom, margin.top])
        .domain(d3.range(10));

    // Add rectangles
    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', d => x(d.x))
        .attr('y', d => y(d.y))
        .attr('width', x.bandwidth())
        .attr('height', y.bandwidth())
        .attr('fill', 'white')
        .transition()
        .duration(1000)
        .attr('fill', d => color(d.value));
}

// Initialize categories chart (donut chart)
function initializeCategoriesChart() {
    const width = document.querySelector('#categoriesChart').clientWidth;
    const height = document.querySelector('#categoriesChart').clientHeight;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select('#categoriesChart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width/2},${height/2})`);

    const data = [
        { category: 'Infrastructure', value: 30 },
        { category: 'Environment', value: 25 },
        { category: 'Public Services', value: 20 },
        { category: 'Safety', value: 15 },
        { category: 'Other', value: 10 }
    ];

    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.category))
        .range(d3.schemeSet2);

    const pie = d3.pie()
        .value(d => d.value)
        .sort(null);

    const arc = d3.arc()
        .innerRadius(radius * 0.6)
        .outerRadius(radius * 0.8);

    const outerArc = d3.arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9);

    // Add the arcs
    const paths = svg.selectAll('path')
        .data(pie(data))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data.category))
        .attr('stroke', 'white')
        .style('stroke-width', '2px')
        .style('opacity', 0)
        .transition()
        .duration(1000)
        .style('opacity', 1);

    // Add labels
    const labels = svg.selectAll('text')
        .data(pie(data))
        .enter()
        .append('text')
        .attr('transform', d => {
            const pos = outerArc.centroid(d);
            return `translate(${pos})`;
        })
        .style('text-anchor', 'middle')
        .style('font-size', '12px')
        .style('opacity', 0)
        .text(d => `${d.data.category} (${d.data.value}%)`)
        .transition()
        .duration(1000)
        .style('opacity', 1);
}

// Initialize progress chart
function initializeProgressChart() {
    const width = document.querySelector('#progressChart').clientWidth;
    const height = document.querySelector('#progressChart').clientHeight;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const svg = d3.select('#progressChart')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    const data = [
        { category: 'Daily', completed: 8, total: 10 },
        { category: 'Weekly', completed: 15, total: 20 },
        { category: 'Monthly', completed: 25, total: 40 }
    ];

    const x = d3.scaleBand()
        .range([margin.left, width - margin.right])
        .padding(0.1)
        .domain(data.map(d => d.category));

    const y = d3.scaleLinear()
        .range([height - margin.bottom, margin.top])
        .domain([0, d3.max(data, d => d.total)]);

    // Add total bars
    svg.selectAll('.total-bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'total-bar')
        .attr('x', d => x(d.category))
        .attr('y', d => y(d.total))
        .attr('width', x.bandwidth())
        .attr('height', d => height - margin.bottom - y(d.total))
        .attr('fill', '#E5E7EB');

    // Add completed bars with animation
    svg.selectAll('.completed-bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'completed-bar')
        .attr('x', d => x(d.category))
        .attr('y', height - margin.bottom)
        .attr('width', x.bandwidth())
        .attr('fill', '#3B82F6')
        .transition()
        .duration(1000)
        .attr('y', d => y(d.completed))
        .attr('height', d => height - margin.bottom - y(d.completed));

    // Add x-axis
    svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x));
}
