TEMPLATE = app
TARGET = PhoneGap
MOC_DIR = ./tmp
QT += core \
    gui \
    network \
    webkit \
    webkit
HEADERS += src/commands/Geolocation.h \
    src/BrowserView.h \
    src/BrowserWindow.h \
    src/CommandManager.h \
    src/TitleBar.h \
    src/commands/DebugConsole.h \
    src/commands/Notification.h \
    src/sym_iap_util.h
SOURCES += src/commands/Geolocation.cpp \
    src/BrowserView.cpp \
    src/BrowserWindow.cpp \
    src/CommandManager.cpp \
    src/Main.cpp \
    src/TitleBar.cpp \
    src/commands/DebugConsole.cpp \
    src/commands/Notification.cpp \
    PhoneGap_reg.rss
FORMS += 
RESOURCES += 
symbian { 
    TARGET.UID3 = 0xE666C00E
    ICON = icon.svg
    HEADERS += src/sym_iap_util.h
    LIBS += -lesock \
        -linsock \
        -lconnmon \
        -lhwrmvibraclient
    TARGET.CAPABILITY = NetworkServices Location
    TARGET.EPOCHEAPSIZE = 0x20000 \
        0x2000000
    htmlfiles.sources = ./www
    htmlfiles.path = .
    DEPLOYMENT += htmlfiles
}

include(src/mobility/vibra/vibra.pri)
include(src/mobility/location/location.pri)
