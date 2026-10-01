---
title: "Money Calculator"
---

# Money Calculator

<!-- new money calc -->
	<div id="new money calc" style="clear: both">
	<script type="text/javascript">
	var coinTypeNames = new Array();
	coinTypeNames[0] = "sen";
	coinTypeNames[1] = "sterce";
	coinTypeNames[2] = "denar";
	coinTypeNames[3] = "cent";
	coinTypeNames[4] = "talent";

	var coinValuesInSens = new Array();
	coinValuesInSens['sen'] = 1.0;
	coinValuesInSens['sterce'] = 3.0;
	coinValuesInSens['denar'] = 12.0;
	coinValuesInSens['cent'] = 300.0;
	coinValuesInSens['talent'] = 18750.0;
	
	function truncateDecimals(number) {
		return Math[number < 0 ? 'ceil' : 'floor'](number);
	}
	
	function convertAllToSens(sens,sterces,denars,cents,talents) {
		var inSens = sens + sterces * coinValuesInSens['sterce'] + denars * coinValuesInSens['denar'] + cents * coinValuesInSens['cent'] + talents * coinValuesInSens['talent'];
		/*alert("allsens:"+inSens);*/
		return inSens;
	}
	
	function convertSensToArrayOfCoins(sens,maxCoinTypeNameIndex) {
		maxCoinTypeNameIndex = parseFloat(maxCoinTypeNameIndex);
		var coins = new Array();
		if (isNaN(maxCoinTypeNameIndex) || !coinTypeNames[maxCoinTypeNameIndex]) {
			/*alert("maxCoinTypeNameIndex not passed valid value:"+maxCoinTypeNameIndex);*/
			maxCoinTypeNameIndex = coinTypeNames.length - 1;
		}
		for (var i = coinTypeNames.length - 1; i >= 0; i--) {
			if (i > maxCoinTypeNameIndex) {coins[coinTypeNames[i]] = 0; continue;};
			coins[coinTypeNames[i]] = truncateDecimals(sens / coinValuesInSens[coinTypeNames[i]],0);
			sens -= coins[coinTypeNames[i]] * coinValuesInSens[coinTypeNames[i]]; 
		}
		// add any remaining (fractional) sen to total:
		coins['sen'] += sens;
		return coins;
	}

function sanitizeCoinInput(text) {
	text = parseFloat(text);
	if (isNaN(text)) {
		return 0;
	}
	return text;
}
	
function refreshCoinCalculations() {
	var talentsGiven = document.getElementsByName('talentsGiven');
	var centsGiven = document.getElementsByName('centsGiven');
	var denarsGiven = document.getElementsByName('denarsGiven');
	var stercesGiven = document.getElementsByName('stercesGiven');
	var sensGiven = document.getElementsByName('sensGiven');
	var multipliersGiven = document.getElementsByName('multipliersGiven');
	
	var calculatedInSens = document.getElementsByName('calculatedInSens');
	var calculatedInSterces = document.getElementsByName('calculatedInSterces');
	var calculatedInDenars = document.getElementsByName('calculatedInDenars');
	var calculatedInCents = document.getElementsByName('calculatedInCents');
	var calculatedInTalents = document.getElementsByName('calculatedInTalents');

	var coins = new Array();
	var sens = 0;
	for (var i = sensGiven.length - 1; i >= 0; i--) {
		sens += sanitizeCoinInput(multipliersGiven[i].value) * convertAllToSens(sanitizeCoinInput(sensGiven[i].value),sanitizeCoinInput(stercesGiven[i].value),sanitizeCoinInput(denarsGiven[i].value),sanitizeCoinInput(centsGiven[i].value),sanitizeCoinInput(talentsGiven[i].value));
	}
	
	coins = convertSensToArrayOfCoins(sens,4);
	calculatedInTalents[4].value = coins['sen'];
	calculatedInTalents[3].value = coins['sterce'];
	calculatedInTalents[2].value = coins['denar'];
	calculatedInTalents[1].value = coins['cent'];
	calculatedInTalents[0].value = coins['talent'];
	
	coins = convertSensToArrayOfCoins(sens,3);
	calculatedInCents[3].value = coins['sen'];
	calculatedInCents[2].value = coins['sterce'];
	calculatedInCents[1].value = coins['denar'];
	calculatedInCents[0].value = coins['cent'];
	
	coins = convertSensToArrayOfCoins(sens,2);
	calculatedInDenars[2].value = coins['sen'];
	calculatedInDenars[1].value = coins['sterce'];
	calculatedInDenars[0].value = coins['denar'];
	
	coins = convertSensToArrayOfCoins(sens,1);
	calculatedInSterces[1].value = coins['sen'];
	calculatedInSterces[0].value = coins['sterce'];

	coins = convertSensToArrayOfCoins(sens,0);
	calculatedInSens[0].value = coins['sen'];
}

function clearInputValues() {
	var talentsGiven = document.getElementsByName('talentsGiven');
	var centsGiven = document.getElementsByName('centsGiven');
	var denarsGiven = document.getElementsByName('denarsGiven');
	var stercesGiven = document.getElementsByName('stercesGiven');
	var sensGiven = document.getElementsByName('sensGiven');
	var multipliersGiven = document.getElementsByName('multipliersGiven');
	
	for (var i = talentsGiven.length - 1; i >= 0; i--) {
		talentsGiven[i].value = "";
		centsGiven[i].value = "";
		denarsGiven[i].value = "";
		stercesGiven[i].value = "";
		sensGiven[i].value = "";
		multipliersGiven[i].value = "1";
	}
	refreshCoinCalculations();
}

function moveTotalIntoFirstRow() {
	var calculatedInTalents = document.getElementsByName('calculatedInTalents');
	var coins = new Array();
	coins['sen'] = parseFloat(calculatedInTalents[4].value);
	coins['sterce'] = parseFloat(calculatedInTalents[3].value);
	coins['denar'] = parseFloat(calculatedInTalents[2].value);
	coins['cent'] = parseFloat(calculatedInTalents[1].value);
	coins['talent'] = parseFloat(calculatedInTalents[0].value);
	clearInputValues();
	var talentsGiven = document.getElementsByName('talentsGiven');
	var centsGiven = document.getElementsByName('centsGiven');
	var denarsGiven = document.getElementsByName('denarsGiven');
	var stercesGiven = document.getElementsByName('stercesGiven');
	var sensGiven = document.getElementsByName('sensGiven');
	sensGiven[0].value = coins['sen'];
	stercesGiven[0].value = coins['sterce'];
	denarsGiven[0].value = coins['denar'];
	centsGiven[0].value = coins['cent'];
	talentsGiven[0].value = coins['talent'];
	refreshCoinCalculations();
}

</script>
<h2>Multiple Coin Converter</h2>
<p>Any amount of coins entered into any of the Coins To Add fields below will be summed together into Total Coins.</p>
<p>Each row of Total Coins shows the same calculated sum value, but denominated in a different size coin, in descending order.</p>
<p>E.G. The 'Denominated in Denars' row shows the sum of coins, but does not use any coins larger than a denar.</p>
<p>To subtract, input negative numbers.</p>
<p>To multiply, change the multiplier field from the default of 1.0
  <br>E.G. Multiplying by 0.5 will halve the total of that row of coins</p>
<p>To add more than 5 rows together, click the 'Sum Total into First Row' button</p>
<h4>Coins to Add:</h4>
<table class="outer_data_table">
<tr>
	<td>	
	<table class="data_table">
<tr>
	<th>Talents</th>
	<th>Cents</th>
	<th>Denars</th>
	<th>Sterces</th>
	<th>Sens</th>
	<th>Multiplier x</th>
</tr>
<tr>
	<td><input type="text" name="talentsGiven" size="4" value="0" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
	<td><input type="text" name="centsGiven" size="4" value="0" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
	<td><input type="text" name="denarsGiven" size="4" value="0" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
	<td><input type="text" name="stercesGiven" size="4" value="0" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
	<td><input type="text" name="sensGiven" size="4" value="0" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
	<td><input type="text" name="multipliersGiven" size="4" value="1.0" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
	</tr>

<tr>
	<td><input type="text" name="talentsGiven" size="4" value="0" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
	<td><input type="text" name="centsGiven" size="4" value="0" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
	<td><input type="text" name="denarsGiven" size="4" value="0" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
	<td><input type="text" name="stercesGiven" size="4" value="0" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
	<td><input type="text" name="sensGiven" size="4" value="0" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
	<td><input type="text" name="multipliersGiven" size="4" value="1.0" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
</tr>
<tr>
	<td><input type="text" name="talentsGiven" size="4" value="0" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
	<td><input type="text" name="centsGiven" size="4" value="0" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
	<td><input type="text" name="denarsGiven" size="4" value="0" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
	<td><input type="text" name="stercesGiven" size="4" value="0" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
	<td><input type="text" name="sensGiven" size="4" value="0" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
	<td><input type="text" name="multipliersGiven" size="4" value="1.0" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
</tr>
<tr>
	<td><input type="text" name="talentsGiven" size="4" value="0" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
	<td><input type="text" name="centsGiven" size="4" value="0" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
	<td><input type="text" name="denarsGiven" size="4" value="0" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
	<td><input type="text" name="stercesGiven" size="4" value="0" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
	<td><input type="text" name="sensGiven" size="4" value="0" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
	<td><input type="text" name="multipliersGiven" size="4" value="1.0" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
</tr>
<tr>
	<td><input type="text" name="talentsGiven" size="4" value="0" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
	<td><input type="text" name="centsGiven" size="4" value="0" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
	<td><input type="text" name="denarsGiven" size="4" value="0" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
	<td><input type="text" name="stercesGiven" size="4" value="0" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
	<td><input type="text" name="sensGiven" size="4" value="0" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
	<td><input type="text" name="multipliersGiven" size="4" value="1.0" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
</tr>
									</table>
								<p>
									<button onclick="refreshCoinCalculations()"><span>Update</span></button><button onclick="clearInputValues()"><span>Clear</span></button>
								</p>
								<p><button onclick="moveTotalIntoFirstRow()"><span>Sum Total into first row of Coins to Add</span></button></p>
								</td>
								</tr>
							</table>
							<h4>Total Coins:</h4>
							<table class="outer_data_table">
								<tr>
								<td>
									<table class="data_table">
									
<tr>
	<th></th>
	<th>Talents</th>
	<th>Cents</th>
	<th>Denars</th>
	<th>Sterces</th>
	<th>Sens</th>
</tr>
<tr>
	<th>Sum Denominated in Talents</th>
	<td><input type="text" name="calculatedInTalents" size="8" value="" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
	<td><input type="text" name="calculatedInTalents" size="8" value="" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
	<td><input type="text" name="calculatedInTalents" size="8" value="" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
	<td><input type="text" name="calculatedInTalents" size="8" value="" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
	<td><input type="text" name="calculatedInTalents" size="8" value="" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
</tr>		
<tr>
        <th>&nbsp;</th>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
</tr>						
<tr>
	<th>Sum Denominated in Cents</th>
	<td></td>
	<td><input type="text" name="calculatedInCents" size="8" value="" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
	<td><input type="text" name="calculatedInCents" size="8" value="" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
	<td><input type="text" name="calculatedInCents" size="8" value="" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
	<td><input type="text" name="calculatedInCents" size="8" value="" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
</tr>
<tr>
	<th>Sum Denominated in Denars</th>
	<td></td>
	<td></td>
	<td><input type="text" name="calculatedInDenars" size="8" value="" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
	<td><input type="text" name="calculatedInDenars" size="8" value="" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
	<td><input type="text" name="calculatedInDenars" size="8" value="" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
</tr>
<tr>
	<th>Sum Denominated in Sterces</th>
	<td></td>
	<td></td>
	<td></td>
	<td><input type="text" name="calculatedInSterces" size="8" value="" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
	<td><input type="text" name="calculatedInSterces" size="8" value="" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
</tr>
<tr>
	<th>Sum Denominated in Sens</th>
	<td></td>
	<td></td>
	<td></td>
	<td></td>
	<td><input type="text" name="calculatedInSens" size="8" value="" onchange="refreshCoinCalculations()" onkeypress="var key = event.keyCode || event.which; if (key===13) {refreshCoinCalculations();}" /></td>
</tr>

									</table>
								</td>
								</tr>
							</table>
	</div> <!-- end new money calc -->
       <div id="money calculator">
        <br>
        <br>
        <h2>Old Coin Calculator</h2>
	<div>
		Work in progress - This will accurately convert money.
	</div>
	<table>
		<tr>
			<td><label for="Talents">Talents</label></td>
			<td><label for="Cents">Cents</label></td>
			<td><label for="Denars">Denars</label></td>
			<td><label for="Sterces">Sterces</label></td>
			<td><label for="Sens">Sens</label></td>
		</tr>
		<tr>
			<td><input id="Talents" onkeyup="Talentsfunc()" size="10" type="text" value="0"></td>
			<td><input id="Cents" onkeyup="Centsfunc()" size="10" type="text" value="0"></td>
			<td><input id="Denars" onkeyup="Denarsfunc()" size="10" type="text" value="0"></td>
			<td><input id="Sterces" onkeyup="Stercesfunc()" size="10" type="text" value="0"></td>
			<td><input id="Sens" onkeyup="Sensfunc()" size="10" type="text" value="0"></td>
		</tr>
	</table><br>
	<br>
	<br>
	<table align="left" cellpadding="0" cellspacing="0" width="500">
		<tbody>
			<tr class="bol">
				<td></td>
				<td class="ce" colspan="5">Value in..</td>
			</tr>
			<tr class="bol">
				<td class="le">Unit</td>
				<td>.. Sens</td>
				<td>.. Sterces</td>
				<td>.. Denar</td>
				<td>.. Gold Cents</td>
				<td>.. Talents</td>
			</tr>
			<tr>
				<td class="le"><b>Bronze Sen</b></td>
				<td>1</td>
				<td>1/3</td>
				<td>1/12</td>
				<td>1/300</td>
				<td>1/18750</td>
			</tr>
			<tr>
				<td class="le"><b>Silver Sterce</b></td>
				<td>3</td>
				<td>1</td>
				<td>1/4</td>
				<td>1/100</td>
				<td>1/6250</td>
			</tr>
			<tr>
				<td class="le"><b>Silver Denar</b></td>
				<td>12</td>
				<td>4</td>
				<td>1</td>
				<td>1/25</td>
				<td>1/1562.5</td>
			</tr>
			<tr>
				<td class="le"><b>Gold Cent</b></td>
				<td>300</td>
				<td>100</td>
				<td>25</td>
				<td>1</td>
				<td>1/62.5</td>
			</tr>
			<tr>
				<td class="le"><b>Talent</b></td>
				<td>18750</td>
				<td>6250</td>
				<td>1562.5</td>
				<td>62.5</td>
				<td>1</td>
			</tr>
			<tr>
				<td class="ju" colspan="6"><br>
				<br>
				When expressing a large quantity of money Iridinians often refer to the 'talent'. It is not a unit of money (there is no 'talent coin') but does represent a set value.</td>
			</tr>
		</tbody>
	</table>
<script type="text/javascript">
var Talents, Cents, Denars, Sterces, Sens;

function init() {
	Talents = document.getElementById("Talents");
	Cents = document.getElementById("Cents");
	Denars = document.getElementById("Denars");
	Sterces = document.getElementById("Sterces");
	Sens = document.getElementById("Sens");
}

function Talentsfunc() {
	Cents.value = parseFloat(Talents.value) * 62.5;
	Denars.value = parseFloat(Talents.value) * 1562.5;
	Sterces.value = parseFloat(Talents.value) * 6250;
	Sens.value = parseFloat(Talents.value) * 18750;
}

function Denarsfunc() {
	Talents.value = parseFloat(Denars.value) * 0.00064;
	Cents.value = parseFloat(Denars.value) * 0.04;
	Sterces.value = parseFloat(Denars.value) * 4;
	Sens.value = parseFloat(Denars.value) * 12;
}

function Stercesfunc() {
	Talents.value = parseFloat(Sterces.value) * 0.00016;
	Cents.value = parseFloat(Sterces.value) * 0.01;
	Denars.value = parseFloat(Sterces.value) * 0.25;
	Sens.value = parseFloat(Sterces.value) * 3;
}

function Sensfunc() {
	Talents.value = parseFloat(Sens.value) * (1 / 18750);
	Cents.value = parseFloat(Sens.value) * (1 / 300);
	Denars.value = parseFloat(Sens.value) * (1 / 12);
	Sterces.value = parseFloat(Sens.value) * (1 / 3);
}

function Centsfunc() {
	Talents.value = parseFloat(Cents.value) * 0.016;
	Denars.value = parseFloat(Cents.value) * 25;
	Sterces.value = parseFloat(Cents.value) * 100;
	Sens.value = parseFloat(Cents.value) * 300;
}
init();
</script>
</div> <!-- end money calculator-->
<!-- Old code - Leaving here for now-->
<!-- <form action="moneycalc.asp" method="post">
		<table align="center" cellpadding="0" cellspacing="0" width="500">
			<tbody>
				<tr>
					<td class="ce">+</td>
					<td class="ce">-</td>
					<td bgcolor="grey" width="1"></td>
					<td class="ce">talents</td>
					<td class="ce">cents</td>
					<td class="ce">denars</td>
					<td class="ce">sterces</td>
					<td class="ce">sens</td>
					<td bgcolor="grey" width="1"></td>
					<td class="ce">multiplier</td>
				</tr>
				<tr>
					<td colspan="10" height="2" style="height:2px;font-size:1px;"></td>
				</tr>
				<tr>
					<td bgcolor="grey" colspan="10" height="1" style="height:1px;font-size:1px;"></td>
				</tr>
				<tr>
					<td colspan="10" height="2" style="height:2px;font-size:1px;"></td>
				</tr>
				<tr>
					<td class="ce"><input checked name="p" type="radio" value="+"></td>
					<td class="ce"><input name="p" type="radio" value="-"></td>
					<td bgcolor="grey" width="1"></td>
					<td class="ce"><input name="t" size="4" type="text"></td>
					<td class="ce"><input name="c" size="4" type="text"></td>
					<td class="ce"><input name="d" size="4" type="text"></td>
					<td class="ce"><input name="st" size="4" type="text"></td>
					<td class="ce"><input name="s" size="4" type="text"></td>
					<td bgcolor="grey" width="1"></td>
					<td class="ce"><input name="m" size="4" type="text"></td>
				</tr>
				<tr>
					<td colspan="10" height="2" style="height:2px;font-size:1px;"></td>
				</tr>
				<tr>
					<td bgcolor="grey" colspan="10" height="1" style="height:1px;font-size:1px;"></td>
				</tr>
				<tr>
					<td colspan="10" height="2" style="height:2px;font-size:1px;"></td>
				</tr>
				<tr>
					<td class="ce"><input checked name="p2" type="radio" value="+"></td>
					<td class="ce"><input name="p2" type="radio" value="-"></td>
					<td bgcolor="grey" width="1"></td>
					<td class="ce"><input name="t2" size="4" type="text"></td>
					<td class="ce"><input name="c2" size="4" type="text"></td>
					<td class="ce"><input name="d2" size="4" type="text"></td>
					<td class="ce"><input name="st2" size="4" type="text"></td>
					<td class="ce"><input name="s2" size="4" type="text"></td>
					<td bgcolor="grey" width="1"></td>
					<td class="ce"><input name="m2" size="4" type="text"></td>
				</tr>
				<tr>
					<td colspan="10" height="2" style="height:2px;font-size:1px;"></td>
				</tr>
				<tr>
					<td bgcolor="grey" colspan="10" height="1" style="height:1px;font-size:1px;"></td>
				</tr>
				<tr>
					<td colspan="10" height="2" style="height:2px;font-size:1px;"></td>
				</tr>
				<tr>
					<td class="ce"><input checked name="p3" type="radio" value="+"></td>
					<td class="ce"><input name="p3" type="radio" value="-"></td>
					<td bgcolor="grey" width="1"></td>
					<td class="ce"><input name="t3" size="4" type="text"></td>
					<td class="ce"><input name="c3" size="4" type="text"></td>
					<td class="ce"><input name="d3" size="4" type="text"></td>
					<td class="ce"><input name="st3" size="4" type="text"></td>
					<td class="ce"><input name="s3" size="4" type="text"></td>
					<td bgcolor="grey" width="1"></td>
					<td class="ce"><input name="m3" size="4" type="text"></td>
				</tr>
			</tbody>
		</table><br>
		<br>
		<center>
			<input type="submit" value="Calculate Money"><br>
			<br>
		</center>
		<table align="center" cellpadding="0" cellspacing="0" width="400">
			<tbody>
				<tr>
					<td class="lecom"><b>Where highest value is..</b><br>
					..sen<br>
					..sterce<br>
					..denar<br>
					..cent<br>
					..talent (no cents)<br>
					..talent<br></td>
					<td class="mon"><br>
					0s<br>
					0st 0s<br>
					0d 0st 0s<br>
					0c 0d 0st 0s<br>
					0t 0d 0st 0s<br>
					0t 0c 0d 0st 0s<br></td>
				</tr>
				<tr>
					<td class="ri">
						<br>
						<br>
						<a href="moneycalc.asp">Clear values</a> |
					</td>
					<td>
						<br>
						<br>
						&nbsp;<a href="?t=0&amp;c=0&amp;d=0&amp;st=0&amp;s=0">Use total as first row</a>
					</td>
				</tr>
			</tbody>
		</table><br>
		<br>
		Instructions<br>
		<br>
		The three rows can be either added or taken away from one another, so you can find out how much those 15 daggers, 70 sandals are going to fetch you all together, minus the cost of your trip to Melila. It's possible to calculate more than three things together by using the <i>Use total as first row</i> link after totalling the first three items. This will allow you to enter another two rows under the current total.<br>
		<br>
		To divide amounts you should place decimal numbers into the <i>Multiplier</i> field. Ie. x0.5 would half the money, x0.25 would divide it by four, x0.1 would split it 10 ways, etc.<br>
		<br>
		<i>NOTE:</i> The calculator doesn't play well with totals below zero, do any minus-ing last. If you're dealing with debts, use your debt as a plus number and take away what you're paying off, etc. I'm sure you'll be able to get around it until it's fixed.<br>
		<br>
		<br>
		Money<br>
		<br>
		<table align="center" cellpadding="0" cellspacing="0" width="500">
			<tbody>
				<tr class="bol">
					<td></td>
					<td class="ce" colspan="5">Value in..</td>
				</tr>
				<tr class="bol">
					<td class="le">Unit</td>
					<td>.. Sens</td>
					<td>.. Sterces</td>
					<td>.. Denar</td>
					<td>.. Gold Cents</td>
					<td>.. Talents</td>
				</tr>
				<tr>
					<td class="le"><b>Bronze Sen</b></td>
					<td>1</td>
					<td>1/3</td>
					<td>1/12</td>
					<td>1/300</td>
					<td>1/18750</td>
				</tr>
				<tr>
					<td class="le"><b>Silver Sterce</b></td>
					<td>3</td>
					<td>1</td>
					<td>1/4</td>
					<td>1/100</td>
					<td>1/6250</td>
				</tr>
				<tr>
					<td class="le"><b>Silver Denar</b></td>
					<td>12</td>
					<td>4</td>
					<td>1</td>
					<td>1/25</td>
					<td>1/1562.5</td>
				</tr>
				<tr>
					<td class="le"><b>Gold Cent</b></td>
					<td>300</td>
					<td>100</td>
					<td>25</td>
					<td>1</td>
					<td>1/62.5</td>
				</tr>
				<tr>
					<td class="le"><b>Talent</b></td>
					<td>18750</td>
					<td>6250</td>
					<td>1562.5</td>
					<td>62.5</td>
					<td>1</td>
				</tr>
				<tr>
					<td class="ju" colspan="6"><br>
					<br>
					When expressing a large quantity of money Iridinians often refer to the 'talent'. It is not a unit of money (there is no 'talent coin') but does represent a set value.</td>
				</tr>
			</tbody>
		</table>
	</form> -->
