
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

    /*toggle for comments*/
    $(".commentTogdiv").slideUp(0);
    $(".commentLabel").click(function ()
    {
        console.log("commnetLabel Clicked");
        $(this).next(".commentTogdiv").slideToggle("slow"); });

});

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
function push()
{
    var jsonobject;
    loadJSON(function(response) {
        // Parse JSON string into object
        jsonobject = JSON.parse(response);


    console.log(jsonobject);
        console.log("PUSHING");
        var blogtitle = document.getElementById("blogtitle").value;
        var blogcontent = document.getElementById("blogcontent").value;

    if(localStorage.hasOwnProperty("jsonObject"))
    {
        console.log("has");
        jsonobject = JSON.parse(localStorage.getItem("jsonObject"));
    }
    else
    {
        /*json_object = JSON.parse(response);*/
        localStorage.setItem("jsonObject",JSON.stringify(jsonobject));

    }
    console.log(jsonobject);

    //var json_array = jsonobject.blogs;
    var date = getDate();
    var newObject = {"title":blogtitle.trim(), "date":date,"content":blogcontent.trim()};
    jsonobject.blogs.push(newObject);
     localStorage.setItem("jsonObject",JSON.stringify(jsonobject));

    console.log(jsonobject);
    });

}
function  getDate()
{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if(dd<10) {
        dd='0'+dd
    }
    if(mm<10) {
        mm='0'+mm
    }
    today = dd+' '+months[mm-1]+','+yyyy;
    console.log(today);
    return today;
}
function loadJSON(callback)
{
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

function readmyData()
{
    loadJSON(function(response)
    {
        // Parse JSON string into object
        var json_object = JSON.parse(response);

        if(localStorage.hasOwnProperty("jsonObject"))
        {
            console.log("has");
            json_object = JSON.parse(localStorage.getItem("jsonObject"));
        }
        else
        {
            /*json_object = JSON.parse(response);*/
            localStorage.setItem("jsonObject",JSON.stringify(json_object));

        }

        console.log(json_object);
        var json_array = json_object.blogs;
        console.log(json_array);
        var h2;
        var p;
        var date;
        var div;var div2;
        var comment;var comments_array;
        var story = document.getElementsByClassName("content")[0];
        //var blogTitle = document.getElementsByClassName("blogTitle")[0];
        /*var blogTitle = document.createElement("blogTitle");
        blogTitle.className = "blogTitle";
        blogTitle.innerHTML = json_object.blog_title;
        console.log(blogTitle);*/
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
            var comment_label = document.createElement("LABEL");
            comment_label.className = "commentLabel";
            if(json_array[i].hasOwnProperty('comments'))
            {
                comment_label.innerHTML = "Comments :";
                comment_div.appendChild(comment_label);
                /*comment_div.appendChild(document.createElement("br"));*/
                var comments_array = json_array[i].comments;
                console.log(comments_array);
                var comment_tog_div = document.createElement("div");
                comment_tog_div.className = "commentTogdiv";
                for(var j=0;j<comments_array.length;j++)
                {

                    var by = document.createElement("Label");
                    by.innerHTML = comments_array[j].by;
                    var comment = document.createElement("textarea");
                    comment.innerHTML = comments_array[j].comment;
                    comment.readOnly = true;
                    console.log(by+" "+comment);
                    comment_tog_div.appendChild(by);
                    comment_tog_div.appendChild(document.createElement("br"));
                    comment_tog_div.appendChild(comment);
                    comment_tog_div.appendChild(document.createElement("br"));

                    /*comment_div.appendChild(comment_tog_div);*/
                    /*comment_div.appendChild(by);
                     comment_div.appendChild(document.createElement("br"));
                     comment_div.appendChild(comment);
                     comment_div.appendChild(document.createElement("br"));*/
                }
                comment_div.appendChild(comment_tog_div);

            }
            else
            {
                /*var comment_label = document.createElement("LABEL");*/
                comment_label.innerHTML = "No Comments";
                comment_div.appendChild(comment_label);
            }
            div2.appendChild(comment_div);


            div.appendChild(div2);
            story.appendChild(div);
        }
    });
}

function readallData()
{
    loadJSON(function(response)
    {
        // Parse JSON string into object
        var json_object = JSON.parse(response);

        if(localStorage.hasOwnProperty("jsonObject"))
        {
            console.log("has");
            json_object = JSON.parse(localStorage.getItem("jsonObject"));
        }
        else
        {
            /*json_object = JSON.parse(response);*/
            localStorage.setItem("jsonObject",JSON.stringify(json_object));

        }

        console.log(json_object);
        var json_array = json_object.blogs;
        console.log(json_array);
        var h2;
        var p;
        var date;
        var div;var div2;
        var comment;var comments_array;
        var story = document.getElementsByClassName("content")[0];
        //var blogTitle = document.getElementsByClassName("blogTitle")[0];
        /*var blogTitle = document.createElement("blogTitle");
         blogTitle.className = "blogTitle";
         blogTitle.innerHTML = json_object.blog_title;
         console.log(blogTitle);*/
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
            var comment_label = document.createElement("LABEL");
            comment_label.className = "commentLabel";
            var comment_form = document.createElement("form");
            var new_comment = document.createElement("textarea");
            var submit_comment = document.createElement("button");
            var comment_tog_div = document.createElement("div");
            if(json_array[i].hasOwnProperty('comments'))
            {
                comment_label.innerHTML = "Comments :";
                comment_div.appendChild(comment_label);
                /*comment_div.appendChild(document.createElement("br"));*/
                var comments_array = json_array[i].comments;
                console.log(comments_array);

                comment_tog_div.className = "commentTogdiv";
                for(var j=0;j<comments_array.length;j++)
                {

                    var by = document.createElement("Label");
                    by.innerHTML = comments_array[j].by;
                    var comment = document.createElement("textarea");
                    comment.innerHTML = comments_array[j].comment;
                    comment.readOnly = true;
                    console.log(by+" "+comment);
                    comment_tog_div.appendChild(by);
                    comment_tog_div.appendChild(document.createElement("br"));
                    comment_tog_div.appendChild(comment);
                    comment_tog_div.appendChild(document.createElement("br"));
                }
                //var new_comment_div = document.createElement("newcommnet");


                comment_form.appendChild(new_comment);
                comment_form.appendChild(document.createElement("br"));
                comment_form.appendChild(submit_comment);
                var t = document.createTextNode("Comment");
                submit_comment.appendChild(t);
                comment_tog_div.appendChild(comment_form);
                comment_div.appendChild(comment_tog_div);

            }
            else
            {
                /*var comment_label = document.createElement("LABEL");*/
                comment_label.innerHTML = "No Comments";
                comment_div.appendChild(comment_label);

            }
            div2.appendChild(comment_div);


            div.appendChild(div2);
            story.appendChild(div);
        }
    });
}