function validate()
{

    var name = document.forms["login"]["username"].value;
    var password = document.forms["login"]["password"].value;
    if(name == 'arun' && password == 'arun' )
    {

        return true;
    }
    else
    {
        alert("Login Failed")
        return false;
    }

}

function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function readData() {
    loadJSON(function(response)
    {
        // Parse JSON string into object
        var json_array = JSON.parse(response);
        console.log(json_array);
        var h2;
        var p;
        var story = document.getElementsByClassName("story")[0];
        for(var i = 0; i < json_array.length; i++)
        {
            /*h2 = document.createElement("h2");
            //h2.id = 'title';
            h2.innerHTML = json_array[i].title;
            story.appendChild(h2);
            p = document.createElement("p");
            //p.id = 'content';
            p.innerHTML = json_array[i].content;
            //p.style.display = "none";
            story.appendChild(p);*/

            /*h2 = story.getElementById("title");
            h2.innerHTML = json_array[i].title;
            p = story.getElementById("content");
            p.innerHTML = json_array[i].content;*/

            var a = document.createElement("a");
            a.innerHTML = json_array[i].title;
            a.id = "title";
            a.href = "javascript:toggle();";
            story.appendChild(a);
            p = document.createElement("p");
            //p.id = 'content';
            p.innerHTML = json_array[i].content;
            story.appendChild(p);
            //p.style.display = "none";
           /* p.style.display="none";*/

            /*var br = document.createElement("br");
            story.appendChild(br);*/

        }
    });
}

function toggle()
{
    console.log("toggled");
    var ele = document.getElementById("title");
    var text = document.getElementById("content");

    if(text.style.display == "block")
    {
        text.style.display = "none";
    }
    else
    {
        text.style.display = "block";

    }
}