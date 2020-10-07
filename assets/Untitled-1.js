
    // Declaring variables outside of forEach, but not working inside or outside forEach loop
    // Select list-group associated with #worldSeriesWinner
    let listGroup = $("#worldSeriesWinnerListGroup");
    // Create list-item for teamName
    let listItem  = $("<li>");
    // Create list-item-span for teamOdds
    let listItemSpan = $("<span>");

   
    // Loop through Array for World Series Odds at DraftKings sportsbook and retrieve Team Name and AmPayout
    draftKingsWSOddsArr.forEach(function (el) {
        // Declare Variable for Team Name on each loop
        let teamName  = el.Participant;
        // Declare Variable for American Payout on each loop
        let teamOdds  = el.PayoutAmerican;
        // Set text of list-item to teamName
        listItem.text(teamName); 
        // Add classes to list-item
        listItem.addClass("list-group-item d-flex justify-content-between align-items-center");
        // Set text of list-item-span to teamOdds
        listItemSpan.text(teamOdds); 
        // Add classes to list-item-spand
        listItemSpan.addClass("badge badge-dark");
        // Append listItem to listGroup and listSpan to listItem
        listGroup.append(listItem.append(listItemSpan));
    });