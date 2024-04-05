/* IMPLEMENTING :
  <g id="firstnode">
  <polygon points="1.5,-30 27.68,-15 27.68,15 1.5,30 -24.18,15 -24.18,-15" fill="black" stroke="black" stroke-width="2"/>
  <polygon points="0,-30 26.18,-15 26.18,15 0,30 -26.18,15 -26.18,-15" fill="#b54a7e" stroke="black" stroke-width="2"/>
    <text style="stroke-width:0.8;stroke:rgb(0,0,0)" x="-10" y="10" text-anchor="middle" fill="black" font-size="6">When did you feel lonely?</text>
    <!-- Background bar -->
    <rect style="stroke-width:3;stroke:rgb(0,0,0)" x="-25" rx="7" y="35" width="50" height="15" fill="#f0f0f0"/>

    <!-- Progress bar -->
    <rect style="stroke-width:0.8;stroke:rgb(0,0,0)" x="-24" rx="7" y="36" width="25" height="12.8" fill="#4ab581"/>
  </g>
*/
function createLine(data){
  var newLine = document.createElementNS("http://www.w3.org/2000/svg", 'path');
  newLine.setAttribute("d","M 10 10 L 20 20"); //Set path's data
  newLine.style.stroke = "#000"; //Set stroke colour
  newLine.style.strokeWidth = "5px"; //Set stroke width
  return newLine
}
function createHexagon(data){
  /*
  creates a shadowed hexagon which are two hexagons overlapped
  <polygon points="1.5,-30 27.68,-15 27.68,15 1.5,30 -24.18,15 -24.18,-15" fill="black" stroke="black" stroke-width="2"/>
  <polygon points="0,-30 26.18,-15 26.18,15 0,30 -26.18,15 -26.18,-15" fill="#b54a7e" stroke="black" stroke-width="2"/>
  */
  var newBackgroundHexagon = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
  newBackgroundHexagon.setAttribute("points",data.backgroundHexagonPoints); //Set path's data
  newBackgroundHexagon.style.fill = data.backgroundHexagonFill; //Set stroke colour
  newBackgroundHexagon.style.stroke = data.backgroundHexagonStroke; //Set stroke colour
  newBackgroundHexagon.style.strokeWidth = data.backgroundHexagonStrokeWidth; //Set stroke width
  var newFrontHexagon = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
  newFrontHexagon.setAttribute("points",data.frontHexagonPoints); //Set path's data
  newFrontHexagon.style.fill = data.frontHexagonFill; //Set stroke colour
  newFrontHexagon.style.stroke = data.frontHexagonStroke; //Set stroke colour
  newFrontHexagon.style.strokeWidth = data.frontHexagonStrokeWidth; //Set stroke width
  return [newBackgroundHexagon, newFrontHexagon];
}
function createSkillbar(data){
  /*
    <!-- Background bar -->
    <rect style="stroke-width:3;stroke:rgb(0,0,0)" x="-25" rx="7" y="35" width="50" height="15" fill="#f0f0f0"/>

    <!-- Progress bar -->
    <rect style="stroke-width:0.8;stroke:rgb(0,0,0)" x="-24" rx="7" y="36" width="25" height="12.8" fill="#4ab581"/>
  */
  var newBackgroundBar = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
  newBackgroundBar.setAttribute("width",data.backgroundBarWidth); //Set path's data
  newBackgroundBar.setAttribute("height",data.backgroundBarHeight); //Set path's data
  newBackgroundBar.setAttribute("x",data.backgroundBarX); //Set path's data
  newBackgroundBar.setAttribute("y",data.backgroundBarY); //Set path's data
  newBackgroundBar.setAttribute("rx",data.backgroundBarRX); //Set path's data
  newBackgroundBar.style.fill = data.backgroundBarFill; 
  newBackgroundBar.style.stroke = data.backgroundBarStroke; 
  newBackgroundBar.style.strokeWidth = data.backgroundBarStrokeWidth;
  var newSkillBar = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
  newSkillBar.setAttribute("width",data.skillBarWidth); //Set path's data
  newSkillBar.setAttribute("height",data.skillBarHeight); //Set path's data
  newSkillBar.setAttribute("x",data.skillBarX); //Set path's data
  newSkillBar.setAttribute("y",data.skillBarY); //Set path's data
  newSkillBar.setAttribute("rx",data.skillBarRX); //Set path's data
  newSkillBar.style.fill = data.skillBarFill; 
  newSkillBar.style.stroke = data.skillBarStroke; 
  newSkillBar.style.strokeWidth = data.skillBarStrokeWidth;
  return [newBackgroundBar, newSkillBar];
}

function createNodeTitle(data){
/* <text style="stroke-width:0.8;stroke:rgb(0,0,0)" x="-10" y="10" text-anchor="middle" fill="black" font-size="6">When did you feel lonely?</text>
*/
const { title, x, y } = data
var newNodeTitle = document.createElementNS("http://www.w3.org/2000/svg", 'text');
newNodeTitle.textContent= title; //Set path's data
newNodeTitle.setAttribute("x", x); //Set path's data
newNodeTitle.setAttribute("y", y); //Set path's data
newNodeTitle.style.fill= "black"; 
newNodeTitle.style.stroke = "#000"; //Set stroke colour
newNodeTitle.style.strokeWidth = "0.8"; //Set stroke width
newNodeTitle.style.fontSize = "6";
newNodeTitle.style.textAnchor = "middle";

return newNodeTitle;
}
function calculate_translationStr(row_idx, col_idx){
	return `translate(${180*col_idx}, ${150*row_idx})`
}


function createNewNode(data){
  /* 
  <g id="firstnode">
	<hexagon>
	<nodeTitle>
	<skillBar>
  </g>
  */
  var newG = document.createElementNS("http://www.w3.org/2000/svg", 'g');
  newG.setAttribute('transform',
	  calculate_translationStr(data.row_idx, data.col_idx)
  );
  var newHexagons = createHexagon({
		backgroundHexagonPoints: data.backgroundHexagon.points,
		backgroundHexagonFill: data.backgroundHexagon.fill,
		backgroundHexagonStroke: data.backgroundHexagon.stroke,
		backgroundHexagonStrokeWidth: data.backgroundHexagon.strokeWidth,

		frontHexagonPoints: data.frontHexagon.points,
		frontHexagonFill: data.frontHexagon.fill,
		frontHexagonStroke: data.frontHexagon.stroke,
		frontHexagonStrokeWidth: data.frontHexagon.strokeWidth,
	    });
  var newNodeTitle = createNodeTitle({
	  	    x: data.title.x,
	  	    y: data.title.y,
		    title: data.title.title
	    });

  var newSkillbars = createSkillbar({
		backgroundBarWidth: data.backgroundBar.width,
		backgroundBarHeight: data.backgroundBar.height,
		backgroundBarX: data.backgroundBar.X,
		backgroundBarY: data.backgroundBar.Y,
		backgroundBarRX: data.backgroundBar.RX,
		backgroundBarFill: data.backgroundBar.fill,
		backgroundBarStroke: data.backgroundBar.stroke,
		backgroundBarStrokeWidth: data.backgroundBar.strokeWidth,
		skillBarWidth: data.skillBar.width,
		skillBarHeight: data.skillBar.height,
		skillBarX: data.skillBar.X,
		skillBarY: data.skillBar.Y,
		skillBarRX: data.skillBar.RX,
		skillBarFill: data.skillBar.fill,
		skillBarStroke: data.skillBar.stroke,
		skillBarStrokeWidth: data.skillBar.strokeWidth,
	    });
  for (const newHexagon of newHexagons) {
      newG.append(newHexagon);
  }
  newG.append(newNodeTitle);
  for (const newBar of newSkillbars) {
      newG.append(newBar);
  }
  return newG
}

function appendMenuToClickedPosition(event){
  //Create the image
  var i = document.createElement('div');
  //Set the source of the image
  i.classList.add("menu")
  i.style.width  = '200px';
  i.style.height = '200px';

  //Set CSS styles so it appears where you clicked (Top left corner)
  i.style.position = 'absolute';
  i.style.left     = event.clientX + 'px';
  i.style.top      = event.clientY + 'px';

  var ul = document.createElement('ul'); 
  for(const action of ['Chat about this', 'pin topic']){
	  var li = document.createElement('li');
	  var li_a = document.createElement('a');
	  li_a.text = action;
	  li.appendChild(li_a);
	  ul.appendChild(li)
  }
  i.appendChild(ul)
  
  setMenuEventListeners(i, event.target)
  //Add it to the body of the document
  document.body.appendChild(i);
}

function setMenuEventListeners(el, menu_parent){
	el.addEventListener('mouseout', function(event) {
		var e = event.toElement || event.relatedTarget;
		if (['UL','LI','A','DIV'].includes(e.tagName)) {
			return;
		}
		this.remove()
		console.log(window.state)
		window.state.node_context_menu_on = false;
		for(const node of document.querySelectorAll('g')){
			initialColor(node);
		}
	});
}

function find_g_element(event_el){
	/*
	 * given a child element that triggered
	 * some event, find the g parent
	 */
	if(event_el.tagName !== 'g'){
		var g_el = event_el.parentElement
	}
	else {
		var g_el = event_el
	}
	return g_el 
}

function setNodeEventListeners(node_el){
  Array.from(document.querySelectorAll("g")).map( 
	  (el) =>
	   el.addEventListener("click", () => alert("clicked"))
  );

  Array.from(document.querySelectorAll("g")).map(
	(el) =>
	  el.addEventListener("mouseover", function (e) {
	const target_node = find_g_element(e.target);
	var selected_g_el = target_node
	var selected_hexagon = selected_g_el.children[1]
	selected_hexagon.style.fill="#b82db4"
	var selected_skill_bar = selected_g_el.children[4] 
	selected_skill_bar.style.fill="#47DB24"
       })
  );

  Array.from(document.querySelectorAll("g")).map(
	  (el) =>
	  el.addEventListener("mouseout", function (e) {
		if(window.state.node_context_menu_on){
			return;
		}
		const target_node = find_g_element(e.target);
		selected_g_el = target_node
		initialColor(selected_g_el)
	  })
  )

  Array.from(document.querySelectorAll("g")).map(
		(el) =>
		el.addEventListener("contextmenu", function (e) {
        e.preventDefault()
	const target_node = find_g_element(e.target);
	window.selected_g_el = target_node
	appendMenuToClickedPosition(e);
	window.state.node_context_menu_on = true;
	})
  )
}

function initialColor(g_el){
	var selected_hexagon = g_el.children[1]
	selected_hexagon.style.fill="#b54a7e"
	var selected_skill_bar = g_el.children[4] 
	selected_skill_bar.style.fill="#4ab581"
}

function hexagonPoints_to_svgString(hexagonPoints){
	var hexagon_str='';
	for(const point of hexagonPoints){
		var point_str = `${point.x},${point.y} ` 
		hexagon_str+=point_str
	}
	return hexagon_str  
}


function createEdgeElementBetweenNodes(node1, node2){
	var frontHexagon1 = node1.children[1];
	var frontHexagon2 = node2.children[1];
	var boundingRect1 = frontHexagon1.getBoundingClientRect() 
	var boundingRect2 = frontHexagon1.getBoundingClientRect() 
	var startingX = frontHexagon1.points[1].x
	var startingY = (frontHexagon1.points[2].y + frontHexagon1.points[1].y)/2
	var endingX = frontHexagon2.points[4].x
	var endingY = (frontHexagon2.points[4].y - frontHexagon1.points[5].y)/2
	var edgeLength = endingX - startingX
	console.log(startingX);
        var newPath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
	newPath.setAttribute('d',`M ${startingX  + 10 } ${startingY}
		                  l ${edgeLength - 17} 0`);
	newPath.style.stroke='red';
	newPath.style.strokeWidth=10;
	newPath.style.strokeLinecap="round";
	newPath.border='10px black';
	return newPath
}
function edges_from_sortedNodesData(sortedNodesData){
	var sequenceEdges = [];
	for(var i=0; i<sortedNodesData.length-1;i++){
		var newEdge = {
			src: sortedNodesData[i],
			tgt: sortedNodesData[i+1]
		};
		sequenceEdges.push(newEdge);
	}
	return sequenceEdges;
}

function main(idx){
	window.state = {
		node_context_menu_on : false
	}
	var nodes_data = [
		{row_idx: 0, col_idx: 0},
		{row_idx: 0, col_idx: 1},
		{row_idx: 0, col_idx: 2},
		{row_idx: 1, col_idx: 1},
		{row_idx: 2, col_idx: 1},
		{row_idx: 2, col_idx: 2},
		{row_idx: 3, col_idx: 2},
	]
	var sorted_nodes_data = nodes_data.sort((n1, n2) => 
				100*(n1.row_idx - n2.row_idx) 
		                - (n1.col_idx - n2.col_idx)
	);
	var sorted_nodes_elements = [];
	var svgEl = document.getElementsByTagName('svg')[idx];
	for(const node_data of sorted_nodes_data){
		var {row_idx, col_idx} = node_data;
		var frontHexagonPoints = [
			{ x: 0,
			  y: -30},
			{ x: 26.18,
			  y: -15},
			{ x: 26.18,
			  y: 15},
			{ x: 0,
			  y: 30},
			{ x: -26.18,
			  y: 15},
			{ x: -26.18,
			  y: -15},
		];
		var backgroundHexagonPoints = frontHexagonPoints.map(point => {
		    return { x: point.x + 1.5, y: point.y };
		});
		var titlePoints = {
		    x: frontHexagonPoints[5].x + 25,
	   	    y: frontHexagonPoints[5].y + 25 
		};
		var backgroundBarPoint = { 
			 		 // the 'rightest' point in frontHexagon node
			                 x: frontHexagonPoints[5].x,
			                 // a little lower than the lowest frontHExagon point
			                 y: frontHexagonPoints[3].y + 5
		}
		var skillBarPoint = { 
			                 x: backgroundBarPoint.x + 1,
			                 y: 36.1
		}
		var newNode = createNewNode({
				row_idx: row_idx,
				col_idx: col_idx,
				backgroundHexagon: {
					points: hexagonPoints_to_svgString(
						backgroundHexagonPoints
					),
					fill: "black",
					stroke: "black",
					strokeWidth: 3,
				},
				frontHexagon: {
					points: hexagonPoints_to_svgString(
						frontHexagonPoints
					),
					fill: "#b54a7e",
					stroke: "black",
					strokeWidth: 2,
				},
				title: {
				 x: titlePoints.x,
				 y: titlePoints.y,
				 title: 'when was the last time you felt lonely ?'
				},
				backgroundBar: {
					width: "50",
					height: "15",
					X: backgroundBarPoint.x,
					Y: backgroundBarPoint.y,
					RX: "7",
					fill: "grey",
					stroke: "black",
					strokeWidth: "0.8",
				},
				skillBar: {
					width: "35",
					height: "12.8",
					X: skillBarPoint.x,
					Y: skillBarPoint.y,
					RX: "7",
					fill: "#4ab581",
					stroke: "black",
					strokeWidth: "0.4",
				},
			})
		svgEl.append(newNode);
		sorted_nodes_elements.push(newNode);
	}
	setNodeEventListeners(newNode)
	var sequence_edges_data = edges_from_sortedNodesData(sorted_nodes_data);
	for(const edge_data of sequence_edges_data){
		var srcData = edge_data.src
		var tgtData = edge_data.tgt
    /*
		var newEdgeElement = createEdgeElementBetweenNodes(
			srcData,
			tgtData
		);
		svgEl.append(newEdgeElement)*/
	}
}
