$(document).ready(function () {
  
  var tweet,
      $quote=$('.quote'),
      $author=$('.author'),
      $generate=$('.new'),
      $tweet=$('.tweet');
  
  function sliceTweet(quoteText, quoteAuthor) {
    if (quoteText.length + quoteAuthor.length > 139) {
      var slicing = quoteAuthor.length + 4;
      var subQuoteText = quoteText.slice(0, (140 - slicing));
      quoteText = subQuoteText + "... " + quoteAuthor;  
    } else {
      quoteText += " " + quoteAuthor;  
    };
      tweet=encodeURIComponent(quoteText);
  };
  
  function getQuote() {
    $.ajax({
      jsonp: "jsonp",
      dataType: "jsonp",
      url: 'http://api.forismatic.com/api/1.0/',
      contentType: 'application/jsonp',
      data: {
        lang: "en",
        method: "getQuote",
        format: "jsonp"
      },
      success: function(data) {
        $quote.text(data.quoteText);
        if (data.quoteAuthor === '') {
          $author.text("~ Unknown author ~");
          author='Unknown author';
        } else {
          $author.text('~ ' + data.quoteAuthor + ' ~');
          author=data.quoteAuthor;
        };
        
        sliceTweet(data.quoteText, author);
        
      },
      error: function() {
        $quote.text("Something's gone wrong. Shit happens.");
        $author.text("~ Unknown author ~");
      }
      
    });
    
  };
  
  $generate.click(function() {
    getQuote();
  });
  
  $tweet.click(function() {
    var tweetLink = 'https://twitter.com/intent/tweet?text='+ tweet;
    window.open(tweetLink,'','top=100vh, left=180vw, width=500, height=400');
  });
  
  getQuote();
  
});