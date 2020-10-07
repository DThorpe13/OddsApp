$(document).ready(function() {
// SportsData.io API Key 
// may want to have input button to enter API key on load? 
// let sportDataApiKey         = "?key=fae190a3b3c447529f443fead4937d4c"; // Andrew
// let sportDataApiKey         = "?key=d2ff51fd95464aa7b5d2588142bd4ab4";
let sportDataApiKey         = "?key=6b4681d33583428ea6e0c43d3316ef7b"; // Nancy

// SportsData.io API - Endpoint URLs
let bettingFuturesMarketURL = "https://api.sportsdata.io/v3/mlb/odds/json/BettingFuturesBySeason/2020POST" + sportDataApiKey
let gameDate                = moment().format("YYYY-MM-DD"); 
let boxScoreDate            = moment().format("YYYY-MMM-DD");
let LiveGameOddsDate        = moment().format("YYYY-MM-DD");

let playerDate              = moment().format("YYYY-MMM-DD");


let gamesOddsByDateURL      = "https://api.sportsdata.io/v3/mlb/odds/json/GameOddsByDate/" + gameDate + sportDataApiKey;
let boxScoresByDateURL      = "https://api.sportsdata.io/v3/mlb/stats/json/BoxScores/" + boxScoreDate + sportDataApiKey;
let teamsURL                = "https://api.sportsdata.io/v3/mlb/scores/json/teams" + sportDataApiKey;
let playerStatsByDate       = "https://api.sportsdata.io/v3/mlb/stats/json/PlayerGameStatsByDate/" + playerDate + sportDataApiKey
let stadiumURL              = "https://api.sportsdata.io/v3/mlb/scores/json/Stadiums" + sportDataApiKey;
let liveGameOddsURL         = "https://api.sportsdata.io/v3/mlb/odds/json/LiveGameOddsByDate/" + LiveGameOddsDate + sportDataApiKey;
let newsURL                 = "https://api.sportsdata.io/v3/mlb/scores/json/News" + sportDataApiKey;

let WSBettingMarketArr = [];
let worldSeriesOddsArr = [];
let ALBettingMarketArr = [];
let ALWinnerArr        = [];
let NLBettingMarketArr = [];
let NLWinnerArr        = [];

    // ajaxCall to bettingFuturesMarketURL to retrieve World Series 2020 Odds by Team and append them dynamically to the page
    $.ajax({
        "url": bettingFuturesMarketURL,
        "method": "GET"
    }).done(function (response) {
        // Declare Data Response 
        let data = response[0];
        // Filter out all betting markets "World Series Winner"
        let bettingMarkets = data.BettingMarkets;
        bettingMarkets.forEach(function(bettingMarketEl) {
            if (bettingMarketEl.BettingBetType) {
                if (bettingMarketEl.BettingBetType === "World Series Winner") {
                    WSBettingMarketArr.push(bettingMarketEl);
                };
            } else return
        });

        // Name of Betting Market Type - Can be placed on #worldSeriesWinnerOdds
        if (WSBettingMarketArr[0]) {
            let WSWinner = WSBettingMarketArr[0].BettingBetType;
            $('#worldSeriesWinnerOdds').text(WSWinner);
        } else return

        // Configure Array for World Series Odds at DraftKings sportsbook (Id=7)
        let draftKingsWSOddsArr  = [];
        // Loop through Array for World Series Odds and push "line" to World Series Odds at DraftKings sportsbook Array (above)
        let tempArr = WSBettingMarketArr[0].BettingOutcomes;
        tempArr.forEach(function(tempEl) {
            let sportsBook = tempEl.SportsBook;
            if (sportsBook.SportsbookID === 7) {
                draftKingsWSOddsArr.push(tempEl);
            };
        });

        // Loop through Array for Worlds Series Odds at DraftKings sportsbook and push teamName and odds to functional array
        draftKingsWSOddsArr.forEach(function(dkWorldSeriesEl) {
            worldSeriesOddsArr.push({
                teamName: dkWorldSeriesEl.Participant,
                odds:     dkWorldSeriesEl.PayoutAmerican
            });
        });

        // Dynamically generate World Series Odds "Drop-Down Screen" - List Group
        worldSeriesOddsArr.forEach(function(worldSeriesOddsEl) {
        let teamName  = worldSeriesOddsEl.teamName;
        let WSodds    = worldSeriesOddsEl.odds;
        let listGroup = $("#worldSeriesWinnerOdds");
        // Create list-item for teamName
        let listItem  = $("<p>");
        // Add classes to list-item
        listItem.addClass("list-group-item d-flex justify-content-between align-items-center pregame  border border-danger");
        // Set text of list-item to teamName
        listItem.text(teamName);
        // Create list-item-span for odds
        let listItemSpan = $("<span>");
        // Add classes to list-item-spand
        listItemSpan.addClass("badge badge-danger");
        // Set text of list-item-span to odds
        listItemSpan.text(WSodds); 
        // Append listItem to listGroup and listSpan to listItem
        listGroup.append(listItem.append(listItemSpan));
        });
    });

    // ajaxCall to bettingFuturesMarketURL to retrieve AL Winner Odds by Team and append them dynamically to the page
    $.ajax({
        "url": bettingFuturesMarketURL,
        "method": "GET"
    }).done(function (response) {
        // Declare Data Response 
        let data = response[0];
        // Filter out all betting markets "AL Winner"
        let bettingMarkets = data.BettingMarkets;
        bettingMarkets.forEach(function(bettingMarketEl) {
            if (bettingMarketEl.BettingBetType) {
                if (bettingMarketEl.BettingBetType === "AL Winner") {
                    ALBettingMarketArr.push(bettingMarketEl);
                };
            } else return
        });

        // Name of Betting Market Type - Can be placed on #ALWinnerOdds
        if (ALBettingMarketArr[0]) {
            let ALWinner = ALBettingMarketArr[0].BettingBetType;
            $('#ALWinnerOdds').text(ALWinner);
        } else return

        // Configure Array for AL Winner Odds at DraftKings sportsbook (Id=7)
        let draftKingsAmLgOddsArr  = [];
        // Loop through Array for AL Winner Odds and push "line" to AL Winner Odds at DraftKings sportsbook Array (above)
        let tempArr = ALBettingMarketArr[0].BettingOutcomes;
        tempArr.forEach(function(tempEl) {
            let sportsBook = tempEl.SportsBook;
            if (sportsBook.SportsbookID === 7) {
                draftKingsAmLgOddsArr.push(tempEl);
            };
        });

        // Loop through Array for American League Odds at DraftKings sportsbook and push teamName and odds to functional array
        draftKingsAmLgOddsArr.forEach(function(dkAmLgEl) {
            ALWinnerArr.push({
                teamName: dkAmLgEl.Participant,
                odds:     dkAmLgEl.PayoutAmerican
            });
        });

        // Dynamically generate American League Odds "Drop-Down Screen" - List Group
        ALWinnerArr.forEach(function(AmLgOddsEl) {
        let teamName  = AmLgOddsEl.teamName;
        let ALodds    = AmLgOddsEl.odds;
        let listGroup = $("#ALWinnerOdds");
        // Create list-item for teamName
        let listItem  = $("<p>");
        // Add classes to list-item
        listItem.addClass("list-group-item d-flex justify-content-between align-items-center pregame  border border-danger");
        // Set text of list-item to teamName
        listItem.text(teamName);
        // Create list-item-span for odds
        let listItemSpan = $("<span>");
        // Add classes to list-item-spand
        listItemSpan.addClass("badge badge-danger");
        // Set text of list-item-span to odds
        listItemSpan.text(ALodds); 
        // Append listItem to listGroup and listSpan to listItem
        listGroup.append(listItem.append(listItemSpan));
        });
    });

    // ajaxCall to bettingFuturesMarketURL to retrieve NL Winner Odds by Team and append them dynamically to the page
    $.ajax({
        "url": bettingFuturesMarketURL,
        "method": "GET"
    }).done(function (response) {
        // Declare Data Response
        let data = response[0];
        // Filter out all betting markets "NL Winner"
        let bettingMarkets = data.BettingMarkets;
        bettingMarkets.forEach(function(bettingMarketEl) {
            if (bettingMarketEl.BettingBetType) {
                if (bettingMarketEl.BettingBetType === "NL Winner") {
                    NLBettingMarketArr.push(bettingMarketEl);
                };
            } else return
        });

        // Name of Betting Market Type - Can be placed on #NLWinnerOdds
        if (NLBettingMarketArr[0]) {
            let NLWinner = NLBettingMarketArr[0].BettingBetType;
            $('#NLWinnerOdds').text(NLWinner);
        } else return

        // Configure Array for NL Winner Odds at DraftKings sportsbook (Id=7)
        let draftKingsNtLgOddsArr = [];
        // Loop through Array for NL Winner Odds and push "line" to NL Winner Odds at DraftKings sportsbook Array (above)
        let tempArr = NLBettingMarketArr[0].BettingOutcomes;
        tempArr.forEach(function(tempEl) {
            let sportsBook = tempEl.SportsBook;
            if (sportsBook.SportsbookID === 7) {
                draftKingsNtLgOddsArr.push(tempEl);
            };
        });
        // Loop through Array for NL Winner Odds at DraftKings sportsbook and push teamName and odds to functional array
        draftKingsNtLgOddsArr.forEach(function(dkNtLgEl) {
            NLWinnerArr.push({
                teamName: dkNtLgEl.Participant,
                odds:     dkNtLgEl.PayoutAmerican
            });
        });

        // Dynamically generate National League Odds "Drop-Down Screen" - List Group
        NLWinnerArr.forEach(function(dkNtLgEl) {
        let teamName  = dkNtLgEl.teamName;
        let NLodds    = dkNtLgEl.odds;
        let listGroup = $("#NLWinnerOdds");
        // Create list-item for teamName
        let listItem  = $("<p>");
        // Add classes to list-item
        listItem.addClass("list-group-item d-flex justify-content-between align-items-center pregame border border-danger");
        // Set text of list-item to teamName
        listItem.text(teamName);
        // Create list-item-span for odds
        let listItemSpan = $("<span>");
        // Add classes to list-item-spand
        listItemSpan.addClass("badge badge-danger");
        // Set text of list-item-span to odds
        listItemSpan.text(NLodds);
        // Append listItem to listGroup and listSpan to listItem
        listGroup.append(listItem.append(listItemSpan));
        });
    });

    // create empty array to hold news objects (elements) from the SportsData.io newsURL endpoint
    let newsArr = [];
    // ajaxCall to Sportsdata.io newsURL endpoint to populate MLB news feed - scrollspy configured 
    $.ajax({
        "url": newsURL,
        "method": "GET"
    }).done(function (response) {
        // loop to push news objects to newsArr for the last five days
        for (i = 0; i < 5; i++) {
            newsArr.push({
                headline: response[i].Title,
                story:    response[i].Content,
                link:     response[i].Url
            });
        };
        // Dynamically update News Feed - List Group
        newsArr.forEach(function(newsEl, i) {
            // generate ID to be used as a selector
            let contentID  = "#" + "content-" + [i];
            // select correct scrollspy item
            let contentEl  = $(contentID);
            // generate h5 tag
            let headlineEl = $("<h5>");
            // add classes to h5 tag
            headlineEl.addClass("text-bold text-body mb-1 headline");
            // set h5 tag text to headline property in looping newsElement
            headlineEl.text(newsEl.headline);
            // insert h5 after contentEl 
            headlineEl.insertAfter(contentEl);
            // generate p tag
            let storyEl    = $("<p>");
            // set p tag text to story property in looping newsElement
            storyEl.text(newsEl.story);
            // insert p tag after headlineEl
            storyEl.insertAfter(headlineEl);
            // generate a tag
            let buttonEl   = $("<a>");
            // add classes to a tag
            buttonEl.addClass("btn btn-outline-dark btn-sm mb-3");
            // set a tag text 
            buttonEl.text("Continue");
            // set href attr of a tag to link property in looping newsElement
            buttonEl.attr("href", newsEl.link);
            // set role attr of a tag to "button" in looping newsElement
            buttonEl.attr("role", "button");
            // insert a tag after storyEl
            buttonEl.insertAfter(storyEl);
        });
    });

    let inProgressArr  = [];
    let scheduledArr   = [];
    let completedArr   = [];
    let unAvailableArr = [];

    // ajaxCall to gamesOddsByDateURL to sort games by game "status"; push in-progress games to global array inProgressArr, scheduled+ games to scheduledArr, and completed games to completedArr
    // when pushing game to specified array, it will carry a few properties that should be rendered on the page after final ajaxCall 
    $.ajax({
        "async": false,
        "url": gamesOddsByDateURL,
        "method": "GET"
    }).done(function (response) {
        response.forEach(function(gameEl) {
            if (gameEl.Status === "InProgress") {
                inProgressArr.push({
                    gameID:              gameEl.GameId,
                    homeTeamName:        gameEl.HomeTeamName,
                    homeTeamID:          gameEl.HomeTeamId,
                    awayTeamName:        gameEl.AwayTeamName,
                    awayTeamID:          gameEl.AwayTeamId
                });
            }  else if (gameEl.Status === "Scheduled") {
                scheduledArr.push({
                    gameID:              gameEl.GameId,
                    homeTeamName:        gameEl.HomeTeamName,
                    homeTeamID:          gameEl.HomeTeamId,
                    awayTeamName:        gameEl.AwayTeamName,
                    awayTeamID:          gameEl.AwayTeamId,


                    homeMLOdds:          gameEl.PregameOdds[0].HomeMoneyLine,
                    awayMLOdds:          gameEl.PregameOdds[0].AwayMoneyLine,
                    overUnder:           gameEl.PregameOdds[0].OverUnder,
                    overOdds:            gameEl.PregameOdds[0].OverPayout,
                    underOdds:           gameEl.PregameOdds[0].UnderPayout, 

                    homePointSpread:     gameEl.PregameOdds[0].HomePointSpread,
                    awayPointSpread:     gameEl.PregameOdds[0].AwayPointSpread,
                    homePointSpreadOdds: gameEl.PregameOdds[0].HomePointSpreadPayout,
                    awayPointSpreadOdds: gameEl.PregameOdds[0].AwayPointSpreadPayout
                });

            }  
             else if (gameEl.Status === "Postponed" || gameEl.Status === "Canceled" || gameEl.Status === "Suspended") {
                unAvailableArr.push({
                    gameID:              gameEl.GameId,
                    homeTeamName:        gameEl.HomeTeamName, 
                    awayTeamName:        gameEl.AwayTeamName
                });
                
            } else {
                completedArr.push({
                    gameID:              gameEl.GameId,
                    homeTeamName:        gameEl.HomeTeamName,
                    homeTeamID:          gameEl.HomeTeamId,
                    homeFnScore:         gameEl.HomeTeamScore,
                    awayTeamName:        gameEl.AwayTeamName,
                    awayTeamID:          gameEl.AwayTeamId,
                    awayFnScore:         gameEl.AwayTeamScore
                    
                });
            };
        });
        
        // ajaxCall to boxScoresByDateURL to get variety of data properties to add to either inProgressArr, scheduledArr, completedArr; match on gameID as defined in *Arr
        $.ajax({
        "async": false,
        "url": boxScoresByDateURL,
        "method": "GET"
        }).done(function(response) {
            response.forEach(function(boxScoreEl) {
                let boxScoreGameID = boxScoreEl.Game.GameID;

                inProgressArr.forEach(function(gameEl) {
                    if (gameEl.gameID === boxScoreGameID) {
                        gameEl.homeTeamRuns = boxScoreEl.Game.HomeTeamRuns,
                        gameEl.awayTeamRuns = boxScoreEl.Game.AwayTeamRuns,
                        gameEl.inning       = boxScoreEl.Game.InningDescription,
                        gameEl.stadiumID    = boxScoreEl.Game.StadiumID,
                        gameEl.channel      = boxScoreEl.Game.Channel
                    };
                });

                scheduledArr.forEach(function(gameEl) {
                    if (gameEl.gameID === boxScoreGameID) {
                        gameEl.dateTime  = boxScoreEl.Game.DateTime,
                        gameEl.stadiumID = boxScoreEl.Game.StadiumID,
                        gameEl.channel   = boxScoreEl.Game.Channel
                    };
                });

                completedArr.forEach(function(gameEl) {
                    if (gameEl.gameID === boxScoreGameID) {
                        gameEl.winningPitcherID = boxScoreEl.Game.WinningPitcherID,
                        gameEl.losingPitcherID  = boxScoreEl.Game.LosingPitcherID
                    };
                });
            });
        });

            // ajaxCall to teamsURL to GET Team logo link (svg) and add to either inProgressArr, scheduledArr, completedArr; match on homeTeamID and awayTeamID as defined in *Arr
            $.ajax({
                "async": false,
                url: teamsURL,
                method: "GET"
            }).done(function(response) {
                response.forEach(function(teamsEl) {
                    let teamID = teamsEl.TeamID;

                    inProgressArr.forEach(function(gameEl){
                        if (gameEl.homeTeamID === teamID) {
                            gameEl.homeTeamLogo = teamsEl.Logo
                        } else if (gameEl.awayTeamID === teamID) {
                            gameEl.awayTeamLogo = teamsEl.WikipediaWordMarkUrl
                        };
                    });

                    scheduledArr.forEach(function(gameEl){
                        if (gameEl.homeTeamID === teamID) {
                            gameEl.homeTeamLogo = teamsEl.WikipediaWordMarkUrl
                        } else if (gameEl.awayTeamID === teamID) {
                            gameEl.awayTeamLogo = teamsEl.WikipediaWordMarkUrl
                        };
                    });

                    completedArr.forEach(function(gameEl){
                        if (gameEl.homeTeamID === teamID) {
                            gameEl.homeTeamLogo = teamsEl.WikipediaWordMarkUrl
                        } else if (gameEl.awayTeamID === teamID) {
                            gameEl.awayTeamLogo = teamsEl.WikipediaWordMarkUrl
                        };
                    });
                });
            });

                // ajaxCall to stadiumURL to GET Stadium properties and add to scheduledArr; match on stadiumID as defined it scheduledArr - - - not working for me
                $.ajax({
                    "async": false,
                    "url": stadiumURL,
                    "method": "GET"
                    }).done(function(response) {
                        response.forEach(function(stadiumEl) {
                            let stadiumStID = stadiumEl.StadiumID;

                            inProgressArr.forEach(function(gameEl) {
                                if (gameEl.stadiumID === stadiumStID) {
                                    gameEl.stadiumName  = stadiumEl.Name,
                                    gameEl.stadiumCity  = stadiumEl.City,
                                    gameEl.stadiumState = stadiumEl.State 
                                };
                            });

                            scheduledArr.forEach(function(gameEl) {

                                if (gameEl.stadiumID === stadiumStID) {
                                    gameEl.stadiumName  = stadiumEl.Name,
                                    gameEl.stadiumCity  = stadiumEl.City,
                                    gameEl.stadiumState = stadiumEl.State 
                                };
                            });

                        });
                    });

                    // ajaxCall to liveGameOddsURL to get Live Odds for the games that are inProgress (inProgressArr)
                    $.ajax({
                        "async": false,
                        "url": liveGameOddsURL,
                        "method": "GET"
                        }).done(function(response) {
                            response.forEach(function(liveGameEl) {
                                let liveGameGameID = liveGameEl.GameId;

                                if (liveGameEl.Status === "InProgress") {
                                    inProgressArr.forEach(function(gameEl) {
                                        if (gameEl.gameID === liveGameGameID) {
                                            gameEl.liveHomeMoneyLine     = liveGameEl.LiveOdds[0].HomeMoneyLine,
                                            gameEl.liveAwayMoneyLine     = liveGameEl.LiveOdds[0].AwayMoneyLine,
                                            gameEl.homePointSpread       = liveGameEl.LiveOdds[0].HomePointSpread,
                                            gameEl.awayPointSpread       = liveGameEl.LiveOdds[0].AwayPointSpread,
                                            gameEl.homePointSpreadPayout = liveGameEl.LiveOdds[0].HomePointSpreadPayout,
                                            gameEl.awayPointSpreadPayout = liveGameEl.LiveOdds[0].AwayPointSpreadPayout
                                        };
                                    });
                                }
                            });
                        });

                        // ajaxCall to playerStatsByDate to get pitcher name of winner&losing pitcher of completedArr 
                        $.ajax({
                            "async": false,
                            "url": playerStatsByDate,
                            "method": "GET"
                            }).done(function(response) {
                                response.forEach(function(playerEl) {
                                    let playerID = playerEl.PlayerID;
                                    
                                    completedArr.forEach(function(gameEl) {
                                        if (gameEl.winningPitcherID === playerID) {
                                            gameEl.winningPitcherName = playerEl.Name
                                        };
                                        if (gameEl.losingPitcherID === playerID) {
                                            gameEl.losingPitcherName = playerEl.Name
                                        };
                                    });
                                });
                            });
    });

    console.log(inProgressArr);
    console.log(scheduledArr);
    console.log(completedArr);



    function loadPreGameCards() {
        scheduledArr.forEach(function(gameEl) {
            let futuresMarketDiv  = $("#futuresMarket");
            let preGameCard       = $("<div>");                            // begin pre-game score card
            preGameCard.addClass("container-fluid text-center my-4 border border-danger");
            preGameCard.attr("id", gameEl.gameID);
            
            
            let preGameAwayRow    = $("<div>");                            // begin pre-game away row
            preGameAwayRow.addClass("row pregame");
            preGameCard.append(preGameAwayRow);
            let awayTeamLogo      = $("<img>")
            awayTeamLogo.addClass("col-1");
            awayTeamLogo.attr("src", gameEl.awayTeamLogo)
                        .attr("id", "awayTeamLogo");
            let awayTeamName      = $("<div>");
            awayTeamName.addClass("col-4");
            awayTeamName.text(gameEl.awayTeamName);

            let location          = $("<div>");
            location.addClass("col-6");
            location.text(gameEl.stadiumName + " - " + gameEl.stadiumCity + ", " + gameEl.stadiumState);
            let channel           = $("<div>");

            channel.addClass("col-1");
            channel.text(gameEl.channel);
            
            preGameCard.insertAfter(futuresMarketDiv);
            preGameAwayRow.append(awayTeamLogo, awayTeamName, location, channel);

            
            let preGameHomeRow    = $("<div>");                            // begin pre-game home row
            preGameHomeRow.addClass("row pregame");
            preGameCard.append(preGameHomeRow);
            let homeTeamLogo      = $("<img>")
            homeTeamLogo.addClass("col-1");
            homeTeamLogo.attr("src", gameEl.homeTeamLogo)
                        .attr("id", "homeTeamLogo");
            let homeTeamName      = $("<div>");
            homeTeamName.addClass("col-4");
            homeTeamName.text(gameEl.homeTeamName);
            let gameTime          = $("<div>");
            gameTime.addClass("col-6");
            
            // date conversion here 
            gameTime.text(

                moment(gameEl.dateTime).format('MMMM Do YYYY, h:mm a')

            );



            let preGameBtn        = $("<i>");
            preGameBtn.addClass("col-1 preGameModalBtn fa fa-info-circle my-auto")           // add preGameModalBtn class for on-click function
                      .attr("data-toggle", "modal")
                      .attr("data-target", "#pre-game-modal")
                      .attr("id", gameEl.gameID);
            
            preGameCard.insertAfter(futuresMarketDiv);
            preGameHomeRow.append(homeTeamLogo, homeTeamName, gameTime, preGameBtn);


        });
    };

    loadPreGameCards();

    $(".preGameModalBtn").on("click", function() {
        let gameID = $(this).attr("id");
        scheduledArr.forEach(function(gameEl) {
            if (parseInt(gameID) === gameEl.gameID) {
                $("#homeTeamLogoPre").attr("src", gameEl.homeTeamLogo);
                $("#homeTeamSpreadPre").text(gameEl.homePointSpread);
                $("#homeTeamSpreadOddsPre").text(gameEl.homePointSpreadOdds);

                $("#homeTeamMLPre").text(gameEl.homeMLOdds);
                $("#overTotalPre").text("O" + gameEl.overUnder);
                $("#overMLPre").text(gameEl.overOdds);

                $("#awayTeamLogoPre").attr("src", gameEl.awayTeamLogo);
                $("#awayTeamSpreadPre").text(gameEl.awayPointSpread);
                $("#awayTeamSpreadOddsPre").text(gameEl.awayPointSpreadOdds);

                $("#awayTeamMLPre").text(gameEl.awayMLOdds);
                $("#underTotalPre").text("U" + gameEl.overUnder);
                $("#underMLPre").text(gameEl.underOdds);
                
            } else return
        });
    });


    function loadLiveGameCards() {
        inProgressArr.forEach(function(gameEl) {
            let futuresMarketDiv   = $("#futuresMarket");
            let liveGameCard       = $("<div>");                            // begin live score card
            liveGameCard.addClass("container-fluid text-center my-4 border border-danger");
            liveGameCard.attr("id", gameEl.gameID);
            let liveGameHomeRow    = $("<div>");                            // begin live home row
            liveGameHomeRow.addClass("row pregame");
            let homeTeamLogo      = $("<img>")
            homeTeamLogo.addClass("col-1");
            homeTeamLogo.attr("src", gameEl.homeTeamLogo)
                        .attr("id", "homeTeamLogoLive");
            let homeTeamName      = $("<div>");
            homeTeamName.addClass("col-4");
            homeTeamName.text(gameEl.homeTeamName);

            let liveInfoDiv = $("<div>");
            liveInfoDiv.addClass("col-6");

            let liveInfoCon = $("<div>");
            liveInfoCon.addClass("container-fluid");
            liveInfoDiv.append(liveInfoCon);
            let liveInfoRow = $("<div>");
            liveInfoRow.addClass("row");
            liveInfoCon.append(liveInfoRow);
            let liveHomeScore = $("<div>");
            liveHomeScore.addClass("col-4");
            liveHomeScore.text(gameEl.homeTeamRuns);
            let liveInning    = $("<div>");
            liveInning.addClass("col-8");
            liveInning.text(gameEl.inning);
            liveInfoRow.append(liveHomeScore, liveInning);

            let liveGameBtn = $("<i>");
            liveGameBtn.addClass("col-1 liveGameModalBtn fa fa-info-circle my-auto")                   // add liveGameModalBtn class for on-click function
                        .attr("data-toggle", "modal") 
                        .attr("data-target", "#live-game-modal")
                        .attr("id", gameEl.gameID);

            liveGameCard.insertAfter(futuresMarketDiv);
            liveGameCard.append(liveGameHomeRow);
            liveGameHomeRow.append(homeTeamLogo, homeTeamName, liveInfoDiv, liveGameBtn);


            let liveGameAwayRow    = $("<div>");                            // begin live away row
            liveGameAwayRow.addClass("row pregame mt-2");
            let awayTeamLogo      = $("<img>")
            awayTeamLogo.addClass("col-1");
            awayTeamLogo.attr("src", gameEl.awayTeamLogo)
                        .attr("id", "awayTeamLogoLive");
            let awayTeamName      = $("<div>");
            awayTeamName.addClass("col-4");
            awayTeamName.text(gameEl.awayTeamName);

            let liveInfoDivAway = $("<div>");
            liveInfoDivAway.addClass("col-6");
            let liveInfoConAway = $("<div>");
            liveInfoConAway.addClass("container-fluid");
            let liveInfoRowAway = $("<div>");
            liveInfoRowAway.addClass("row");

            let liveAwayScore = $("<div>");
            liveAwayScore.addClass("col-4");
            liveAwayScore.text(gameEl.awayTeamRuns);

            let liveChannel    = $("<div>");
            liveChannel.addClass("col-8");
            liveChannel.text(gameEl.channel);

            let emptyDiv = $("<div>");
            emptyDiv.addClass("col-1");

            liveGameCard.append(liveGameAwayRow);
            liveGameAwayRow.append(awayTeamLogo, awayTeamName, liveInfoDivAway, emptyDiv);
            liveInfoDivAway.append(liveInfoConAway);
            liveInfoConAway.append(liveInfoRowAway);
            liveInfoRowAway.append(liveAwayScore,liveChannel);

        });
    };

    loadLiveGameCards();

    $(".liveGameModalBtn").on("click", function() {
        let gameID = $(this).attr("id");
        inProgressArr.forEach(function(gameEl) {
            if (parseInt(gameID) === gameEl.gameID) {
                $("#homeTeamLogoLive").attr("src", gameEl.homeTeamLogo);
                $("#homeTeamSpreadLive").text(gameEl.homePointSpread);
                $("#homeTeamSpreadOddsLive").text(gameEl.homePointSpreadPayout);
                $("#homeTeamMLLive").text(gameEl.liveHomeMoneyLine);
                // need to figure below out on Monday during games 
                // lines are not available on free trial
                // $("#overTotalLive").text("O" + gameEl.);
                // $("#overOddsLive").text(gameEl.);

                $("#awayTeamLogoLive").attr("src", gameEl.awayTeamLogo);
                $("#awayTeamSpreadLive").text(gameEl.awayPointSpread);
                $("#awayTeamSpreadOddsLive").text(gameEl.awayPointSpreadPayout);
                $("#awayTeamMLLive").text(gameEl.liveAwayMoneyLine);
                // need to figure below out on Monday during games
                // lines are not available on free trial
                // $("#underTotalLive").text("U" + gameEl.);
                // $("#underOddsLive").text(gameEl.);
                
            } else return
        });
    });

    function loadCompleteGameCards() {
        completedArr.forEach(function(gameEl) {
            let futuresMarketDiv     = $("#futuresMarket");
            let completeGameCard     = $("<div>");
            completeGameCard.addClass("container-fluid text-center my-4 border border-danger");
            completeGameCard.attr("id", gameEl.gameID);
            completeGameCard.insertAfter(futuresMarketDiv);

            let completeGameAwayRow  = $("<div>");
            completeGameAwayRow.addClass("row pregame");
            let awayTeamLogo         = $("<img>");
            awayTeamLogo.attr("src", gameEl.awayTeamLogo)
                        .attr("id", "awayTeamLogo");
            awayTeamLogo.addClass("col-1");
            let awayTeamName         = $("<div>");
            awayTeamName.addClass("col-4");
            awayTeamName.text(gameEl.awayTeamName);
            let awayFnScore          = $("<div>");
            awayFnScore.addClass("col-2");
            awayFnScore.text(gameEl.awayFnScore);
            let pitcherOne           = $("<div>");
            pitcherOne.addClass("col-5");
            pitcherOne.attr("id", "pitcherOne");

            completeGameCard.append(completeGameAwayRow.append(awayTeamLogo, awayTeamName, awayFnScore, pitcherOne));


            let completeGameHomeRow = $("<div>");
            completeGameHomeRow.addClass("row pregame mt-2");
            let homeTeamLogo        = $("<img>");
            homeTeamLogo.attr("src", gameEl.homeTeamLogo)
                        .attr("id", "homeTeamLogo");
            homeTeamLogo.addClass("col-1");
            let homeTeamName        = $("<div>");
            homeTeamName.addClass("col-4");
            homeTeamName.text(gameEl.homeTeamName);
            let homeFnScore         = $("<div>");
            homeFnScore.addClass("col-2");
            homeFnScore.text(gameEl.homeFnScore);
            let pitcherTwo          = $("<div>");
            pitcherTwo.addClass("col-5");
            pitcherTwo.attr("id", "pitcherTwo");

            completeGameCard.append(completeGameHomeRow.append(homeTeamLogo, homeTeamName, homeFnScore, pitcherTwo));

            function displayPitchers() {
                let winningPitcher = gameEl.winningPitcherName;
                let losingPitcher  = gameEl.losingPitcherName;
                if (awayFnScore > homeFnScore) {
                    $("#pitcherOne").text(winningPitcher + " (W)");
                    $("#pitcherTwo").text(losingPitcher + " (L)");
                } else {
                    $("#pitcherTwo").text(losingPitcher + " (L)");
                    $("#pitcherOne").text(winningPitcher+ " (W)");
                }
            };

            displayPitchers();

        });
    };

    loadCompleteGameCards();

});






// 10-03-2020 Follow Ups
// Dynamically change date variables needed for Endpoint URLs - Collin / Derek 
        // var date = moment().format("MMM Do YYYY, H:MM a");
        // $("#currentDay").append(date);
// UI and CSS work - Derek and Nancy 

