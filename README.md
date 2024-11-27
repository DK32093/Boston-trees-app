# Boston-trees-app

This project is an interactive web map I created to practice applying my web development skills to geospatial data. I pulled street trees data from the City of Boston’s Analyze Boston data hub and created an application that allows users to click on any tree and see the species! Many thanks to those whose hard work produced this great dataset. 

My process:

•	I used PSQL to create a PostgreSQL database with the PostGIS extension

•	I created a table from the street trees GeoJSON file using the GDAL tool ogr2ogr

•	I linked the PostGIS table to GeoServer and published the street trees layer as WMS

•	I created a custom interactive web map using Leaflet, a JavaScript library

During this process, I used SQL statements to query and manipulate the data and created a custom SLD to style the points. I don’t currently have access to a public server, so I branched my GitHub repo and created a live “demo” with a local subset of the data that works on mobile and desktop browsers.

The live demo code is in the "External-access" branch.
The code for the full version of the app using WMS is in the main branch.

Live demo: https://dk32093.github.io/Boston-trees-app/

Demo code: https://github.com/DK32093/Boston-trees-app/tree/External-access

WMS code: https://github.com/DK32093/Boston-trees-app/tree/main

Street trees data: https://data.boston.gov/dataset/treekeeper-street-trees

![Closeup screenshot](<Screenshot1.png>)
![Medium zoom screenshot](<Screenshot2.png>)
![Zoomed out screenshot](<Screenshot3.png>)