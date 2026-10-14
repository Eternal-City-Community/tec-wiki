// Biography validation module. No publishing endpoint is enabled by this module.
const nations = new Set(["Aestivan League","Altene","Cinera","Gadaene","Iridine","Parcines","Remath","Safelands","Sostarea","Tuchea","Windward"]);
const organizations = new Set(["Divortium Auxilii","Iridine Constables","Legio","Black Centurions","Harbor Rats","Umbra Alati","Monlon Volunteer Guard","Seld Sentinels","Cult of Ereal","Soldiers of Ereal","Cruentus Laureola","Silver Wolves","Guild of Locksmiths","Healers of Light","Vestis Formatae","Diamond Eye","Slime Squad"]);
const lengths = {character_name:80,nationality:80,appearance:6000,background:30000,additional:8000};
function textField(value,max,field) {
  if(typeof value !== "string" || value.length > max) throw new Error("Invalid " + field);
  const text=value.trim().replace(/\r\n?/g,"\n");
  if(/[<>\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f\u202a-\u202e\u2066-\u2069]/u.test(text)) throw new Error("Unsupported characters in " + field);
  return text;
}
export function validateBiography(input) {
  if(!input || typeof input !== "object" || Array.isArray(input)) throw new Error("Invalid biography");
  const bio={};
  for(const [field,max] of Object.entries(lengths)) bio[field]=textField(input[field] ?? "",max,field);
  if(!/^[\p{L}\p{N}][\p{L}\p{N} '\-.,]{1,79}$/u.test(bio.character_name)) throw new Error("Invalid character name");
  if(bio.nationality && !nations.has(bio.nationality)) throw new Error("Invalid nationality");
  if(!Array.isArray(input.affiliations) || input.affiliations.length>25) throw new Error("Invalid affiliations");
  const names=input.affiliations.map(x=>textField(x,120,"organization"));
  if(names.some(x=>!x || /[\[\]{}!*#|`]/u.test(x))) throw new Error("Invalid organization name");
  bio.affiliations=[...new Set(names)];
  bio.known_affiliations=bio.affiliations.filter(x=>organizations.has(x));
  return bio;
}
export function biographySlug(name) {
  const slug=name.normalize("NFKD").toLowerCase().replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"");
  if(!slug || slug.length>70) throw new Error("Invalid character page slug");
  return "bio_"+slug;
}
export function biographyMarkdown(bio) {
  const esc=x=>x.replace(/\\/g,"\\\\").replace(/([*_`\[\]#])/g,"\\$1");
  const name=JSON.stringify(bio.character_name);
  const lines=["---","title: "+name,"character_name: "+name,'category: "Character Bios"',"parent: character-bios","---","","# "+esc(bio.character_name),""];
  function section(title,value){if(value)lines.push("## "+title,"",esc(value),"");}
  section("Nationality",bio.nationality);
  section("Appearance",bio.appearance);
  section("Background & History",bio.background);
  if(bio.affiliations.length){lines.push("## Organizations and Affiliations","");for(const item of bio.affiliations)lines.push("- "+esc(item));lines.push("");}
  section("Additional Details",bio.additional);
  return lines.join("\n");
}
