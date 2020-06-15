# RPI TV Titling System (v2)

## Overview

This project is a in-place re-write of the [original RPITS](https://github.com/rpitv/rpits) utilizing newer technologies. The original RPITS is a software suite that automates the creation of consistently themed graphics for television broadcast, with an emphasis on sports broadcasts, as used by [RPI TV](http://rpitv.org/). The suite integrates static player statistics and real time stat sources, and offers a UI to select graphics to send to [a separate keyer](https://github.com/exavideo/exacore).

The goal of RPITS v2 is to gradually re-write the functionality of RPITS v1 in place and feature complete, as most portions of RPITS v1 are loosely couple enough that the UI, API, Database, Data Acquisition, Image Rendering, and Keying can be swapped out one-by-one. The overall UI behavior, data structure, and templating system will be mostly maintained to ensure easy switchover for graphics operators.

RPITS v2 Phases:
1. Re-implement Live UI in React
1. Render titles in React
1. Set up events in React
1. Re-implement extant server-side functionality in Node
1. Build Node Websocket-based live sync service
1. Re-implement static/live data acquisition parsers/scrapers
1. Integrate headless Chromium into keyer
1. Integrate [Scoreboard](https://github.com/exavideo/scoreboard) directly into RPITS

For reference, the legacy RPITS v1 tech stack:
* PHP
* ImageMagick
* MySQL
* JS / jQuery UI

## Usage Notes

### Dependencies

Up until the completion of Phase 4, RPITS v2 will require a full running version of RPITS v1. Instructions below are solely for v2; see the [INSTALL](https://github.com/rpitv/rpits/blob/php7/INSTALL) of v1 for legacy install instructions.

### Installation

* `npm install`
* Edit .env to point to RPITS v1 (no changes needed for a default v1 install)
* `npm start`

## History

The origins of what would become RPITS started with software written by Reilly Hamilton in Fall 2008. At that time, RPI TV used a Panasonic AG-MX70 video switcher, and graphics were displayed by loading PNGs into Panasonic software on a directly connected PC, which would sync/transmit the files over to the switcher. The technical director would then display the graphic by hitting the 'DSK' button on the switcher. The PNGs were created from Photoshop files in a time consuming process that restricted incorporation of statistics and other often-updated values.

RPITS was created to automate this process by generating a set of "statscard" PNGs for each player on a team, powered by PHP, using the GD image library, a MySQL database, and a CSV stat loader. The software was expanded to create all nature of titles, using consistent design language and a text file based templating scheme that allowed for overrides from a database.

In Fall 2011, RPI TV upgraded to a full HD setup, utilizing a Ross Crossover 12 production video switcher. Rather than key on the switcher, keying functionality was performed completely downstream using Blackmagic Decklink capture cards. Under the new system, images http POST'd to they keyer server would be displayed. RPITS added a javascript UI to select graphics for display and used PHP to post the files to the keyer.

During the transition of graphics to HD, GD was swapped out for ImageMagick, which offered better text rendering capabilities and more dynamic painting techniques. The current graphical theme used by RPI TV was developed in Winter 2012 for the ECAC Hockey Men's Tournament. Most subsequent updates have centered around automation and usability: dynamic fields for text and colors in titles were introduced to rapidly set up new broadcast events, auto-scraping/importing of player stats replaced manual updates, and integration with live-stats XML created titles that updated as the event was underway. New templates, animation via PNG sequence, and moving headshots added to the presentation.

RPITS is still used in production broadcasts by RPI TV as of Spring 2020.