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
        /*toggle for stories*/
        $(".toggle").slideUp(0);
        $(".trigger").click(function () {
            $(this).next(".toggle").slideToggle("slow"); });

        /*toggle for navigation panel*/
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
        var comment;var comments_array;
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
            /*<hr class="style3">*/
            var hr = document.createElement("hr");
            hr.className = "horizontal";
            div2.appendChild(hr);

            var comment_div = document.createElement("div");

            if(json_array[i].hasOwnProperty('comments'))
            {

                var comment_label = document.createElement("LABEL");
                comment_label.innerHTML = "Comments :";
                comment_div.appendChild(comment_label);
                comment_div.appendChild(document.createElement("br"));
                var comments_array = json_array[i].comments;
                console.log(comments_array);

                for(var j=0;j<comments_array.length;j++)
                {
                    var by = document.createElement("Label");
                    by.innerHTML = comments_array[j].by;
                    var comment = document.createElement("textarea");
                    comment.innerHTML = comments_array[j].comment;
                    comment.readOnly = true;
                    console.log(by+" "+comment);
                    comment_div.appendChild(by);
                    comment_div.appendChild(document.createElement("br"));
                    comment_div.appendChild(comment);
                    comment_div.appendChild(document.createElement("br"));
                }

            }
            else
            {
                var comment_label = document.createElement("LABEL");
                comment_label.innerHTML = "No Comments";
                comment_div.appendChild(comment_label);
            }
            div2.appendChild(comment_div);


            div.appendChild(div2);
            story.appendChild(div);
        }
    });
}

