# Superlatives

Vote for your favorite character! 

*(Please don't cheat, this is for fun.)*


<body>

<h1>Superlatives</h1>


<h2>Combat</h2>
<div class="pollly-embed" data-id="P8XdqA7Z"></div> <!-- OHS -->
<div class="pollly-embed" data-id="2YXKmoBG"></div> <!-- Nelsor -->
<div class="pollly-embed" data-id="LW543dg7"></div> <!-- Avros -->
<div class="pollly-embed" data-id="G4bk6V30"></div> <!-- Pardelian -->
<div class="pollly-embed" data-id="GxrW4eNl"></div> <!-- Spears -->
<div class="pollly-embed" data-id="P7RdwnZj"></div> <!-- Staves -->
<div class="pollly-embed" data-id="G3y03wy8"></div> <!-- Archery -->
<div class="pollly-embed" data-id="LezrXZ0e"></div> <!-- Knives -->
<div class="pollly-embed" data-id="2p5oMm63"></div> <!-- CKF -->
<div class="pollly-embed" data-id="Lb0xXQxe"></div> <!-- Clubs -->
<div class="pollly-embed" data-id="LZ8Nl3w4"></div> <!-- 1HA -->
<div class="pollly-embed" data-id="LKN3z7g1"></div> <!-- 2HA -->
<div class="pollly-embed" data-id="2r6MymYg"></div> <!-- Tridents -->
<div class="pollly-embed" data-id="Ly8q7lbo"></div> <!-- Whips -->
<div class="pollly-embed" data-id="29xR5Vmk"></div> <!-- Cestus -->
<div class="pollly-embed" data-id="PE950zea"></div> <!-- Brawling -->
<div class="pollly-embed" data-id="G3pvKbxB"></div> <!-- Pankration -->
<div class="pollly-embed" data-id="LeyDQnk3"></div> <!-- CMs -->
<div class="pollly-embed" data-id="Lzp45p3D"></div> <!-- Shields -->


<h2>Non-Coms</h2>
<div class="pollly-embed" data-id="2jkNQMaP"></div> <!-- Hunting -->
<div class="pollly-embed" data-id="LymzjzdL"></div> <!-- Outdoors -->
<div class="pollly-embed" data-id="2qzMndlo"></div> <!-- Locksmithing -->
<div class="pollly-embed" data-id="GlzYA9gB"></div> <!-- Healing -->
<div class="pollly-embed" data-id="LD5z7Ja0"></div> <!-- Tailoring -->


<h2>Social</h2>
<div class="pollly-embed" data-id="Lz90KZRm"></div> <!-- Mysterious -->
<div class="pollly-embed" data-id="2J7kBkVe"></div> <!-- Flirtatious -->
<div class="pollly-embed" data-id="GgWd10j6"></div> <!-- Admired -->
<div class="pollly-embed" data-id="LabBxvRo"></div> <!-- Intimidating -->
<div class="pollly-embed" data-id="2JWpbKz3"></div> <!-- Funny -->
<div class="pollly-embed" data-id="2jJEOon3"></div> <!-- Unconscious -->
<div class="pollly-embed" data-id="2rm9n4eB"></div> <!-- Dramatic -->
<div class="pollly-embed" data-id="2k5rKXBl"></div> <!-- RPd -->
<div class="pollly-embed" data-id="LDD80Wo7"></div> <!-- Fashionable -->
<div class="pollly-embed" data-id="P0K40jJv"></div> <!-- Best new Combat -->
<div class="pollly-embed" data-id="LbX9DRzW"></div> <!-- Best new Non Combat -->
<div class="pollly-embed" data-id="2jyZajw7"></div> <!-- Legionary -->
<div class="pollly-embed" data-id="Lz99ywea"></div> <!-- Constable -->
<div class="pollly-embed" data-id="G5d6pAnA"></div> <!-- Gladiator -->
<div class="pollly-embed" data-id="2NNAWkJ8"></div> <!-- Hottest Woman -->
<div class="pollly-embed" data-id="La1DQgjm"></div> <!-- Hottest Man -->
<div class="pollly-embed" data-id="GoxvX8zY"></div> <!-- Returned Char -->


<script src="https://poll.ly/scripts/embed.js"></script>

<!-- copy embeds above and replace data-id -->

<script type="text/javascript">
	'use strict';

	var embeds = document.getElementsByClassName('pollly-embed');

	if(embeds){

		for(var i = 0; i < embeds.length; i++){

			var id = embeds[i].getAttribute('data-id');
			embeds[i].innerHTML = '<iframe id="pollly-iframe-'+id+'" scrolling="no" style="overflow:hidden;border:0;max-width:730px;width:100%" src="https://poll.ly/#/' + id + '/iframe"></iframe>';

		}

		window.addEventListener('message', function(e){
			console.log(e);
			var eventName = e.data[0];
			var data = e.data[1];
			if(eventName.startsWith('embedHeight.')) {
				var myId = eventName.substring(eventName.indexOf('.') + 1);
				var height = parseInt(data) - 75;
				document.getElementById('pollly-iframe-'+myId).style.height = height+'px';
			}
		});
	}
</script>
</body>
