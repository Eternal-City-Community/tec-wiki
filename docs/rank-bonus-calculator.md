# Rank Bonus Calculator

<head>
    <base target="_parent">

    <!-- Preload icons using HTTPS -->
    <link rel="preload" href="https://eternal-city.wikidot.com/assets/wikidot/rank-bonus-calculator/swords.png" as="image">
    <link rel="preload" href="https://eternal-city.wikidot.com/assets/wikidot/rank-bonus-calculator/shield.png" as="image">
    <link rel="preload" href="https://eternal-city.wikidot.com/assets/wikidot/rank-bonus-calculator/tree.png" as="image">
    <link rel="preload" href="https://eternal-city.wikidot.com/assets/wikidot/rank-bonus-calculator/five-column.png" as="image">
    <link rel="preload" href="https://eternal-city.wikidot.com/assets/wikidot/rank-bonus-calculator/three-column.png" as="image">
    <link rel="preload" href="https://eternal-city.wikidot.com/assets/wikidot/rank-bonus-calculator/five-row.png" as="image">
    <link rel="preload" href="https://eternal-city.wikidot.com/assets/wikidot/rank-bonus-calculator/three-row.png" as="image">
    <link rel="preload" href="https://eternal-city.wikidot.com/assets/wikidot/rank-bonus-calculator/one-row.png" as="image">

    <style>
        body {
            font-family: verdana, arial, helvetica, sans-serif;
            font-size: 12px;
            color: #322E1E;
            margin: 0;
            padding: 0;
        }

        /* Smooth fade-in animation for page load */
        div.rb-outer {
            max-width: 800px;
            animation: fadeIn 0.4s ease-in-out forwards;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(4px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        div.rb-container>div:first-child {
            border-top-left-radius: 14px;
            border-top-right-radius: 14px;
        }

        div.rb-container>div:last-child {
            border-bottom-left-radius: 14px;
            border-bottom-right-radius: 14px;
        }

        /* Smooth addition when clicking the + button */
        div.rb-calc-box {
            background-color: #E2DBBAD0;
            border: 1px solid rgb(110, 110, 94);
            border-top: 0px;
            padding: 10px 20px 20px 20px;
            display: flex;
            flex-flow: row wrap;
            animation: fadeIn 0.3s ease-in-out forwards;
        }

        div.rb-calc-menu {
            height: 36px;
            background-color: #E2DBBAD0;
            border: 1px solid rgb(110, 110, 94);
            border-bottom: 0px;
            display: flex;
            flex-flow: row nowrap;
        }

        div#rb-menu-title {
            font-size: 16px;
            flex-grow: 10;
            padding: 0.5em;
        }

        div.rb-button {
            flex-grow: 0.01;
            height: 26px;
            margin: 5px 4px 4px 4px;
            width: 26px;
            max-width: 26px;
            min-width: 26px;
            background-repeat: no-repeat;
            background-size: 22px 22px;
            background-position: center center;
            border-radius: 6px;
            box-shadow: 0px 0px 1px 1px rgb(66, 66, 56);
            transition: background-color 0.25s, opacity 0.25s;
        }

        div.rb-button:hover {
            background-color: #dcc475;
            cursor: pointer;
        }

        div.rb-button:last-child {
            margin-right: 8px;
        }

        div.rb-button.disabled {
            opacity: 0.35;
        }

        div.rb-button.disabled:hover {
            background-color: unset;
        }

        div.sword-icon { background-image: url("https://eternal-city.wikidot.com/assets/wikidot/rank-bonus-calculator/swords.png"); }
        div.shield-icon { background-image: url("https://eternal-city.wikidot.com/assets/wikidot/rank-bonus-calculator/shield.png"); }
        div.tree-icon { background-image: url("https://eternal-city.wikidot.com/assets/wikidot/rank-bonus-calculator/tree.png"); }
        div.three-col-icon { background-image: url("https://eternal-city.wikidot.com/assets/wikidot/rank-bonus-calculator/three-column.png"); }
        div.five-col-icon { background-image: url("https://eternal-city.wikidot.com/assets/wikidot/rank-bonus-calculator/five-column.png"); }
        div.five-row-icon { background-image: url("https://eternal-city.wikidot.com/assets/wikidot/rank-bonus-calculator/five-row.png"); }
        div.three-row-icon { background-image: url("https://eternal-city.wikidot.com/assets/wikidot/rank-bonus-calculator/three-row.png"); }
        div.one-row-icon { background-image: url("https://eternal-city.wikidot.com/assets/wikidot/rank-bonus-calculator/one-row.png"); }

        div.dec-none:before {
            content: ".0";
            font-size: 15px;
            font-weight: bold;
            color: rgb(121, 121, 106);
            display: block;
            position: relative;
            top: 3px;
            left: 4px;
        }
        div.dec-none:after {
            content: "\2573";
            position: relative;
            color: rgb(47, 47, 36);
            font-weight: bold;
            display: block;
            top: -15px;
            left: 7px;
            font-size: 12px;
        }
        div.dec-one:after {
            content: ".0";
            font-size: 15px;
            font-weight: bold;
            color: rgb(47, 47, 36);
            display: block;
            position: relative;
            top: 3px;
            left: 4px;
        }
        div.dec-two:after {
            content: ".00";
            font-size: 12px;
            font-weight: bold;
            color: rgb(47, 47, 36);
            display: block;
            position: relative;
            top: 5px;
            left: 2px;
        }
        div.dec-three:after {
            content: ".000";
            font-size: 9px;
            font-weight: bold;
            color: rgb(47, 47, 36);
            display: block;
            position: relative;
            top: 7px;
            left: 2px;
        }
        div.dec-infin:after {
            content: ".000\A  000\A  000";
            white-space: pre-wrap;
            line-height: 1;
            font-size: 8px;
            font-weight: bold;
            color: rgb(47, 47, 36);
            display: block;
            position: relative;
            top: 1px;
            left: 2px;
        }

        div.rb-rank-inputs-box { flex-grow: 1; }
        table.rb-rank-inputs { width: 100%; height: 100%; }
        table.rb-rank-inputs tr td { padding: 5px; text-align: center; }
        table.rb-rank-inputs input {
            padding: 6px 6px 6px 16px;
            font-size: 16px;
            width: 7.9em;
            border-radius: 4px;
            border: 1px solid #333;
            transition: border-color 0.2s;
        }
        table.rb-rank-inputs input:focus { outline: 2px solid #333; }

        div.rb-rank-bonuses-box { flex-grow: 2.5; }
        table.rb-rank-bonuses {
            width: 100%;
            height: 100%;
            border-collapse: separate;
            border-spacing: 1px;
            font-size: 14px;
            color: #322E1E;
        }
        @media only screen and (max-width: 600px) {
            table.rb-rank-bonuses { font-size: 10px; }
        }
        table.rb-rank-bonuses tr td { padding: 3px 0.2em 2px 0.2em; }
        table.rb-rank-bonuses tr.rb-table-headers td { padding-top: 0; }
        table.rb-rank-bonuses input {
            width: 75%;
            padding: 2px 9%;
            border-radius: 4px;
            border: 0px;
            background-color: rgb(255, 255, 255);
            height: 100%;
            min-height: 1.65em;
            max-height: 2em;
        }
        table.rb-rank-bonuses input:focus { outline: none; }
        table.rb-rank-bonuses tr td.offensive-stance, 
        table.rb-rank-bonuses tr td.defensive-stance {
            text-align: right;
            padding-right: 0.7em;
            width: 1px;
            padding-top: 0.5em;
        }
        table.rb-rank-bonuses tr td.defensive-stance { display: none; }

        /* Smoother hover and subtle bounce effect on the + button */
        div.rb-plus-new {
            margin: 20px 30%;
            background: url("https://eternal-city.wikidot.com/assets/wikidot/rank-bonus-calculator/plus.png") no-repeat;
            background-size: 40px;
            background-position: 50% 5px;
            height: 50px;
            border-radius: 25px;
            border: 1px solid rgba(0, 0, 0, 0);
            transition: background-color 0.25s, transform 0.15s, border 0.25s;
        }
        div.rb-plus-new:hover {
            background-color: #dcc475;
            border: 1px solid rgb(110, 110, 94);
            cursor: pointer;
            transform: scale(1.02);
        }
        div.rb-plus-new:active {
            transform: scale(0.97);
        }
    </style>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/decimal.js/10.4.3/decimal.min.js"></script>
    <script type="text/javascript">
        var rankTierModifiers = [0, 3, 2, 1, 0.5, 0.25, 0.125, 0.0675, 0.025, 0.01];
        var rankTierModifierEndLevels = [0, 0, 10, 30, 50, 100, 150, 200, 500, 1000];

        function toggleButton(elem, isFirstLoad) {
            if (!elem) return;

            if (isFirstLoad) {
                var rbTypeButton = getCookie("rbTypeButton") || "sword";
                var rbRowButton = getCookie("rbRowButton") || "five";
                var rbColButton = getCookie("rbColButton") || "five";
            }

            var container = elem.closest('.rb-container') || document;
            var offCells = container.getElementsByClassName("offensive-stance");
            var defCells = container.getElementsByClassName("defensive-stance");
            var basCells = container.getElementsByClassName("basic-rb-values");
            var impCells = container.getElementsByClassName("impos-rb-values");
            var berRows = container.getElementsByClassName("berserk-row");
            var modRows = container.getElementsByClassName("stance-rb-mod-row");
            var berDefRows = container.getElementsByClassName("ber-def-row");
            var aggWarRows = container.getElementsByClassName("agg-war-row");
            var rowButton = document.getElementById("rb-row-button");

            if (elem.classList.contains("disabled")) {
                return;
            } else if ((isFirstLoad && (elem.id === "rb-main-button") && (rbTypeButton === "shield")) || (!isFirstLoad && elem.classList.contains("sword-icon"))) {
                elem.classList.remove("sword-icon", "tree-icon");
                elem.classList.add("shield-icon");
                hideElems(offCells);
                showElems(defCells);
                var title = document.getElementById("rb-menu-title");
                if (title) title.innerHTML = "Defensive Rank Bonus";
                setCookie("rbTypeButton", "shield", 999);
            } else if ((isFirstLoad && (elem.id === "rb-main-button") && (rbTypeButton === "tree")) || (!isFirstLoad && elem.classList.contains("shield-icon"))) {
                elem.classList.remove("sword-icon", "shield-icon");
                elem.classList.add("tree-icon");
                hideElems(offCells);
                hideElems(defCells);
                hideElems(modRows);
                showElems(berRows);
                if (rowButton) rowButton.classList.add("disabled");
                var title = document.getElementById("rb-menu-title");
                if (title) title.innerHTML = "Non-Combat Rank Bonus";
                setCookie("rbTypeButton", "tree", 999);
            } else if ((isFirstLoad && (elem.id === "rb-main-button") && (rbTypeButton === "sword")) || (!isFirstLoad && elem.classList.contains("tree-icon"))) {
                elem.classList.remove("shield-icon", "tree-icon");
                elem.classList.add("sword-icon");
                hideElems(defCells);
                showElems(offCells);
                showElems(modRows);
                if (rowButton) {
                    rowButton.classList.remove("disabled");
                    if (rowButton.classList.contains("three-row-icon")) {
                        hideElems(berDefRows);
                    } else if (rowButton.classList.contains("one-row-icon")) {
                        hideElems(berDefRows);
                        hideElems(aggWarRows);
                    }
                }
                var title = document.getElementById("rb-menu-title");
                if (title) title.innerHTML = "Offensive Rank Bonus";
                setCookie("rbTypeButton", "sword", 999);
            } else if ((isFirstLoad && (elem.id === "rb-col-button") && (rbColButton === "three")) || (!isFirstLoad && elem.classList.contains("five-col-icon"))) {
                elem.classList.remove("five-col-icon");
                elem.classList.add("three-col-icon");
                hideElems(basCells);
                hideElems(impCells);
                setCookie("rbColButton", "three", 999);
            } else if ((isFirstLoad && (elem.id === "rb-col-button") && (rbColButton === "five")) || (!isFirstLoad && elem.classList.contains("three-col-icon"))) {
                elem.classList.remove("three-col-icon");
                elem.classList.add("five-col-icon");
                showElems(basCells);
                showElems(impCells);
                setCookie("rbColButton", "five", 999);
            } else if ((isFirstLoad && (elem.id === "rb-row-button") && (rbRowButton === "three")) || (!isFirstLoad && elem.classList.contains("five-row-icon"))) {
                elem.classList.remove("five-row-icon", "one-row-icon");
                elem.classList.add("three-row-icon");
                hideElems(berDefRows);
                setCookie("rbRowButton", "three", 999);
            } else if ((isFirstLoad && (elem.id === "rb-row-button") && (rbRowButton === "one")) || (!isFirstLoad && elem.classList.contains("three-row-icon"))) {
                elem.classList.remove("three-row-icon", "five-row-icon");
                elem.classList.add("one-row-icon");
                hideElems(aggWarRows);
                setCookie("rbRowButton", "one", 999);
            } else if ((isFirstLoad && (elem.id === "rb-row-button") && (rbRowButton === "five")) || (!isFirstLoad && elem.classList.contains("one-row-icon"))) {
                elem.classList.remove("one-row-icon", "three-row-icon");
                elem.classList.add("five-row-icon");
                showElems(berDefRows);
                showElems(aggWarRows);
                setCookie("rbRowButton", "five", 999);
            }
        }

        function hideElems(elems) {
            for (var i = 0; i < elems.length; i++) {
                elems[i].style.display = "none";
            }
        }

        function showElems(elems) {
            for (var i = 0; i < elems.length; i++) {
                var tag = elems[i].tagName.toLowerCase();
                if (tag === "td") elems[i].style.display = "table-cell";
                else if (tag === "tr") elems[i].style.display = "table-row";
            }
        }

        function toggleDecimals(elem, isFirstLoad) {
            if (!elem) return;
            if (isFirstLoad) {
                var rbDecButton = getCookie("rbDecButton") || "infin";
                elem.classList.remove("dec-infin");
            }
            if ((isFirstLoad && (rbDecButton === "one")) || (!isFirstLoad && elem.classList.contains("dec-none"))) {
                elem.classList.remove("dec-none");
                elem.classList.add("dec-one");
                setCookie("rbDecButton", "one", 999);
            } else if ((isFirstLoad && (rbDecButton === "two")) || (!isFirstLoad && elem.classList.contains("dec-one"))) {
                elem.classList.remove("dec-one");
                elem.classList.add("dec-two");
                setCookie("rbDecButton", "two", 999);
            } else if ((isFirstLoad && (rbDecButton === "three")) || (!isFirstLoad && elem.classList.contains("dec-two"))) {
                elem.classList.remove("dec-two");
                elem.classList.add("dec-three");
                setCookie("rbDecButton", "three", 999);
            } else if ((isFirstLoad && (rbDecButton === "infin")) || (!isFirstLoad && elem.classList.contains("dec-three"))) {
                elem.classList.remove("dec-three");
                elem.classList.add("dec-infin");
                setCookie("rbDecButton", "infin", 999);
            } else if ((isFirstLoad && (rbDecButton === "none")) || (!isFirstLoad && elem.classList.contains("dec-infin"))) {
                elem.classList.remove("dec-infin");
                elem.classList.add("dec-none");
                setCookie("rbDecButton", "none", 999);
            }
            if (!isFirstLoad) {
                refreshRankBonuses();
            }
        }

        function addRbContainer() {
            var containers = document.getElementsByClassName("rb-calc-box");
            if (!containers.length) return;
            var newContainer = containers[containers.length - 1].cloneNode(true);
            containers[0].parentNode.insertBefore(newContainer, null);
            var basicsRanks = document.getElementsByName('basicsRank');
            var subSkillRanks = document.getElementsByName('subSkillRank');
            basicsRanks[basicsRanks.length - 1].value = "";
            subSkillRanks[subSkillRanks.length - 1].value = "";
            refreshRankBonuses();
        }

        function getDifficultyModifier(diff) {
            if (diff == "easy") return '0.75';
            if (diff == "average") return '0.5';
            if (diff == "difficult") return '0.25';
            if (diff == "impossible") return '0.1';
            return "ERROR";
        }

        function getStanceModifier(stance) {
            if (stance == "berserk") return '1.0';
            if (stance == "aggressive") return '0.75';
            if (stance == "normal") return '0.5';
            if (stance == "wary") return '0.25';
            if (stance == "defensive") return '0';
            return "ERROR";
        }

        function calcRankTierBonus(rank) {
            var rankTierBonus = new Decimal(0);
            var currentRank = Number(rank);
            for (var i = rankTierModifierEndLevels.length - 1; i >= 0; i--) {
                if (currentRank > rankTierModifierEndLevels[i]) {
                    var ranksInThisTier = new Decimal(currentRank - rankTierModifierEndLevels[i]);
                    rankTierBonus = rankTierBonus.plus(ranksInThisTier.times(rankTierModifiers[i]));
                    currentRank = rankTierModifierEndLevels[i];
                }
            }
            return rankTierBonus.toString();
        }

        function calcBasicsRankBonus(basicsRank, difficulty, stance, decPlaces) {
            if (basicsRank == "" || basicsRank < 1) return "";
            return calcRankBonus(0, basicsRank, difficulty, stance, decPlaces);
        }

        function calcRankBonus(basicsRank, subSkillRank, difficulty, stance, decPlaces) {
            if (subSkillRank == "") return "";
            var basicRB = new Decimal(calcRankTierBonus(basicsRank));
            var basicDiffMod = new Decimal(getDifficultyModifier(difficulty));
            var subSkillRB = new Decimal(calcRankTierBonus(subSkillRank));
            var stanceMod = new Decimal(getStanceModifier(stance));
            var calculatedRB = basicRB.floor().times(basicDiffMod).plus(subSkillRB).times(stanceMod);
            return truncateDecimalPlaces(calculatedRB.toString(), decPlaces);
        }

        function getNumDecimalPlaces() {
            var decButton = document.getElementById('rb-dec-button');
            if (!decButton) return 8;
            if (decButton.classList.contains('dec-none')) return 0;
            if (decButton.classList.contains('dec-one')) return 1;
            if (decButton.classList.contains('dec-two')) return 2;
            if (decButton.classList.contains('dec-three')) return 3;
            return 8;
        }

        function truncateDecimalPlaces(number, decPlaces) {
            var multiplier = new Decimal(10).toPower(decPlaces);
            var adjustedNum = new Decimal(number).times(multiplier);
            var finalNum = adjustedNum.floor().dividedBy(multiplier);
            return finalNum.toString();
        }

        function refreshRankBonuses() {
            var basicsRanks = document.getElementsByName('basicsRank');
            var subSkillRanks = document.getElementsByName('subSkillRank');
            var decPlaces = getNumDecimalPlaces();
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

            for (var i = 0; i < basicsRanks.length; i++) {
                if (!BBs[i]) continue;
                BBs[i].value = calcBasicsRankBonus(basicsRanks[i].value, "easy", "berserk", decPlaces);
                BAs[i].value = calcBasicsRankBonus(basicsRanks[i].value, "easy", "aggressive", decPlaces);
                BNs[i].value = calcBasicsRankBonus(basicsRanks[i].value, "easy", "normal", decPlaces);
                BWs[i].value = calcBasicsRankBonus(basicsRanks[i].value, "easy", "wary", decPlaces);
                BDs[i].value = calcBasicsRankBonus(basicsRanks[i].value, "easy", "defensive", decPlaces);
                EBs[i].value = calcRankBonus(basicsRanks[i].value, subSkillRanks[i].value, "easy", "berserk", decPlaces);
                EAs[i].value = calcRankBonus(basicsRanks[i].value, subSkillRanks[i].value, "easy", "aggressive", decPlaces);
                ENs[i].value = calcRankBonus(basicsRanks[i].value, subSkillRanks[i].value, "easy", "normal", decPlaces);
                EWs[i].value = calcRankBonus(basicsRanks[i].value, subSkillRanks[i].value, "easy", "wary", decPlaces);
                EDs[i].value = calcRankBonus(basicsRanks[i].value, subSkillRanks[i].value, "easy", "defensive", decPlaces);
                ABs[i].value = calcRankBonus(basicsRanks[i].value, subSkillRanks[i].value, "average", "berserk", decPlaces);
                AAs[i].value = calcRankBonus(basicsRanks[i].value, subSkillRanks[i].value, "average", "aggressive", decPlaces);
                ANs[i].value = calcRankBonus(basicsRanks[i].value, subSkillRanks[i].value, "average", "normal", decPlaces);
                AWs[i].value = calcRankBonus(basicsRanks[i].value, subSkillRanks[i].value, "average", "wary", decPlaces);
                ADs[i].value = calcRankBonus(basicsRanks[i].value, subSkillRanks[i].value, "average", "defensive", decPlaces);
                DBs[i].value = calcRankBonus(basicsRanks[i].value, subSkillRanks[i].value, "difficult", "berserk", decPlaces);
                DAs[i].value = calcRankBonus(basicsRanks[i].value, subSkillRanks[i].value, "difficult", "aggressive", decPlaces);
                DNs[i].value = calcRankBonus(basicsRanks[i].value, subSkillRanks[i].value, "difficult", "normal", decPlaces);
                DWs[i].value = calcRankBonus(basicsRanks[i].value, subSkillRanks[i].value, "difficult", "wary", decPlaces);
                DDs[i].value = calcRankBonus(basicsRanks[i].value, subSkillRanks[i].value, "difficult", "defensive", decPlaces);
                IBs[i].value = calcRankBonus(basicsRanks[i].value, subSkillRanks[i].value, "impossible", "berserk", decPlaces);
                IAs[i].value = calcRankBonus(basicsRanks[i].value, subSkillRanks[i].value, "impossible", "aggressive", decPlaces);
                INs[i].value = calcRankBonus(basicsRanks[i].value, subSkillRanks[i].value, "impossible", "normal", decPlaces);
                IWs[i].value = calcRankBonus(basicsRanks[i].value, subSkillRanks[i].value, "impossible", "wary", decPlaces);
                IDs[i].value = calcRankBonus(basicsRanks[i].value, subSkillRanks[i].value, "impossible", "defensive", decPlaces);
            }
        }

        function setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=Lax";
        }

        function getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i].trim();
                if (c.indexOf(name) === 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        function calcStartUp() {
            toggleButton(document.getElementById('rb-row-button'), true);
            toggleButton(document.getElementById('rb-col-button'), true);
            toggleButton(document.getElementById('rb-main-button'), true);
            toggleDecimals(document.getElementById('rb-dec-button'), true);
        }
    </script>
</head>

<body onload="calcStartUp()">
    <div class="rb-outer">
        <div class="rb-container">
            <div class="rb-calc-menu">
                <div id="rb-menu-title">Offensive Rank Bonus</div>
                <div class="rb-button sword-icon" id="rb-main-button" onclick="toggleButton(this);"></div>
                <div class="rb-button five-col-icon" id="rb-col-button" onclick="toggleButton(this);"></div>
                <div class="rb-button five-row-icon" id="rb-row-button" onclick="toggleButton(this);"></div>
                <div class="rb-button dec-infin" id="rb-dec-button" onclick="toggleDecimals(this);"></div>
            </div>
            <div class="rb-calc-box">
                <div class="rb-rank-inputs-box">
                    <table class="rb-rank-inputs">
                        <tr valign="bottom">
                            <td><input autocomplete="off" min="0" name="basicsRank" oninput="refreshRankBonuses();" placeholder="Basics rank..." type="number"></td>
                        </tr>
                        <tr valign="top">
                            <td><input autocomplete="off" min="0" name="subSkillRank" oninput="refreshRankBonuses();" placeholder="Subskill rank..." type="number"></td>
                        </tr>
                    </table>
                </div>
                <div class="rb-rank-bonuses-box">
                    <table class="rb-rank-bonuses">
                        <tr class="rb-table-headers" valign="bottom">
                            <td class="offensive-stance"></td>
                            <td class="defensive-stance"></td>
                            <td class="basic-rb-values">Basic</td>
                            <td>Easy</td>
                            <td>Avg.</td>
                            <td>Diff.</td>
                            <td class="impos-rb-values">Impos.</td>
                        </tr>
                        <tr class="berserk-row ber-def-row" valign="top">
                            <td class="offensive-stance">Bers.</td>
                            <td class="defensive-stance">Def.</td>
                            <td class="basic-rb-values"><input autocomplete="off" name="bb" readonly size="4" tabindex="-1" type="text"></td>
                            <td><input autocomplete="off" name="eb" readonly size="4" tabindex="-1" type="text"></td>
                            <td><input autocomplete="off" name="ab" readonly size="4" tabindex="-1" type="text"></td>
                            <td><input autocomplete="off" name="db" readonly size="4" tabindex="-1" type="text"></td>
                            <td class="impos-rb-values"><input autocomplete="off" name="ib" readonly size="4" tabindex="-1" type="text"></td>
                        </tr>
                        <tr class="stance-rb-mod-row agg-war-row" valign="top">
                            <td class="offensive-stance">Aggr.</td>
                            <td class="defensive-stance">Wary</td>
                            <td class="basic-rb-values"><input autocomplete="off" name="ba" readonly size="4" tabindex="-1" type="text"></td>
                            <td><input autocomplete="off" name="ea" readonly size="4" tabindex="-1" type="text"></td>
                            <td><input autocomplete="off" name="aa" readonly size="4" tabindex="-1" type="text"></td>
                            <td><input autocomplete="off" name="da" readonly size="4" tabindex="-1" type="text"></td>
                            <td class="impos-rb-values"><input autocomplete="off" name="ia" readonly size="4" tabindex="-1" type="text"></td>
                        </tr>
                        <tr class="stance-rb-mod-row" valign="top">
                            <td class="offensive-stance">Norm.</td>
                            <td class="defensive-stance">Norm.</td>
                            <td class="basic-rb-values"><input autocomplete="off" name="bn" readonly size="4" tabindex="-1" type="text"></td>
                            <td><input autocomplete="off" name="en" readonly size="4" tabindex="-1" type="text"></td>
                            <td><input autocomplete="off" name="an" readonly size="4" tabindex="-1" type="text"></td>
                            <td><input autocomplete="off" name="dn" readonly size="4" tabindex="-1" type="text"></td>
                            <td class="impos-rb-values"><input autocomplete="off" name="in" readonly size="4" tabindex="-1" type="text"></td>
                        </tr>
                        <tr class="stance-rb-mod-row agg-war-row" valign="top">
                            <td class="offensive-stance">Wary</td>
                            <td class="defensive-stance">Aggr.</td>
                            <td class="basic-rb-values"><input autocomplete="off" name="bw" readonly size="4" tabindex="-1" type="text"></td>
                            <td><input autocomplete="off" name="ew" readonly size="4" tabindex="-1" type="text"></td>
                            <td><input autocomplete="off" name="aw" readonly size="4" tabindex="-1" type="text"></td>
                            <td><input autocomplete="off" name="dw" readonly size="4" tabindex="-1" type="text"></td>
                            <td class="impos-rb-values"><input autocomplete="off" name="iw" readonly size="4" tabindex="-1" type="text"></td>
                        </tr>
                        <tr class="stance-rb-mod-row ber-def-row" valign="top">
                            <td class="offensive-stance">Def.</td>
                            <td class="defensive-stance">Bers.</td>
                            <td class="basic-rb-values"><input autocomplete="off" name="bd" readonly size="4" tabindex="-1" type="text"></td>
                            <td><input autocomplete="off" name="ed" readonly size="4" tabindex="-1" type="text"></td>
                            <td><input autocomplete="off" name="ad" readonly size="4" tabindex="-1" type="text"></td>
                            <td><input autocomplete="off" name="dd" readonly size="4" tabindex="-1" type="text"></td>
                            <td class="impos-rb-values"><input autocomplete="off" name="id" readonly size="4" tabindex="-1" type="text"></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="rb-plus-new" onclick="addRbContainer();"></div>
    </div>
</body>


   [Go to the old RB calculator](/rank-bonus-calculator-classic/)


##### Rank Bonus gained per Rank learned
Rank bonus improves quickly at low skill ranks, but then begins to increase at a reduced rate per rank as you become more skilled.

| Rank | Rank Bonus Added |
| --- | --- |
| 1-10 | 3 |
| 11-30 | 2 |
| 31-50 | 1 |
| 51-100 | 0.5 |
| 101-150 | 0.25 |
| 151-200 | 0.125 |
| 201-500 | 0.0675 |
| 501-1000 | 0.025 |
| 1001 and Up | 0.01 |

##### Basic Rank Bonus Contribution toward Sub-Skill Rank Bonus
 Your sub-skills gain an additional bonus from your knowledge in the skill basics. The bonus is highest for Easy skills, which absorb 75% of your basic skill rank bonus.
 
Only each full point of basics rank bonus will add a fraction to the subskill rank bonus (i.e. 34.5 in the "Basic" column is no better than 34).

| Subskill Difficulty | Rank Bonus Added |
| --- | --- |
| Easy | 75% |
| Average | 50% |
| Difficult | 25% |
| Impossible | 10% |

##### Rank Bonus Modification by Stance

Combat skill rank bonuses are affected by your combat stance. Offensive skills get their full rank bonus benefit if you are in a Berserk stance. However, your defensive skills will be effectively useless in a Berserk stance (and vice versa).

Non-combat skills always get 100% of their rank bonus in any stance.

| Stance | Attack Rank Bonus | Defense Rank Bonus |
| --- | --- | --- |
| Berserk | 100% | 0% |
| Aggressive | 75% | 25% |
| Normal | 50% | 50% |
| Wary | 25% | 75% |
| Defensive | 0% | 100% |

##### Rank Bonus for Multiple Layers of Defense
If you have multiple defenses against an attack, you'll see the full benefit of your defensive skill with the highest rank bonus, but additional "layers" of defense will only provide you a fraction of their full rank bonus.
       (Note: Only the whole number portion of your rank bonus is used to determine success with a skill. However, the decimal portion is used to determine the highest-RB skill for defensive layering.)

| Defensive Skill | Cumulative Effect |
| --- | --- |
| Block/dodge with highest rank bonus | 100% of rank bonus applied |
| Block/dodge with 2nd highest rank bonus | 50% of rank bonus applied |
| Block/dodge with 3rd highest rank bonus | 33% of rank bonus applied |

 You are allowed at most only 3 layers of defense against any attack (1 weapon block layer, 1 dodge layer, and 1 shield layer). There are some scenarios where two different dodges or two different weapon blocks could potentially apply against an attack. In these scenarios, only the block or dodge with the highest rank bonus is used.

##### Notes
 The calculator will allow you to enter a subskill rank higher than your basics rank, which is impossible in-game. This is to facilitate calculating skills which may not assign the basics rank bonus in a standard way.
