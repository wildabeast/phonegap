#ifndef COMMANDMANAGER_H
#define COMMANDMANAGER_H

#include <qobject.h>

#include "BrowserView.h"
#include "DebugConsole.h"
#include "Notification.h"
#include "Geolocation.h"
#include "Orientation.h"

// Forward declaration
class QWebView;
class QWebFrame;
class Geolocation;
class Orientation;

class CommandManager : public QObject
{
    Q_OBJECT
public:
	CommandManager( QObject *parent );
    void setWebView( QWebView *view, BrowserView *bview  );
    void debug(QString text);
    
    DebugConsole *m_console;
    Notification *m_notification;
    Geolocation *m_geolocation;
    Orientation *m_orientation;
    
   // Q_PROPERTY( Notification notification READ notification )
    //Notification notification() { return *m_notification; };
    
private:
    QWebFrame *frame;
    BrowserView *m_bview;

public slots:
    //void debug( const QString &param );
	void attachObjects();
	void evaluateJS(QString js);
};
#endif // COMMANDMANAGER_H

