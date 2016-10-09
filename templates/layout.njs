<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Title here</title>
    <meta name="description" content="Lorem Ipsum Dolor">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
    <!-- Place favicon.ico in the root directory -->
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/style.css">
    <script src="js/vendor/modernizr-2.8.3.min.js"></script>
    {% block styles %} {% endblock %} 
</head>

<body class="home">
    <div id="menutoggle"><i class="icon menu_lines"></i></div>
    <!-- /#menutoggle  -->
    <header>
        <h1>{{ pagetitle }}</h1></header>
    <nav id="primary">
        {% include "nav.njs" %}
    </nav>
    <!-- /#primary  -->
        {% block content %} {% endblock %}

    <footer>&copy; 2016 Your company ::
        <nav id="contact"><a href="tel:5555555555">716.555.5555</a> :: <a href="mailto:info@yourcompany.com">info@yourcompany.com</a></nav>
    </footer>
    <div id="scroll"><i class="icon arrow_up"></i></div>
    <!-- /#scroll  -->
    <script src="js/jquery-3.1.1.min.js"></script>
    <script>
    window.jQuery || document.write('<script src="js/vendor/jquery-1.12.0.min.js"><\/script>')
    </script>
    <script src="js/plugins.js"></script>
    <script src="js/script.js"></script>
    {% block scripts %} {% endblock %}
</body>

</html>
