---
title: "Training Cost Calculator"
category: "Reference"
---

# Training Cost Calculator

NEW! As of Spring 2024, most NPC trainers teach above rank 200 and training costs were increased by 50%. The increased cost can be toggled off by selecting the new "**Legacy Cost**" button.

Use this tool to calculate the cost of training your skill from its current rank to a desired (higher) rank. 

size 90% The calculator displays how much in-game currency it costs to learn the indicated number of ranks from an NPC trainer (in talents, denars, sens or tokens). It also calculates the amount of Skill Points (SP) requires based on skill slot position.

**Token calculation** is more related to current rank than desired rank. Meaning learning from rank 10 to 20, then from rank 20 to 30 is more expensive than learning from rank 10 to 30 directly. 
The displayed cost also assumes # is always used in LEARN command. When # is not present, there is a 5 token minimum. 
**Example**: If learning rank 1 in a skill, **LEARN <skill> from Hroth # 1** = 4 tokens. While **LEARN <skill> from Hroth** = 5 tokens.


---
<style>

/*************************************************************************************************************************/
/********************************************* FOR TRAINING COST CALCULATOR  *********************************************/
/*************************************************************************************************************************/

a {
    color: #005604;
}

.fine-print {
  font-size: 0.7em;
}

/*************** Rank Input Table ***************/
table.tcc-inputs {
  font-size: min(3em, 18px);
}

table.tcc-inputs tr td {
  padding-right: 8px;
  padding-bottom: 10px;
  font-weight: bold;
}

table.tcc-inputs tr td input {
  font-size: min(3em, 18px);
  font-weight: bold;
  width: 59px;
}


/*************** NPC Trainer Cost Table ***************/
table.tcc-npc-cost {
  float: right;
  border-collapse: collapse;
  font-size: 1em;
}

table.tcc-npc-cost th {
  padding: 3px; 
  background-color: #E2DBBAD0;
  border: 1px solid #888888; 
  text-align: center;
}


table.tcc-npc-cost td {
  padding: 2px 5px;  
  background-color: #EDEDED;
  border: 0px; 
  border-bottom: 1px solid #888888; 
  border-bottom-style: dotted;
}

/* Make first TD look like table header.*/
table.tcc-npc-cost tr td:first-of-type {
  padding: 4px; 
  font-weight: bold;
  background-color: #E2DBBAD0;
  border-left: 1px solid #888888; 
  text-align: left; 
  width: 90px;
}

/* Consistent solid border around the table */
table.tcc-npc-cost tr td:last-of-type {
  border-right: 1px solid #888888; 
}

/* Consistent solid border around the table */
table.tcc-npc-cost tr:last-of-type td {
  border-bottom: 1px solid #888888; 
}

table.tcc-npc-cost input {
  color: #5B5B52;
  border: 0px;
  background: transparent;
  padding-right: 1px;
  text-align: center;
  font-size: 1.1em;
  font-weight: bold;
  max-width: 190px;
}


/*************** Skill Point Cost to Train Table ***************/
table.tcc-sp-cost {
  float: right;
  border-collapse: collapse;
  font-size: 1em;
  max-width: 100%
}

table.tcc-sp-cost th {
  padding: 4px 2px; 
  background-color: #E2DBBAD0;
  border: 0px;
  border-top: 1px solid #888888; 
  border-bottom: 1px solid #888888; 
  text-align: center;
}

table.tcc-sp-cost tr th:first-of-type {
  border-left: 1px solid #888888; 
}

table.tcc-sp-cost tr th:last-of-type {
  border-right: 1px solid #888888;
  padding-right: 5px;
}


table.tcc-sp-cost td {
  padding: 2px 5px;  
  background-color: #EDEDED;
  border: 0px; 
  border-bottom: 1px solid #888888; 
  border-bottom-style: dotted;
  text-align: center;
  font-size: 1;
}

/* Make first TD look like table header.*/
table.tcc-sp-cost tr td:first-of-type {
  padding: 3px; 
  background-color: #E2DBBAD0;
  border-left: 1px solid #888888; 
  width: 105px;
}

/* Consistent solid border around the table */
table.tcc-sp-cost tr td:last-of-type {
  border-right: 1px solid #888888; 
}

/* Consistent solid border around the table */
table.tcc-sp-cost tr:last-of-type td {
  border-bottom: 1px solid #888888; 
}

table.tcc-sp-cost input {
  color: #5B5B52;
  border: 0px;
  background: transparent;
  padding-right: 1px;
  text-align: center;
  font-size: 1.2em;
  max-width: 80px;
}


/*************** Button Modifiers Table ***************/

table.mod-buttons-table {
  float: right;
  font-size: .85rem;
  text-align: right;
  background-color: transparent;
  min-width: 175px;
}

table.mod-buttons-table tr td {
  border: 0px;
  background-color: transparent;
}

input.mod-buttons-btn {
  color: #000000;
  font-size: 1em;
  font-weight: normal;
  text-align: center;
  width: 3em;
  background-color: #EFEFEF;
  border: 1px solid #888888; 
  border-radius: 12px;
  padding: 2px 10px;
  margin: 1px;
  /*box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);*/
}

</style>


<table>


<tr><td>


  <table class="tcc-inputs">
    <tr>
      <td>
        Current Rank
      </td>
      <td>
        <input oninput="fill()" id="TextBox8" type="tel" />
      </td>
    </tr> 
   <tr>
      <td>
        Desired Rank
      </td>
      <td>
        <input oninput="fill()" id="TextBox9" type="tel" />
      </td>
    </tr>
  </table>


</td><td>


  <table class="tcc-npc-cost" >
    <tr>
      <th colspan="2">
        NPC Trainer Cost
      </th>
    </tr>
    <tr>
      <td style="min-width: 105px;">
        In Talents
      </td>
      <td>
        <input value="-" id="TextBoxTalents" type="text" tabindex="-1" readonly /> 
      </td>
    </tr>
    <tr>
      <td>
        In Denars
      </td>
      <td>
        <input  value="-" id="TextBox10" type="text" tabindex="-1" readonly /> 
      </td>
    </tr>
    <tr>
      <td>
        In Sens
      </td>
      <td>
        <input  value="-" id="TextBoxSens" type="text" tabindex="-1" readonly /> 
      </td>
    </tr>
    <tr>
      <td>
        In Tokens<sup>&#8224;</sup>
      </td>
      <td>
        <input value="-" id="TextBoxTokens" type="text" tabindex="-1" readonly /> 
      </td>
    </tr>
    <tr>
      <td>
        In Armbands <sup>&#8224;</sup>
      </td>
      <td>
        <input value="-" id="TextBoxArmbands" type="text" tabindex="-1" readonly /> 
      </td>
    </tr>
  </table>


</td>

<!-- Button Modifiers -->
<td>
      <table class="mod-buttons-table" >
        <tr>
          <td>
            <label for="SelftrainModButton" style="font-family: arial;">Selftrain: </label><input onclick="selftrainChange()" type="button" id="SelftrainModButton" value="No" class="mod-buttons-btn" />
          </td>
          <td>
            <sup>&#8225;</sup>
          </td>
        </tr>
        <tr>
          <td>
            <label for="selfTaughtModButton" style="font-family: arial;"><a href="/traits/#SelfTaught" target="_blank">Self Taught</a>: </label><input onclick="selfTaughtChange()" type="button" id="selfTaughtModButton" value="No" class="mod-buttons-btn" />
          </td>
          <td>
            <sup>&#8225;</sup>
          </td>
        </tr>
        <tr>
          <td>
            <label for="HealingModButton" style="font-family: arial;">Healing: </label><input onclick="healingChange()" type="button" id="HealingModButton" value="No" class="mod-buttons-btn" />
          </td>
          <td>
            <sup>&sect;</sup>
          </td>
        </tr>
        <tr>
          <td>
            <label for="hideSneakModButton" style="font-family: arial;">Hide/Sneak: </label><input onclick="hideSneakChange()" type="button" id="hideSneakModButton" value="No" class="mod-buttons-btn" />
          </td>
          <td>
            <sup>4</sup>
          </td>
        </tr>
        <tr>
          <td>
            <label for="thiefSkillModButton" style="font-family: arial;">PP/Setups: </label><input onclick="thiefSkillChange()" type="button" id="thiefSkillModButton" value="No" class="mod-buttons-btn" />
          </td>
          <td>
            <sup>5</sup>
          </td>
         </tr>
        <tr>
          <td>
            <label for="legacyTeacherModButton" style="font-family: arial;">Legacy Cost: </label><input onclick="legacyTeacherChange()" type="button" id="legacyTeacherModButton" value="No" class="mod-buttons-btn" />
          </td>
          <td>
            <sup>6</sup>
          </td>
         </tr>
        <tr>
          <td>
            <label for="franliusRegionModButton" style="font-family: arial;">Franlius Region: </label><input onclick="franliusRegionChange()" type="button" id="franliusRegionModButton" value="NE" class="mod-buttons-btn" />
          </td>
          <td>
            <sup>7</sup>
          </td>
         </tr>
        </table>
</td>

</tr>
<tr><td style="padding-top:20px;" colspan="2">


<table class="tcc-sp-cost" id="sp-cost-table">
  <tr>
    <th colspan="5">
      Skill Point Cost to Train
    </th>
  </tr>
  <tr>
    <th>
      Skill Difficulty:
    </th>
    <th>
      Easy
    </th>
    <th>
      Average
    </th>
    <th>
      Difficult
    </th>
    <th>
      Impossible
    </th>
  </tr>

<!-- 1st SKILL SLOT -->
  <tr>
    <td>
      1<sup>st</sup> Skill Slot
    </td>
    <td>
      <input onchange="fill()" id=TextBox11 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox12 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox13 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox14 value="-" tabindex="-1" readonly />
    </td>
  </tr>

<!-- 2nd SKILL SLOT -->
  <tr>
    <td>
      2<sup>nd</sup> Skill Slot
    </td>
    <td>
      <input onchange="fill()" id=TextBox15 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox16 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox17 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox18 value="-" tabindex="-1" readonly />
    </td>
  </tr>

<!-- 3rd SKILL SLOT -->
  <tr>
    <td>
      3<sup>rd</sup> Skill Slot
    </td>
    <td>
      <input onchange="fill()" id=TextBox19 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox20 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox21 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox22 value="-" tabindex="-1" readonly />
    </td>
  </tr>

<!-- 4th SKILL SLOT -->
  <tr>
    <td>
      4<sup>th</sup> Skill Slot
    </td>
    <td>
      <input onchange="fill()" id=TextBox23 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox24 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox25 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox26 value="-" tabindex="-1" readonly />
    </td>
  </tr>

<!-- 5th SKILL SLOT -->
  <tr>
    <td>
      5<sup>th</sup> Skill Slot
    </th>
    <td>
      <input onchange="fill()" id=TextBox27 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox28 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox29 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox30 value="-" tabindex="-1" readonly />
    </td>
  </tr>

<!-- 6th SKILL SLOT -->
  <tr>
    <td>
      6<sup>th</sup> Skill Slot
    </td>
    <td>
      <input onchange="fill()" id=TextBox31 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox32 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox33 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox34 value="-" tabindex="-1" readonly />
    </td>
  </tr>

<!-- 7th SKILL SLOT -->
  <tr>
    <td>
      7<sup>th</sup> Skill Slot
    </td>
    <td>
      <input onchange="fill()" id=TextBox35 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox36 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox37 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox38 value="-" tabindex="-1" readonly />
    </td>
  </tr>

<!-- 8th SKILL SLOT -->
  <tr>
    <td>
      8<sup>th</sup> Skill Slot
    </td>
    <td>
      <input onchange="fill()" id=TextBox39 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox40 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox41 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox42 value="-" tabindex="-1" readonly />
    </td>
  </tr>

<!-- 9th SKILL SLOT -->
  <tr>
    <td>
      9<sup>th</sup> Skill Slot
    </td>
    <td>
      <input onchange="fill()" id=TextBox43 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox44 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox45 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox46 value="-" tabindex="-1" readonly />
    </td>
  </tr>

<!-- 10th SKILL SLOT -->
  <tr>
    <td>
      10<sup>th</sup> Skill Slot
    </td>
    <td>
      <input onchange="fill()" id=TextBox47 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox48 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox49 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox50 value="-" tabindex="-1" readonly />
    </td>
  </tr>

<!-- 11th SKILL SLOT -->
  <tr>
    <td>
      11<sup>th</sup> Skill Slot
    </td>
    <td>
      <input onchange="fill()" id=TextBox51 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox52 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox53 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox54 value="-" tabindex="-1" readonly />
    </td>
  </tr>

<!-- 12th SKILL SLOT -->
  <tr>
    <td>
      12<sup>th</sup> Skill Slot
    </td>
    <td>
      <input onchange="fill()" id=TextBox55 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox56 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox57 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox58 value="-" tabindex="-1" readonly />
    </td>
  </tr>

<!-- 13th SKILL SLOT -->
  <tr>
    <td>
      13<sup>th</sup> Skill Slot
    </td>
    <td>
      <input onchange="fill()" id=TextBox59 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox60 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox61 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox62 value="-" tabindex="-1" readonly />
    </td>
  </tr>

<!-- 14th SKILL SLOT -->
  <tr>
    <td>
      14<sup>th</sup> Skill Slot
    </td>
    <td>
      <input onchange="fill()" id=TextBox63 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox64 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox65 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox66 value="-" tabindex="-1" readonly />
    </td>
  </tr>

<!-- 15th SKILL SLOT -->
  <tr>
    <td>
      15<sup>th</sup> Skill Slot
    </td>
    <td>
      <input onchange="fill()" id=TextBox67 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox68 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox69 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox70 value="-" tabindex="-1" readonly />
    </td>
  </tr>

<!-- 16th SKILL SLOT -->
  <tr>
    <td>
      16<sup>th</sup> Skill Slot
    </td>
    <td>
      <input onchange="fill()" id=TextBox71 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox72 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox73 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox74 value="-" tabindex="-1" readonly />
    </td>
  </tr>

<!-- 17th SKILL SLOT -->
  <tr>
    <td>
      17<sup>th</sup> Skill Slot
    </td>
    <td>
      <input onchange="fill()" id=TextBox75 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox76 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox77 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox78 value="-" tabindex="-1" readonly />
    </td>
  </tr>

<!-- 18th SKILL SLOT -->
  <tr>
    <td>
      18<sup>th</sup> Skill Slot
    </td>
    <td>
      <input onchange="fill()" id=TextBox79 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox80 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox81 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox82 value="-" tabindex="-1" readonly />
    </td>
  </tr>

<!-- 19th SKILL SLOT -->
  <tr>
    <td>
      19<sup>th</sup> Skill Slot
    </td>
    <td>
      <input onchange="fill()" id=TextBox83 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox84 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox85 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox86 value="-" tabindex="-1" readonly />
    </td>
  </tr>

<!-- 20th SKILL SLOT -->
  <tr>
    <td>
      20<sup>th</sup> Skill Slot
    </td>
    <td>
      <input onchange="fill()" id=TextBox87 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox88 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox89 value="-" tabindex="-1" readonly />
    </td>
    <td>
      <input onchange="fill()" id=TextBox90 value="-" tabindex="-1" readonly />
    </td>
  </tr>
  </table>

  
  </td></tr>
 </table>


<br /><br />
<u>NOTES</u>
<br />
<sup>&#8224;</sup> <span class="fine-print">If learning 50 or more ranks, token calculation assumes the character will learn 50 ranks at a time, then finish with any remainder.</span><br>
<sup>&#8225;</sup> <span class="fine-print">Advancing in a skill by selftraining costs double the normal amount of skill points. This only applies to ranks below 1,150. For ranks above 1,150 selftraining is assumed. This penalty is reduced with the <a href="/traits/#SelfTaught" target="_blank">self taught</a> trait.</span><br>
<sup>&sect;</sup> <span class="fine-print">Healing skills cost an extra 5 skill points per rank, compared to other skills.</span><br />
<sup>4</sup>      <span class="fine-print">Hide/Sneak trainer costs 10x normal formula.</span><br>
<sup>5</sup>      <span class="fine-print">PP/setups costs 25% more gold to learn from an NPC trainer.</span><br />
<sup>6</sup>      <span class="fine-print">Use legacy NPC teacher cost (cost reduced by 1/3).</span>
<br />
<sup>7</sup>      <span class="fine-print">Adjust Franlius armband requirements by Region.</span>
<br /><br />


<script>
  /*
      GLOBAL VARIABLES
  */
    var nfObject = new Intl.NumberFormat('en-US'); /* For formatting all numbers. */
    var hideSneakMod = false; /* Keeps track of Hide/Sneak button selection. */
    var healMod = false; /* Keeps track of Healing button selection. */
    var selftrainMod = false; /* Keeps track of Self-Trained button selection. */
    var selfTaughtMod = false; /* Keeps track of Self-Taught button selection. */
    var thiefSkillMod = false; /* Keeps track of Thief Skill button selection. */
    var legacyTeacherMod = false; /* Keeps track of Legacy Cost button selection. */
    var franliusRegionMod = 1.0; /* Keeps track of Franlius Region Armband Cost multiplier. */


    /*
      Keeps track of "Healing Button" state.
    */
    function healingChange() {

        if (document.getElementById("HealingModButton").value == "No") {
            document.getElementById("HealingModButton").value = "Yes";
            document.getElementById("HealingModButton").style.backgroundColor="green";
            healMod = true;

        } else {
            document.getElementById("HealingModButton").value = "No";
            document.getElementById("HealingModButton").style.backgroundColor="#efefef";
            healMod = false;
        }

        fill();
    }

    /*
      Keeps track of "Hide/Sneak Button" state.
    */
    function hideSneakChange() {

        if (document.getElementById("hideSneakModButton").value == "No") {
            document.getElementById("hideSneakModButton").value = "Yes";
            document.getElementById("hideSneakModButton").style.backgroundColor="green";
            hideSneakMod = true;
        } else {
            document.getElementById("hideSneakModButton").value = "No";
            document.getElementById("hideSneakModButton").style.backgroundColor="#efefef";
            hideSneakMod = false;
        }

        fill();
    }

    /*
      Keeps track of "Self-Train Button" state.
    */
    function selftrainChange() {

        if (document.getElementById("SelftrainModButton").value == "No") {
            document.getElementById("SelftrainModButton").value = "Yes";
            document.getElementById("SelftrainModButton").style.backgroundColor="green";
            selftrainMod = true;
        } else {
            document.getElementById("SelftrainModButton").value = "No";
            document.getElementById("SelftrainModButton").style.backgroundColor="#efefef";
            selftrainMod = false;

/*            document.getElementById("selfTaughtModButton").value = "No";
            document.getElementById("selfTaughtModButton").style.backgroundColor="#efefef";
            selfTaughtMod = false;
*/
        }

        fill();
    }

    /*
      Keeps track of "Self Taught Button" state.
    */
    function selfTaughtChange() {

        if (document.getElementById("selfTaughtModButton").value == "No") {
            document.getElementById("selfTaughtModButton").value = "Yes";
            document.getElementById("selfTaughtModButton").style.backgroundColor="green";
            selfTaughtMod = true;


        } else {
            document.getElementById("selfTaughtModButton").value = "No";
            document.getElementById("selfTaughtModButton").style.backgroundColor="#efefef";
            selfTaughtMod = false;
        }

        fill();
    }

    /*
      Keeps track of "Thief Skill Button" state.
    */
    function thiefSkillChange() {

        if (document.getElementById("thiefSkillModButton").value == "No") {
            document.getElementById("thiefSkillModButton").value = "Yes";
            document.getElementById("thiefSkillModButton").style.backgroundColor="green";
            thiefSkillMod = true;
        } else {
            document.getElementById("thiefSkillModButton").value = "No";
            document.getElementById("thiefSkillModButton").style.backgroundColor="#efefef";
            thiefSkillMod = false;
        }

        fill();
    }

    /*
      Keeps track of "Legacy Cost" button state.
    */
    function legacyTeacherChange() {

        if (document.getElementById("legacyTeacherModButton").value == "No") {
            document.getElementById("legacyTeacherModButton").value = "Yes";
            document.getElementById("legacyTeacherModButton").style.backgroundColor="green";
            legacyTeacherMod = true;
        } else {
            document.getElementById("legacyTeacherModButton").value = "No";
            document.getElementById("legacyTeacherModButton").style.backgroundColor="#efefef";
            legacyTeacherMod = false;
        }

        fill();
    }


    /*
      Keeps track of "Franlius Region" button state.
    */
    function franliusRegionChange() {

        if (document.getElementById("franliusRegionModButton").value == "NE") {

            document.getElementById("franliusRegionModButton").value = "NW";
            //document.getElementById("franliusRegionModButton").style.backgroundColor="green";
            franliusRegionMod = 3.0;

        } else if (document.getElementById("franliusRegionModButton").value == "NW") {

            document.getElementById("franliusRegionModButton").value = "D";
            franliusRegionMod = 4.0;

        } else if (document.getElementById("franliusRegionModButton").value == "D") {

            document.getElementById("franliusRegionModButton").value = "SE";
            franliusRegionMod = 0.25;

        } else if (document.getElementById("franliusRegionModButton").value == "SE") {

            document.getElementById("franliusRegionModButton").value = "SW";
            franliusRegionMod = 0.5;

        } else if (document.getElementById("franliusRegionModButton").value == "SW") {

            document.getElementById("franliusRegionModButton").value = "NE";
            //document.getElementById("franliusRegionModButton").style.backgroundColor="#efefef";
            franliusRegionMod = 1.0;

        } else {

            franliusRegionMod = 1.0;
        }

        fill();
    }

    /*
      Calculates the required SP to learn from the current rank to the desired rank based on parameters.
    */
    function calc_SP_Required(cur_rank, des_rank, slot_num, skill_difficulty) {

        var sp_per_rank = 0;
        var sp_first_rank = 0;
        var total_SP = 0;


        if(skill_difficulty == 'easy'){
          sp_per_rank = 5 + (slot_num - 1) ;
          sp_first_rank = 10 + ((slot_num - 1) * 3) - sp_per_rank;
        }
        
        if(skill_difficulty == 'average'){
          sp_per_rank = 7 + (slot_num - 1) ;
          sp_first_rank = 15 + ((slot_num - 1) * 3) - sp_per_rank;
        }

        if(skill_difficulty == 'difficult'){
          sp_per_rank = 9 + (slot_num - 1) ;
          sp_first_rank = 17 + ((slot_num - 1) * 3) - sp_per_rank;
        }

        if(skill_difficulty == 'impossible'){
          sp_per_rank = 11 + (slot_num - 1) ;
          sp_first_rank = 19 + ((slot_num - 1) * 3) - sp_per_rank;
        }

        

        total_SP = ((( des_rank - cur_rank ) * (sp_per_rank + (healMod ? 5 : 0)) ) + (cur_rank == 0 ? sp_first_rank : 0)) * (selftrainMod ? (selfTaughtMod ? 1.5 : 2) : 1);

		
        if(des_rank > 1150 && cur_rank <= 2000 && !selftrainMod ) {
              total_SP += (( Math.min(des_rank, 2000) - Math.max(cur_rank, 1150 )) * (sp_per_rank + (healMod ? 5 : 0))) * (selfTaughtMod ? 0.5 : 1);
        }

        if(des_rank > 2000 && cur_rank <= 3000) {

              total_SP += (( Math.min(des_rank, 3000) - Math.max(cur_rank, 2000 )) * (sp_per_rank + (healMod ? 5 : 0))) * (selftrainMod ? 2 : (selfTaughtMod ? 2.5 : 3) );

        }

        if(des_rank > 3000 && cur_rank <= 4000) {

              total_SP += (( Math.min(des_rank, 4000) - Math.max(cur_rank, 3000 )) * (sp_per_rank + (healMod ? 5 : 0))) * (selftrainMod ? 4 : (selfTaughtMod ? 4.5 : 5) );

        }

        if(des_rank > 4000 && cur_rank <= 5000) {

              total_SP += (( Math.min(des_rank, 5000) - Math.max(cur_rank, 4000 )) * (sp_per_rank + (healMod ? 5 : 0))) * (selftrainMod ? 6 : (selfTaughtMod ? 6.5 : 7) );

        }

        if(des_rank > 5000 && cur_rank <= 7000) {
              total_SP += (( Math.min(des_rank, 7000) - Math.max(cur_rank, 5000 )) * (sp_per_rank + (healMod ? 5 : 0))) * (selftrainMod ? 8 : (selfTaughtMod ? 8.5 : 9) );
        }

        if(des_rank > 7000) {
              total_SP += (( des_rank - Math.max(cur_rank, 7000 )) * (sp_per_rank + (healMod ? 5 : 0))) * (selftrainMod ? 10 : (selfTaughtMod ? 10.5 : 11));
        }


        return total_SP;
    }


    function calc_sens_cost(cur_rank, des_rank) {

        return Math.floor( Math.round( (((des_rank+1)*(des_rank/2))-((cur_rank+1)*(cur_rank/2)))*(legacyTeacherMod? 30:45) ) * (hideSneakMod? 10:1) * (thiefSkillMod? 1.25:1)) ;

/*        return Math.floor( Math.round( (((des_rank+1)*(des_rank/2))-((cur_rank+1)*(cur_rank/2)))* 30) * (hideSneakMod? 10:1) * (thiefSkillMod? 1.25:1)) ;*/

    }


    function calc_fran_rep_cost(cur_rank, des_rank) {

        var rep_cost = 0.0;

        if (des_rank > cur_rank) {

            for (startRank = cur_rank+1, endRank = des_rank; startRank <= endRank; startRank++) {
              rep_cost += startRank*0.25;
            }

        return rep_cost;
    }


    }


    /* Assuming the maximum amount of ranks you can learn is 50 at a time, this loops through each LEARN command and adds all tokens. */
    function calc_Token_Cost(cur_rank, des_rank) {

        var token_cost = 0;
        var max_learn_ranks = 50; 

        if (des_rank > cur_rank) {

            for (startRank = cur_rank, endRank = des_rank; startRank < endRank; startRank+= max_learn_ranks) {
              
              if( (startRank + max_learn_ranks) < endRank)
                token_cost += Math.ceil( calc_token_cost_actual(startRank, max_learn_ranks) * (legacyTeacherMod? 1.00:1.85));
              else
                token_cost += Math.ceil( calc_token_cost_actual(startRank, endRank - startRank) * (legacyTeacherMod? 1.00:1.85));
            }
        }

        return token_cost;
    }

    /* Actual calculations for tokens using single use of the LEARN command. */
    function calc_token_cost_actual(cur_rank, num_ranks) {

        var token_cost = 0;
        var base_cost = 0.0;

        base_cost = cur_rank / 6.5625;

        token_cost = Math.floor( base_cost * num_ranks ) + num_ranks + 1;

        return token_cost;
    }

    function display_Cost(cost_in_sens, coin_type) {
        var display_number = '';
        var remaining_sens = 0;

        remaining_sens = cost_in_sens;

        switch(coin_type){
          case 'talents':
            display_number += nfObject.format(Math.floor( remaining_sens / 18750 ) ) + 't  ';
            remaining_sens = remaining_sens % 18750;

          case 'denars':
            display_number += nfObject.format(Math.floor( remaining_sens / 12 ) ) + 'd  ';
            remaining_sens = remaining_sens % 12 ;

          case 'sterces':
            display_number += nfObject.format(Math.floor( remaining_sens / 3 ) ) + 'st  ';
            remaining_sens = remaining_sens % 3 ;

          case 'sens':
            display_number += nfObject.format( remaining_sens ) + 's';

          break;        
        }

        return display_number;
    }

    function fill() {

        var current_rank = document.getElementById("TextBox8").value-0;
        var desired_rank = document.getElementById("TextBox9").value-0;
        var cost_in_sens = 0;
        var cost_in_franlius_rep = 0;
        var valid_input = true;
        
        if ((isNaN(current_rank) || document.getElementById("TextBox8").value == '') && !isNaN(desired_rank)){
          document.getElementById("TextBox8").placeholder = 0;
          current_rank = 0;
        }

        if (isNaN(current_rank) || isNaN(desired_rank) || desired_rank == 0 || current_rank > desired_rank ) {
          valid_input = false;
        }

        // If input is not valid, reset SP Cost table.
        if(!valid_input) {
            for (i = 11; i <= 90; i++) { 
                document.getElementById("TextBox" + i).value = "-";
            }
        }
        else {
              // Update SP Cost table.
              for (i = 11; i <= 90; i++) { 
                  var slot_num = Math.ceil( (i - 10) / 4) ;
                  var skill_difficulty = '';

                  switch( (i - 10) % 4) {
                    case 1:
                    skill_difficulty = 'easy';
                    break;

                    case 2:
                    skill_difficulty = 'average';
                    break;

                    case 3:
                    skill_difficulty = 'difficult';
                    break;

                    case 0:
                    skill_difficulty = 'impossible';
                    break;
                  }

                  document.getElementById("TextBox" + i).value = nfObject.format( calc_SP_Required(current_rank, desired_rank, slot_num, skill_difficulty) );
              }
        }
        
        // If input is not valid OR Selftrained is checked, reset NPC Trainer Cost.
        if ( !valid_input || selftrainMod ) {
            document.getElementById("TextBoxTalents").style.textAlign = "center";
            document.getElementById("TextBox10").style.textAlign = "center";
            document.getElementById("TextBoxSens").style.textAlign = "center";
            document.getElementById("TextBoxTokens").style.textAlign = "center";
            document.getElementById("TextBoxArmbands").style.textAlign = "center";

            document.getElementById("TextBoxTalents").value = "-";
            document.getElementById("TextBox10").value = "-";
            document.getElementById("TextBoxSens").value = "-";
            document.getElementById("TextBoxTokens").value = "-";
            document.getElementById("TextBoxArmbands").value = "-";
        }
        else {
            
            //** Update NPC Trainer Cost table. **
            // Change alignment to right.
            document.getElementById("TextBoxTalents").style.textAlign = "right";
            document.getElementById("TextBox10").style.textAlign = "right";
            document.getElementById("TextBoxSens").style.textAlign = "right";
            document.getElementById("TextBoxTokens").style.textAlign = "right";
            document.getElementById("TextBoxArmbands").style.textAlign = "right";


            // Calculate cost in sens.
            cost_in_sens = calc_sens_cost(current_rank, desired_rank);

            // Calculate cost in Franlius reputation armbands.
            cost_in_franlius_rep = calc_fran_rep_cost(current_rank, desired_rank);

            // Convert cost to necessary format per input.
            document.getElementById("TextBoxTalents").value = display_Cost(cost_in_sens, 'talents');
            document.getElementById("TextBox10").value = display_Cost(cost_in_sens, 'denars');
            document.getElementById("TextBoxSens").value = display_Cost(cost_in_sens, 'sens');
            document.getElementById("TextBoxTokens").value = nfObject.format( calc_Token_Cost(current_rank, desired_rank) );
            document.getElementById("TextBoxArmbands").value = nfObject.format(Math.ceil(cost_in_franlius_rep/franliusRegionMod)) + ' ' + (franliusRegionMod==4.0? '(Docks)': (franliusRegionMod==3.0? '(NW)': (franliusRegionMod==1.0? '(NE)': (franliusRegionMod==0.5? '(SW)': (franliusRegionMod==0.25? '(SE)': '')))));
        }

    }
   
</script>


---
#### Base Skill Point Costs

~~~
Skill                    Easy   Average Difficult Impossible  
----------------------- ------- ------- --------- ---------
1st Skill Slot           10/ 5   15/ 7    17/ 9     19/11
2nd Skill Slot           13/ 6   18/ 8    20/10     22/12
3rd Skill Slot           16/ 7   21/ 9    23/11     25/13
4th Skill Slot           19/ 8   24/10    26/12     28/14
5th Skill Slot           22/ 9   27/11    29/13     31/15
6th Skill Slot           25/10   30/12    32/14     34/16
7th Skill Slot           28/11   33/13    35/15     37/17
8th Skill Slot           31/12   36/14    38/16     40/18
9th Skill Slot           34/13   39/15    41/17     43/19
10th Skill Slot          37/14   42/16    44/18     46/20
11th Skill Slot          40/15   45/17    47/19     49/21
12th Skill Slot          43/16   48/18    50/20     52/22
13th Skill Slot          46/17   51/19    53/21     55/23
14th Skill Slot          49/18   54/20    56/22     58/24
15th Skill Slot          52/19   57/21    59/23     61/25
16th Skill Slot          55/20   60/22    62/24     64/26
17th Skill Slot          58/21   63/23    65/25     67/27
18th Skill Slot          61/22   66/24    68/26     70/28
19th Skill Slot          64/23   69/25    71/27     73/29
20th Skill Slot          67/24   72/26    74/28     76/30
~~~
