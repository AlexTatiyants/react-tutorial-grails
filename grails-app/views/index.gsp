<!DOCTYPE html>
<html>
<body>
<div id="content"></div>
<asset:javascript src="application.js"/>

<script>
    var data = [
        {author: "Pete Hunt", text: "This is one comment"},
        {author: "Jordan Walke", text: "This is *another* comment"}
    ];

    //bootstrap the app without jsx
    React.render(
            React.createElement(CommentBox,
                    {
                        url: "comments.json",
                        pollInterval: 2000
                    }),
            document.getElementById('content')
    );
</script>
</body>

<head>
    <meta name="layout" content="main"/>
    <asset:stylesheet href="base.css"/>
    <title>Hello React</title>
</head>
</html>
