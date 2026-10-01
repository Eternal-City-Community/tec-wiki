---
title: "Rank Bonus Calculator Classic"
category: "Reference"
---

# Rank Bonus Calculator Classic

<style>
body {
        color: #FFFFFF;
}
input {
        color: #000000;
}
.info_table th, .info_table td {
         text-align: left;
         padding-right: 30px;
}
h4 {
         text-decoration: underline;
         margin-bottom:6px;
         margin-top: 30px;
         font-size: 1.25em;
}
</style>
<script type="text/javascript">
	var difficultyModifiers = new Array();
	difficultyModifiers['easy'] = 0.75;
	difficultyModifiers['average'] = 0.50;
	difficultyModifiers['difficult'] = 0.25;
	difficultyModifiers['impossible'] = 0.1;
	var stanceModifiers = new Array();
	stanceModifiers['berserk'] = 1.0;
	stanceModifiers['aggressive'] = 0.75;
	stanceModifiers['normal'] = 0.5;
	stanceModifiers['wary'] =  0.25;
	stanceModifiers['defensive'] = 0;
	
	function calcStanceModifier(skillType,stance) {
		if (skillType == "attack") {
			return stanceModifiers[stance];
		} else if (skillType == "defense") {
			return Math.abs(1-stanceModifiers[stance]);
		} else {
			alert("ERROR: Not given valid skillType:"+skillType);
			return 0;
		}
	}
	
	var rankTierModifiers = new Array();
	rankTierModifiers[0] = 0;
	rankTierModifiers[1] = 3;
	rankTierModifiers[2] = 2;
	rankTierModifiers[3] = 1;
	rankTierModifiers[4] = 0.5;
	rankTierModifiers[5] = 0.25;
	rankTierModifiers[6] = 0.125;
	rankTierModifiers[7] = 0.0675;
	rankTierModifiers[8] = 0.025;
	rankTierModifiers[9] = 0.01;
	var rankTierModifierEndLevels = new Array();
	rankTierModifierEndLevels[0] = 0;
	rankTierModifierEndLevels[1] = 0;
	rankTierModifierEndLevels[2] = 10;
	rankTierModifierEndLevels[3] = 30;
	rankTierModifierEndLevels[4] = 50;
	rankTierModifierEndLevels[5] = 100;
	rankTierModifierEndLevels[6] = 150;
	rankTierModifierEndLevels[7] = 200;
	rankTierModifierEndLevels[8] = 500;
	rankTierModifierEndLevels[9] = 1000;
	
	
	function calcRankTierBonus(rank) {
		var rankTierBonus = 0;
		for (var i = rankTierModifierEndLevels.length; i > 0; i--) {
			if (rank > rankTierModifierEndLevels[i]) {
				var ranksInThisTier = rank - rankTierModifierEndLevels[i];
				rankTierBonus += ranksInThisTier * rankTierModifiers[i];
				rank = rank - ranksInThisTier // don't want to double-count ranks in other tiers
			}
		}
		return rankTierBonus;
		
	}
	function calcBasicsRankBonus(basicsRank,difficulty,stance) {
		var skillType = "attack" //don't really care about defensive attacks..should be obvious wary > aggressive, berserk > defensive
		return (Math.floor(calcRankTierBonus(basicsRank)) * difficultyModifiers[difficulty]) * calcStanceModifier(skillType,stance);
	}
	function calcSubSkillRankBonus(basicsRank,subSkillRank,difficulty,stance) {
		var skillType = "attack" //don't really care about defensive attacks..should be obvious wary > aggressive, berserk > defensive
		return (Math.floor(calcRankTierBonus(basicsRank)) * difficultyModifiers[difficulty] + calcRankTierBonus(subSkillRank)) * calcStanceModifier(skillType,stance);
	}
	
	
function refreshRankBonuses() {
	var basicsRanks = document.getElementsByName('basicsRank');
	var subSkillRanks = document.getElementsByName('subSkillRank');
	var rankBonusShifts = document.getElementsByName('rankBonusShift');
	var BBs = document.getElementsByName('bb');
	var BAs = document.getElementsByName('ba');
	var BNs = document.getElementsByName('bn');
	var BWs = document.getElementsByName('bw');
	var BDs = document.getElementsByName('bd');
	var EBs = document.getElementsByName('eb');
	var EAs = document.getElementsByName('ea');
	var ENs = document.getElementsByName('en');
	var EWs = document.getElementsByName('ew');
	var EDs = document.getElementsByName('ed');
	var ABs = document.getElementsByName('ab');
	var AAs = document.getElementsByName('aa');
	var ANs = document.getElementsByName('an');
	var AWs = document.getElementsByName('aw');
	var ADs = document.getElementsByName('ad');
	var DBs = document.getElementsByName('db');
	var DAs = document.getElementsByName('da');
	var DNs = document.getElementsByName('dn');
	var DWs = document.getElementsByName('dw');
	var DDs = document.getElementsByName('dd');
	var IBs = document.getElementsByName('ib');
	var IAs = document.getElementsByName('ia');
	var INs = document.getElementsByName('in');
	var IWs = document.getElementsByName('iw');
	var IDs = document.getElementsByName('id');
		//alert("Br0:"+basicsRanks[0].value+"Br1:"+basicsRanks[1].value+"length"+basicsRanks.length);
		
	for (var i = basicsRanks.length-1; i >= 0; i--) {
		BBs[i].value = calcSubSkillRankBonus(0,basicsRanks[i].value,"easy","berserk")
		BAs[i].value = calcSubSkillRankBonus(0,basicsRanks[i].value,"easy","aggressive")
		BNs[i].value = calcSubSkillRankBonus(0,basicsRanks[i].value,"easy","normal")
		BWs[i].value = calcSubSkillRankBonus(0,basicsRanks[i].value,"easy","wary")
		BDs[i].value = calcSubSkillRankBonus(0,basicsRanks[i].value,"easy","defensive")
		EBs[i].value = calcSubSkillRankBonus(basicsRanks[i].value,subSkillRanks[i].value,"easy","berserk") + parseFloat(rankBonusShifts[i].value)
		EAs[i].value = calcSubSkillRankBonus(basicsRanks[i].value,subSkillRanks[i].value,"easy","aggressive") + parseFloat(rankBonusShifts[i].value)
		ENs[i].value = calcSubSkillRankBonus(basicsRanks[i].value,subSkillRanks[i].value,"easy","normal") + parseFloat(rankBonusShifts[i].value)
		EWs[i].value = calcSubSkillRankBonus(basicsRanks[i].value,subSkillRanks[i].value,"easy","wary") + parseFloat(rankBonusShifts[i].value)
		EDs[i].value = calcSubSkillRankBonus(basicsRanks[i].value,subSkillRanks[i].value,"easy","defensive") + parseFloat(rankBonusShifts[i].value)
		ABs[i].value = calcSubSkillRankBonus(basicsRanks[i].value,subSkillRanks[i].value,"average","berserk") + parseFloat(rankBonusShifts[i].value)
		AAs[i].value = calcSubSkillRankBonus(basicsRanks[i].value,subSkillRanks[i].value,"average","aggressive") + parseFloat(rankBonusShifts[i].value)
		ANs[i].value = calcSubSkillRankBonus(basicsRanks[i].value,subSkillRanks[i].value,"average","normal") + parseFloat(rankBonusShifts[i].value)
		AWs[i].value = calcSubSkillRankBonus(basicsRanks[i].value,subSkillRanks[i].value,"average","wary") + parseFloat(rankBonusShifts[i].value)
		ADs[i].value = calcSubSkillRankBonus(basicsRanks[i].value,subSkillRanks[i].value,"average","defensive") + parseFloat(rankBonusShifts[i].value)
		DBs[i].value = calcSubSkillRankBonus(basicsRanks[i].value,subSkillRanks[i].value,"difficult","berserk") + parseFloat(rankBonusShifts[i].value)
		DAs[i].value = calcSubSkillRankBonus(basicsRanks[i].value,subSkillRanks[i].value,"difficult","aggressive") + parseFloat(rankBonusShifts[i].value)
		DNs[i].value = calcSubSkillRankBonus(basicsRanks[i].value,subSkillRanks[i].value,"difficult","normal") + parseFloat(rankBonusShifts[i].value)
		DWs[i].value = calcSubSkillRankBonus(basicsRanks[i].value,subSkillRanks[i].value,"difficult","wary") + parseFloat(rankBonusShifts[i].value)
		DDs[i].value = calcSubSkillRankBonus(basicsRanks[i].value,subSkillRanks[i].value,"difficult","defensive") + parseFloat(rankBonusShifts[i].value)
		IBs[i].value = calcSubSkillRankBonus(basicsRanks[i].value,subSkillRanks[i].value,"impossible","berserk") + parseFloat(rankBonusShifts[i].value)
		IAs[i].value = calcSubSkillRankBonus(basicsRanks[i].value,subSkillRanks[i].value,"impossible","aggressive") + parseFloat(rankBonusShifts[i].value)
		INs[i].value = calcSubSkillRankBonus(basicsRanks[i].value,subSkillRanks[i].value,"impossible","normal") + parseFloat(rankBonusShifts[i].value)
		IWs[i].value = calcSubSkillRankBonus(basicsRanks[i].value,subSkillRanks[i].value,"impossible","wary") + parseFloat(rankBonusShifts[i].value)
		IDs[i].value = calcSubSkillRankBonus(basicsRanks[i].value,subSkillRanks[i].value,"impossible","defensive") + parseFloat(rankBonusShifts[i].value)
	}
}

</script>

<div id="main_wrapper_outer">
	<div id="main_wrapper_inner">
		<div class="main_center_wrapper">

			<div class="left" id="main">
				<div id="main_content">

					<div class="post">

						<div class="post_title"><h1></h1></div>
						
						<div class="post_body">
							<p>Input the Basics rank and Subskill rank to calculate below.  You may modify the end result with the RB +- Mod field.</p>
							<p></p>
							<table class="outer_data_table">
								<tr>
								<td>	
									<button onclick="refreshRankBonuses()">Refresh Rank Bonus Calculations</button>
									<table class="data_table">
<tr><th>Basics Rank</th><th><input type="text" name="basicsRank" size="4" value="10" onchange="refreshRankBonuses()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshRankBonuses();}" /></th><th>Subskill Rank&nbsp;</th><th><input type="text" name="subSkillRank" size="4" value="1" onchange="refreshRankBonuses()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshRankBonuses();}" /></th><th>RB +- Mod&nbsp;</th><th><input type="text" name="rankBonusShift" size="4" value="0" onchange="refreshRankBonuses()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshRankBonuses();}" /></th></tr>
<tr><td></td><td>Basic</td><td>Easy</td><td>Avg.</td><td>Diff.</td><td>Impos.</td></tr>
<tr><td>Bers.</td><td><input type="text" name="bb" size="4" /></td><td><input type="text" name="eb" size="4" /></td><td><input type="text" name="ab" size="4" /></td><td><input type="text" name="db" size="4" /></td><td><input type="text" name="ib" size="4" /></td></tr>
<tr><td>Aggr.</td><td><input type="text" name="ba" size="4" /></td><td><input type="text" name="ea" size="4" /></td><td><input type="text" name="aa" size="4" /></td><td><input type="text" name="da" size="4" /></td><td><input type="text" name="ia" size="4" /></td></tr>
<tr><td>Norm.</td><td><input type="text" name="bn" size="4" /></td><td><input type="text" name="en" size="4" /></td><td><input type="text" name="an" size="4" /></td><td><input type="text" name="dn" size="4" /></td><td><input type="text" name="in" size="4" /></td></tr>
<tr><td>Wary</td><td><input type="text" name="bw" size="4" /></td><td><input type="text" name="ew" size="4" /></td><td><input type="text" name="aw" size="4" /></td><td><input type="text" name="dw" size="4" /></td><td><input type="text" name="iw" size="4" /></td></tr>
<tr><td>Def.</td><td><input type="text" name="bd" size="4" /></td><td><input type="text" name="ed" size="4" /></td><td><input type="text" name="ad" size="4" /></td><td><input type="text" name="dd" size="4" /></td><td><input type="text" name="id" size="4" /></td></tr>
									</table>
								</td>
								<td>
									<button onclick="refreshRankBonuses()">Refresh Rank Bonus Calculations</button>
									<table class="data_table">
<tr><th>Basics Rank</th><th><input type="text" name="basicsRank" size="4" value="10" onchange="refreshRankBonuses()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshRankBonuses();}" /></th><th>Subskill Rank&nbsp;</th><th><input type="text" name="subSkillRank" size="4" value="10" onchange="refreshRankBonuses()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshRankBonuses();}" /></th><th>RB +- Mod&nbsp;</th><th><input type="text" name="rankBonusShift" size="4" value="0" onchange="refreshRankBonuses()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshRankBonuses();}" /></th></tr>
<tr><td></td><td>Basic</td><td>Easy</td><td>Avg.</td><td>Diff.</td><td>Impos.</td></tr>
<tr><td>Bers.</td><td><input type="text" name="bb" size="4" /></td><td><input type="text" name="eb" size="4" /></td><td><input type="text" name="ab" size="4" /></td><td><input type="text" name="db" size="4" /></td><td><input type="text" name="ib" size="4" /></td></tr>
<tr><td>Aggr.</td><td><input type="text" name="ba" size="4" /></td><td><input type="text" name="ea" size="4" /></td><td><input type="text" name="aa" size="4" /></td><td><input type="text" name="da" size="4" /></td><td><input type="text" name="ia" size="4" /></td></tr>
<tr><td>Norm.</td><td><input type="text" name="bn" size="4" /></td><td><input type="text" name="en" size="4" /></td><td><input type="text" name="an" size="4" /></td><td><input type="text" name="dn" size="4" /></td><td><input type="text" name="in" size="4" /></td></tr>
<tr><td>Wary</td><td><input type="text" name="bw" size="4" /></td><td><input type="text" name="ew" size="4" /></td><td><input type="text" name="aw" size="4" /></td><td><input type="text" name="dw" size="4" /></td><td><input type="text" name="iw" size="4" /></td></tr>
<tr><td>Def.</td><td><input type="text" name="bd" size="4" /></td><td><input type="text" name="ed" size="4" /></td><td><input type="text" name="ad" size="4" /></td><td><input type="text" name="dd" size="4" /></td><td><input type="text" name="id" size="4" /></td></tr>
									</table>
								</td>
								</tr>
							</table>			
							<table class="outer_data_table">
								<tr>
								<td>							
									<button onclick="refreshRankBonuses()">Refresh Rank Bonus Calculations</button>
									<table class="data_table">
<tr><th>Basics Rank</th><th><input type="text" name="basicsRank" size="4" value="30" onchange="refreshRankBonuses()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshRankBonuses();}" /></th><th>Subskill Rank&nbsp;</th><th><input type="text" name="subSkillRank" size="4" value="10" onchange="refreshRankBonuses()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshRankBonuses();}" /></th><th>RB +- Mod&nbsp;</th><th><input type="text" name="rankBonusShift" size="4" value="0" onchange="refreshRankBonuses()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshRankBonuses();}" /></th></tr>
<tr><td></td><td>Basic</td><td>Easy</td><td>Avg.</td><td>Diff.</td><td>Impos.</td></tr>
<tr><td>Bers.</td><td><input type="text" name="bb" size="4" /></td><td><input type="text" name="eb" size="4" /></td><td><input type="text" name="ab" size="4" /></td><td><input type="text" name="db" size="4" /></td><td><input type="text" name="ib" size="4" /></td></tr>
<tr><td>Aggr.</td><td><input type="text" name="ba" size="4" /></td><td><input type="text" name="ea" size="4" /></td><td><input type="text" name="aa" size="4" /></td><td><input type="text" name="da" size="4" /></td><td><input type="text" name="ia" size="4" /></td></tr>
<tr><td>Norm.</td><td><input type="text" name="bn" size="4" /></td><td><input type="text" name="en" size="4" /></td><td><input type="text" name="an" size="4" /></td><td><input type="text" name="dn" size="4" /></td><td><input type="text" name="in" size="4" /></td></tr>
<tr><td>Wary</td><td><input type="text" name="bw" size="4" /></td><td><input type="text" name="ew" size="4" /></td><td><input type="text" name="aw" size="4" /></td><td><input type="text" name="dw" size="4" /></td><td><input type="text" name="iw" size="4" /></td></tr>
<tr><td>Def.</td><td><input type="text" name="bd" size="4" /></td><td><input type="text" name="ed" size="4" /></td><td><input type="text" name="ad" size="4" /></td><td><input type="text" name="dd" size="4" /></td><td><input type="text" name="id" size="4" /></td></tr>
									</table>
								</td>
								<td>
									<button onclick="refreshRankBonuses()">Refresh Rank Bonus Calculations</button>
									<table class="data_table">
<tr><th>Basics Rank</th><th><input type="text" name="basicsRank" size="4" value="50" onchange="refreshRankBonuses()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshRankBonuses();}" /></th><th>Subskill Rank&nbsp;</th><th><input type="text" name="subSkillRank" size="4" value="10" onchange="refreshRankBonuses()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshRankBonuses();}" /></th><th>RB +- Mod&nbsp;</th><th><input type="text" name="rankBonusShift" size="4" value="0" onchange="refreshRankBonuses()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshRankBonuses();}" /></th></tr>
<tr><td></td><td>Basic</td><td>Easy</td><td>Avg.</td><td>Diff.</td><td>Impos.</td></tr>
<tr><td>Bers.</td><td><input type="text" name="bb" size="4" /></td><td><input type="text" name="eb" size="4" /></td><td><input type="text" name="ab" size="4" /></td><td><input type="text" name="db" size="4" /></td><td><input type="text" name="ib" size="4" /></td></tr>
<tr><td>Aggr.</td><td><input type="text" name="ba" size="4" /></td><td><input type="text" name="ea" size="4" /></td><td><input type="text" name="aa" size="4" /></td><td><input type="text" name="da" size="4" /></td><td><input type="text" name="ia" size="4" /></td></tr>
<tr><td>Norm.</td><td><input type="text" name="bn" size="4" /></td><td><input type="text" name="en" size="4" /></td><td><input type="text" name="an" size="4" /></td><td><input type="text" name="dn" size="4" /></td><td><input type="text" name="in" size="4" /></td></tr>
<tr><td>Wary</td><td><input type="text" name="bw" size="4" /></td><td><input type="text" name="ew" size="4" /></td><td><input type="text" name="aw" size="4" /></td><td><input type="text" name="dw" size="4" /></td><td><input type="text" name="iw" size="4" /></td></tr>
<tr><td>Def.</td><td><input type="text" name="bd" size="4" /></td><td><input type="text" name="ed" size="4" /></td><td><input type="text" name="ad" size="4" /></td><td><input type="text" name="dd" size="4" /></td><td><input type="text" name="id" size="4" /></td></tr>
									</table>
								</td>
								</tr>
							</table>
							<p>To calculate a defensive move, simply use the inverse of the stance you are in. <br />E.G. Berserk &raquo; Defensive &amp; Aggressive &raquo; Wary.</p>
							<p>Non-combat skills use 100% of the possible rank bonus, so read the Berserk value for non-combat skills.</p>
							<p>Although only whole numbers are used to determine a hit, the decimals appear to be used to calculate defensive layering.</p>
							<p>NOTE: The calculator will allow you to enter a subskill rank higher than your basics rank, which is impossible in-game.  This is to facilitate calculating skills which may not assign the basics rank bonus in a standard way.</p>
							<p></p>

							<h4>Rank Bonus added per Rank learned</h4>

							<table class="info_table">
								<tr><th>Rank</th><th>Rank Bonus<br />Added</th></tr>
								<tr><td>1-10</td><td>3</td></tr>
								<tr><td>11-30</td><td>2</td></tr>
								<tr><td>31-50</td><td>1</td></tr>
								<tr><td>51-100</td><td>0.5</td></tr>
								<tr><td>101-150</td><td>0.25</td></tr>
								<tr><td>151-200</td><td>0.125</td></tr>
								<tr><td>201-500</td><td>0.0675</td></tr>
								<tr><td>501-1000</td><td>0.025</td></tr>
								<tr><td>1001 and Up</td><td>0.01</td></tr>
							</table>

							<h4>Rank Bonus Added to SubSkill Rank Bonus by Basics Ranks</h4>

							<table class="info_table">
								<tr><th>Subskill<br />Difficulty</th><th>Rank Bonus<br />Added</th></tr>
								<tr><td>Easy</td><td>0.75</td></tr>
								<tr><td>Average</td><td>0.5</td></tr>
								<tr><td>Difficult</td><td>0.25</td></tr>
								<tr><td>Impossible</td><td>0.1</td></tr>
							</table>

							<h4>Rank Bonus Modification by Stance</h4>

							<table class="info_table">
								<tr><th>Stance</th><th>Attack<br />Rank Bonus</th><th>Defense<br />Rank Bonus</th></tr>
								<tr><td>Berserk</td><td>100%</td><td>0%</td></tr>
								<tr><td>Aggressive</td><td>75%</td><td>25%</td></tr>
								<tr><td>Normal</td><td>50%</td><td>50%</td></tr>
								<tr><td>Wary</td><td>25%</td><td>75%</td></tr>
								<tr><td>Defensive</td><td>0%</td><td>100%</td></tr>
							</table>

							<h4>Rank Bonus for Multiple Layers of Defense</h4>

							<table class="info_table">
								<tr><th>Defensive Skill</th><th>Cumulative Effect</th></tr>
								<tr><td>Block/dodge with highest rank bonus</td><td>100% of rank bonus applied</td></tr>
								<tr><td>Block/dodge with 2nd highest rank bonus</td><td>50% of rank bonus applied</td></tr>
								<tr><td>Block/dodge with 3rd highest rank bonus</td><td>33% of rank bonus applied</td></tr>
							</table>
