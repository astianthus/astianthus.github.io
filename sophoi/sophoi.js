function toggle(element) {
    if (element.classList.contains("include")) {
        element.classList.remove("include");
        element.classList.add("exclude");
    } else if (element.classList.contains("exclude")) {
        element.classList.remove("exclude");
    } else {
        element.classList.add("include");
    }
    updateSearch();
}

function updateSearch() {
    const include = Array.from(document.getElementsByClassName("include")).map((e) => e.innerHTML);
    const exclude = Array.from(document.getElementsByClassName("exclude")).map((e) => e.innerHTML);
    var count = 0;
    for (const [id, inv] of Object.entries(data)) {
        const consonants = inv["c"].split(" ");
        var good = true;
        for (const consonant of include) if (!consonants.includes(consonant)) good = false;
        for (const consonant of exclude) if (consonants.includes(consonant)) good = false;
        if (good) {
            document.getElementById(id).style.display = "block";
            count += 1;
        } else {
            document.getElementById(id).style.display = "none";
        }
    }
    document.getElementById("rescount").innerHTML = count;
}

function show(id) {
    const consonants = data[id]["c"].split(" ");
    let filtered = [[""]];
    let showcol = [true];
    let showrow = [true];
    for (let j = 1; j < table[0].length; j++) {
        filtered[0].push(table[0][j][0]);
        showcol.push(false);
    }
    for (let i = 1; i < table.length; i++) {
        filtered.push([table[i][0][0]]);
        showrow.push(false);
        for (let j = 1; j < table[i].length; j++) {
            filtered[i].push("")
            for (let k = 0; k < table[i][j].length; k++) {
                if (consonants.includes(table[i][j][k])) {
                    filtered[i][j] += table[i][j][k] + ' ';
                    showrow[i] = true;
                    showcol[j] = true;
                }
            }
            filtered[i][j] = filtered[i][j].trim();
        }
    }
    let display = "";
    for (let i = 0; i < filtered.length; i++) {
        if (!showrow[i]) continue;
        display += "<tr>"
        for (let j = 0; j < filtered[i].length; j++) {
            if (!showcol[j]) continue;
            if (i == 0 || j == 0) display += "<th>" + filtered[i][j] + "</th>";
            else display += "<td>" + filtered[i][j] + "</td>";
        }
        display += "</tr>"
    }
    document.getElementById("langtitle").innerHTML = data[id]["n"];
    document.getElementById("langinfo").innerHTML = data[id]["n"] + ", as provided to Phoible through " + data[id]["s"] + " (<a href=\"https://phoible.org/inventories/view/" + id + "\">link</a>), has the following " + consonants.length + " consonants:";
    document.getElementById("langtable").innerHTML = display;
    document.getElementById("clicks").style.display = (data[id]["x"] == "" ? "none" : "block");
    document.getElementById("clicklist").innerHTML = data[id]["x"];
    document.getElementById("vowels").style.display = "block";
    document.getElementById("vowellist").innerHTML = data[id]["v"];
}