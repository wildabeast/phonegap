#ifndef COMMANDMANAGER_H
#define COMMANDMANAGER_H

#include <qobject.h>

#include "BrowserView.h"
#include "DebugConsole.h"
#include "Notification.h"

class QWebView;
class QWebFrame;

class CommandManager : public QObject
{
    Q_OBJECT
public:
	CommandManager( QObject *parent );

    void setWebView( QWebView *view, BrowserView *bview  );
    DebugConsole *m_console;
    Notification *m_notification;
    
   // Q_PROPERTY( Notification notification READ notification )
    //Notification notification() { return *m_notification; };

public slots:
    //void debug( const QString &param );
	void attachObjects();

private slots:
    

private:
    QWebFrame *frame;
    BrowserView *m_bview;
};
#endif // COMMANDMANAGER_H

