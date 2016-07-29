<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="index.css">
<script type="text/javascript" src="index.js"></script>
<title>Insert title here</title>
</head>
<body onload="restartGame();">

	<div id="toolbar">
		<span class="black">玩家1：黑子</span> <span class="white">玩家2：白子</span>
		<button id="restart" onclick="restartGame()">重新开始</button>
	</div>
	<div id="container">
		<canvas id="canvas" width="450" height="450" onclick="addPiece(event)"></canvas>
		<span></span>
	</div>
</body>
</html>