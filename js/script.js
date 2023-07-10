$(document).ready(function () {
  var swiper = new Swiper(".pepeSwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });

  for (var i = 1; i <= 32; i++) {
    var imageUrl = "img/pepeversx-nfts/" + i + ".png";
    var swiperSlide = $(
      '<div class="swiper-slide"><img src="' + imageUrl + '"></div>'
    );
    swiper.appendSlide(swiperSlide);
  }

  $("#result").hide();
  $("#looser-go-buy-pepe").hide();

  $("#button-id-pepe").click(function () {
    $("#error-message").hide();
    $("#looser-go-buy-pepe").hide();
    $("#result").hide();

    var id = $("#inputID").val();
    console.log(id);
    if (parseInt(id) > 6969) {
      $("#error-message").show();
      $("#looser-go-buy-pepe").hide();
      $("#result").hide();
      return;
    }

    var requestData = {
      filters: {
        attributes: [],
      },
      name: id,
      orderBy: ["metadata/rarity/rank asc"],
      collection: "PEPEVERSX-c87ad0",
      top: 35,
      select: [
        "metadata/rarity/rank",
        "metadata/attributes",
        "name",
        "onSale",
        "saleInfoNft",
        "hasSecondNFT",
        "royalties",
        "identifier",
        "collection",
        "url",
        "nonce",
        "originalMedia/contentType",
        "wasProcessed",
        "avifUrl",
        "webpUrl",
        "type",
      ],
      skip: 0,
    };

    var encodedData = btoa(JSON.stringify(requestData)); // Encode the request data in Base64
    //console.log(encodedData);

    $.ajax({
      url: "https://proxy-api.xoxno.com/searchNFTs/" + encodedData,
      type: "GET",
      success: function (response) {
        var attributes = response.results[0].metadata.attributes;
        var message = "";
        //console.log(response.results[0].metadata.attributes);
        if (!response.empty) {
          var guilds_joined = [];

          // Perform condition checking on attributes
          for (var i = 0; i < attributes.length; i++) {
            var attribute = attributes[i];

            const valuesToCheck = [
              "Salami Gold",
              "Salami Blue",
              "Salami Cyborg",
              "Salami Sibiu Red",
              "Salami Sibiu Cyborg",
              "Salami Sibiu Blue",
              "Salami Red",
              "Salami",
              "Salami Sibiu Gold",
              "Salami Sibiu",
            ];

            if (
              valuesToCheck.some((value) => attribute.value.includes(value))
            ) {
              guilds_joined.push("Salami's Guild");
            }

            if (attribute.value.includes("Cap")) {
              guilds_joined.push("Caps Guild");
            }

            if (attribute.value.includes("Brain")) {
              guilds_joined.push("Mastermind Guild");
            }

            if (attribute.value.includes("Crown")) {
              guilds_joined.push("Crown Guild");
            }

            if (attribute.value.includes("Broom")) {
              guilds_joined.push("Sweeper's Guild");
            }
          }

          if (guilds_joined.length > 0) {
            message =
              "<p class='fs-2 fw-semibold'>Congrats! You are part of:<br></p>";
            message += "<ul class='list-group'>";
            if (guilds_joined.length === 1) {
              message +=
                "<li class='list-group-item list-group-item-success fw-medium'>" +
                guilds_joined[0] +
                "</li>";
            } else {
              $.each(guilds_joined, function (index, rating) {
                message +=
                  "<li class='list-group-item list-group-item-success fw-medium'>" +
                  rating +
                  "</li>";
              });
            }
            message += "</ul>";
            $("#result").show();
          }

          $("#result").html(message);

          if (!message) {
            $("#error-message").hide();
            $("#looser-go-buy-pepe").show();
            $("#result").hide();
          }
        }
      },
      error: function () {
        // Handle the error here
      },
    });
  });
});
