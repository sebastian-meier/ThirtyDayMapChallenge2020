# Day 26 - New Tool
Visualizing energy consumption per inhabitant on an 3-color e-paper (waveshare) 

![26](26.png)

## Sources

### Data

https://fbinter.stadt-berlin.de/fb/wfs/data/senstadt/s_energieverb_strom_bez
Geoportal Berlin, Energieverbräuche

## Related Project
Waveshares github repo for controlling the e-paper display through a raspberry pi:
https://github.com/waveshare/e-Paper/tree/master/RaspberryPi%26JetsonNano/python

The essential bits are:
```
epd = epd7in5bc.EPD()
epd.init()
epd.Clear()
HBlackimage = Image.open(os.path.join(picdir, 'BLACKIMAGE.bmp'))
HRYimage = Image.open(os.path.join(picdir, 'REDIMAGE.bmp'))
epd.display(epd.getbuffer(HBlackimage), epd.getbuffer(HRYimage))
epd.sleep()
epd.Dev_exit()
```

The images need to be black and white bitmap images.