# Shops

There are many shops, bars, armories, and other vendors throughout Midlight, each offering a unique stock of items. This page attempts to chronicle those items for the discerning shopper.

Keep in mind that the prices listed here are only a rough guide. If your character is charismatic or has certain bartering traits, such as Trader's Tongue, you'll probably fetch better prices than those listed here. In addition, certain shopkeepers such as Belhrad rotate their stock with unique and unpredictable items. For such shopkeepers, the items listed here (marked with a ##green|☘## symbol) are only examples of what you might find for sale.

You can search by item or shopkeeper name.

**Note on *Franlius* Shopkeepers:**


size 100%The **[Town of Franlius](/town-of-franlius/)** is currently **under attack by undead soldiers**, due to an ongoing storyline run by the Game Masters.


<head>
<base target="_parent">
<script src="https://eternal-city.wikidot.comhttps://eternal-city.wdfiles.com/local--files/files/shop_inventories_2026_03_26.txt"></script>
<script type="text/javascript">

//SHOP_DATA is defined in the shop_inventories text file. You must edit the file if you want to update any shop details.
//The most recent version of this file is shop_inventories_2026_03_26.txt (last updated by Dragonus).
//Unfortunately it had to be stored in a separate file because otherwise it exceeded the Wikidot page character limit.
//If you want to edit the file but you can't figure it out, feel free to ask Irisa for help.

var shopData = SHOP_DATA;

var state = "unfiltered";
var noResultsRowCreated = false;
var searchEntryTimeout = null;

createStyleSheet();
startMainContentContainer();
createSearchBar();
createShopTable();
endMainContentContainer();
createTOC();


function createShopTable() {
  var locationMatch, shopNameMatch, itemMatch, i, m;
  var shopInfo = shopData.split("\n");
    var locationRegex = new RegExp(/^\s*\*\*\*([^\*]+)\*\*\*(?:\s*\[\s*wikipage\s*=\s*(.+)\s*\])?/);  //[1]=location name [2]=wikipage
    var shopNameRegex = new RegExp(/^\s*---((?:(?!\().)+?)\s*(?:\(([^\)]+)\))?---(?:\s*\[.*(rotating.*stock).*\])?/);  //[1]=shop name [2]=shopkeeper [3]=rotating stock tag
  var itemRegex = new RegExp(/^\s*((?:(?!---|\*\*\*)[^\n])+?)\s*((?:\d+(?:t|d|st|s| tokens)\b\s*)+)\s*(?:\[\s*([^\]]+?)\s*\]\s*)?$/);  //[1]=item [2]=price [3]=options
  
  document.write("<table id=\"shop-table\"><tbody></tbody></table>");
    var shopTbl = document.getElementById("shop-table").getElementsByTagName("tbody")[0];
  
    for (i=0;i<shopInfo.length;i++) {
    if (shopInfo[i].trim().length === 0) { continue; } //skip empty lines
    m = shopInfo[i].match(itemRegex);
    if (m) { itemMatch = m; addShopTableRow(shopTbl, locationMatch, shopNameMatch, itemMatch); }
    m = shopInfo[i].match(shopNameRegex);
    if (m) { shopNameMatch = m; addShopTableRow(shopTbl, locationMatch, shopNameMatch); }
    m = shopInfo[i].match(locationRegex);
    if (m) { locationMatch = m; addShopTableRow(shopTbl, locationMatch); }
  }
}

function addShopTableRow(tbl, locObj, shopObj, itemObj) {
  var header, tr, td1, td2, td3, td4, div, span, a;
    tr = document.createElement("tr");
  td1 = document.createElement("td");
  
  if (locObj === undefined) { return; } //error
  
  if (shopObj === undefined) { //location
    tr.classList.add("location-name");
    header = document.createElement("h2");
        header.id = "toc-" + locObj[2];
        header.classList.add("toc-location");
        header.appendChild(document.createTextNode(locObj[1]));
    td1.appendChild(header);
    td1.colSpan = "4";
    tr.appendChild(td1);
    
  } else if (itemObj === undefined) { //shop name
    tr.classList.add("shop-name");
    header = document.createElement("h3");
        header.appendChild(document.createTextNode(shopObj[1] + (shopObj[2] ? (" - " + shopObj[2]) : "")));
    td1.appendChild(header);
    td1.colSpan = "4";
    tr.appendChild(td1);
    
  } else { //item entry
    tr.classList.add("item-entry");
    if (shopObj[2]) { //add data element with the shopkeeper's name
      tr.setAttribute("data-shopkeeper", shopObj[2].trim().toLowerCase());
    }
    td1.classList.add("item-name");
    td1.appendChild(document.createTextNode(itemObj[1]));
    if (shopObj[3]) { //add tooltip with rotating stock indicator
      td1.classList.add("rotating-stock")
      div = document.createElement("div");
      div.classList.add("tooltip");
      div.classList.add("rotating-stock");
      div.appendChild(document.createTextNode("\u2618")); //prevously used 21ba
      span = document.createElement("span");
      span.classList.add("tooltiptext");
      span.appendChild(document.createTextNode("example item (rotating stock)"))
      div.appendChild(span);
      td1.appendChild(div);
    }
    if (itemObj[3]) { //add tooltip with additional shop options for item
      div = document.createElement("div");
      div.classList.add("tooltip");
      div.classList.add("more-info");
      div.appendChild(document.createTextNode("?"));
      span = document.createElement("span");
      span.classList.add("tooltiptext");
      span.appendChild(document.createTextNode(itemObj[3]))
      div.appendChild(span);
      td1.appendChild(div);
    }
    td2 = document.createElement("td");
    td2.classList.add("item-value");
    td2.appendChild(document.createTextNode(itemObj[2]));
    td3 = document.createElement("td");
    td3.classList.add("shop-name-column");
    td3.appendChild(document.createTextNode(shopObj[1] + (shopObj[2] ? (" - " + shopObj[2]) : "")));
    td4 = document.createElement("td");
    td4.classList.add("location-column");
    if (locObj[2] === undefined) { //plain text if no wikipage provided
      td4.appendChild(document.createTextNode(locObj[1]));
    } else { //create hyperlink to map page
      a = document.createElement("a");
      a.appendChild(document.createTextNode(locObj[1]));
      a.title = "Map of " + locObj[1];
      a.href = "https://eternal-city.wikidot.com/" + locObj[2];
      a.target = "_blank";
      td4.appendChild(a);
    }
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
  }
  
  //append the row we created
  tbl.appendChild(tr);
}


function createStyleSheet() {
  var styleSheet = `
<style>
body {
    background-color: rgb(121, 121, 106);
    font-family: verdana,arial,helvetica,sans-serif;
    font-size: 0.75em;
}
.intro-chunk {
    padding-bottom: 20px;
    border-bottom: 1px solid #ADADA4;

    /* font-family included here only to fix shamrock character in MS Edge browser */
    font-family: verdana,arial,helvetica,sans-serif,'Segoe UI Symbol'
}
#main-shop-info-container {
    float: left;
}
#shop-location-toc-title {
    margin-bottom:12px;
    font-size:115%;
    font-weight:bold;
}
#shop-location-toc {
    margin: 10px 2px 0 0;
    display: inline-block;
    padding: 25px 0;
    float: right;
    text-align: center;
    width: 280px;
    border: 2px solid #737365;
    background: #717162;
    border-radius: 6px;
    box-shadow: 0px 0px 2px 0px black;
}
#shop-location-toc p {
    margin: 0px;
}
#shop-location-toc p a {
    color: #DDDDAA;
    cursor: pointer;
    text-decoration: underline;
}
@media screen and (max-width: 970px) {
    #shop-location-toc {
        display: none !important;
    }
}


/* Searchbar */
.search-bar-container {
    max-width: 95%;
    margin-top: 10px;
    margin-bottom: 15px;
}
.search-bar-container td:first-child {
    width:600px;
}
.search-form {
    margin-right: 8px;
}
input[type=text] {
  width: 100%;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    font-size: 125%;
    background-color: white;
    background-image: url('https://www.w3schools.com/css/searchicon.png');
    background-position: 10px 10px;
    background-repeat: no-repeat;
    padding: 12px 20px 12px 40px;
    margin: 2px 0 0 0;
}


/* Search option toggles */
.switch {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 34px;
  height: 18px;
}
.switch input {display:none;}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #6d6d5f;
  -webkit-transition: .4s;
  transition: .4s;
  box-shadow: 0px 0px 1px 0px lightgrey;
}
.slider:before {
  position: absolute;
  content: "";
  height: 12px;
  width: 12px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}
input:checked + .slider {
  background-color: #44443b;
}
input:focus + .slider {
  box-shadow: 0 0 1px #44443b;
}
input:checked + .slider:before {
  -webkit-transform: translateX(16px);
  -ms-transform: translateX(16px);
  transform: translateX(16px);
}
.slider.round {
  border-radius: 16px;
}
.slider.round:before {
  border-radius: 50%;
}


/* Searchbar hamburger */
.search-hamburger {
    display: inline-block;
    cursor: pointer;
}
.hamburger-bar-1, .hamburger-bar-2, .hamburger-bar-3 {
    width: 35px;
    height: 5px;
    background-color: #37372f;
    margin: 6px 0;
    transition: 0.4s;
}
.change .hamburger-bar-1 {
    -webkit-transform: rotate(-45deg) translate(-8px, 7px);
    transform: rotate(-45deg) translate(-8px, 7px);
}
.change .hamburger-bar-2 {opacity: 0;}
.change .hamburger-bar-3 {
    -webkit-transform: rotate(45deg) translate(-8px, -8px);
    transform: rotate(45deg) translate(-8px, -8px);
}


/* Search option accordian and labels */
.search-op {
  padding:5px 0;
}
.search-op.search-note {
    font-style: italic;
    color: #6d6d5f;
    padding-top: 8px;
    text-align: right;8;
}
#search-op-accordian {
   display:none;
   padding: 0 20px 6px 20px;
   border: 2px solid #ccc;
   border-radius: 4px;
   box-shadow: 0px 0px 2px 0px black;
}
#search-op-accordian h3 {
   margin: 0 -20px 2px -20px;
   padding: 2px 0 5px 14px;
   /* background-color: #717162;*/
   
}
.slider-label {
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
  margin-left:4px;
  font-size: 115%;
}


/* Main shop table */
#shop-table {
    border-collapse: collapse;
  border: 0px;
  padding: 0px 6px 6px 6px;
}
#shop-table .location-name td h2 {
    margin-bottom: 0px;
    margin-top: 35px;
    border-bottom: 1px solid rgb(200, 200, 200);
}
#shop-table .shop-name td h3 {
  margin-top: 24px;
    margin-bottom: 8px;
}
#shop-table td.shop-name-column, #shop-table td.location-column {
    display:none; /* default view: hide shopkeeper & location columns */
}
#shop-table td {
    padding: 0.2em 0.7em;
    border: 0px; /* default view: no table borders */
}
#shop-table .item-name.rotating-stock {
  font-style:italic;
}
#shop-table tr.location-name h2 {
    font-size: 200%;
}
#shop-table tr.shop-name h3 {
    border: 2px solid #737365;
    /* background: #717162;*/
    background-color: #315203;
    border-radius: 6px;
    margin-left: -8px;
    padding-left: 6px;
    font-weight: normal;
    font-size: 130%;
    margin-bottom:2px;
    color: #FFFFFF;
}
#shop-table tr:first-child td {
    padding-top: 0px;
}
#shop-table tr:first-child td h2 {
    margin-top: 0px;
}


/* Tooltips */
.tooltip
{
    cursor: help;
    position: relative;
    display: inline-block;
    width: 1.8ex;
    height: 1.8ex;
    line-height: 1.8ex;
    border-radius: 1.2ex;
    color: #c4c4ba;
    background: #6d6d5f;
    border: 1px solid #b7b7ae;
    margin-left: 4px;
    text-align: center;
}
.tooltip.more-info {
    padding: 1px;
    font-size: 1.4ex;
    font-weight: bold;
    font-style: normal;
}
.tooltip.rotating-stock {
    font-size: 1.7ex;
    font-style: normal;
    font-family: verdana,arial,helvetica,sans-serif,'Segoe UI Symbol'; /* this line is only to fix icon rendering in Edge */
    color: green !important;
}
.tooltip .tooltiptext {
    visibility: hidden;
    width: 300px;
    background-color: #5f5f53;
    border: 1px solid #b7b7ae;
    color: #fff;
    text-align: center;
    border-radius: 12px;
    padding: 8px 11px;
    
    position: absolute;
    z-index: 1;
    top: -10px;
    left: 105%;
    margin-left: 1px;
    
    height: unset;
    font-size: 9pt;
    line-height: normal;
    font-weight: normal;
}
.tooltip.rotating-stock .tooltiptext {
  width: 16em;
}
.tooltip:hover .tooltiptext {
    visibility: visible;
}
</style>
  
  `;
  document.write(styleSheet);
}


function startMainContentContainer() {
    document.write("<div id=\"main-shop-info-container\">");
}
function endMainContentContainer() {
    document.write("</div>");
}


function createSearchBar() {
    var searchbarHtml = `
    <table class="search-bar-container">
      <tr>
        <td>
          <form class="search-form" autocomplete="off">
            <input type="text" id="shop-search-input" size="20" value="" placeholder="Search Midlight for items..." oninput="processSearchEntry()" onkeypress="return event.keyCode!=13" />
          </form>
        </td>
        <td valign="middle">
          <div class="search-hamburger" onclick="squeezeHamburger(this)" title="Show search options">
            <div class="hamburger-bar-1"></div>
            <div class="hamburger-bar-2"></div>
            <div class="hamburger-bar-3"></div>
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <div id="search-op-accordian">
            <h3>Search options</h3>
            <div class="search-op">
              <label class="switch">
                <input type="checkbox" onclick="updateSearchOps()" id="op-search-shopkeeper-name" checked>
                <span class="slider round"></span>
              </label>
              <div class="slider-label">
                Search shopkeeper names
              </div>
            </div>
            <div class="search-op">
              <label class="switch">
                <input type="checkbox" onclick="updateSearchOps()" id="op-search-rotating-stock" checked>
                <span class="slider round"></span>
              </label>
              <div class="slider-label">
                Search example rotating stock items
              </div>
            </div>
            <div class="search-op">
              <label class="switch">
                <input type="checkbox" onclick="updateSearchOps()" id="op-search-item-options">
                <span class="slider round"></span>
              </label>
              <div class="slider-label">
                Search item options (color, etc.) in addition to item/shopkeeper name
              </div>
            </div>
            <div class="search-op search-note">
              Use double quotes "" to search for an exact word or phrase
            </div>
          </div>
        </td>
      </tr>
    </table>
    `;
    document.write(searchbarHtml);
}


function createTOC() {
    var i, tocHtml;
    var locs = document.getElementsByClassName("toc-location");
    tocHtml = "<div id=\"shop-location-toc\"><div id=\"shop-location-toc-title\">Table of Contents</div>"
    for (i=0;i<locs.length;i++) {
      tocHtml = tocHtml + "<p><a scrollTarget=\"" + locs[i].id + "\">" + locs[i].textContent + "</a></p>";
    }
    tocHtml = tocHtml + "</div>";
    document.write(tocHtml);

    //add onclick scroll events
    var locLinks = document.querySelectorAll("#shop-location-toc a");
    for (i=0;i<locLinks.length;i++) {
      locLinks[i].addEventListener("click", scrollTo);
    }

}


function scrollTo(evt) {
    var targetElement = evt.target || evt.srcElement;
    locId = targetElement.getAttribute("scrollTarget");
    document.getElementById(locId).scrollIntoView();
}


function squeezeHamburger(hamButton) {
    hamButton.classList.toggle("change");
    var advOpsPanel = document.getElementById("search-op-accordian");
    if (hamButton.classList.contains("change")) {
      advOpsPanel.style.display = "block";
      hamButton.setAttribute("title", "Hide search options");
    } else {
      advOpsPanel.style.display = "none";
      hamButton.setAttribute("title", "Show search options");
    }
}


function updateSearchOps() {
    updateShopPage();
    //TBA

/* EXAMPLE:
    if (document.getElementById("op-search-item-options").checked && document.getElementById("op-search-rotating-stock").checked) {
      document.getElementById("tester-p").innerHTML = "status: both";
    } else if (document.getElementById("op-search-item-options").checked) {
      document.getElementById("tester-p").innerHTML = "status: item ops";
    } else if (document.getElementById("op-search-rotating-stock").checked) {
      document.getElementById("tester-p").innerHTML = "status: rotating stock";
    } else {
      document.getElementById("tester-p").innerHTML = "status: neither";
    }
*/

}


function getSearchTerms(searchStr) {
    if (searchStr.length === 0) { return []; }
    var i, str;

    //QUOTED search terms & phrases
    var quotedTerms = searchStr.match(/"[^"]+"/g); //put qtd phrases in array
    if (!quotedTerms) {quotedTerms = [];}
    else {searchStr = searchStr.replace(/"[^"]+"/g, "");} //remove qtd phrases from search string
    for (i=0;i<quotedTerms.length;i++) {
        //remove " character, trim, and lowercase quoted phrase
        str = quotedTerms[i].substring(1,quotedTerms[i].length-1).trim().toLowerCase();
        //escape string for regex
        str = str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        //generate regex - for quoted string, must match whole phrase with word boundary on both sides
        quotedTerms[i] = new RegExp("\\b" + str + "\\b");
    }

    //SINGLE WORD search terms
    var searchTerms = searchStr.match(/[\w-']+/g); //put remaining single wds into array
    if (!searchTerms) {searchTerms = [];}
    for (i=0;i<searchTerms.length;i++) {
        //trim and lowercase
        str = searchTerms[i].trim().toLowerCase();
        //escape string for regex
        str = str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        //generate regex - for normal terms, must match only beginning of word (boundary on front)
        searchTerms[i] = new RegExp("\\b" + str);
    }

    searchTerms = searchTerms.concat(quotedTerms); //combine all search items into single array
    return searchTerms;
}


function processSearchEntry() {
    var searchBox = document.getElementById("shop-search-input");
    searchBox.style.backgroundImage = "url('https://www.w3schools.com/css/searchicon.png'), url('https://loadinggif.com/images/image-selection/3.gif')";
    searchBox.style.backgroundPosition = "10px 10px, right 10px center";

    var timeoutVal;
    //delay processing of keystrokes in searchbox until user enters more than 2 characters or stops typing for 500ms
    clearTimeout(searchEntryTimeout);
    var searchStr = document.getElementById("shop-search-input").value;
    if (!searchStr || searchStr.length > 3) {
        timeoutVal = 20;
    } else {
        timeoutVal = 600;
    }
    searchEntryTimeout = setTimeout(updateShopPage, 400);
}


function updateShopPage() {
    if (!noResultsRowCreated) { noResultsRowCreated = true; createNoResultsRow(); }
    var searchBox = document.getElementById("shop-search-input");
    var searchStr = searchBox.value;
    var terms = getSearchTerms(searchStr);

    filter(terms);

    searchBox.style.backgroundImage = "url('https://www.w3schools.com/css/searchicon.png')";
    searchBox.style.backgroundPosition = "10px 10px";
}

function createNoResultsRow() {
    var tableRef = document.getElementById("shop-table").getElementsByTagName('tbody')[0];
    var newRow   = tableRef.insertRow(tableRef.rows.length);
    newRow.id = "no-results-row";
    newRow.style.display = "none";
    var newCell  = newRow.insertCell(0);
    newCell.colSpan = "4";
    var div1 = document.createElement("div");
    var div2 = document.createElement("div");
    newCell.appendChild(div1);
    newCell.appendChild(div2);
    div1.style.paddingBottom = "1.2em";
    div1.style.fontSize = "125%";
    div1.appendChild(document.createTextNode("That is not for sale here."));
    div2.style.color = "rgb(171,171,162)";
    div2.style.fontStyle = "italic";
    div2.style.paddingBottom = "0.5em";
    div2.appendChild(document.createTextNode("Clear the search bar to return to the full list of shop items."));
    newCell.style.width = "100%";
}


function filterItems(filterRegexes) {
    if (filterRegexes.length === 0) { filterItemsShowAll(); return; }
    var elems, itemName, opElem, match, txt, i, j;
    var visibleCt = 0;
    var searchInOptions = document.getElementById("op-search-item-options").checked;
    var searchShopkeeper = document.getElementById("op-search-shopkeeper-name").checked;
    var includeRotatingStock = document.getElementById("op-search-rotating-stock").checked;
 
    elems = document.getElementsByClassName("item-entry");

    for (i=0;i<elems.length;i++) {
        match = true;
        itemName = elems[i].getElementsByClassName("item-name")[0];

        if (!includeRotatingStock && itemName.classList.contains("rotating-stock")) {
            //If user wants to exclude rotating stock, set match=false to hide this item
            match = false;

        } else {

          shopkeeper = elems[i].getAttribute("data-shopkeeper");
          txt = itemName.firstChild.nodeValue.toLowerCase();

          //if user wants to search options, add option details to txt
          if (searchInOptions) {
              opElem = itemName.querySelectorAll("div.tooltip.more-info span.tooltiptext");
              if (opElem.length > 0) {
                 txt = txt + " " + opElem[0].firstChild.nodeValue.toLowerCase();
              }
          }

          //if user wants to search shopkeeper name, add to txt
          if (searchShopkeeper) {
              txt = txt + " " + shopkeeper;
          }

          for (j=0;j<filterRegexes.length;j++) {
              if (!txt.match(filterRegexes[j])) {
                  match = false; break;
              }
          }

        }
        if (!match) { elems[i].style.display = "none"; }
        else { elems[i].style.display = "table-row"; visibleCt++; }
    }
    
    if (visibleCt === 0) {
        document.getElementById("no-results-row").style.display = "table-row";
    } else {
        document.getElementById("no-results-row").style.display = "none";
    }
}

function filterItemsShowAll() {
    var elems, i;
    document.getElementById("no-results-row").style.display = "none";
    elems = document.getElementsByClassName("item-entry");
    for (i=0;i<elems.length;i++) {
        elems[i].style.display = "table-row";
    }
}


function filter(searchStrArray) {
  var i;
  var elems;
  var table;
  if ((state == "unfiltered") && (searchStrArray.length > 0)) {
    state = "filtered";
    document.getElementById("shop-location-toc").style.display = "none";
    document.getElementById("main-shop-info-container").style.float = "none";

    table = document.getElementById("shop-table");
    elems = table.querySelectorAll(".location-name, .shop-name");
    for (i=0;i<elems.length;i++) {
      elems[i].style.display = "none";
    }
    elems = table.getElementsByTagName("td");
    table.style.width = "95%";
    table.style.backgroundColor = "rgb(237,237,237)";
    table.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
    for (i=0;i<elems.length;i++) {
      elems[i].style.borderBottom = "1px solid rgb(136,136,136)";
      elems[i].style.color = "rgb(91,91,82)";
      elems[i].style.padding = "0.5em 2.4em 0.5em 1.1em";
    }
    elems = table.querySelectorAll("td.shop-name-column, td.location-column");
    for (i=0;i<elems.length;i++) {
      elems[i].style.display = "table-cell";
    }
    elems = table.getElementsByClassName("tooltip");
    for (i=0;i<elems.length;i++) {
      elems[i].style.color = "#959583";
      elems[i].style.background = "#d9d9d9";
      elems[i].style.borderColor = "#bbbbbb";
    }
  } else if ((state == "filtered") && (searchStrArray.length === 0)) {
    state = "unfiltered";
    document.getElementById("shop-location-toc").style.display = "inline-block";
    document.getElementById("main-shop-info-container").style.float = "left";
    
    table = document.getElementById("shop-table");
    elems = table.querySelectorAll(".location-name, .shop-name");
    for (i=0;i<elems.length;i++) {
      elems[i].style.display = "table-row";
    }
    elems = table.querySelectorAll("td.shop-name-column, td.location-column");
    for (i=0;i<elems.length;i++) {
      elems[i].style.display = "none";
    }
    elems = table.getElementsByTagName("td");
    table.style.width = "unset";
    table.style.backgroundColor = "unset";
    table.style.boxShadow = "unset";
    for (i=0;i<elems.length;i++) {
      elems[i].style.border = "0px";
      elems[i].style.color = "var(--color-body)";
      elems[i].style.padding = "0.2em 0.7em";
    }
    elems = table.getElementsByClassName("tooltip");
    for (i=0;i<elems.length;i++) {
      elems[i].style.color = "#c4c4ba";
      elems[i].style.background = "#6d6d5f";
      elems[i].style.borderColor = "#b7b7ae";
    }
  }
  filterItems(searchStrArray); //hide or show individual items
}
</script>
<style>
#warn-ie-browser {
    display: none;
}
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
   #warn-ie-browser {
       display: block;
       padding: 3em 0.5em;
       color: white;
       font-style: italic;
   }
}
</style>
</head>
<div id="warn-ie-browser">
   Not working? Enable javascript, use a different browser, or go to the <a href="/shops-old/">old shops page</a>.
</div>
<div id="page-buffer" style="height:400px;" />


Loading...
