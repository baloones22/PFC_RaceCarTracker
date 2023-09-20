def connect():
    import network
    # ssid = "Cardosal"
    ssid = "Silveira_casa"
    password = "silva123"
    station = network.WLAN(network.STA_IF)
    if station.isconnected() == True:
        print("Already connected")
        return

    station.active(True)
    station.connect(ssid, password)
    while station.isconnected() == False:
        pass
    print("Connection successful")
