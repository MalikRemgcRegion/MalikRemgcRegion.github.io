<div align="center">

  <h3 align="center">RealRemovedGamesCollectors.com</h3>

  <p align="center">
    <a href="https://malikremgcregion.github.io/"><strong>malikremgcregion.github.io</strong></a>
  </p>
</div>


<!-- ABOUT THE PROJECT -->
## About The Project

This service takes a look at the specific group of users, which have shown that they are willing to break the SSA.

[![About page Screen Shot][about-screenshot]](https://malikremgcregion.github.io/about.html)

## db folder

the db folder contains json files which data is used to generate the site.
 - [db.json](https://malikremgcregion.github.io/db/db.json) : json of all current members of the steam group [RemGC](https://steamcommunity.com/groups/RemGC/) from (11-09-2022) and onwards. 
```json
{
    "time_stamp": [
        1651416976,
        1666372433
    ],
    "id": "76561198192399786",
    "game_count": [
        6229,
        22879
    ],
    "region": [
        "GB",
        "TR"
    ]
}
```
everytime a new region is detected, the get added to the region, time_stamp and the game_count arrays. this means the game_count is a snapshot of what the account owned at the given time.
 - [getownedgames.json](https://malikremgcregion.github.io/db/getownedgames.json)
```json
{
    "time_stamp": 1680055383,
    "id": "76561198192399786",
    "game_count": 36647
}
```
we want to be able to easily see the difference in game_count between each region, but we also want to have an more accurate ladder game_count. getownedgames.json provides us with a way we can overwrite the snapshot game_count in order to place the account in the ladders.

 - [ecurrencycodes.json](https://malikremgcregion.github.io/db/ecurrencycodes.json)
```json
{
  "USD": {
      "strCode": "USD",
      "eCurrencyCode": 1,
      "strSymbol": "$",
      "bSymbolIsPrefix": true,
      "bWholeUnitsOnly": false,
      "strDecimalSymbol": ".",
      "strThousandsSeparator": ",",
      "strSymbolAndNumberSeparator": ""
  }
}
```
we need the eCurrencyCode to convert the input-base_ keys in the pricing.json.
 - [pricing.json](https://malikremgcregion.github.io/db/pricing.json)
```json
{
  "usd1": {
      "input-base_1": 99,
      "input-base_2": 89,
      "input-base_3": 99,
      "input-base_5": 4200,
      "input-base_7": 349,
      "input-base_8": 12000,
      "input-base_10": 969900,
      "input-base_11": 300,
      "input-base_12": 3595,
      "input-base_13": 110,
      "input-base_14": 2300,
      "input-base_15": 1500000,
      "input-base_16": 110000,
      "input-base_17": 1100,
      "input-base_18": 2600,
      "input-base_19": 1339,
      "input-base_20": 129,
      "input-base_21": 150,
      "input-base_22": 149,
      "input-base_9": 1100,
      "input-base_6": 449,
      "input-base_4": 109,
      "input-base_23": 600,
      "input-base_24": 5200,
      "input-base_25": 62000,
      "input-base_26": 250,
      "input-base_27": 280000,
      "input-base_28": 1100,
      "input-base_29": 700,
      "input-base_30": 2200,
      "input-base_31": 275,
      "input-base_32": 300,
      "input-base_34": 8200,
      "input-base_35": 350,
      "input-base_37": 30000,
      "input-base_38": 20,
      "input-base_39": 279,
      "input-base_40": 50000,
      "input-base_41": 3200,
      "input-CIS_1": 90,
      "input-SASIA_1": 90
  }
}
```
pricing.json is valves recommended pricings for each tier. eCurrencyCode value is what we need to figure out what input-base_1 is. 
We can now convert input-base_1 to USD and resolve that.

WIP: [valve_recommended_pricing](https://malikremgcregion.github.io/valve_recommended_pricing.html)

 - [cc_history_2023.json](https://malikremgcregion.github.io/db/cc_history_2023.json)
```json

{
    "time_stamp": [
        1673046000,
        1673650800,
        1674435813,
        1675040521,
        1675645431,
        1676250549,
        1676855379,
        1677460126,
        1678068485,
        1678672475,
        1679277361,
        1679881639
    ],
    "countrycode": "US",
    "countrycount": [
        203,
        203,
        203,
        203,
        203,
        202,
        202,
        202,
        209,
        213,
        213,
        213
    ]
}
```
WIP cc_history_2023.json is meant to keep a history of region changes each week. this is currently meant to only run for the year 2023. 
idea is that we can use this with pricing.json to see if there is a correlation between regional account changes as well.

## contact

[Discord](https://discord.gg/4X96kRjety)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[about-screenshot]: assets/about.png
