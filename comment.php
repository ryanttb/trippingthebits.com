<?php
$mailOk = mail("ryanw@csh.rit.edu",
  $_REQUEST["entry"] . " by " . $_REQUEST["displayName"],
  $_REQUEST["comment"] .
  " --" . $_REQUEST["displayName"]." at " . $_REQUEST["website"],
  "From: ryanw@csh.rit.edu");

$commentsFile = fopen("comments.txt", "a");
fwrite($commentsFile, "=== " . strftime("%b %d %Y %X") . " ===\n");
fwrite($commentsFile, $_REQUEST["entry"] . "\n");
fwrite($commentsFile, $_REQUEST["displayName"] . "\n");
fwrite($commentsFile, $_REQUEST["website"] . "\n");
fwrite($commentsFile, $_REQUEST["comment"] . "\n");
fclose($commentsFile);
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Tripping the Bits</title>
  <link href="styles/default.css" rel="stylesheet" type="text/css" />
</head>
<body>
  <div id="identity">
    <a href="index.html">Tripping the Bits</a>
  </div>
  <div id="contact">
    <a id="twitter" href="http://twitter.com/ryanttb">t</a>
    <a id="facebook" href="http://www.facebook.com/westphal">f</a>
    <a id="email" href="mailto:ryan@trippingthebits.com">@</a>
  </div>
  <div id="frame">
    <div id="content">
      <h1>Thank you</h1>
      <p>Your comment will be reviewed and posted soon.</p>
    </div>
  </div>
</body>
</html>
