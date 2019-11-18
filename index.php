<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Chess game</title>
    <?php $rand = rand(0,9999999); ?>
    <link rel="stylesheet" href="styles/index.css?t=<?php echo $rand; ?>">
    <style media="screen">
      .clearfix {
        clear: both
      }
      .row {
        margin: 0 auto 10px auto;
        max-width: 494px;
      }
      .col-6 {
        width: 50%;
        float: left;
        padding: 0 5px 0 5px;
        box-sizing: border-box;
        margin-bottom: 10px;
      }
      input {
        border: 0;
        padding: 8px;
        width: 100%;
        box-sizing: border-box;
      }
      label {
        font-size: 12px;
        font-family: helvetica;
      }
      @keyframes blink {
        from {
          box-shadow: none;
        }
        to {
          box-shadow: 1px 1px 40px #fff;
        }
      }
      .blink {
        animation-duration: .5s;
        animation-name: blink;
      }
    </style>
    <script type="text/javascript">
      document.addEventListener('click', function(e){
        var el = document.getElementById(e.target.id);
        if (el) {
          el.classList.add('blink');
          setTimeout(function(){
            el.classList.remove('blink');
          }, 500)
        }
      });
    </script>
  </head>
  <body>

    <div class="row">
      <div class="field col-6">
        <label>Message</label><br><input type="text" id="message" value="">
      </div>
      <div class="field col-6">
        <label>Player</label><br><input type="text" id="player" value="">
      </div>
      <div class="field col-6">
        <label>Next Move From</label><br><input type="text" id="next-move-from" value="">
      </div>
      <div class="field col-6">
        <label>Next Move To</label><br><input type="text" id="next-move-to" value="">
      </div>
      <div class="clearfix"></div>
    </div>

    <div id="chess"></div>
    <script src="src/chess.js?t=<?php echo $rand; ?>"></script>
    <script src="src/ai.js?t=<?php echo $rand; ?>"></script>
    <script src="src/ui.js?t=<?php echo $rand; ?>"></script>
    <script src="src/main.js?t=<?php echo $rand; ?>"></script>
  </body>
</html>
