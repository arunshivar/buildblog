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

function readData()
{
    /*Js for expand and collapse divs in dashboard*/
    $(document).ready(function ()
    {
        $(".toggle").slideUp(0);
        $(".trigger").click(function () {
            $(this).next(".toggle").slideToggle("slow"); });

        $(".sublist").slideUp(0);
        $(".list").click(function ()
        {
            console.log($(this));
            $(this).next(".sublist").slideToggle("slow"); });

    });



    loadJSON(function(response)
    {
        // Parse JSON string into object
        var json_object = JSON.parse(response);
        var json_array = json_object.blogs;
        console.log(json_array);
        var h2;
        var p;
        var date;
        var div;var div2;
        var story = document.getElementsByClassName("story")[0];
        var blogTitle = document.getElementsByClassName("blogTitle")[0];
        blogTitle.innerHTML = json_object.blog_title;

        for(var i = 0; i < json_array.length; i++)
        {
            div = document.createElement("div");
            div.id = "box";
            //div = document.getElementById("box");
            div.style.borderWidth = "1px";
            div.style.borderStyle = "solid";
            div.style.padding = "20px";

            console.log(json_array[i].date);
            if(json_array[i].hasOwnProperty('date'))
            {
                date = document.createElement("LABEL");
                date.id = "date";
                date.innerHTML = json_array[i].date;
                date.style.cssFloat = "right";
                div.appendChild(date);
            }

            h2 = document.createElement("h2");
            h2.className = 'trigger';
            h2.innerHTML = json_array[i].title;
            /*h2.addEventListener('click', function() {
                toggle();
            }, false);*/
            div.appendChild(h2);

            div2 = document.createElement("div");
            div2.className = "toggle";
            p = document.createElement("p");
            //p.id = 'content';
            p.innerHTML = json_array[i].content;
            //p.style.display = "none";
            div2.appendChild(p);
            div.appendChild(div2);
            story.appendChild(div);






            /*h2 = document.createElement("h2");
            h2.className = 'trigger';
            h2.innerHTML = json_array[i].title;
            /!*h2.addEventListener('click', function() {
                toggle();
            }, false);*!/
            story.appendChild(h2);

            var div = document.createElement("div");
            div.className = "toggle";
            p = document.createElement("p");
            //p.id = 'content';
            p.innerHTML = json_array[i].content;
            //p.style.display = "none";
            div.appendChild(p);
            story.appendChild(div);
*/

        }
    });
}

