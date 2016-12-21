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
        var json_object = JSON.parse(response);
        var json_array = json_object.blogs;
        console.log(json_array);
        var h2;
        var p;
        var date;
        var div;
        var story = document.getElementsByClassName("story")[0];
        /*var blogTitle = document.getElementsByClassName("blogTitle");
        blogTitle.innerHTML = json_object.blog_title;*/
        for(var i = 0; i < json_array.length; i++)
        {
            div = document.createElement("div");
            div.id = "box";
            div.style.borderWidth = "1px";
            div.style.borderStyle = "solid";
            div.style.padding = "20px"

            console.log(json_array[i].date);
            if(json_array[i].hasOwnProperty('date'))
            {
                date = document.createElement("LABEL");

                date.innerHTML = json_array[i].date;
                div.appendChild(date);
            }
            h2 = document.createElement("h2");
            //h2.id = 'title';
            h2.innerHTML = json_array[i].title;
            div.appendChild(h2);
            p = document.createElement("p");
            //p.id = 'content';
            p.innerHTML = json_array[i].content;
            //p.style.display = "none";
            div.appendChild(p);

            story.appendChild(div);


            /*h2 = story.getElementById("title");
            h2.innerHTML = json_array[i].title;
            p = story.getElementById("content");
            p.innerHTML = json_array[i].content;*/

            /*var a = document.createElement("a");
            a.innerHTML = json_array[i].title;
            a.id = "title";
            a.href = "javascript:toggle();";
            story.appendChild(a);
            p = document.createElement("p");
            //p.id = 'content';
            p.innerHTML = json_array[i].content;
            story.appendChild(p);*/
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