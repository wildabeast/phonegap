SHELL = /bin/sh
CHMOD = chmod
CP = cp
MV = mv
NOOP = $(SHELL) -c true
RM_F = rm -f
RM_RF = rm -rf
TEST_F = test -f
TOUCH = touch
UMASK_NULL = umask 0
DEV_NULL = > /dev/null 2>&1
MKPATH = mkdir -p
CAT = cat
MAKE = make
OPEN = open
ECHO = echo
ECHO_N = echo -n
JAVA = java

all :: symbian.wrt

clean :: clean_libs

clean_libs:
	-$(RM_RF) lib
	
symbian.qt: lib/phonegap.js

lib/phonegap.js: javascripts/debugconsole.js javascripts/geolocation.js javascripts/notification.js javascripts/position.js
	$(MKPATH) lib
	$(RM_F) $@
	$(CAT) javascripts/debugconsole.js >> $@
	$(CAT) javascripts/geolocation.js >> $@
	$(CAT) javascripts/notification.js >> $@
	$(CAT) javascripts/position.js >> $@
