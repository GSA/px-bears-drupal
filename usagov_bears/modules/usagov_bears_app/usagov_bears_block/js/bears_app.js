(function ($) {
  $(document).ready(function(){
    $.getJSON("sites/default/files/bears/api/life-event/death-of-a-loved-one.json", function(data){
      str = JSON.stringify(data, null, 4);
      console.log(str);
    }).fail(function(){
      console.log("An error has occurred.");
    });
  });
})(jQuery);
