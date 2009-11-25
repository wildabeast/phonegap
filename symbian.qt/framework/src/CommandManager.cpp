#include <qdebug.h>
#include <qwebview.h>
#include <qwebframe.h>

#include "CommandManager.h"

CommandManager::CommandManager( QObject *parent )
: QObject( parent )
{
}

void CommandManager::setWebView( QWebView *view, BrowserView *bview  )
{
    QWebPage *page = view->page();
    frame = page->mainFrame();
    m_bview = bview;
    m_console = new DebugConsole(view, bview);
    m_notification = new Notification();
    m_geolocation = new Geolocation(this);

    attachObjects();
    connect( frame, SIGNAL(javaScriptWindowObjectCleared()), this, SLOT(attachObjects()) );
}

void CommandManager::attachObjects()
{
    frame->addToJavaScriptWindowObject( "GapDebugConsole", m_console );
    frame->addToJavaScriptWindowObject( "GapNotification", m_notification );
    frame->addToJavaScriptWindowObject( "GapGeolocation", m_geolocation );
    
    //TODO: would prefer to just add one object, like this, but we cannot add objects as properties
    //(see header file CommandManager.h)
    //this may cause a problem when we want returned objects to be available as js properties like
    //geolocation.lastPosition
    //frame->addToJavaScriptWindowObject( "SymbianGap", this );
    //frame->addToJavaScriptWindowObject( "SymbianGap.notification", m_notification);
}

void CommandManager::evaluateJS(QString js) {
	frame->evaluateJavaScript(js);
}
