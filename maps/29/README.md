# Day 29 - Globe
Simple globe of water and landmass enriched through a DEM geotif

The globe projection can be established by using this projection-string and replacing the coordinate with the center of your globe map:
```
+proj=ortho +lat_0=-40.5333333333 +lon_0=-157.3333333339999 +x_0=0 +y_0=0 +a=6370997 +b=6370997 +units=m +no_defs
```

![29](29.png)

## Sources

### Water & Land

https://www.naturalearthdata.com/downloads/
Natural Earth, Public Domain

### DEM
https://www.eea.europa.eu/data-and-maps/data/world-digital-elevation-model-etopo5
Copyright holder: National Oceanic and Atmospheric Administration (NOAA)